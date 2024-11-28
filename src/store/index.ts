import { configureStore } from "@reduxjs/toolkit";
import todoApp from '../slices/todoApp'

const store = configureStore({
    reducer: {
        todo: todoApp
    }
})

export default store;