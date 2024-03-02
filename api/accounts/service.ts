import {
  getAccountInfoById,
  getWithdrawalInfoById,
  insertWithdrawalRecordInDb,
  updateAccountAmountInDb,
} from "./repository";
import { AccountInfo, WithdrawalLedger } from "./types";

export const getAccountById = async (
  accountId: number
): Promise<AccountInfo | null> => {
  const userAccount = await getAccountInfoById(accountId);

  if (userAccount) return userAccount;

  return null;
};

export const updateAccountAmount = async (
  accountId: number,
  amountToUpdate: number
): Promise<{ amount: number }> => {
  return await updateAccountAmountInDb(accountId, amountToUpdate);
};

export const getWithdrawalsById = async (
  accountId: number
): Promise<WithdrawalLedger[] | null> => {
  const allWithdrawalsForDay = await getWithdrawalInfoById(accountId);
  if (allWithdrawalsForDay) return allWithdrawalsForDay;

  return null;
};

export const insertWithdrawalRecord = async (
  accountId: number,
  amount: number
): Promise<{ amount: number }> => {
  return await insertWithdrawalRecordInDb(accountId, amount);
};
