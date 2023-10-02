import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransactions";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
export const Expense = () => {
    const {addTransaction} = useAddTransaction()
    const {transactions,transactionsTotal} = useGetTransaction()
    const {name,profilePhoto}= useGetUserInfo()
    const navigate= useNavigate()
    
    const[description,setDescription] = useState("")
    const[transactionAmount,setTransactionAmount] = useState(0)
    const[transactionType,setTransactionType] = useState("expense")
    
    const {balance,income,expenses}= transactionsTotal
    
    const onSubmit =  (e) =>{
        e.preventDefault()
        addTransaction({description,
            transactionAmount ,
            transactionType})
       setDescription("")
        setTransactionAmount("")     
    }
    const signUserOut =async()=>{
      try{
        await signOut(auth)
        localStorage.clear()
        navigate("/")
      } catch(err){
        console.error(err)
      }
      
    }
    return (
    <>
    
      <div className="expense-tracker">
        <div className="container">
          <h1> {name} 's Expense Tracker </h1>
          <div className="balance">
            <h3> Your balance 
            {balance>=0 ? (<h2>Rs {balance}</h2>) : (<h2>-Rs {balance * -1}</h2>)} 
           {/* if not *1 itll make -rs-amt (- is neg) */}
            </h3> 
          </div>  
          <div className="summary ">
            <div className="income">
              <h4> Income </h4>
              <p>Rs {income}</p>
            </div>
            <div className="expenses">
              <h4> Expense </h4>
              <p>Rs {expenses}</p>
            </div>
          </div>

          <form className="add-transac" onSubmit={onSubmit}>
            <input type="text" placeholder="Description" required 
            onChange={(e)=> setDescription(e.target.value)} value={description}/>

            <input type="number" placeholder="Amount" required
            onChange={(e)=> setTransactionAmount(e.target.value)} value={transactionAmount}/>

            <input type="radio" id="income" value="income" required checked={transactionType==="income"}
            onChange={(e)=> setTransactionType(e.target.value)}/>
            <label htmlFor="income">Income </label>
            <input type="radio" id="expense" value="expense" required checked={transactionType==="expense"}
             onChange={(e)=> setTransactionType(e.target.value)} />
            <label htmlFor="income">Expense</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div> 
        {profilePhoto && <div className="profile">
          <img className="profile-photo" src= {profilePhoto} alt="" />
          <button className="sign-out-button" onClick={signUserOut}> Sign Out </button>
        </div>}
      </div> 
      
      <div className="transactions">
        <h3> Transactions </h3>
        <ul>
          {transactions?.map((transaction)=>{
            const {description,transactionAmount,transactionType}= transaction
            console.log({description})
            return (
              <li>
                <h4>{description}</h4>
                <p> Rs {transactionAmount}. <label style={{color : transactionType==="income" ? "#186F65" :"#D80032"}}> {transactionType}</label></p>
             
              </li>

            )
          })}
        </ul>
      </div>
    </>
  );


};


