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
            roles='student',
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
            roles='sponsor',
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
                "roles": user.roles,
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
            "roles": user.roles
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
            "id": project.id,
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
                "roles": user.roles,
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
            document=data.get('document', None),  
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
            applied_students=data.get('applied_students', []),  
            approved_students=data.get('approved_students', []),  
            confirmed_students=data.get('confirmed_students', [])  
        )

        session.add(new_project)
        session.commit()

        return jsonify({"message": "Project created successfully!"}), 201

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/apply/<int:user_id>', methods=['PATCH'])
def apply_to_project(user_id):
    data = request.get_json()
    session = Session()

    try:
        user = session.query(User).filter_by(id=user_id).first()
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        project_name = data.get("project_name")
        project = session.query(Project).filter_by(project_name=project_name).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        user.applied_projects = project_name

        applied_students = project.applied_students
        if applied_students:
            applied_students = json.loads(applied_students)
        else:
            applied_students = []

        applied_students.append(user.email) 
        project.applied_students = json.dumps(applied_students) 

        session.commit()

        return jsonify({"message": "User successfully applied to the project!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/approve/<int:project_id>/<int:student_id>', methods=['PATCH'])
def approve_student(project_id, student_id):
    session = Session()

    try:
        project = session.query(Project).filter_by(id=project_id).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        student = session.query(User).filter_by(id=student_id).first()

        if not student:
            return jsonify({"error": "Student not found"}), 404

        if student.approved_projects:
            approved_projects = json.loads(student.approved_projects)
        else:
            approved_projects = []

        approved_projects.append(project.project_name)  
        student.approved_projects = json.dumps(approved_projects)  

        approved_students = project.approved_students
        if approved_students:
            approved_students = json.loads(approved_students)
        else:
            approved_students = []

        approved_students.append(student.email)  
        project.approved_students = json.dumps(approved_students)  

        session.commit()

        return jsonify({"message": "Student successfully approved for the project!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/commit/<int:user_id>', methods=['PATCH'])
def commit_to_project(user_id):
    data = request.get_json()
    session = Session()

    try:
        user = session.query(User).filter_by(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        project_name = data.get("project_name")
        project = session.query(Project).filter_by(project_name=project_name).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        user.committed_project = project_name

        committed_students = project.confirmed_students
        if committed_students:
            committed_students = json.loads(committed_students)
        else:
            committed_students = []

        committed_students.append(user.email)
        project.confirmed_students = json.dumps(committed_students)

        session.commit()

        return jsonify({"message": "User successfully committed to the project!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()


if __name__ == '__main__':
    app.run(debug=True)