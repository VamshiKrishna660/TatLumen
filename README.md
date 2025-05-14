# TatLumen 🚀

TatLumen is an AI-powered multi-featured web platform designed for intelligent content understanding and generation. It brings together link-based Q&A, document summarization, and autonomous research agents — all under a unified interface.

---

## 🔍 Features

### 1. **LinkSage**
Paste a URL and ask questions. LinkSage reads and understands the webpage content and returns accurate, context-aware answers.

### 2. **Doc Scanner**
Paste any URL and ask questions about its content. LinkSage intelligently parses and understands the webpage, using advanced LLMs and context-aware retrieval to deliver precise, relevant answers based on the link’s actual data.

### 3. **Culprit AI**
Provide any topic name and get a well-researched, structured article in Markdown format — automatically generated using a multi-agent AI system that collaborates to ensure factual consistency, clarity, and depth of content.

---

## 🛠 Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS, Shadcn UI  
- **Backend:** Flask, Supabase & Clerk (Auth & Data), Astra DB  
- **GEN AI:** LangChain, LLMs (Groq, HuggingFace), CrewAI (Multi-Agent System)  

---

## ☁️ Deployment (AWS)

TatLumen is **fully deployed on AWS**, ensuring high scalability, security, and global availability.

- **Frontend:** Deployed on **S3** and distributed via **AWS CloudFront** for secure and fast global access.
- **Backend:** Hosted on an **EC2 instance**, with environment isolation and scalable compute resources.
- **Security:** AWS CloudFront manages HTTPS, CORS, and edge security for both frontend and backend.
- **Storage & Access:** Documents and logs are stored securely via S3 and accessed using pre-signed URLs when needed.

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
