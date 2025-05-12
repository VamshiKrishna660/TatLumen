# db_client.py
import os
from dotenv import load_dotenv
from astrapy.info import VectorServiceOptions
from langchain_astradb import AstraDBVectorStore

load_dotenv()

ASTRA_DB_APPLICATION_TOKEN = os.environ["ASTRA_DB_APPLICATION_TOKEN"]
ASTRA_DB_API_ENDPOINT = os.environ["ASTRA_DB_API_ENDPOINT"]
ASTRA_DB_KEY_SPACE = os.environ["ASTRA_DB_KEY_SPACE"]

vectorize_options = VectorServiceOptions(
    provider="nvidia",
    model_name="NV-Embed-QA",
)

def get_vector_store(collection_name : str) -> AstraDBVectorStore:
    return AstraDBVectorStore(
        collection_name=collection_name,
        token=ASTRA_DB_APPLICATION_TOKEN,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        namespace = ASTRA_DB_KEY_SPACE,
        collection_vector_service_options=vectorize_options,
    )
