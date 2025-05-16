import { create } from 'zustand'
import axios from 'axios'

const USER_API_URL = "http://localhost:5000/api/auth"


axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({

    user:null,
    isAuthenticated:false,
    isCheckingAuth:true,
    error:null,
    message:null,
    isLoading: false,
    
    signup: async (email, password, username)=> {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${USER_API_URL}/signup`, {email, password, username});
            set({isLoading:false, user:response.data.user, isAuthenticated:true})
            
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading:false})
            throw error
        }
    },

    verifyEmail: async (otp)=> {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${USER_API_URL}/verify-email`, {otp})
            set({isLoading:false, user:response.data.user, isAuthenticated:true})
        } catch (error) {
            set({isLoading:false, error:error.response.data.message || "Error verifying email"})
            throw error;
        }
    },

    login: async (email, password) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${USER_API_URL}/login`, {email, password})
            set({isAuthenticated:true, error:null, user:response.data.user, isLoading:false})
        } catch (error) {
            set({error:error.response?.data?.message || "Error logging in", isLoading:false})
            throw error;
        }
    },

    logout: async ()=> {
        set({isLoading:true, error:null})
        try {
            await axios.post(`${USER_API_URL}/logout`)
            set({isLoading:false, error:null, user:null, isAuthenticated:false})
            
        } catch (error) {
            set({error:error.response.data.message || "Error logging out", isLoading:false})
            throw error;   
        }
    },

    checkAuth: async ()=> {
        set({isCheckingAuth:true, error:null})
        try {
            const response = await axios.get(`${USER_API_URL}/check-auth`);
            set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false})
        } catch (error) {
            set({ error:null, isCheckingAuth:false, isAuthenticated:false})
        }
    }

}))
