import React from 'react';
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { Box, Button } from '@mui/material';


const SingleConversatonCard = ({item, delFunction}) => {

    const nav = useNavigate()
    const myUser = useSelector(store => store.data.value.myUser)
    const users = useSelector(store => store.data.value.allUsers)

    const navigateToChat = () => {
        
        nav("/chat/"+item._id)
    }

    const getUsername = () => {
        const [secret] = item.participants.filter(x => x !== myUser.secret)
        const filtered = users.filter((user) => user.secret === secret)
        return filtered[0].username
    }

    return (
        <Box className="conversationCard d-flex space-btw" boxShadow={2} onClick={navigateToChat}>
            <p><strong>{getUsername()}</strong></p>
            
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
               <p>Messages: {item.messages.length}</p>
               <Button variant='contained' color='error' size='small' onClick={(event) => {
                event.stopPropagation()
                delFunction(item._id)}}>Delete</Button> 
            </Box>
        </Box>
    );
};

export default SingleConversatonCard;