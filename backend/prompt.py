LLM_prompt = """
        Answer the questions based on the context only.
        <context> {context} </context> 
        Questions: {input}

        <Note> 
        1. Answer it without any Chatting Style.
        2. Answer the user in a Professional manner. 
        3. Don't Highlight or Bold the Words.
        </Note>
    """
