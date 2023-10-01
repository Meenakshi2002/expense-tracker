import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo"

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transaction");//collec name in firebase db
    const {userID}= useGetUserInfo();


  const addTransaction = async ({description,transactionAmount,transactionType}) => {
    // uses firebase so hafto be async
    await addDoc(transactionCollectionRef,{
        userID,
        description,
        transactionAmount ,
        transactionType,
        createdTime: serverTimestamp()

    });
  };

  return { addTransaction };
};
