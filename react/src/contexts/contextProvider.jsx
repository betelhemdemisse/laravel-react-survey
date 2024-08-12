import { createContext ,useContext,useState } from "react";

// Creating the context with default values
const StateContext = createContext({
  user: null,
  token: null,  
  setUser:()=>{},
  setToken:()=>{},
});
export const ContextProvider = ({ children }) => {
 // Creating state for user and token
  const [user,setUser] = useState({});

 const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
 // Function to set token and manage localStorage
 const setToken =(token)=>{
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN',token); 
    }
    else{
        localStorage.removeItem('ACCESS_TOKEN')
    }

 }
 // Providing context values to children components
    return (
    <StateContext.Provider value={{user,token ,setUser,setToken}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext)