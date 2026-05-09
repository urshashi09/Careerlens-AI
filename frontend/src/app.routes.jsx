import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/report/pages/home.jsx";
import FinalReport from "./features/report/pages/FinalReport.jsx";


export const router= createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/",
  element: <Protected><Home/></Protected>,
    },

    {
        path:"/report/:id",
        element: <Protected><FinalReport/></Protected>,
    }
])