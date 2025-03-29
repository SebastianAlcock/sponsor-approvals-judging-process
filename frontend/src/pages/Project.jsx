import Navbar from "./Navbar";

import '../styles/Project.css';

export default function Project() {

  // TODO: GET project
  var project = {
    id: 17045050,
    year: 2025,
    semester: 'Spring',
    org_name: 'tapyoca',
    org_category: 'Small Business',
    org_industry: 'Media/Entertainment/Arts',
    org_website: 'https://tapyoca.com',
    org_address: '251 Washington Street, Newark, NJ, 07102',
    contact_first_name: 'Steven',
    contact_last_name: 'Samuel',
    contact_position_title: 'CTO',
    contact_phone: '2016141249',
    contact_email: 'steven@tapyoca.com',
    document: null,
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

  var applied_students = project.applied_students.split(',').map(id => get_student(id))
  var approved_students = project.approved_students.split(',').map(id => get_student(id))
  var confirmed_students = project.confirmed_students.split(',').map(id => get_student(id))

  console.log(applied_students)

  // Takes a user id and returns a user object
  function get_student(id) {
    // TODO: GET student from id
    if (id === '124') {
      return {first_name: 'John', last_name: 'Deer'}
    }
    else if (id === '243') {
      return {first_name: 'Jane', last_name: 'Doe'}
    }
    else if (id === '324') {
      return {first_name: 'Dale', last_name: 'Johnson'}
    }
  }

  return (
    <>
      <Navbar />

      <div className='project page'>
        <h1>
          {project.project_name}
        </h1>
        <table>
          
          <tr>
            <th>
              Description
            </th>
            <td>
              <span className='long'>
                {project.project_description.split(/\r\n|\r|\n/).map(p => {return <div>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Project Completion Criteria
            </th>
            <td>
              <span className='long'>
                {project.project_criteria.split(/\r\n|\r|\n/).map(p => {return <div>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Expected Skillset / Background
            </th>
            <td>
              <span className='long'>
                {project.project_skillset.split(/\r\n|\r|\n/).map(p => {return <div>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Special Instructions or Concerns
            </th>
            <td>
              <span className='long'>
                {project.project_instructions.split(/\r\n|\r|\n/).map(p => {return <div>{p}</div>})}
              </span>
            </td>
          </tr>
        
        </table>

        <h2>
          Company Information:
        </h2>

        <table>

          <tr>
            <th>
              Name
            </th>
            <td>
              {project.org_name}
            </td>
          </tr>

          <tr>
            <th>
              Scope and Industry
            </th>
            <td>
              {project.org_category}, {project.org_industry}
            </td>
          </tr>
          
          <tr>
            <th>
              Website
            </th>
            <td>
              <a href={project.org_website}>{project.org_website}</a>
            </td>
          </tr>
          
          <tr>
            <th>
              Address
            </th>
            <td>
              {project.org_address}
            </td>
          </tr>
        
        </table>

        <h2>
          Contact Information:
        </h2>
        
        <table>

          <tr>
            <th>
              Name
            </th>
            <td>
              {project.contact_first_name} {project.contact_last_name}
            </td>
          </tr>
          
          <tr>
            <th>
              Position
            </th>
            <td>
              {project.contact_position_title}
            </td>
          </tr>
          
          <tr>
            <th>
              Email
            </th>
            <td>
              {project.contact_email}
            </td>
          </tr>
          
          <tr>
            <th>
              Phone
            </th>
            <td>
              {project.contact_phone}
            </td>
          </tr>
        
        </table>

        <h2>
          Student Application Information:
        </h2>
        
        <table>
          
          <tr>
            <th>
              Applied Students:
            </th>
            <td>
              <ul>
                {
                  applied_students.map(student => {
                    return <li>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>
          
          <tr>
            <th>
              Approved Students:
            </th>
            <td>
              <ul>
                {
                  approved_students.map(student => {
                    return <li>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>
          
          <tr>
            <th>
              Confirmed Students:
            </th>
            <td>
              <ul>
                {
                  confirmed_students.map(student => {
                    return <li>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>

        </table>
      </div>
    </>
  );
}
