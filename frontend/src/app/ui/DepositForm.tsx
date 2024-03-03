"use client";
import { useState } from "react";

export default function DepositForm({
  accountNumber,
  accountType,
  accountAmount,
}: {
  accountNumber: number;
  accountType: string;
  accountAmount: number;
}) {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [errors, setErrors] = useState<string | null>(null);

  const updateApiCall = async () => {
    const res = await fetch(
      `http://localhost:5000/api/accounts/${accountNumber}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: depositAmount }),
      }
    );

    if (res.status === 200) {
      alert(`Successfully deposited ${depositAmount}. Check Balance to see updated account info.`);
    } else {
      throw new Error("Submit Failed, Please Try Again");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(null);

    // Check to make sure deposit amount is <= 1000 and > 0
    if (
      depositAmount <= 1000 &&
      depositAmount > 0 &&
      accountType !== "credit"
    ) {
      try {
        updateApiCall();
      } catch (err: any) {
        setErrors(err.message);
      }
    }
    // Credit accounts can only zero out their balance, nothing more.
    else if (
      depositAmount <= 1000 &&
      depositAmount > 0 &&
      depositAmount <= accountAmount * -1
    ) {
      try {
        updateApiCall();
      } catch (err: any) {
        setErrors(err.message);
      }
    } else {
      setErrors(
        "Deposit must be less than or equal to 1000 and must not exceed credit balance."
      );
    }
  };

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Deposit Amount */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose an amount to Deposit
          </label>
          {errors && (
            <h2 className="block text-red-600 text-sm font-bold mb-2">
              {errors}
            </h2>
          )}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step=".01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => setDepositAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#6e9ce6] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
