import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import  axios  from 'axios'
import signupImage from '../assets/signup.jpg'

const cookies = new Cookies()


const Auth = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',        
        avatarImage: ''
    }) 

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prevFormData) =>({...prevFormData, [name]: value}))

    }
   
    const [isSignup, setIsSignup] = useState(true)

    
    const switchMode = () =>{
        setIsSignup((previsSignup) => !previsSignup)
    }
    
const [errorMessage, setErrorMessage] = React.useState("") 

const handleSubmit = async (e) =>{
    e.preventDefault()

    const { username, phoneNumber, password, avatarImage} = formData
            
    const URL = 'http://localhost:5000/auth'
   
    try {
        //send data to backend, destructure response and store in a cookie
        const {data: {token, userID, hashedPassword, fullname}} = await axios.post(`${URL}/${isSignup? 'signup': 'login'}`, {
            username, password, fullname: formData.fullname, phoneNumber, avatarImage
        })
        
        
        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullname', fullname)
        cookies.set('userID', userID)

        if(isSignup){
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarImage', avatarImage)
            cookies.set('hashedPassword', hashedPassword)
                    
        }
        //reload browsers when cookies set
        window.location.reload()
                
    } catch (error) {
        if(error.message === "Network Error"){
            console.log(error)
            setErrorMessage("Server error, please try again later or contact admin")
                    
        }else{
            console.log(error)
            setErrorMessage("Incorrect username or password")
        }
                
                
                
    }

}

  return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">

                {errorMessage?<p className='error__message' style={{color: "black", fontSize:"1.2rem",  fontWeight: "400", width: "85%", borderRadius: "4px"}}>
                    {errorMessage}
                </p> : "" }
                
                <p>{isSignup? 'Sign Up': 'Sign In'}</p>
                <form onSubmit={handleSubmit} >
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" placeholder='Full Name' onChange={handleChange} required />
                         </div>                                               
                        
                    )}
                     <div className="auth__form-container_fields-content_input">
                        <label htmlFor="username">User Name</label>
                        <input type="text" name="username" placeholder='User Name' onChange={handleChange} required />
                     </div>
                     {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber" placeholder='Phone Name' onChange={handleChange} required />
                         </div>                                               
                        
                    )}
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarImage">Avatar Image -- pass in image url -- </label>
                            <input type="text" name="avatarImage" placeholder='Avatar Image' onChange={handleChange} required />
                         </div>                                             
                        
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                    </div> 
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} required />
                        </div>  
                    )}  
                    <div className='auth__form-container_fields-content_button'>
                        <button>{isSignup ? "Sign Up" :"Sign In" }</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignup? 'Already have an account?': "Don't have an account?"}
                        <span onClick={switchMode}>
                            {isSignup ? ' Sign In': ' Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signupImage} alt="sign in" />
        </div>
    </div>
  )
}

export default Auth


// alternative - const URL =  'https://ru-chat.herokuapp.com/auth'