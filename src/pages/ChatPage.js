import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { Avatar, Box, Button, Icon } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { setOpenConversation } from '../redux/data';
import allowedOrigin from '../config/alowedOrigins';

const ChatPage = () => {
    const {id} = useParams()
    const messageRef = useRef()

    const dispatch = useDispatch()

    const myUser = useSelector(store => store.data.value.myUser)
    const users = useSelector(store => store.data.value.allUsers)
    const openConversation = useSelector(store => store.data.value.openConversation)

    const sendMessage = () => {
        const user = {
            id,
            username: myUser.username,
            secret: myUser.secret,
            photo: myUser.photo,
            message: messageRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`${allowedOrigin}/sendMessage`, options)
            .then(res => res.json())
            .then(data => {
                dispatch(setOpenConversation(data.conversation))
                messageRef.current.value = ''
            })
    }

    useEffect(() => {

        fetch(`${allowedOrigin}/chat/`+id)
            .then(res => res.json())
            .then(data => {
                dispatch(setOpenConversation(data.conversation))
            })
    }, [dispatch, id])
 

    const like = (index) => {
        fetch(`${allowedOrigin}/like/${id}/${index}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setOpenConversation(data.conversation))
            })

    }

    const convertTime = (stamp) => {
        const date= new Date(stamp);

        return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
    }

    const getUserPhoto = (secret) => {
        const user = users.find((user) => user.secret === secret)
        return user?.photo
    }
    const getUserUsername = (secret) => {
        const user = users.find((user) => user.secret === secret)
        return user?.username
    }

    return (
        <div className="d-flex j-center">

            <Box className="container d-flex column chatWindow">

                <Box className="grow1 chatTable">
                    {openConversation?.messages.map((x, i) => <Box key={i} display={'flex'} alignItems={x.secret === myUser.secret ? 'end' : 'start'} flexDirection={'column'} gap={'3px'} marginBottom={3}>
                        {
                            x.secret === myUser.secret ? 
                        <Box display={'flex'} alignItems={'center'} gap={1}>
                        <Box>{convertTime(x.time)}</Box>   
                        <strong>{getUserUsername(x.secret)}</strong>    
                        <Avatar variant='rounded' src={getUserPhoto(x.secret)} alt={getUserUsername(x.secret)}></Avatar>
                        </Box> : 
                        <Box display={'flex'} alignItems={'center'} gap={1}>
                        <Avatar variant='rounded' src={getUserPhoto(x.secret)} alt={getUserUsername(x.secret)}></Avatar>
                        <strong>{getUserUsername(x.secret)}</strong>
                        <Box>{convertTime(x.time)}</Box>
                        </Box>
                        }
                        
                        
                        <Box 
                        display={'flex'} 
                        padding={2}
                        whiteSpace={'wrap'} 
                        backgroundColor={x.secret === myUser.secret ? 'green' : 'blue'} 
                        borderRadius={1} sx={{color: 'white', overflowWrap: 'anywhere'}}>
                            {x.message.includes("http") ? <img className="chatImage" src={x.message} alt=""/> : x.message}
                        </Box>
                        <Box >
                        {x.secret === myUser.secret ? 
                        <Box className="d-flex" alignItems={'center'}>
                            <Box paddingLeft={1}>{x.likes}</Box>
                            <Button disabled={true}><Icon fontSize='small'><ThumbUpAltIcon padding={'0px'}></ThumbUpAltIcon></Icon></Button>
                        </Box>
                         : 
                         <Box className="d-flex" alignItems={'center'}>
                            <Button sx={{fontSize: '1.6rem'}} className="ml-3" onClick={() => like(i)}>
                            <Icon sx={{padding: 0}} fontSize='small'><ThumbUpAltIcon ></ThumbUpAltIcon>
                            </Icon></Button> 
                            <Box paddingRight={1}>{x.likes}</Box>
                         </Box>
                        }
                            
                        </Box>
                    </Box>)}
                </Box>

                <Box className="chatBottom" display={'flex'} gap={1} marginBottom={1} paddingTop={1}>
                    <input style={{borderRadius: '5px'}} type="text" ref={messageRef} placeholder="Write message..."/>
                    <Button variant='contained' color='success' onClick={sendMessage}>Send</Button>
                </Box>

            </Box>

        </div>
    );
};

export default ChatPage;