"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";

export default function ViewTransactions({ params }) {
  // Properly unwrap the params promise using React.use
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "credit", // Added this to initialize the description field
  });

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!id) return;

        const res = await fetch(
          `http://localhost:3000/api/transactions?id=${id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Transactions");
        }

        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        driverId: id,
      };
      const res = await fetch(`http://localhost:3000/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        setTransactions([...transactions, result]);
        setNewTransaction({ amount: "", type: "credit" });
        // Hide the form
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        const res = await fetch(`/api/transactions?id=${transactionId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Remove the deleted transaction from the list
          setTransactions(transactions.filter((t) => t._id !== transactionId));
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Driver Transactions</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-around items-center bg-slate-800 px-8 py-3">
          <div className="text-white font-bold">Amount</div>
          <button
            className="bg-white p-2 rounded hover:bg-gray-100"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Cancel" : "Add Transaction"}
          </button>
        </div>

        {transactions && transactions.length > 0
          ? transactions.map((t) => (
              <div
                key={t?._id}
                className="flex justify-around items-center px-8 py-3 border-b"
              >
                <div
                  className={
                    t && t.type === "credit" ? "text-green-600" : "text-red-600"
                  }
                >
                  {t && t.type === "credit" ? "+" : "-"} $
                  {t && parseFloat(t.amount).toFixed(2)}
                  {t && t.description && (
                    <div className="text-sm text-gray-500">{t.description}</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/editTransaction/`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteTransaction(t._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : !showAddForm && (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            )}

        {/* Inline Add Transaction Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddTransaction}
            className="px-8 py-4 bg-gray-50 border-t"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
