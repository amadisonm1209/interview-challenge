export function BalanceCard({ amount }: { amount: number }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm mt-5">
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        Your current balance is ${amount}
      </p>
    </div>
  );
}
