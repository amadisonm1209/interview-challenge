"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DepositForm from "../ui/DepositForm";
import WithdrawalForm from "../ui/WithdrawalForm";
import { BalanceCard } from "../ui/BalanceCard";
import Link from "next/link";

type AccountInfo = {
  accountName: string;
  amount: number;
  accountType: string;
  creditLimit: number | null;
};

export default function Page() {
  const accountParam = useSearchParams();
  const accountNumber = accountParam.get("account");
  const [user, setUser] = useState<AccountInfo>();
  const [action, setActionSelection] = useState<string>("check");
  const [selection, setSelection] = useState<string>("");

  const getUserAccountInfo = async (accountId: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/accounts/${accountId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accountNumber) getUserAccountInfo(parseInt(accountNumber));
  });

  const handleSelection = () => {
    setSelection(action);
  };

  return (
    <>
      <div className="mt-6">
        <Link href="/" className="text-large font-extrabold  text-black p-24">Back to Home Page</Link>
      </div>
      <div className="min-h-screen flex-col items-center justify-between p-24">
        <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-black md:text-xl lg:text-xl">
          You are currently using the account: {user?.accountName}
        </h1>
        <label data-te-select-label-ref className="mr-4">
          Today I would like to
        </label>
        <select
          value={action}
          onChange={(e) => setActionSelection(e.target.value)}
        >
          <option value="check">Check My Balance</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        <button
          className="ml-4 bg-blue-500 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#6e9ce6] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSelection}
        >
          Enter
        </button>
        {selection === "check" && user && <BalanceCard amount={user.amount} />}
        {selection === "deposit" && accountNumber && user && (
          <DepositForm
            accountNumber={parseInt(accountNumber)}
            accountType={user.accountType}
            accountAmount={user.amount}
          />
        )}
        {selection === "withdrawal" && accountNumber && user && (
          <WithdrawalForm
            accountNumber={parseInt(accountNumber)}
            accountType={user.accountType}
            accountAmount={user.amount}
            creditLimit={user.creditLimit}
          />
        )}
      </div>
    </>
  );
}
