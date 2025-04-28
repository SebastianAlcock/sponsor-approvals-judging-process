# Software Automation Team 2:
### Automating Capstone Sponsor Approvals

## Background Information

### Project Requirements:

- Implement an online application system for sponsor approvals.
- Automatically verify student eligibility based on predefined rules.
- Auto-route applications to sponsors for review and approval.
- Track and audit the entire approval process with real-time updates.

### Explicit Sponsor Approval Rules:

- Students must apply to at least one project at the sponsor table.
- Their name must appear in the sponsor approval database.
- Students must commit to only one approved project via the Discord commitment channel.
- They must attend a round table meeting with their sponsor and team.
- An official photo with the team and sponsor must be taken for documentation.

### Co-Sponsors:
- Dr. Osama Eljabiri
- Benjamin Shuster

### Team Members:
- Sebastian Alcock (Project Manager)
- Anurag Agarwal
- Justin Nguyen

### Team Composition:
The ideal Capstone team to take over the remainder of this project would be one project manager, one backend developer, and one frontend developer. 
- Project Manager: 
    - Owns the roadmap, milestones, and day-to-day coordination. They’d work with your stakeholders to refine requirements (“what exactly goes into the approval flow?”, “how should the judging rubric be surfaced?”), break them down into sprint tasks, and keep everyone on schedule. They also run standup meetings. 
- Backend Developer: 
    - Fully owns the Flask service and database, writing and testing all new endpoints.
- Frontend Developer: 
    - Fully owns the React frontend, including all styling and components.
 
## Installation

#### Prerequisities:
- Python 3.0+ 
- pip
- DB Browser for SQLite (https://sqlitebrowser.org/)
- Git

#### Cloning the Repository: 
    git clone https://github.com/SebastianAlcock/sponsor-approvals-judging-process.git
    pip install -r requirements.txt (this will install all required dependencies)

#### Install required backend dependencies:
###### For backend, from parent folder run:
    cd backend
    pip install -r requirements.txt 
###### For frontend, from parent folder run:
    cd frontend
    npm install

#### Run the Application: 
###### For backend, from parent folder run:
    cd backend
    python -m flask run
###### For frontend, from parent folder run:
    cd frontend
    npm start

## Backend
This documentation covers the Flask-based backend API for automating sponsor approvals and the judging process in the Capstone program. It details installation instructions, configuration, and all available endpoints.
- Flask documentation: https://flask.palletsprojects.com/en/stable/ 

#### View the database:  
2 methods: 
- install DB Browser for SQLite and open the capstone.db file from this repo(preferred - gives a visualization for the DB)
- use terminal to execute SQLite commands: 
    - run sqlite3, .open capstone.db, .tables

#### Using the API routes 
Use the following curl commands in your terminal to query the APIs while the application is running. Curl is a tool used to query APIs, similar to tools like Postman. Curl documentation: https://docs.oracle.com/en/cloud/saas/marketing/eloqua-develop/Developers/GettingStarted/APIRequests/curl-requests.htm#GET

#### 1. POST /register-student: Register a Student 
What it does:
- Registers a new student with inputted information.
How it works:

- Reads JSON payload via request.get_json().

- Hashes data['password'] with werkzeug.security.generate_password_hash.

- Constructs a User(...) SQLAlchemy object.

- Opens a Session(), session.add(new_user) + session.commit().

- On success returns 201 with a JSON message; on error rolls back and returns 400.

Sample curl query: 
curl -X POST http://127.0.0.1:5000/register-student \
-H "Content-Type: application/json" \
-d '{
    "first_name": "Allison",
    "last_name": "Smith",
    "ucid": "A12345",
    "email": "allison.smith@example.com",
    "phone": "987-654-3210",
    "password": "password456",
    "major": "Software Engineering",
    "minor": "Mathematics",
    "specialization": "Web Development"
}'

#### 2. POST /register-sponsor: Register a Sponsor
What it does:
- Registers a new sponsor with inputted information.
How it works:

- Reads JSON payload via request.get_json().

- Hashes data['password'] with werkzeug.security.generate_password_hash.

- Constructs a User(...) SQLAlchemy object.

- Opens a Session(), session.add(new_user) + session.commit().

- On success returns 201 with a JSON message; on error rolls back and returns 400.

Sample curl query: 
curl -X POST http://127.0.0.1:5000/register-sponsor \
-H "Content-Type: application/json" \
-d '{
    "first_name": "Mike",
    "last_name": "Ema",
    "email": "mike.ema@google.com",
    "phone": "123-456-7890",
    "password": "password789",
    "position_title": "Project Manager",
    "org_name": "TechCorp",
    "org_category": "Technology",
    "org_industry": "Software",
    "org_website": "http://techcorp.com",
    "org_address": "123 Tech Park, Silicon Valley, CA"
}'

#### 3. POST /login: Login a User 
What it does: 
- Authenticates an existing user using their email and password.
How it works: 

- Reads JSON payload via request.get_json().

- Finds the user by email using session.query(User).filter_by(email=...).first().

- Checks hashed password with werkzeug.security.check_password_hash.

- On success, returns user info; on failure, returns 401 Unauthorized.

Sample curl query: 
curl -X POST http://127.0.0.1:5000/login \
-H "Content-Type: application/json" \
-d '{
    "email": "mike.ema@google.com",
    "password": "password789"
}'

#### 4. GET /users: Get All Users
curl -X GET http://127.0.0.1:5000/users

#### 5. GET /projects: Get All Projects
curl -X GET http://127.0.0.1:5000/projects

#### 6. GET /user/{email}: Get One User by ID
curl -X GET http://127.0.0.1:5000/user/alice.smith@example.com

#### 7. GET /project/{id}: Get One Project by ID
curl -X GET http://127.0.0.1:5000/project/1

#### 8. POST /createproject: Create a New Project
curl -X POST http://127.0.0.1:5000/createproject \
-H "Content-Type: application/json" \
-d '{
    "year": 2025,
    "semester": "Fall",
    "org_name": "TechCorp",
    "org_category": "Software",
    "org_industry": "Technology",
    "org_website": "http://techcorp.com",
    "org_address": "123 Tech Park, Silicon Valley, CA",
    "contact_first_name": "John",
    "contact_last_name": "Doe",
    "contact_position_title": "Project Manager",
    "contact_phone": "123-456-7890",
    "contact_email": "john.doe@techcorp.com",
    "document": null,
    "project_name": "AI Research",
    "project_description": "Research on AI technologies for improving automation",
    "project_criteria": "Must have knowledge of machine learning",
    "project_skillset": "Python, TensorFlow, Neural Networks",
    "project_instructions": "Follow the guidelines in the project brief",
    "open_house": 1,
    "employment_history": "Previous experience in AI projects",
    "employment_opportunities": "Internship opportunities available",
    "employment_benefits": "Salary and benefits provided",
    "committed": 0,
    "other_projects": "Data Science Project, AI Implementation",
    "applied_students": [],
    "approved_students": [],
    "confirmed_students": []
}'

#### 9. PATCH /apply/{user_id}: Apply a User to a Project
curl -X PATCH http://127.0.0.1:5000/apply/1 \
-H "Content-Type: application/json" \
-d '{
    "project_name": "AI Research"
}'

#### 10. PATCH /approve/{project_id, student_id}: Approve a Student for a Project
curl -X PATCH http://127.0.0.1:5000/approve/1/1 \
-H "Content-Type: application/json"

#### 11. POST /approvals : Record a sponsor approval 
curl -X POST http://127.0.0.1:5000/approvals \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 3,
    "user_id": 2,
    "submitter_id": 3
  }'

#### 12. GET /approvals : Get all approval records
curl -X GET http://127.0.0.1:5000/approvals

#### 13. DELETE /delete-all-approvals: Delete all approval records
curl -X DELETE http://127.0.0.1:5000/delete-all-approvals

#### 14. PATCH /commit/{user_id}: Commit a User to a Project
curl -X PATCH http://127.0.0.1:5000/commit/1 \
-H "Content-Type: application/json" \
-d '{
    "project_name": "AI Research"
}'

## Frontend

    TODO: Explain all pages and page functions (excluding styles but explain style folder)

## Current Issues or Challenges

    TODO:

## Unfulfilled Requirements

    TODO:

## Future Plans

    TODO:
