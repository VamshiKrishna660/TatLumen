from flask import Flask
from flask_cors import CORS
from routes.query_route import query_bp, history_bp, subscribe_bp
from routes.scanner_route import scan_bp
from routes.culprit_route import culprit_bp 
from AstraDB.db_client import get_vector_store
# import warnings
# warnings.filterwarnings()

app = Flask(__name__)
CORS(app)

# Register Blueprint
app.register_blueprint(query_bp)
app.register_blueprint(history_bp)
app.register_blueprint(subscribe_bp)
app.register_blueprint(culprit_bp)
app.register_blueprint(scan_bp)

if __name__ == '__main__':
    app.run(debug=True, port=8000, use_reloader=False)

    if exit:
        vector_store = get_vector_store('tatlumen_vector_collection')
        vector_store.delete_collection()

