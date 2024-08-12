import axios from "axios";
// Create an Axios instance

const axiosClient=axios.create({
    // baseURL:"http://127.0.0.1:8000/api/"
    baseURL: `${process.env.VITE_API_BASE_URL}/api`,
    //  to prevent accidentally leaking env variables to the clients,only variable prefixed with_VITE are exposed to your vite-processed code
});

// one of the most powerfull feature of axiosClient is its ability to intercept request and modify them before they are sent especially authentication token
// Set up the request interceptor
axiosClient.interceptors.request.use((config)=>{
     // Retrieve the token from localStorage
    const token = localStorage.getItem('ACCESS_TOKEN');
      // If the token exists, add it to the Authorization header
    config.headers.Authorization=`Bearer ${token}` 
    // Return the modified config
    return config;
});
// The below code sets up an Axios response interceptor that handles successful responses and errors.
// Specifically, it checks if the error response has a status code of 401 (Unauthorized) and, 
// if so, removes the ACCESS_TOKEN from localStorage. 
// Set up the response interceptor
axiosClient.interceptors.response.use(
    (response)=>{
       // Return the response as is for successful responses
        return response;
    },
    (error)=>{
      try{
        const {response}= error;
         // Check if the response status is 401 (Unauthorized)
        if(response.status === 401){
             // Remove the token from localStorage
        localStorage.removeItem('ACCESS_TOKEN')
        }
     
      }
      catch(e){
        console.log(e);
    }

      throw error;
    }
);
export default axiosClient; 
