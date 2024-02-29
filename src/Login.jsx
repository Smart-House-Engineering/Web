
import { useState, useEffect } from 'react';
import './login.css'


export default function Login() {
      
    //const [cat,setCat] = useState('')
  
    return <div className="hid">
      <form >
    <img src="/SEA-logo.png" alt='Logo of the app'></img>
    <h2>Welcome</h2>
    <input
      type="username" required placeholder="username" maxLength="50"
      name='username' />
    <input
      type="password" required placeholder="Password (min 6 letters)" minLength="6"
      name="password" maxLength="50" />
    <button type="submit">LOGIN</button>
  </form>
  <div className='wrong-input'><p>Forgot <span>Username / Password</span></p>
  <p>Contact customer care at <span>eazylivinghq@gmail.com</span></p></div>
    </div>
}