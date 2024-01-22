import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
// import ApiService from '../../common/ApiService';
// import { UserDetailContext } from './UserDetailContext';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ForgetPass.css'
import ForgetPassImg from '../../assets/9712739_4140043.svg'
import { ForwardToInbox } from '@mui/icons-material';
import ApiService from '../../Common/ApiService';
function ForgetPass() {

    // const { mail, setMail } = useContext(UserDetailContext)
    const [mail, setMail] = useState("");
    const mailSend = async () => {
        try {
            if (mail !== "") {
                console.log("enter  into fun ");
                const res = await ApiService.post('/forgetpass', { email: mail })
                console.log(res.data);
                if (res.status === 200) {
                    toast.success('check your mail')
                }
            } else {
                toast.error('please enter your mail')
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('Invalid mail')
            } else {
                toast.error(error.response.data.message);
                // console.log(error);
            }
        }
    }
    return (
        <>
            <div className='forgetPass'>
                {/* */}
                <div className='forgetPass-l'> 
                <img className='forPassImg' src={ForgetPassImg}/>
                </div>
                <div className='forgetPass-r'>
                <h1
                    // component='h4'
                    // color={'#ffff'}
                    // sx={{
                    //     bgcolor: 'black', width: '10rem', display: 'flex',
                    //     borderRadius: '.2rem', justifyContent: 'center', height: '3rem', alignItems: 'center'
                    // }}
                >
                    Forget Password
                </h1>
                     <TextField sx={{ m: 1, width: '15rem' }}
                        required id="outlined-basic" label="Mail" variant="outlined"
                        value={mail} name='Mail' onChange={(e) => setMail(e.target.value)}
                    />
                    <Button onClick={() => {mailSend()}}
                        variant='contained'
                        // color=''
                    >
                        send &nbsp;<ForwardToInbox/>
                        {/* <SendIcon /> */}
                    </Button> 
                </div>

            </div>

        </>
    )
}

export default ForgetPass