
import { useState, useEffect } from 'react';
import './login.css'


export default function Login() {
      
    //const [cat,setCat] = useState('')
  
    return <div className="hid">
        <form >
    <h3>Welcome</h3>
    <input
      type="username" required placeholder="username" maxLength="50"
      name='username' />
    <input
      type="password" required placeholder="Password (min 6 letters)" minLength="6"
      name="password" maxLength="50" />
    <button type="submit">LOGIN</button>
  </form>;
    </div>
}