import { useState, useEffect } from 'react'
export default function DefaultPage() {

  const [sensors, setSensors] = useState([]);
  let id = "RaudaHome"

  
  // http://localhost:5000/api/modes/defaultMode

  useEffect(() => {
    (async () => {

      setSensors(await (await (fetch('/api/modes/defaultMode', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(id),
      })).json()));
      //console.log(sensors)
     
    }) 
    
  }, [sensors]);
  console.log(sensors)





    
    
    return <div className="default">
    <h1>I am the default page</h1>
    </div>
  }