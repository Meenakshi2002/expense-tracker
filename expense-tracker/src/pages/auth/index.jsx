import {signInWithPopup} from 'firebase/auth'
import {auth,provider} from "../../config/firebase-config"
import {useNavigate} from "react-router-dom" // navigate pages


export const Auth =()=>{
    const navigate= useNavigate()

    const authFunc = async () =>{
        const results = await signInWithPopup(auth,provider) ;
        console.log(results);

        const authInfo ={
            userID: results.user.uid,
            name : results.user.displayName,
            profilePic : results.user.photoURL,
            isAuth : true
        }
        localStorage.setItem("auth",JSON.stringify(authInfo))
        navigate("/expense-tracker")

    }
    //local storage can only have strinf,bool,nums . 
    //auth here is obj so we will convert it to string and change to obj whereever necessary
    //so crct way for this will be to use cookies instead of localstorage. 

    return (<div className="login-page"> 
<p> Sign In With Google </p>
<button className="login-btn" onClick={authFunc} > Sign In</button>

    </div>);
};