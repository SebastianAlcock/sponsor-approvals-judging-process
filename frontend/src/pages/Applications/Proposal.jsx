import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import api from "../../services/api"; // <== use your axios instance here

import Navbar from "../Navbar";

import '../../styles/Form.css';

export default function Proposal() {
  const [formData, setFormData] = useState({
    id: null,
    year: null,
    semester: '',
    org_name: '',
    org_category: '',
    org_industry: '',
    org_website: '',
    org_address: '',
    document: null,
    contact_first_name: '',
    contact_last_name: '',
    contact_position_title: '',
    contact_phone: '',
    contact_email: '',
    project_name: '',
    project_description: "",
    project_criteria: "",
    project_skillset: "",
    project_instructions: "",
    open_house: 0,
    employment_history: '',
    employment_opportunities: '',
    employment_benefits: "",
    committed: 0,
    other_projects: 0,
    applied_students: '',
    approved_students:  '',
    confirmed_students: ''
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await api.post("/", formData);  // <== call backend using api instance
      setSuccess("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  var project = {
    id: 17045050,
    year: 2025,
    semester: 'Spring',

    org_name: 'tapyoca',
    org_category: 'Small Business',
    org_industry: 'Media/Entertainment/Arts',
    org_website: 'https://tapyoca.com',
    org_address: '251 Washington Street, Newark, NJ, 07102',
    document: null,

    contact_first_name: 'Steven',
    contact_last_name: 'Samuel',
    contact_position_title: 'CTO',
    contact_phone: '(439) 245-8631',
    contact_email: 'steven@tapyoca.com',

    project_name: 'tapyoca FanCard Dashboard',
    project_description: "The tapyoca Capstone project will involve the development of the “fan-side” app to allow fans to manage the FanCards they've purchased/collected, as well as features to share and trade content with friends, collect points and enjoy rewards. This project aligns with tapyoca's mission to blend physical collectibles with digital convenience, providing fans with a seamless and rewarding experience. tapyoca is seeking a team of creative, dynamic Capstone students who also enjoy collectible fan merch, to develop the tapyoca Fan App. The team will be given a scope of work to brainstorm and identify fan features to make the app sticky and engaging for fans. They will consult with tapyoca's CTO to scope out the technological framework for the development of the app. They will then develop a finished product that will be released to the Apple and Play store in Summer 2025.\nThe tapyoca FANCARD App will be a cross-platform mobile application for iOS and Android designed to enhance the experience of owning and managing tapyoca FanCards. This app will allow customers who purchased tapyoca FanCards to register their cards, access exclusive local rewards, and maintain their points in a centralized and user-friendly interface.\nThe app will include the following core features:\nCard Registration: Users can register their physical NFC tapyoca FanCard to link it to their account.\nReward Management: Track local rewards earned through purchases or activities associated with the card.\nPoints Maintenance: View and manage points balance in real time.\nPush Notifications: Receive timely updates about card updates, rewards, special offers, and exclusive content.\nDigital Card Access: Access the card project without the card. This serves as a backup to the physical card while ensuring the requirement for an initial physical card purchase.",
    project_criteria: "To consider the project complete, the following criteria must be met:\nFully Functional Mobile Application: The app must be operational on both iOS and Android platforms, with all core features implemented, tested, and working as intended.\nCard Registration and Verification: Users must be able to view their physical tapyoca FanCards, access rewards and points.\nReward System: A functioning reward management system integrated into the app, allowing users to redeem and track points.\nPush Notification System: Notifications for rewards, updates, and promotions must be implemented and configurable.\nDigital Card Access: Users must be able to access their card details digitally once registered.\nUser Experience Testing: The app must pass a usability testing phase to ensure it is intuitive and user-friendly.\nInstructor and Team Approval: Final sign-off from the instructor and team after meeting all specified requirements.",
    project_skillset: "For this project, we are seeking students with the following skills and experience:\nMobile App Development: Proficiency in iOS (Swift/Objective-C) and Android (Kotlin/Java) development.\nCross-Platform Frameworks: Familiarity with frameworks like Flutter or React Native is a plus.\nBackend Development: Experience in building and integrating RESTful APIs or Firebase for real-time project.\nUI/UX Design: Ability to create user-friendly and visually appealing app interfaces.\nprojectbase Management: Knowledge of systems like Firebase, MongoDB, or SQL for project storage.\nPush Notifications: Expertise in setting up push notification systems using platforms like Firebase Cloud Messaging or OneSignal or PushEngage.",
    project_instructions: "Tools: Recommended tools include Flutter or React Native for development, Firebase for backend and push notifications, and Figma for design mockups.\nDeadlines: The project must reach MVP (Minimum Viable Product) status within 8 weeks, with a final version ready by the 12-week mark.\nConstraints: The app must integrate with tapyoca's existing systems and ensure that the digital card project is only accessible to verified purchasers of physical FanCards.\nSecurity Requirements: project security and user privacy must be top priorities, with all sensitive project encrypted and GDPR/CCPA compliance maintained.",
    open_house: 1,
    employment_history: 'No, we have not.',
    employment_opportunities: 'I will have internship opportunities in the future.',
    employment_benefits: "In addition to the invaluable learning experience, NJIT students contributing to our project will gain several distinctive benefits:\nReal-World Product Development: This project offers an opportunity to contribute directly to the development of a live product in the music and entertainment industry, gaining practical experience in building scalable, user-centric applications.\nEntrepreneurial Experience: Students will gain insight into launching a tech startup, including branding, go-to-market strategies, and user adoption—critical skills for those interested in tech entrepreneurship.\nNetworking Opportunities: Through tapyoca’s industry connections, students will have the chance to engage with artists, influencers, and professionals in music, entertainment, and technology.\nJob Opportunities: As tapyoca continues to grow, we are always looking for talented individuals to join our team. Exceptional contributors may have the opportunity for internships or full-time roles within the company.",
    committed: 1,
    other_projects: 1,
    applied_students: '124,243,324',
    approved_students:  '124,243',
    confirmed_students: '124'
  }

  return (
    <>
      <Navbar currentPage={'applications'}/>

      <div className="applications page">

        <h1>Sponsor Proposal Application</h1>

        <form className={'proposal form'} onSubmit={handleSubmit}>
          
          <h3>Time Frame</h3>

          <label>Semester (You wish to apply for) *</label>
          <select name="semester" onChange={handleChange} required >
          <option style={{display:"none"}} defaultValue>-- select --</option>
            <option value="fall">Fall (Sep to December)</option>
            <option value="spring">Spring (January to May)</option>
            <option value="summer">Summer (May to August)</option>
            <option value="winter+spring">Winter-Break + Spring (Two-semester)</option>
          </select>

          <label>Year *</label>
          <input name="year" value={formData.year} onChange={handleChange} required />
          
          <h3>Company Information</h3>

          <label>Company/Organization Name *</label>
          <input name="org_name" value={formData.org_name} onChange={handleChange} required />

          <label>Which best describes your organization or affiliation? *</label>
          <select name="org_category" onChange={handleChange} required >
            <option style={{display:"none"}} defaultValue>-- select --</option>
            <option value="Public Service">Public Service</option>
            <option value="EDC Company">EDC Company</option>
            <option value="Small Business">Small Business</option>
            <option value="Medium Size Business">Medium Size Business</option>
            <option value="Large Business">Large Business</option>
            <option value="Fortune 500 Company">Fortune 500 Company</option>
            <option value="Fortune 1000 Company">Fortune 1000 Company</option>
            <option value="Student Entrepreneur">Student Entrepreneur</option>
            <option value="External Entrepreneur">External Entrepreneur</option>
            <option value="NJIT Faculty">NJIT Faculty</option>
            <option value="NJIT Department">NJIT Department</option>
            <option value="Other University">Other University</option>
            <option value="Other Non-Profit Organization">Other Non-Profit Organization</option>
          </select>

          <label>Which best describes your industry? *</label>
          <select name="org_category" onChange={handleChange} required >
          <option style={{display:"none"}} defaultValue>-- select --</option>
            <option value="Manufacturing/R">Manufacturing/R</option>
            <option value="Non-Profit/Charity">Non-Profit/Charity</option>
            <option value="Web/IT Professional Services">Web/IT Professional Services</option>
            <option value="Education">Education</option>
            <option value="Advertising/Marketing/PR">Advertising/Marketing/PR</option>
            <option value="Government/Military/Aerospace">Government/Military/Aerospace</option>
            <option value="Finance/Insurance/Real Estate">Finance/Insurance/Real Estate</option>
            <option value="Travel/Transportation/Hospitality">Travel/Transportation/Hospitality</option>
            <option value="Media/Entertainment/Arts">Media/Entertainment/Arts</option>
            <option value="Workforce Development/Professional Training">Workforce Development/Professional Training</option>
            <option value="Retail/Wholesale/Trade">Retail/Wholesale/Trade</option>
            <option value="Healthcare/Pharmaceutical/Biotech">Healthcare/Pharmaceutical/Biotech</option>
          </select>

          <label>Website URL</label>
          <input name="org_website" value={formData.org_website} onChange={handleChange} />

          <label>Full Address (street, city, state, and zip code) *</label>
          <input name="org_address" value={formData.org_address} onChange={handleChange} required />

          <label>Feel free to name and attach an additional brochure or document about your organization here, keeping the file size limited to 500K (i.e. 0.5 MB MAX)</label>
          <input name="document" value={formData.document} onChange={handleChange} type='file'/>

          <h3>Contact Information</h3>

          
          <h3>Project Proposal</h3>

          <label>Project Title *</label>
          <input name="project_name" value={formData.project_name} onChange={handleChange} required />

          <label>Project Description (500 Words Max)  *</label>
          <textarea name="project_description" value={formData.project_description} onChange={handleChange} required />

          <label>Project Completion Criteria: [Define specific project completion criteria that cannot be changed without approval from the instructor and team.] *</label>
          <textarea name="project_criteria" value={formData.project_criteria} onChange={handleChange} required />

          <label>Expected Skillset / Background: What kind of students are you seeking for your project? *</label>
          <textarea name="project_skillset" value={formData.project_skillset} onChange={handleChange} required />

          <label>Special Instructions (Tools, Deadlines, Constraints, etc.)</label>
          <textarea name="project_instructions" value={formData.project_instructions} onChange={handleChange} />

          
          <button type="submit">Submit</button>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

        </form>

      </div>
    </>
  );
}
