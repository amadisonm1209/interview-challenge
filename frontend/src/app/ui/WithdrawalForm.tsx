import { useState } from "react";

type WithdrawalLedger = {
  accountNumber: number;
  amount: number;
  transactionDate: Date;
};

export default function WithdrawalForm({
  accountNumber,
  accountType,
  accountAmount,
  creditLimit,
}: {
  accountNumber: number;
  accountType: string;
  accountAmount: number;
  creditLimit: number | null;
}) {
  const [withdrawalAmt, setWithdrawalAmt] = useState<number>(0);
  const [errors, setErrors] = useState<string | null>(null);

  const updateApiCall = async () => {
    const res = await fetch(
      `http://localhost:5000/api/accounts/${accountNumber}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: withdrawalAmt * -1 }),
      }
    );

    const withdrawalRes = await fetch(
      `http://localhost:5000/api/accounts/withdrawals/${accountNumber}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: withdrawalAmt }),
      }
    );

    if (res.status === 200 && withdrawalRes.status === 200) {
      alert(`Successfully withdrew ${withdrawalAmt}. Check Balance to see updated account info.`);
    } else {
      throw new Error("Submit Failed, Please Try Again");
    }
  };

  const validateDailyLimit = async (
    withdrawalAmt: number
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/accounts/withdrawals/${accountNumber}`,
        {
          method: "GET",
        }
      );
      let sum: number = 0;
      if (res.status === 200) {
        const withdrawalEntries: WithdrawalLedger[] = await res.json();

        withdrawalEntries.forEach((entry) => {
          return (sum += entry.amount);
        });
      }

      if (sum + withdrawalAmt <= 400) {
        return true;
      } else {
        throw new Error("You have exceeded your daily limit of $400.");
      }
    } catch (err: any) {
      setErrors(err.message);
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(null);

    // Can only withdraw <= 200 and divisible by 5 dollar bills
    // Can only withdraw 400 a day
    // Can only withdraw their total amount in account or up to their credit limit
    if (withdrawalAmt <= 200 && withdrawalAmt % 5 === 0) {
      if (
        accountType === "credit" &&
        creditLimit &&
        accountAmount - withdrawalAmt >= creditLimit
      ) {
        if (await validateDailyLimit(withdrawalAmt)) {
          try {
            updateApiCall();
          } catch (err: any) {
            setErrors(err.message);
          }
        }
      } else if (accountAmount - withdrawalAmt >= 0) {
        if (await validateDailyLimit(withdrawalAmt)) {
          try {
            updateApiCall();
          } catch (err: any) {
            setErrors(err.message);
          }
        }
      }
    } else {
      setErrors(
        "Withdrawal must be less than or equal to 200 and in 5 dollar bills."
      );
    }
  };
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Withdrawal Amount */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose an amount to Withdraw
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
                step="5.00"
                placeholder="Enter USD amount in multiples of 5"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => setWithdrawalAmt(Number(e.target.value))}
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
