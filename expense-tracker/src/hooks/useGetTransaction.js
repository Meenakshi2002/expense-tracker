import { useEffect, useState } from "react"
import {useGetUserInfo} from "./useGetUserInfo"
import {query,collection, orderBy,where, onSnapshot} from "firebase/firestore"
import {db} from "../config/firebase-config"

export const useGetTransaction = () => {
    const [transactions,setTransactions]= useState([])
    const [transactionsTotal,setTransactionsTotal]= useState({balance:0.0 , income: 0.0, expenses : 0.0})
    let unsubscribe;
    const transactionCollectionRef = collection(db, "transaction");
    const {userID}= useGetUserInfo();
    const getTransaction = async() =>{ 
        try{

            const queryTransactions = query(transactionCollectionRef, 
                where("userID","==", userID ),
                orderBy("createdAt")
               )

               unsubscribe = onSnapshot (queryTransactions, (snapshot)=>{ //itll track for query if ther r changes. snapshot var has data we get back from cur snapshot
                let docs = []
                let totalIncome =0
                let totalExpenses =0 
                snapshot.forEach( (doc)=>{
                    const data= doc.data()
                  
                    const id= doc.id
                    console.log(id)

                    docs.push({ ...data , id})
                    console.log(`${data} is the data`)
                    if(data.transactionType === "expense"){
                        totalExpenses+= Number(data.transactionAmount) 
                    }
                    else{
                        totalIncome+= Number(data.transactionAmount)
                    }
                })

                setTransactions(docs)
                let balance = totalIncome-totalExpenses
                setTransactionsTotal({
                    balance ,
                   income: totalIncome,expenses:totalExpenses}
                )
                console.log(docs)

               })


        }
        catch(err){
            console.error(err)
        }
        return () => unsubscribe();
    }


    useEffect(()=>{
        getTransaction()
    },  [])
    console.log({transactions})
    return {transactions,transactionsTotal}
}

//we r using this func then passing it to use eff instead of writing logic 
// in use eff cuz firebase shld have async and useeff cant have async fn
// plus we can abstract the logic 