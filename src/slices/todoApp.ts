import { v4 as uuidv4 } from 'uuid';
import { createSlice } from "@reduxjs/toolkit"
import { infoType } from '../todo.modal';

const initialState: infoType[] = [
    {
        id: 1,
        text: 'Do Something'
    },
    {
        id: 2,
        text: 'Hello Task'
    }
]

const todoApp = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        dataRead: (action) => {
            return action.payload;
        },
        add: (state, action) => {
            const newTodo: infoType = { id: uuidv4(), text: action.payload };
            state.push(newTodo);
        },
        delText: (state, action) => {
            return state.filter(p => p.id != action.payload);
        },
        edit: (state, action) => {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, text: action.payload.text }
                } else {
                    return item;
                }
            })
        }
    }
})

export default todoApp.reducer;
export const { add, delText, edit, dataRead } = todoApp.actions;