import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    comment: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addToComment: (state, action) => {
            state.comment.push(action.payload)
        }
    }
})

export const {
    addToComment
} = commentSlice.actions;

export default commentSlice.reducer