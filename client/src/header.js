import{Link} from "react-router-dom"
import{useEffect, useState} from "react"

export default function Header(){
  const [username,setUsername] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:8080/profile',{
      credentials:'include',
    }).then(response =>{
      response.json().then(userInfo=>{
        setUsername(userInfo.username)
      })
    })
    
  },[]);

  function logout(){
    fetch('http://localhost:8080/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUsername(null);
  }

    return(
        <header>
        <Link href="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a href="#" onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to="/Login">Login</Link>
            <Link to="/register">Register</Link>
            </>

          )}
          
        </nav>
      </header>
    )
}