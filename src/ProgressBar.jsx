
import "./default-page.css";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function ProgressBar(props) {

  let { Val,setV} = props;
  const percentage = Val.idValue




return(<div className="progress-css"><div className="bar-title">CURRENTLY ACTIVE</div>
            <div  className="progress-con" style={{ width: 150, height: 150 }}>
            <CircularProgressbar
  value={percentage}
  maxValue={16}
  text={`${percentage} devices`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'round',

    // Text size
    textSize: '10px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    

    // Colors
    pathColor: `rgba(223, 69, 7)`,
    textColor: '#3D7AAC',
    trailColor: '#d6d6d6',

    backgroundColor: '#ac5000',
  })}
/></div>
            
            </div>)}
