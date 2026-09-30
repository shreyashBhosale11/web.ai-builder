import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = createContext(undefined)

export function AppContextProvider({children}){

    const navigate = useNavigate()
    
    // Auth state 
    const [user ,setUser] = useState(null)
    const [loadinguser , setLoadinguser] = useState(false);

    // Auth Action 
    const checkSession = async() =>{
       try {
            const {data } = await api.get("/api/auth/me");
            setUser(data.user)
       } catch (error) {
            setUser(null)
        
       }finally{
        setLoadinguser(null)
       }
    }

    useEffect(( )=>{
        checkSession()
    } , 
    [checkSession])
 
    const login = async (email , password) =>{
        try {
            const {data} = await api.post("/api/auth/login" , {email , password});
            setUser(data.user)
            toast.success("Wellcome Back")
            navigate9("/")
            
        } catch (err) {
            console.error("Login failure :" , err);
            const errMsg = err?.response?.data?.error || "Invalid email or password"
            toast.error(errMsg);
            throw new Error(errMsg)
            
        }
    }

    const register = async (name ,email , password) =>{
        try {
            const {data} = await api.post("/api/auth/register" , {name , email , password});
            setUser(data.user)
            toast.success("Account created sucessfully!")
            navigate9("/")
            
        } catch (err) {
            console.error("Registration failed :" , err);
            const errMsg = err?.response?.data?.error || "Registration failed"
            toast.error(errMsg);
            throw new Error(errMsg)
            
        }
    }

    return(
        <AppContext.Provider
         value={{user , loadinguser ,login ,register}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext);
    if(context == undefined){
        throw new Error("useAppContext must be used within an AppContextProvider")
    }

    return context;
}