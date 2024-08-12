import { Outlet,Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function GuestLayout(){
const {token} =useStateContext();
console.log(token);
if(token){
  return <Navigate to="/"/>
}
    return(
      <div>
        <Outlet/>
      </div>
    )
} 