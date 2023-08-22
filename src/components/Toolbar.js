import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { Button, Avatar, Box } from '@mui/material';

const Toolbar = () => {
    const user = useSelector(store => store.data.value.myUser)

    const nav = useNavigate()


    return (
        
        <Box className="d-flex space-btw toolbar" boxShadow={3}>
            <Box className="d-flex">
                <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color='info'>Login</Button></Link>
                <Link to="/register" style={{ textDecoration: 'none' }}><Button variant="contained" color='info'>Register</Button></Link>
                {user?.secret && <><Link to="/allUsers" style={{ textDecoration: 'none' }}><Button variant="contained" color='info'>All Users</Button></Link>
                <Link to="/conversations" style={{ textDecoration: 'none' }}><Button variant="contained" color='info'>Messages</Button></Link>
                </>}
                
            </Box>


            <Box  className='d-flex' onClick={() => nav('/profile')} height={70} alignItems={'center'} >
                {user?.username &&
                        <Avatar  variant='rounded' sx={{width: 60,cursor: 'pointer', height: 60}} src={user.photo} alt={user.username} ></Avatar>
                
                    
                   }
            </Box>

        </Box>
    );
};

export default Toolbar;