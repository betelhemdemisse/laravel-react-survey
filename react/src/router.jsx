import { createBrowserRouter,Navigate } from "react-router-dom";
import App from "./App";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import User from "./views/users";
import DefaultLayout from "./components/DefaultLayout";
const router =createBrowserRouter([
      
       {
    path:'/',
   element:<DefaultLayout/>,
   children:[
    {
        path:'/',
        element:<Navigate to="/user"/>
    },
   
   {
    path:'/dashboard',
    element:<Dashboard/>
   },
   {
    path:'/user',
    element:<User/>
   }, 
],

   },
   {
    path:'/',
    element:<GuestLayout/>,
    children:[
        {
            path:'/login',
            element:<Login/>
           },
           {
            path:'/signup',
            element:<Signup/>
           }
    ]
   }
]);
export default router;