import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getme } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handleLogin= async ({email, password})=>{
        setLoading(true)
        try{
            const response = await login(email, password)
            console.log(response);
            
        setUser(response.user)
        return true
        } catch (error) {
            console.log(error)
            return false
            
        }
        finally{
            setLoading(false)
        }
    }


    const handleRegister= async ({username, email, password})=>{
        setLoading(true)
        try{
            const response = await register(username, email, password)
        setUser(response.user)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout= async ()=>{
        setLoading(true)
        try{const response = await logout()
        setUser(null)}
        catch(err){
            console.log(err)
        }
        finally{setLoading(false)}
    }


    useEffect(() => {
    const getAndSetUser = async () => {
        try {
            const data = await getme();

            if(data?.user){
                setUser(data.user);
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    getAndSetUser()
}, [])

    return {user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout}
}