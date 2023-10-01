import { useAddTransaction } from "../../hooks/useAddTransactions";

export const Expense = () => {
    const {addTransaction} = useAddTransaction()
    const onSubmit = async (e) =>{
        e.preventDefault()
        addTransaction({description:"spa",
            transactionAmount:200 ,
            transactionType:"expense"})
    }
    return (
    <>
    
      <div className="expenseTracker">
        <div className="container">
          <h1> Expense Tracker </h1>
          <div className="balance">
            <h3> Your balance is Rs 0.00</h3>
          </div>
          <div className="summary ">
            <div className="income">
              <h4> Income </h4>
              <p>Rs0.00</p>
            </div>
            <div className="expenses">
              <h4> Expense </h4>
              <p>Rs 0.00</p>
            </div>
          </div>

          <form className="add-transac" onSubmit={onSubmit}>
            <input type="text" placeholder="Description" required />
            <input type="number" placeholder="Amount" required />

            <input type="radio" id="income" value="income" required />
            <label htmlFor="income">Income </label>
            <input type="radio" id="expense" value="expense" required />
            <label htmlFor="income">Expense</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="tranctions">
        <h3> Transactions </h3>
      </div>
    </>
  );
};
