import "../auth.form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import LoadingScreen from '../../../components/LoadingScreen'

const Login = () => {

  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [email, setemail] = useState("")

  const [password, setpassword] = useState("")


  const handleSubmit = async (e) => {
  e.preventDefault()

  const success = await handleLogin({ email, password })

  if(success){
    navigate('/')
  }
}

  if(loading){
    return <LoadingScreen message="Signing you in" />
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
          <h1>Welcome back</h1>
          <p>Sign in to continue your interview prep.</p>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
            onChange={(e)=>{setemail(e.target.value)}}
             type="email" id='email' name='email' placeholder='Enter your email'/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{setpassword(e.target.value)}}
            type="password" id='password' name='password' placeholder='Enter your password'/>
          </div>
          <button className='button primary-button' >Login</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register" >Register</Link></p>
      </div>
    </main>
  )
}

export default Login
