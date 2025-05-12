import os
import time
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from prompt import LLM_prompt
from AstraDB.db_client import get_vector_store
from rich import print
load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY_MRVK")

def process_query(website_url: str, question: str) -> str:
    try:
        vector_store = get_vector_store('tatlumen_vector_collection')
        # Load and split documents
        loader = WebBaseLoader(website_url)
        docs = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        final_documents = splitter.split_documents(docs)


        # Insert into Astra vector_store (embeddings generated automatically)
        vector_store.add_documents(
            documents= final_documents
        )

        ## VectorBase as Retriever 
        retriever = vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 1, "score_threshold": 0.5},
        )

        # Call LLM
        llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.1-8b-instant")
        prompt = ChatPromptTemplate.from_template(LLM_prompt)
        doc_chain = create_stuff_documents_chain(llm, prompt)
        retrieval_chain = create_retrieval_chain(retriever, doc_chain)

        start = time.process_time()
        response = retrieval_chain.invoke({"input": question})
        print("Response time:", time.process_time() - start)

        raw_answer = response['answer'].strip()

        if not raw_answer:
            return "No valid answer found."

        # Optional: Format the answer - capitalize first letter and ensure it ends with a period.
        cleaned_answer = raw_answer[0].upper() + raw_answer[1:]
        if not cleaned_answer.endswith("."):
            cleaned_answer += "."

        return cleaned_answer

    except Exception as e:
        print("Error:", e)
        return "Something went wrong during processing."
    

##### Debugging Steps

# if __name__ == '__main__':
#         print(process_query('https://supabase.com/docs/reference/python/select', 'How to implement supabase with python using flask'))

        # print(final_documents)
    #     doc_entry = Document(
    #         page_content=final_documents
    #     )

    
        # Perform semantic search
        # results = vector_store.similarity_search(
        #     question,
        #     k=3,
        # )

        # a = results[0].page_content
        # b = results[1].page_content
        # c = results[2].page_content

        # print(r[i]['page_content'] for i,r in enumerate(results))

        
        # retrieved_docs = a + "\n\n" + b + "\n\n" + c
        # if not retrieved_docs:
        #     return "No relevant documents found."
