import { useState } from 'react'
import "./default-page.css";


export default function Sensor(props) {

    let { keyName, value} = props;
    const [like, setLike] = useState(value);
     
    console.log('Sensor Component Props:', props)
    //let like = value
    //console.log(sense)

    //console.log(like)
   /* function Switch () {


    }*/

    const Switch = async () => {
        try{ setLike(!like);

            let device = { [keyName]: !like };
            console.log(device)
            console.log(typeof device)

            // Send the updated state to the backend
            const serverResponse = await fetch("http://localhost:5000/api/modes/defaultMode", {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify(device), // Toggle the like state
            });
      
            if (!serverResponse.ok) {
              throw new Error(`HTTP error! status: ${serverResponse.status}`);
            }
      
            const response = await serverResponse.json();
            console.log("Response from server", response);
          } catch (error) {
            console.error("Error:", error.message);
          }

        
        
      };

    return(
        <div className='caption' onClick = {Switch}>
            <div>{keyName}</div>
            <div>{String(like)}</div>

      
      
      </div>
    )
}
