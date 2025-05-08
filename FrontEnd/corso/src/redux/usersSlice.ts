import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: [
            {
            id: 0,
            name:  "matteo",
            crediti: "1000",
            emissioni: "100",
            },
            {
            id: 1,
            name: "luca",
            crediti: "1000",
            emissioni: "100",
            },
            {
            id: 2,
            name: "francesco",    
            crediti: "1000",
            emissioni: "100",
            },
            {
            id: 3,
            name: "giovanni",
            crediti: "1000",
            emissioni: "100"
            },
            {
            id: 4,
            name: "alessandro",
            crediti: "1000",
            emissioni: "100"
            },
        ]
    },
    reducers: {
        addUser: (state, action) => {
            state.value.push({
                id: state.value.length,
                name: action.payload,
                crediti: '1000',
                emissioni: '100',
            });
        },
        removeUser: (state, action) => {
            state.value = state.value.filter(user => user.name !== action.payload);
        },
    },
});
export const { addUser, removeUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;