import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AppContext = createContext(undefined)

export function AppContextProvider({children}){
    
    // Auth state 
    const [user ,setUser] = useState(null)
    const [loadinguser , setLoadinguser] = useState(true);

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

    return(
        <AppContext.Provider value={{user , loadinguser}}>
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