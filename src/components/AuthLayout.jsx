import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected({children,authentication = true}) {
    const navigate = useNavigate();
    const [loader,setLoader]  = useState(true);
    const authStaus = useSelector(state => state.auth.status)

    useEffect(() => {
        /**
        authentication={true} (The Default - for Protected Routes)
        This is for pages that a user must be logged in to see (e.g., Profile, Settings, Create Post).
        The code checks: if (authentication && authStatus !== authentication), which becomes if (true && userIsNotLoggedIn).
        If the user is not logged in, they are redirected to the /login page.
        If the user is logged in, the component does nothing and shows the children (the protected page). 
        **/
      if(authentication && authStatus !== authentication){
        navigate("/login")
      }
       /**
        authentication={false} (For Public Routes)
        This is for pages that a logged-in user should not see (e.g., the Login page, the Signup page).
        The code checks: else if (!authentication && authStatus !== authentication), which becomes else if (true && userIsLoggedIn).
        If the user is already logged in, they are redirected to the home page (/).
        If the user is not logged in, the component does nothing and shows the children (the login or signup page).
        **/
      else if(!authentication && authStaus !== authentication){
        navigate("/")
      }
        setLoader(false)  
    }, [authStaus,navigate,authentication])
    
    return loader ? <h1>Loading...</h1> : <>{children}</>
  
}
/** 
The AuthLayout.jsx component you have is designed to be a single, reusable solution for both scenarios. It centralizes the authentication logic.

Instead of writing if statements on every page, you just wrap the page in the Protected component and tell it what kind of protection you need:

For the Profile page:

<Protected authentication={true}>
  <Profile />
</Protected>
This tells the component: "Authentication is required for this page."

For the Login page:

<Protected authentication={false}>
  <Login />
</Protected>
This tells the component: "Authentication is not allowed for this page."

This approach is considered an industry standard because it's:

Declarative: You declare the desired authentication state for a route right where you define the route.
Reusable: You use the same component everywhere, just with a different prop.
Maintainable: If you need to change your authentication logic (e.g., add a redirect to a different page), you only have to change it in one place (AuthLayout.jsx).
So, while you could use direct checks, the current implementation is a more robust and scalable solution that you'll find in many professional React applications. 
**/