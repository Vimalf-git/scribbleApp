import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { jwtDecode } from 'jwt-decode';
import { Close, Description, Home, Logout, LunchDining } from '@mui/icons-material';
import './SideBar.css'
import { toast } from 'react-toastify';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function Sidebar() {
    let navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear()
        toast.warning("Logout")
        navigate('/login')

    }
    const [name, setName] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setName(jwtDecode(token).username)
    }, [])
    const [burgerToggle, setBurgerToggle] = useState(false);
    return (
        <>
            <div className='sidebar'>

                <p className='appName' style={{ color: "#203562", cursor: 'pointer', marginTop: '2em' }}
                    onClick={() => { navigate('/notescontent') }}>Notes App</p>
                <div className='nameActiveSec'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"

                    >
                        <Avatar className='avatarIcon'>{name.charAt(0) + name.charAt(1)}</Avatar>
                    </StyledBadge>
                    <span className='list-data-con'>{name}</span>
                </div>
                <div className='navLink'>
                    <Link to={'/notescontent'}><Home className='homeIcon' />Home</Link>
                    <Link className='' variant='contained' to={"/notesCard"}>
                        <Description className='descIcon' />Notes
                    </Link>
                </div>
                <Button className='logoutBtn' onClick={() => { logout()}}><Logout className='logoutIcon' />Logout</Button>
            </div>
            <div className='mobileViewSideBar'>
                <h1 style={{ color: "#203562", cursor: 'pointer', marginLeft: '2rem' }} onClick={() => { navigate('/notescontent') }}>Notes App</h1>
                <div className='burgerIcon'>
                    <span onClick={() => setBurgerToggle(prev => !prev)}>
                        {burgerToggle ?
                            <Close style={{ color: "red", fontSize: '2.5em' }} /> :
                            <LunchDining style={{ fontSize: '2.5em' }} />}</span>
                </div>
                {burgerToggle ?
                    <div className='burgerBox'>
                        <div className='avatarMbV'>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar>{name.charAt(0) + name.charAt(1)}</Avatar>
                            </StyledBadge>
                            <span style={{ color: '#fff', fontFamily: 'Montserrat' }}>{name}</span>
                        </div>
                        <Link to={'/notescontent'} onClick={() => { setBurgerToggle(pre => !pre) }}><Home />Home</Link>
                        <Link className='' variant='contained' to={"/notesCard"} onClick={() => { setBurgerToggle(pre => !pre) }}>
                            <Description />Notes
                        </Link>
                        <Button className='logoutBtnMV' onClick={() => { logout() }}><Logout />Logout</Button>
                    </div> : ""}
            </div>
        </>
    )
}

export default Sidebar