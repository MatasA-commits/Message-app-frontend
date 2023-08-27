import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import SingleConversatonCard from "../components/SingleConversatonCard";
import { setConversations } from '../redux/data';
import { Box } from '@mui/material';
import allowedOrigin from '../../config/alowedOrigins';

const ConversationPage = () => {

    const myUser = useSelector(store => store.data.value.myUser)
    const conversations = useSelector(store => store.data.value.conversations)

    const dispatch = useDispatch()

    const fetchConversationData = () => {
        const data = {
            secret: myUser.secret,
            username: myUser.username,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`${allowedOrigin}/getConversations`, options)
            .then(res => res.json())
            .then(data => {
                dispatch(setConversations(data.conversations))
            })
    }
    
    const deleteConversation = (id) => {
        fetch(`${allowedOrigin}/deleteConversation/`+id)
            .then(res => res.json())
            .then(data => {
                if(data.success !== true) alert('Error, failed to delete')
            })
            fetchConversationData() 
    }



    useEffect(() => {
        fetchConversationData()
    }, [])


    return (
        <Box className="d-flex j-center" sx={{cursor: 'pointer'}}>

            <Box className="container">
                {conversations.map((x, i) => <SingleConversatonCard item={x} delFunction={(id) => deleteConversation(id)} key={i}/>)}
            </Box>


        </Box>
    );
};

export default ConversationPage;