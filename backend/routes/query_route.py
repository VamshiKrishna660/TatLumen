from flask import Blueprint, request, jsonify
from db import supabase
from auth import verify_token
from query_process import process_query
import uuid

query_bp = Blueprint("query_bp", __name__)
subscribe_bp = Blueprint("subscribe_bp", __name__)
history_bp = Blueprint("history_bp", __name__)


@query_bp.route("/query", methods=["POST"])
def handle_query():
    decoded = verify_token(request.headers.get("Authorization"))
    if not decoded:
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded["sub"]
    data = request.get_json()

    website_url = data.get("websiteUrl")
    question = data.get("question")
    session_id = data.get("session_id")  # NEW: get session_id from frontend

    if not website_url or not question:
        return jsonify({"error": "Missing websiteUrl or question"}), 400

    if not session_id:
        session_id = str(uuid.uuid4())  # NEW: generate session_id if not provided

    user_check = supabase.table("users").select("*").eq("clerk_id", clerk_id).execute()
    if not user_check.data:
        supabase.table("users").insert({
            "clerk_id": clerk_id
        }).execute()

    answer = process_query(website_url, question)

    if not answer:
        return jsonify({"error": "Try a New Chat !! "}), 500

    supabase.table("qa_history").insert({
        "question": question,
        "answer": answer,
        "clerk_id": clerk_id,
        "website_url": website_url,
        "session_id": session_id 
    }).execute()

    return jsonify({"answer": answer, "session_id": session_id}), 200  # NEW: return session_id too


@history_bp.route("/history", methods=["GET"])
def get_history():
    decoded = verify_token(request.headers.get("Authorization"))
    if not isinstance(decoded, dict):
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded.get("sub")

    result = supabase.table("qa_history") \
        .select("website_url, session_id, question, answer, created_at") \
        .eq("clerk_id", clerk_id) \
        .order("created_at", desc=False) \
        .execute()

    # Group by session_id and pick only the first question per session
    session_map = {}
    for item in result.data:
        if item["session_id"] not in session_map:
            session_map[item["session_id"]] = item

    return jsonify(list(session_map.values()))


@history_bp.route("/session/<session_id>", methods=["GET"])
def get_session(session_id):
    decoded = verify_token(request.headers.get("Authorization"))
    if not isinstance(decoded, dict):
        return jsonify({"error": "Unauthorized"}), 401

    clerk_id = decoded.get("sub")

    result = supabase.table("qa_history") \
        .select("question, answer") \
        .eq("clerk_id", clerk_id) \
        .eq("session_id", session_id) \
        .order("created_at", desc=False) \
        .execute()

    return jsonify(result.data)

@subscribe_bp.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        supabase.table("subscribers").insert({"email": email}).execute()
        return jsonify({"message": "Subscribed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500