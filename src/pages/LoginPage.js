import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {setUser} from "../redux/data";
import { TextField, Box, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setAllUsers } from '../redux/data';
import allowedOrigin from '../config/alowedOrigins';

const LoginPage = () => {
    const nameRef = useRef()
    const passwordRef = useRef()

    const nav = useNavigate()
    const dispatch = useDispatch()

    const fetchAllUsers = () => {
        
        fetch(`${allowedOrigin}/allUsers`)
        .then(res => res.json())
        .then(data => {
            dispatch(setAllUsers(data.users))
        }) 
    }
    

    function auth() {
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`${allowedOrigin}/login`, options)
            .then(res => res.json())
            .then(data => {
                if( data.success === true ) {
                    dispatch(setUser({
                    secret: data.secret,
                    username: data.username,
                    photo: data.photo,
                    password: user.password
                }))
                fetchAllUsers()
                nav('/profile')
            }
                else alert(data.message)
            })
    }

    return (
        
    <Box display={'flex'} justifyContent={'center'}>
        <Card sx={{ padding: '20px', alignItems: 'center'}}>
           <Box display={'flex'} flexDirection={'column'} gap={1} width={300}>
            <TextField id="outlined-basic" label="Username" variant="outlined" size='small' inputRef={nameRef}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" size='small' inputRef={passwordRef} type='password'/>
            <Button variant='contained' color='success' onClick={auth}>Login</Button>
            </Box> 
        </Card>
    </Box>
        
    );
};

export default LoginPage;