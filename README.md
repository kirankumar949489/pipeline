What You Need
A computer (Windows, Mac, or Linux).
Git: Download from git-scm.com if you don’t have it (check with git --version).
Node.js: Version 14 or higher, from nodejs.org.
Python: Version 3.8 or higher, from python.org.
Internet to get the project and extras.
Steps to Start
1. Get the Project from GitHub
Open a terminal (e.g., Command Prompt on Windows, Terminal on Mac/Linux).
Type this to copy my project:
text

Collapse

Wrap

Copy
git clone https://github.com/kirankumar949489/pipeline.git
A folder named pipeline will appear with my files.
Go into the folder by typing:
cd pipeline
2. Set Up the Frontend (Website)
Move to the frontend folder by typing:
cd frontend
Install the tools by typing:
text

Collapse

Wrap

Copy
npm install
Start the website by typing:
text

Collapse

Wrap

Copy
npm start
A browser will open to http://localhost:3000. Keep this terminal open.
3. Set Up the Backend (Server)
Open a new terminal window.
Go back to the pipeline folder if needed:
Type cd .. then cd backend
Install the server tools by typing:
text

Collapse

Wrap

Copy
pip install fastapi uvicorn networkx
Start the server by typing:
text

Collapse

Wrap

Copy
uvicorn main:app --reload
Keep this terminal open. The server runs at http://localhost:8000.
4. Check It Out
Visit http://localhost:3000 in your browser.
Drag nodes (like Input or Math) from the toolbar.
Connect them by dragging between the circles.
Type in the Text node (try Hello {{input}}) to see it change.
Click "Submit" for a popup with results.
Click "Clear All" to reset.
Drag edges to move them or change styles with the dropdown.
5. If It Doesn’t Work
Frontend Trouble: Make sure Node.js is installed, run npm install again, or check if port 3000 is free.
Backend Trouble: Make sure Python is installed, run pip install again, or try uvicorn main:app --reload --port 8001 if port 8000 is busy.
No Connection: Keep both terminals open and check your internet.
6. Stop When Finished
Press Ctrl + C in the npm start terminal to stop the frontend.
Press Ctrl + C in the uvicorn terminal to stop the backend.
Extra Tips
All files are in the pipeline folder after cloning.
The repo is private, so you need access (ask recruiting@vectorshift.ai if needed).
Enjoy trying out my project!
Thanks for reviewing!
#   p i p e l i n e  
 