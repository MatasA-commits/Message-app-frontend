import React, { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import SingleUserCard from "../components/SingleUserCard";
import { setAllUsers } from '../redux/data';
import { Box } from '@mui/material';
import allowedOrigin from '../config/allowedOrigins';

const AllUsersPage = () => {
    const users = useSelector(state => state.data.value.allUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`${allowedOrigin}/allUsers`)
        .then(res => res.json())
        .then(data => {
            dispatch(setAllUsers(data.users))
        }) 
    }, [])
        

    return (
        <Box className="d-flex flex-wrap" margin={3}>
            {users.map( (x, i) => <SingleUserCard user={x} key={i}/>)}
        </Box>
    );
};

export default AllUsersPage;