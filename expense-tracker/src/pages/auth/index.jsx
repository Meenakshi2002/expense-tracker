import {signInWithPopup} from 'firebase/auth'
import {auth,provider} from "../../config/firebase-config"
import {useNavigate} from "react-router-dom" // navigate pages
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import "./styles.css"

import { Navigate } from 'react-router-dom'

export const Auth =()=>{
    const navigate= useNavigate()
    const {isAuth}= useGetUserInfo
    const authFunc = async () =>{
        const results = await signInWithPopup(auth,provider) ;
        console.log(results);

        const authInfo ={
            userID: results.user.uid,
            name : results.user.displayName,
            profilePhoto : results.user.photoURL,
            isAuth : true
        }
        localStorage.setItem("auth",JSON.stringify(authInfo))
        navigate("/expense-tracker")

    }
    //local storage can only have strinf,bool,nums . 
    //auth here is obj so we will convert it to string and change to obj whereever necessary
    //so crct way for this will be to use cookies instead of localstorage. 
    if(isAuth){
       return <Navigate to="/expense-tracker"/>
    } //on closing if already logged in instead of leading to sign in pg itll directly go to expense
   

    return (<div className="login-page"> 
<p> Sign In With Google </p>
<button className="login-btn" onClick={authFunc} > Sign In</button>

    </div>);
};