import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ReducerState = {
    role: string | null;
    email: string| null;  
    name: string| null;  
    quota: number|null;
   };
   
   const initialState: ReducerState = {
     role: null,
     email:null,     
     name:null, 
     quota:null
   };
   

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    storeUserRole: (state,action: PayloadAction<string | null>) => {
      state.role=action.payload 
    },
    storeUserEmail: (state,action: PayloadAction<string | null>) => {
        state.email=action.payload 
    },
    storeUserName: (state,action: PayloadAction<string | null>) => {
        state.name=action.payload 
    },
    storeUserQuota: (state,action: PayloadAction<number| null>) => {
      state.quota=action.payload 
  },
  },
})

export const {storeUserRole, storeUserEmail, storeUserName ,storeUserQuota} = userRoleSlice.actions

export default userRoleSlice.reducer