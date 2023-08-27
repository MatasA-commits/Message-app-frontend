import React, {useRef} from 'react';
import { Box, TextField, Button, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAllUsers } from '../redux/data';
import allowedOrigin from '../config/allowedOrigins';

const ProfilePage = () => {
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordTwoRe = useRef()
    const photoRef = useRef()

    const dispatch = useDispatch()
    const myUser = useSelector(state => state.data.value.myUser)

    const setUsers = () => {
        fetch(`${allowedOrigin}/allUsers`)
            .then(res => res.json())
            .then(data => {
                dispatch(setAllUsers(data.users))
            })
    }

    function auth() {
        const user = {
            secret: myUser.secret,
            username: nameRef.current.value,
            password: passwordRef.current.value,
            photo: photoRef.current.value
        }

        if(user.password !== passwordTwoRe.current.value) return alert("Error, passwords must match")
        if(user.password.length < 4 || user.password.length > 20) return alert("Password must be between 4 and 20 characters long")
        if(!/[A-Z]/.test(user.password)) return alert("Password must have upper case letter")
        if(!/[!@#$%^&*_+]/.test(user.password)) return alert ("Password must contain atleast one special character")

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`${allowedOrigin}/update`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    dispatch(setUser(user))
                    setUsers()
                 }
                else alert(data.message)
            })

            
    }

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Card sx={{ padding: '20px', alignItems: 'center'}}>
            <Box display={'flex'} flexDirection={'column'} gap={1} justifyContent={'center'} width={300}>
                <TextField id="outlined-basic" label="Username" variant="outlined" size='small' inputRef={nameRef} defaultValue={myUser.username}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" size='small' inputRef={passwordRef} defaultValue={myUser.password}/>
                <TextField id="outlined-basic" label="Password repeat" variant="outlined" size='small' inputRef={passwordTwoRe} defaultValue={myUser.password} type='password'/>
                <TextField id="outlined-basic" label="Photo link" variant="outlined" size='small' inputRef={photoRef} defaultValue={myUser.photo}/>
                <Button variant='contained' color='success' onClick={auth}>Save</Button>
            </Box>
           </Card> 

        </Box>
            
    );
};

export default ProfilePage;