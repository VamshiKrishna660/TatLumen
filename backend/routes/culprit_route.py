from flask import Blueprint, request, jsonify
from crewai import Crew, Process
from agents import News_Researcher, News_Writer
from tasks import Research_task, Write_task
from tools import tool
import os
from dotenv import load_dotenv
import logging

load_dotenv()

logging.basicConfig(level=logging.INFO)

culprit_bp = Blueprint('culprit', __name__)

@culprit_bp.route('/culprit', methods=['POST'])
def generate_article():
    data = request.get_json()
    topic = data.get("topic")

    serper_api_key = os.getenv('SERPER_API_KEY')
    groq_api_key = os.getenv('GROQ_API_KEY')

    if not topic or not serper_api_key or not groq_api_key:
        return jsonify({"error": "Topic and both API keys (Serper and Groq) are required."}), 400

    try:
        # Log the incoming data
        logging.info(f"Topic: {topic}")
        

        # Use the Serper API tool from tools.py to search for the topic
        search_results = tool.run(search_query = topic)  # Assuming search function fetches the topic info
        logging.info(f"Search Results: {search_results}")

        if not search_results:
            return jsonify({"error": "No relevant data found for the topic."}), 404
        
        crew = Crew(
            agents=[News_Researcher, News_Writer],
            tasks=[Research_task, Write_task],
            process=Process.sequential,
        )

        result = crew.kickoff(inputs={
            'topic': topic, 
            'serper_api_key': serper_api_key, 
            # 'groq_api_key': groq_api_key,
            'search_results': search_results  # Passing the search results to the crew task
        })
        logging.info(f"Result from Crew: {result}")

        if isinstance(result, str):
            return jsonify({"article": result})
        elif isinstance(result, dict) and 'article' in result:
            return jsonify({"article": result['article']})
        else:
            return jsonify({"article": str(result)})

    except Exception as e:
        logging.error(f"Error: {str(e)}") 
        return jsonify({"error": str(e)}), 500
