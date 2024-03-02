
import { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [i, setI] = useState({
    email:'',
    password:''
  }); //user info object

  const setUI = (key, value) => setI({ ...i, [key]: value }); //setUI sets UserInfo value and update i value.

  function setStateFromForm(event) {
    let element = event.target;
    setUI(element.name, element.value);
    //console.log(i)
    
   
  }

  async function submit(event) {
    // prevent submit from doing a hard page reload
   event.preventDefault();
    //console.log(serverResponse)
    let serverResponse =  await(await fetch('http://localhost:5000/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
    })).json()

    /*
    //The commented code consists of all the trials to retrieve the cookie
    console.log(serverResponse)
    const token = await serverResponse.text()

    console.log(serverResponse.cookie)
    console.log("login data", token)
    const key = "jwtAuth"

  localStorage.setItem(key, token)

    
    let data = await serverResponse.json()
    console.log(serverResponse.headers.get('Authorization'))
    console.log(data)

     if (serverResponse.headers) {
      const cookieHeader = serverResponse.headers.get('Set-Cookie');
      
      // Check if the 'Set-Cookie' header is present
      if (cookieHeader) {
        // Save the cookie to the browser
        document.cookie = cookieHeader;
      }
    }*/
    
    
    console.log(serverResponse)
    navigate('/default-page')
    
    
  }

  


  //On submit
  //set it to the object and then fetch from api to confirm. If it is correct (console.log), move on to the next
      
  
    return <div className="hid">
      <form onSubmit={submit} >
    <img src="/SEA-logo.png" alt='Logo of the app'></img>
    <h2>Welcome</h2>
    <input
      type="email" required placeholder="email" maxLength="50"
      name='email' value={i.email}
      onChange={setStateFromForm}  />
    <input
      type="password" required placeholder="Password (min 6 letters)" minLength="6"
      name="password" maxLength="50" value={i.password}
      onChange={setStateFromForm}  />
    <button type="submit">LOGIN</button>
  </form>
  <div className='wrong-input'><p>Forgot <span>Email / Password</span></p>
  <p>Contact customer care at <span>eazylivinghq@gmail.com</span></p></div>
    </div>
}