import {createSlice} from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            myUser: null,
            allUsers: [],
            conversations: [],
            openConversation: {
                messages: [],
                participants: []
            },
            openUser: null
        }
    },
    reducers: {
        setAllUsers: ({value}, {payload}) => {
            value.allUsers = payload
        },
        setUser: ({value}, {payload}) => {
            value.myUser = payload
        },
        setConversations: ({value}, {payload}) => {
            value.conversations = payload
        },
        setOpenConversation: ({value}, {payload}) => {
            value.openConversation = payload
        },
        setOpenUser: ({value}, {payload}) => {
            value.openUser = payload
        },

    }
})



export const {
    setAllUsers,
    setUser,
    setConversations,
    setOpenConversation,
    setOpenUser
} = dataSlice.actions

export default dataSlice.reducer;