import React from 'react'

import './LoginModule.css'
import user_icon from '../Assests/person.png'
import password_icon from '../Assests/password.png'



const Login = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
``
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username'/>
                </div>   

                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password'/>
                </div>

                <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>

                <div className='login-container'>
                    <div className='login'>Login</div>
                </div>

            </div>    
        </div>
    );
};

export default Login