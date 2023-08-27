import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, Button, Box } from '@mui/material'
import { setOpenUser } from '../redux/data'
import allowedOrigin from '../config/allowedOrigins'

const SingleUserProfilePage = () => {
  const dispatch = useDispatch()


  const myUser = useSelector(state => state.data.value.myUser)
  const user = useSelector(state => state.data.value.openUser)
  const {username} = useParams()
  
  useEffect(() => {
    const data = {
      username
    }

    const options = {
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify(data)
  }

  fetch(`${allowedOrigin}/singleUser`, options)
            .then(res => res.json())
            .then(data => {
              dispatch(setOpenUser(data))
            })
  }, [dispatch, username])


      const convo = () => {
        const data = {
            secret: myUser.secret,
            from: myUser.secret,
            to: user.secret
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`${allowedOrigin}/newConversation`, options)
            .then(res => res.json())
            .then(data => {
            })
    }
  return (
    <>
    {user && <Box display={'flex'} justifyContent={'center'}>
      <Card sx={{ padding: '20px', alignItems: 'center'}}>
            <div className='d-flex mb-1 column'>
              <h2 className='m-1'>{user.username}</h2>
                <img src={user.photo === '' ?  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : user.photo} alt={user.username} className='profileImg'></img>
            
            </div>
            <Box display={'flex'} justifyContent={'center'}>
              {user.username !== myUser.username ? <Button size='small' variant='contained' color='primary' onClick={convo}>Send message</Button> : ''}
            
            </Box>
            </Card>
        </Box>}
    </>
  )
}

export default SingleUserProfilePage