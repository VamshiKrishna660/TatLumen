import os
import uuid
from flask import Blueprint, request, jsonify, send_from_directory  
from doc_process import summarize_document
from db import supabase
from rich import print
from auth import verify_token

scan_bp = Blueprint("scan_bp", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# print(f'[blue]Upload_path -> {UPLOAD_FOLDER}[/blue]')

@scan_bp.route("/scan", methods=["POST"])
def scan_document():
    """Handle document upload, summarization, and saving to Supabase."""
    decoded = verify_token(request.headers.get("Authorization"))
    if not decoded:
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded.get("sub")
    file = request.files.get("document")

    if not file:
        return jsonify({"error": "No document uploaded"}), 400

    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        summary = summarize_document(file_path)
    except Exception as e:
        os.remove(file_path)  # Clean up even on failure
        return jsonify({"error": f"Failed to summarize: {str(e)}"}), 500

    # Save document metadata in Supabase
    supabase.table("documents").insert({
        "clerk_id": clerk_id,
        "filename": file.filename,
        "summary": summary,
        "file_path": file_path
    }).execute()

    os.remove(file_path)  # Clean up after storing summary

    return jsonify({"result": summary}), 200


@scan_bp.route("/scan/history", methods=["GET"])
def get_documents():
    """Get history of scanned documents for the logged-in user."""
    decoded = verify_token(request.headers.get("Authorization"))
    if not decoded:
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded.get("sub")

    result = supabase.table("documents") \
        .select("id, filename, summary, created_at, file_path") \
        .eq("clerk_id", clerk_id) \
        .order("created_at", desc=True) \
        .execute()

    return jsonify(result.data), 200


@scan_bp.route("/documents/<doc_id>", methods=["GET"])
def get_single_document(doc_id):
    """Download the summary of a document as a Markdown (.md) file."""
    decoded = verify_token(request.headers.get("Authorization"))
    if not decoded:
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded.get("sub")

    result = supabase.table("documents") \
        .select("id, filename, summary") \
        .eq("id", doc_id) \
        .eq("clerk_id", clerk_id) \
        .single() \
        .execute()

    if not result.data:
        return jsonify({"error": "Document not found"}), 404

    filename = result.data["filename"]
    summary = result.data["summary"]
    safe_name = os.path.splitext(filename)[0]
    md_filename = f"{safe_name}_summary.md"
    md_path = os.path.join("summaries", md_filename)

    os.makedirs("summaries", exist_ok=True)

    with open(md_path, "w") as f:
        f.write(f"# Summary for {filename}\n\n")
        f.write(summary.strip())

    return send_from_directory(
        directory="summaries",
        path=md_filename,
        as_attachment=True,
        mimetype="text/markdown",
        download_name=md_filename
    )
