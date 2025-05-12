from crewai import Agent
from langchain_groq import ChatGroq
from tools import tool
from dotenv import load_dotenv
import os

load_dotenv()

news_researcher_llm = ChatGroq(
    model="groq/compound-beta-mini",
    verbose=True,
    groq_api_key=os.getenv('GROQ_API_KEY_MRVK'),
    temperature=0.5,
)

news_writer_llm = ChatGroq(
    model="groq/compound-beta-mini",
    verbose=True,
    groq_api_key=os.getenv('GROQ_API_KEY_BLJP'),
    temperature=0.5,
)

News_Researcher = Agent(
    role="Research Specialist",
    goal="Deeply research and gather important information about {topic} from reliable sources.",
    verbose=True,
    memory=True,
    backstory=(
        """
        As a research specialist with a passion for discovering information, 
        you dive into various subjects, gather crucial facts, analyze details,
        and present clear insights to help others understand any topic better.
        """
    ),
    tools=[tool],
    llm=news_researcher_llm,
    allow_delegation=True,
)

News_Writer = Agent(
    role="Creative Content Writer",
    goal="Craft well-structured, engaging, and informative articles about {topic} for a wide audience in around 500 to 600 lines.",
    verbose=True,
    memory=True,
    backstory=(
        """
        As a creative writer, you transform research and ideas into easy-to-read, 
        compelling articles that connect with readers. You ensure clarity, flow, 
        and engagement while making complex topics accessible to everyone.
        """
    ),
    tools=[tool],
    llm=news_writer_llm,
    allow_delegations=False,
)
