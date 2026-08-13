# VectorShift
Multi-Agent AI Workflow Tool

VectorShift takes a user goal and uses 3 AI agents to plan, execute, and deliver the output. 
Built to demonstrate 0→1 product development with Python, FastAPI, and React.

## Demo
Video Walkthrough: https://youtube.com/shorts/jeq8CFd55Eg?si=1sLW1FWuR-2u0H-a

## Tech Stack
- **Backend**: Python, FastAPI, SQLite
- **Frontend**: React, JavaScript 
- **AI**: OpenAI API - 3 Agents: Planner, Executor, Reviewer
- **Key Files**: `ui.js`, `submit.js`, `store.js`

## How to Run
1.  Clone repo
2.  `pip install -r requirements.txt`
3.  `uvicorn main:app --reload`
4.  `cd frontend && npm start`

## Architecture
User → React UI → FastAPI → AI Agents → Output

Built by Sovana Ruhani
Portfolio: https://kirsov.onrender.com
