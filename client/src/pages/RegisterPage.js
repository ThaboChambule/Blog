import {useState} from 'react';

export default function RegisterPage() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    function register(ev){
        ev.preventDefault() //it prevents html page from redirecting
        fetch('http://localhost:4000',{
            method:'POST',
            body: JSON.stringify({username,password})
        })
    }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" 
      placeholder="username" 
      value={username} 
      onChange={ev => setUsername(ev.target.value)} />
      <input type="password" 
      placeholder="password"
      value={password}
      onchange={ev => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
