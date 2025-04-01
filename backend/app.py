from flask import Flask, request, jsonify
from flask_cors import CORS
from db import Session
from models import User, Project, TrackRequest
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Flask Backend is Running!"})

@app.route('/register-student', methods=['POST'])
def register_student():
    data = request.get_json()
    session = Session()

    try:
        new_student = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            ucid=data['ucid'],
            email=data['email'],
            phone=data['phone'],
            password=data['password'],
            role='student',
            major=data['major'],
            minor=data['minor'],
            specialization=data['specialization']
        )
        session.add(new_student)
        session.commit()
        return jsonify({"message": "Student registered successfully!"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()

@app.route('/register-sponsor', methods=['POST'])
def register_sponsor():
    data = request.get_json()
    session = Session()

    try:
        new_sponsor = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone=data['phone'],
            password=data['password'],
            role='sponsor',
            position_title=data['position_title'],
            org_name=data['org_name'],
            org_category=data['org_category'],
            org_industry=data['org_industry'],
            org_website=data['org_website'],
            org_address=data['org_address']
        )
        session.add(new_sponsor)
        session.commit()
        return jsonify({"message": "Sponsor registered successfully!"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()
        
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    session = Session()

    try:
        user = session.query(User).filter_by(email=data['email']).first()

        if user and user.password == data['password']:
            user_data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
                "track": user.track,
                "applied_projects": user.applied_projects,
                "approved_projects": user.approved_projects,
                "committed_project": user.committed_project,
                "project_manager": user.project_manager
            }
            return jsonify({
                "message": "Login successful!",
                "user": user_data
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

@app.route('/users', methods=['GET'])
def get_all_users():
    session = Session()

    try:
        users = session.query(User).all()

        user_data = [{
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role
        } for user in users]

        return jsonify(user_data), 200  

    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    finally:
        session.close()

@app.route('/projects', methods=['GET'])
def get_all_projects():
    session = Session()

    try:
        projects = session.query(Project).all()

        project_data = [{
            "project_name": project.project_name,
            "org_name": project.org_name,
            "project_description": project.project_description,
            "year": project.year,
            "semester": project.semester
        } for project in projects]

        return jsonify(project_data), 200  

    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    finally:
        session.close()

@app.route('/user/<string:email>', methods=['GET'])
def get_one_user(email):
    session = Session()

    try:
        user = session.query(User).filter_by(email=email).first()

        if user:
            user_data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
                "major": user.major,
                "minor": user.minor,
                "specialization": user.specialization,
                "resume": user.resume
            }
            return jsonify(user_data), 200  
        else:
            return jsonify({"error": "User not found"}), 404  

    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    finally:
        session.close()

@app.route('/project/<int:id>', methods=['GET'])
def get_one_project(id):
    session = Session()

    try:
        project = session.query(Project).filter_by(id=id).first()

        if project:
            project_data = {
                "project_name": project.project_name,
                "org_name": project.org_name,
                "project_description": project.project_description,
                "year": project.year,
                "semester": project.semester,
                "contact_first_name": project.contact_first_name,
                "contact_last_name": project.contact_last_name,
                "contact_email": project.contact_email
            }
            return jsonify(project_data), 200  
        else:
            return jsonify({"error": "Project not found"}), 404  

    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    finally:
        session.close()

#TEST ENDPOINT
@app.route('/createproject', methods=['POST'])
def create_project():
    data = request.get_json()
    session = Session()

    try:
        # Creating a new project using the data from the request
        new_project = Project(
            year=data['year'],
            semester=data['semester'],
            org_name=data['org_name'],
            org_category=data['org_category'],
            org_industry=data['org_industry'],
            org_website=data['org_website'],
            org_address=data['org_address'],
            contact_first_name=data['contact_first_name'],
            contact_last_name=data['contact_last_name'],
            contact_position_title=data['contact_position_title'],
            contact_phone=data['contact_phone'],
            contact_email=data['contact_email'],
            document=data.get('document', None),  # Default to None if no document is provided
            project_name=data['project_name'],
            project_description=data['project_description'],
            project_criteria=data['project_criteria'],
            project_skillset=data['project_skillset'],
            project_instructions=data['project_instructions'],
            open_house=data['open_house'],
            employment_history=data['employment_history'],
            employment_opportunities=data['employment_opportunities'],
            employment_benefits=data['employment_benefits'],
            committed=data['committed'],
            other_projects=data['other_projects'],
            applied_students=data.get('applied_students', []),  # Default to empty list if no students applied
            approved_students=data.get('approved_students', []),  # Default to empty list if no students approved
            confirmed_students=data.get('confirmed_students', [])  # Default to empty list if no students confirmed
        )

        # Add and commit the new project to the session
        session.add(new_project)
        session.commit()

        return jsonify({"message": "Project created successfully!"}), 201

    except Exception as e:
        # Rollback the session if there's an error
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        # Close the session
        session.close()

@app.route('/apply/<int:user_id>', methods=['PATCH'])
def apply_to_project(user_id):
    data = request.get_json()
    session = Session()

    try:
        # Fetch the user by user_id
        user = session.query(User).filter_by(id=user_id).first()
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Fetch the project by project name (or ID) from the request data
        project_name = data.get("project_name")
        project = session.query(Project).filter_by(project_name=project_name).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        # Update the user's applied_projects field with the project name
        user.applied_projects = project_name

        # Update the project's applied_students field (store as a comma-separated string or JSON list)
        applied_students = project.applied_students
        if applied_students:
            applied_students = json.loads(applied_students)
        else:
            applied_students = []

        applied_students.append(user.email)  # Add the user's email to the applied_students list
        project.applied_students = json.dumps(applied_students)  # Store as JSON string

        # Commit the changes to both user and project tables
        session.commit()

        return jsonify({"message": "User successfully applied to the project!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()


if __name__ == '__main__':
    app.run(debug=True)