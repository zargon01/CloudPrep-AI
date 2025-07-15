# 🌩️ CloudPrep AI

CloudPrep AI is a free, AI-powered web application designed to help learners effectively prepare for **AWS Cloud Certification exams**, starting with the **AWS Certified Cloud Practitioner**. It leverages Large Language Models (LLMs) to dynamically generate domain-specific, exam-style questions and provides two distinct modes of preparation tailored to user needs.

---

## 🎯 Project Objective

To democratize AWS certification prep by offering an interactive, adaptive, and cost-effective learning platform powered entirely by open-source and free-tier cloud tools.

---

## 🚀 Key Features

### 🔐 User Login System
- JWT-based authentication
- Tracks user performance and history
- Stores preferences and past attempts

### 🧠 Two Practice Modes

#### ⚡ Rapid Mode
- Infinite stream of dynamically generated questions
- Immediate answer feedback after each question
- Ideal for continuous learning and concept reinforcement

#### ⏱️ Exam Mode
- Timed exam simulation (e.g., 65 questions in 90 minutes)
- Mimics the real AWS exam structure
- Final score breakdown with explanations and domain-level insights

### 📊 Performance Tracking *(planned)*
- Review weak areas by domain
- View history of past mock exams
- Progress indicators and success rate tracking

---

## 🧰 Tech Stack

### 🌐 Frontend
- **React** – Component-based SPA architecture
- **Tailwind CSS** – Utility-first responsive design
- **Zustand** – Lightweight global state management

### ⚙️ Backend
- **Node.js + Express** – REST API and business logic
- **JWT Auth** – Secure authentication and route protection
- **MongoDB Atlas** – Cloud-based NoSQL database for user and question data

### 🤖 LLM Integration
- **Groq API** – Free-tier access to powerful open-source LLMs (e.g., Mixtral, LLaMA-3)
- Custom prompts to generate AWS domain-specific practice questions

### 🛠️ DevOps & Hosting
- **Git + GitHub** – Version control and collaboration
- **GitHub Pages / Vercel** – Frontend deployment (free-tier)
- **Render / Railway / Fly.io** – Backend hosting (free-tier options)

---

## 📁 Repository Structure *(planned)*

/client → React frontend (Vite + Tailwind + Zustand)
/server → Node.js + Express backend
/models → MongoDB schemas (User, Question, Session)
/routes → API endpoints (auth, questions, exams)
/utils → Groq prompt templates, validators

---

## 📌 Roadmap Highlights

- [x] Define app structure and tech stack
- [ ] Build auth system with JWT
- [ ] Integrate Groq LLM API for dynamic question generation
- [ ] Develop Rapid Mode UI + flow
- [ ] Develop Exam Mode with timer + result analysis
- [ ] Store and analyze user history

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome!  
Please open an issue or submit a pull request.

---

## 📄 License

This project is open-source and will be released under the [MIT License](LICENSE).

---

## 📬 Contact

**Maintainer:** [Shivam Awasare](https://github.com/zargon01)  
For questions or suggestions, feel free to reach out via GitHub Issues.





