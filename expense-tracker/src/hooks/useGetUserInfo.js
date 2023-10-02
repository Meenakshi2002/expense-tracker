// in useraddtransac.js we have params like userid etc. 
//it cant be passed as obj so hafto to convert . since its tedious process 
// using this to have a compact way of getting user infor 

export const useGetUserInfo = () =>{

    const {userID, name, profilePhoto, isAuth} = JSON.parse(localStorage.getItem("auth")) //turns stringified obj to obj
    return {userID, name, profilePhoto, isAuth}

}