
import { useState, useEffect } from 'react';
import './login.css'


export default function Login() {

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
    let serverResponse = await (await fetch('http://localhost:5000/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
    })).json();
    console.log(serverResponse)
    
    
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