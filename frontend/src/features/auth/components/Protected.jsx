import {useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";

const Protected = ({children}) => {

    const {loading, user} = useAuth()
    

    if(loading ) {
        return <LoadingScreen message="Checking your session" />
    }

    if(!user) {
        return <Navigate to={"/login"}/>
    }

    console.log(user)

  return children
}

export default Protected
