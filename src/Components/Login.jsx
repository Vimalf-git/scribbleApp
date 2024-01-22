import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Login.css';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ApiService from '../Common/ApiService';
function Login() {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await ApiService.post('/login', {
                email,
                password: password
            })
            if (res.status == 200) {
                toast.success("login success")
                sessionStorage.setItem('token', res.data.token)
                navigate('/notescontent')
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
                sessionStorage.clear()
                navigate('/login')
            }
            else {
                toast.error("Error Occoured! Please try after some time")
                sessionStorage.clear()
                navigate('/login')
            }
        }

    }

    const toggleSign = (e) => {
        e.preventDefault();
        console.log('enter into');
        navigate('/signup')
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    let windowSize=window.innerWidth
    console.log(windowSize);
    return (
        <>
            <div className='loginPage'>
                <div className='designPart' >
                    <Typography variant='h5' component="p"
                        sx={{ color: "#ffff" }}>
                        New Here?</Typography>
                    <Button variant='contained' color='warning' onClick={(e) =>toggleSign(e)}>Sign Up</Button>
                </div>
                <div className='loginForm'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#4481eb" }}>
                        Login
                    </Typography>
                    <form >
                        <div className="form-floating login-box  mb-3" >
                            <TextField required id="outlined-basic" label="Email" variant="outlined" sx={{ width: '15em' }}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className="form-floating  mb-3">

                            <TextField required id="outlined-basic" label="Password" variant="outlined"
                                sx={{ width: '15em' }}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}

                            />
                        </div>
                        <div className='for-crt-link mb-3'>
                            <Link style={{ textDecoration: 'none', color: '#4481eb' }} to='/forgetpassword'>Forget password?</Link>
                        </div>
                        <div className="d-grid">
                            <Button variant='contained' color='primary'
                                onClick={(e) => loginVerify(e)} sx={{ backgroundColor: "#4481eb" }}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login