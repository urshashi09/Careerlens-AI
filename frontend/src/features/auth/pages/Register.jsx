import {Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"
import LoadingScreen from '../../../components/LoadingScreen'

const Register = () => {

  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  const {loading, handleRegister} = useAuth()

  const handleSubmit=async (e)=>{
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate('/')
  }

  if(loading){
    return <LoadingScreen message="Creating your account" />
  }

  return (
    <main className="auth-page">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="form-container glass-container">
        <Link to="/" className="auth-logo">Careerlens AI</Link>
        <div className="auth-heading">
          <h1>Create account</h1>
          <p>Start generating tailored interview reports.</p>
        </div>
        <form onSubmit={handleSubmit} >

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
            onChange={(e)=>{setusername(e.target.value)}}
            type="text" id='username' name='username' placeholder='Enter username'/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e)=> {setemail(e.target.value)}}
            type="email" id='email' name='email' placeholder='Enter email'/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{setpassword(e.target.value)}}
            type="password" id='password' name='password' placeholder='Enter your password'/>
          </div>
          <button className='button primary-button' >Register</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login" >Login</Link></p>
      </div>
    </main>
  )
}

export default Register
