import Navbar from "./Navbar";

import '../styles/Home.css';

export default function Home() {
  
  return (
    <>
      <Navbar currentPage='home'/>

      <div className="home page">
        <div className="col long">
          <h1>
            <span>Welcome</span>
          </h1>

          <div>
            This page can be changed to give instructions to students or contain important course links or deadlines.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </div>
        </div>
        <div className="col">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/gear-3d-icon-download-in-png-blend-fbx-gltf-file-formats--setting-settings-cogwheel-configuration-technology-pack-science-icons-4940527.png?f=webp" alt="transparent png of a gear"/>
        </div>
      </div>
    </>
  );
}