from flask import Flask, request, jsonify
from flask_cors import CORS
from db import Session
from models import User, Project, TrackRequest
import json
from werkzeug.security import generate_password_hash, check_password_hash

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
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_student = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            ucid=data['ucid'],
            email=data['email'],
            phone=data['phone'],
            password=hashed_password,
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
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_sponsor = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone=data['phone'],
            password=hashed_password,
            roles='sponsor',
            position_title=data.get('position_title'),
            org_name=data.get('org_name'),
            org_category=data.get('org_category'),
            org_industry=data.get('org_industry'),
            org_website=data.get('org_website'),
            org_address=data.get('org_address'),
            
            # explicitly set student fields as None
            ucid=None,
            major=None,
            minor=None,
            specialization=None,
            resume=None,
            track=None,
            applied_projects=None,
            approved_projects=None,
            committed_project=None,
            project_manager=None
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

        if user and check_password_hash(user.password, data['password']):
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
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "ucid": user.ucid,
            "email": user.email,
            "phone": user.phone,
            "roles": user.roles,
            "major": user.major,
            "minor": user.minor,
            "specialization": user.specialization,
            "resume": user.resume,
            "position_title": user.position_title,
            "org_name": user.org_name,
            "org_category": user.org_category,
            "org_industry": user.org_industry,
            "org_website": user.org_website,
            "org_address": user.org_address,
            "track": user.track,
            "applied_projects": user.applied_projects,
            "approved_projects": user.approved_projects,
            "committed_project": user.committed_project,
            "project_manager": user.project_manager,
            "password": user.password 
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
            "approved": project.approved,
            "year": project.year,
            "semester": project.semester,
            "org_name": project.org_name,
            "org_category": project.org_category,
            "org_industry": project.org_industry,
            "org_website": project.org_website,
            "org_address": project.org_address,
            "contact_first_name": project.contact_first_name,
            "contact_last_name": project.contact_last_name,
            "contact_position_title": project.contact_position_title,
            "contact_phone": project.contact_phone,
            "contact_email": project.contact_email,
            '''
            "org_document": project.org_document,
            "project_document": project.project_document,
            "agreement_document": project.agreement_document,
            '''
            "project_name": project.project_name,
            "project_description": project.project_description,
            "project_criteria": project.project_criteria,
            "project_skillset": project.project_skillset,
            "project_instructions": project.project_instructions,
            "open_house": project.open_house,
            "employment_history": project.employment_history,
            "employment_opportunities": project.employment_opportunities,
            "employment_benefits": project.employment_benefits,
            "committed": project.committed,
            "other_projects": project.other_projects,
            "applied_students": project.applied_students,
            "approved_students": project.approved_students,
            "confirmed_students": project.confirmed_students
        } for project in projects]

        return jsonify(project_data), 200  

    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    finally:
        session.close()

@app.route('/user/<int:id>', methods=['GET'])
def get_one_user(id):
    session = Session()

    try:
        user = session.query(User).filter_by(id=id).first()

        if user:
            user_data = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "ucid": user.ucid,
                "email": user.email,
                "phone": user.phone,
                "roles": user.roles,
                "major": user.major,
                "minor": user.minor,
                "specialization": user.specialization,
                "resume": user.resume,
                "position_title": user.position_title,
                "org_name": user.org_name,
                "org_category": user.org_category,
                "org_industry": user.org_industry,
                "org_website": user.org_website,
                "org_address": user.org_address,
                "track": user.track,
                "applied_projects": user.applied_projects,
                "approved_projects": user.approved_projects,
                "committed_project": user.committed_project,
                "project_manager": user.project_manager,
                "password": user.password 
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
                "id": project.id,
                "approved": project.approved,
                "year": project.year,
                "semester": project.semester,
                "org_name": project.org_name,
                "org_category": project.org_category,
                "org_industry": project.org_industry,
                "org_website": project.org_website,
                "org_address": project.org_address,
                "contact_first_name": project.contact_first_name,
                "contact_last_name": project.contact_last_name,
                "contact_position_title": project.contact_position_title,
                "contact_phone": project.contact_phone,
                "contact_email": project.contact_email,
                '''
                "org_document": project.org_document,
                "project_document": project.project_document,
                "agreement_document": project.agreement_document,
                '''
                "project_name": project.project_name,
                "project_description": project.project_description,
                "project_criteria": project.project_criteria,
                "project_skillset": project.project_skillset,
                "project_instructions": project.project_instructions,
                "open_house": project.open_house,
                "employment_history": project.employment_history,
                "employment_opportunities": project.employment_opportunities,
                "employment_benefits": project.employment_benefits,
                "committed": project.committed,
                "other_projects": project.other_projects,
                "applied_students": project.applied_students,
                "approved_students": project.approved_students,
                "confirmed_students": project.confirmed_students
            }
            return jsonify(project_data), 200  
        else:
            return jsonify({"error": "Project not found"}), 404  

    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    finally:
        session.close()

@app.route('/createproject', methods=['POST'])
def create_project():
    data = request.form  # Getting form data
    session = Session()

    try:
        # Extracting form fields from the request
        year = data['year']
        semester = data['semester']
        org_name = data['org_name']
        org_category = data['org_category']
        org_industry = data['org_industry']
        org_website = data['org_website']
        org_address = data['org_address']
        contact_first_name = data['contact_first_name']
        contact_last_name = data['contact_last_name']
        contact_position_title = data['contact_position_title']
        contact_phone = data['contact_phone']
        contact_email = data['contact_email']
        project_name = data['project_name']
        project_description = data['project_description']
        project_criteria = data['project_criteria']
        project_skillset = data['project_skillset']
        project_instructions = data['project_instructions']
        open_house = data['open_house']
        employment_history = data['employment_history']
        employment_opportunities = data['employment_opportunities']
        employment_benefits = data['employment_benefits']
        committed = data['committed']
        other_projects = data['other_projects']
        applied_students = data.get('applied_students') 
        approved_students = data.get('approved_students')  
        confirmed_students = data.get('confirmed_students')  

        org_document = request.files['org_document'].read() 
        project_document = request.files['project_document'].read() 
        agreement_document = request.files['agreement_document'].read()  

        new_project = Project(
            year=year,
            semester=semester,
            org_name=org_name,
            org_category=org_category,
            org_industry=org_industry,
            org_website=org_website,
            org_address=org_address,
            contact_first_name=contact_first_name,
            contact_last_name=contact_last_name,
            contact_position_title=contact_position_title,
            contact_phone=contact_phone,
            contact_email=contact_email,
            project_name=project_name,
            project_description=project_description,
            project_criteria=project_criteria,
            project_skillset=project_skillset,
            project_instructions=project_instructions,
            open_house=open_house,
            employment_history=employment_history,
            employment_opportunities=employment_opportunities,
            employment_benefits=employment_benefits,
            committed=committed,
            other_projects=other_projects,
            applied_students=applied_students,
            approved_students=approved_students,
            confirmed_students=confirmed_students,
            org_document=org_document,  
            project_document=project_document, 
            agreement_document=agreement_document  
        )

        # Add and commit the new project to the database
        session.add(new_project)
        session.commit()

        return jsonify({"message": "Project created successfully!"}), 201

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

if __name__ == '__main__':
    app.run(debug=True)


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

        project.approved = "1"

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

@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    session = Session()

    try:
        user = session.query(User).filter_by(id=id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        session.delete(user)
        session.commit()

        return jsonify({"message": "User deleted successfully!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/user/<int:id>', methods=['PATCH'])
def update_user(id):
    data = request.get_json()
    session = Session()

    try:
        user = session.query(User).filter_by(id=id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.ucid = data.get('ucid', user.ucid)
        user.email = data.get('email', user.email)
        user.phone = data.get('phone', user.phone)
        user.roles = data.get('roles', user.roles)
        user.major = data.get('major', user.major)
        user.minor = data.get('minor', user.minor)
        user.specialization = data.get('specialization', user.specialization)
        
        session.commit()

        return jsonify({"message": "User updated successfully!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/project/<int:id>', methods=['DELETE'])
def delete_project(id):
    session = Session()

    try:
        project = session.query(Project).filter_by(id=id).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        session.delete(project)
        session.commit()

        return jsonify({"message": "Project deleted successfully!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()

@app.route('/project/<int:id>', methods=['PATCH'])
def update_project(id):
    data = request.get_json()
    session = Session()

    try:
        project = session.query(Project).filter_by(id=id).first()

        if not project:
            return jsonify({"error": "Project not found"}), 404

        project.approved = data.get('approved', project.approved)
        project.year = data.get('year', project.year)
        project.semester = data.get('semester', project.semester)
        project.org_name = data.get('org_name', project.org_name)
        project.org_category = data.get('org_category', project.org_category)
        project.org_industry = data.get('org_industry', project.org_industry)
        project.org_website = data.get('org_website', project.org_website)
        project.org_address = data.get('org_address', project.org_address)
        project.contact_first_name = data.get('contact_first_name', project.contact_first_name)
        project.contact_last_name = data.get('contact_last_name', project.contact_last_name)
        project.contact_position_title = data.get('contact_position_title', project.contact_position_title)
        project.contact_phone = data.get('contact_phone', project.contact_phone)
        project.contact_email = data.get('contact_email', project.contact_email)
        project.org_document = data.get('org_document', project.org_document)
        project.project_document = data.get('project_document', project.project_document)
        project.agreement_document = data.get('agreement_document', project.agreement_document)
        project.project_name = data.get('project_name', project.project_name)
        project.project_description = data.get('project_description', project.project_description)
        project.project_criteria = data.get('project_criteria', project.project_criteria)
        project.project_skillset = data.get('project_skillset', project.project_skillset)
        project.project_instructions = data.get('project_instructions', project.project_instructions)
        project.open_house = data.get('open_house', project.open_house)
        project.employment_history = data.get('employment_history', project.employment_history)
        project.employment_opportunities = data.get('employment_opportunities', project.employment_opportunities)
        project.employment_benefits = data.get('employment_benefits', project.employment_benefits)
        project.committed = data.get('committed', project.committed)
        project.other_projects = data.get('other_projects', project.other_projects)
        project.applied_students = data.get('applied_students', project.applied_students)
        project.approved_students = data.get('approved_students', project.approved_students)
        project.confirmed_students = data.get('confirmed_students', project.confirmed_students)

        session.commit()

        return jsonify({"message": "Project updated successfully!"}), 200

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

    finally:
        session.close()



if __name__ == '__main__':
    print(app.url_map)
    app.run(debug=True)
