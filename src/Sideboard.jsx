
import "./default-page.css";
import ProgressBar from "./ProgressBar"; 
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';



export default function SideBoard() {







return(<div className="side-board">
            <div className="profile"><img src="/profile.svg" alt="profile image"></img>
            <div className="user-pro"> Welcome home username </div> </div>
           
           
            
            
            <ProgressBar/> 
            
            <div className="membered"> 
            <div className="member-title">Members</div>

            <div className="member-pic">
            <img src="/person1.svg" alt="member image"></img>
            <img src="/person2.svg" alt="member image1"></img>
            <img src="/person1.svg" alt="member image"></img> </div> </div>

        </div>)}
        
        