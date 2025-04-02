# Project 1: 
## Automating Capstone Sponsor Approvals &amp; Judging Process

### Sponsor Approval Automation

- Implement an online application system for sponsor approvals.
- Automatically verify student eligibility based on predefined rules.
- Auto-route applications to sponsors for review and approval.
- Track and audit the entire approval process with real-time updates.

##### Explicit Sponsor Approval Rules:

- Students must apply to at least one project at the sponsor table.
- Their name must appear in the sponsor approval database.
- Students must commit to only one approved project via the Discord commitment channel.
- They must attend a round table meeting with their sponsor and team.
- An official photo with the team and sponsor must be taken for documentation.

### Judging Process Automation

- Develop a digital platform for structured judging across multiple panels.
- Provide a standardized rubric for real-time scoring.
- Automate the ranking and normalization of scores across different judges.
- Generate real-time leaderboards and final reports for award determination.

##### Judging Rubric & Decision Criteria:

- Judges evaluate projects based on impact, innovation, feasibility, and execution.
- Weighting and normalization ensure fairness across judging panels.
- Automation ensures immediate result calculations and transparent score auditing.


##### Using the backend 
## Run the Application: flask run 
## View the database:  
    - 2 methods: 
        - install DB Browser for SQLite and open the capstone.db file (preferred)
        - use terminal to execute SQLite commands: 
            - run sqlite3, .open capstone.db, .tables

## Using the API routes 
# 1. POST /register-student: Register a Student
curl -X POST http://127.0.0.1:5000/register-student \
-H "Content-Type: application/json" \
-d '{
    "first_name": "Alice",
    "last_name": "Smith",
    "ucid": "A12345",
    "email": "alice.smith@example.com",
    "phone": "987-654-3210",
    "password": "password456",
    "major": "Software Engineering",
    "minor": "Mathematics",
    "specialization": "Web Development"
}'

# 2. POST /register-sponsor: Register a Sponsor
curl -X POST http://127.0.0.1:5000/register-sponsor \
-H "Content-Type: application/json" \
-d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@techcorp.com",
    "phone": "123-456-7890",
    "password": "password789",
    "position_title": "Project Manager",
    "org_name": "TechCorp",
    "org_category": "Technology",
    "org_industry": "Software",
    "org_website": "http://techcorp.com",
    "org_address": "123 Tech Park, Silicon Valley, CA"
}'

# 3. POST /login: Login a User 
curl -X POST http://127.0.0.1:5000/login \
-H "Content-Type: application/json" \
-d '{
    "email": "alice.smith@example.com",
    "password": "password456"
}'

# 4. GET /users: Get All Users
curl -X GET http://127.0.0.1:5000/users

# 5. GET /projects: Get All Projects
curl -X GET http://127.0.0.1:5000/projects

# 6. GET /user/{email}: Get One User by Email
curl -X GET http://127.0.0.1:5000/user/alice.smith@example.com

# 7. GET /project/{id}: Get One Project by ID
curl -X GET http://127.0.0.1:5000/project/1

# 8. POST /createproject: Create a New Project
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

# 9. PATCH /apply/{user_id}: Apply a User to a Project
curl -X PATCH http://127.0.0.1:5000/apply/1 \
-H "Content-Type: application/json" \
-d '{
    "project_name": "AI Research"
}'

# 10. PATCH /approve/{project_id, student_id}: Approve a Student for a Project
curl -X PATCH http://127.0.0.1:5000/approve/1/1 \
-H "Content-Type: application/json"

# 11. PATCH /commit/{user_id}: Commit a User to a Project
curl -X PATCH http://127.0.0.1:5000/commit/1 \
-H "Content-Type: application/json" \
-d '{
    "project_name": "AI Research"
}'
