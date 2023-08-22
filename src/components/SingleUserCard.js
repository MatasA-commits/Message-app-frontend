import React from 'react';
import { Avatar, Card, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SingleUserCart = ({user}) => {
    const nav = useNavigate()

    const viewProfile = () => {
        nav('/userProfile/' + user.username)
    }


    return (
        <Card className='userCard' onClick={viewProfile} sx={{cursor: 'pointer' }}>
            <Box className='d-flex'>
                <Avatar variant='rounded' src={user.photo} alt={user.username}></Avatar>
            <p className='m-1'>{user.username}</p>
            </Box>
        </Card>
    );
};

export default SingleUserCart;