from crewai import Task
from tools import *
from agents import *

Research_task = Task(
    description=(
        '''
        Research and analyze the key aspects of {topic}. 
        Focus on its background, recent developments, real-world examples, potential benefits, challenges, 
        and future outlook. Structure the findings into a detailed, easy-to-understand report.
        '''
    ),
    expected_output='A thorough 12-14 paragraph detailed report on the given topic, organized clearly.',
    tools=[tool],
    agent=News_Researcher,
)

Write_task = Task(
    description=(
        '''
        Write an engaging, well-structured article about {topic}. 
        Summarize important insights, highlight interesting facts, and present a balanced view, 
        making it accessible and enjoyable for a general audience.
        '''
    ),
    expected_output='An article on {topic}, written in 12-14 paragraphs, In formatted in clean markdown.',
    tools=[tool],
    agent=News_Writer,
    async_execution=False,
    output_file='new-blog-post.md'
)
