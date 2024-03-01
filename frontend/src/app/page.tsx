"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null); // Clears out any previously thrown errors

    try {
      const res = await fetch(
        `http://localhost:5000/api/accounts/${accountNumber}`,
        {
          method: "GET",
        }
      );

      if (res.status === 200) {
        router.push(`/account/?account=${accountNumber}`);
      } else {
        throw new Error("Account Not Found, Please Try Again");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="bg-center bg-no-repeat bg-[url('/toby-elliott-m3SrHEMrmbQ-unsplash.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome to The Madison Bank
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Please enter your account number below to get started
          </p>
        </div>
      </section>
      <main className="min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Account Number
          </label>
          {error && (
            <h2 className="block text-red-600 text-sm font-bold mb-2">
              {error}
            </h2>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="account-number"
            type="number"
            placeholder="Account Number"
            onChange={(e) => setAccountNumber(parseInt(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#6e9ce6] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </main>
    </>
  );
}
