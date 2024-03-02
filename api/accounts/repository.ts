import { dbQuery } from "..";
import {
  insertWithdrawalRecord,
  selectAmountById,
  selectDailyWithdrawalsById,
  selectUserAccountById,
  updateAmount,
} from "./queries";
import {
  AccountDatabaseRow,
  AccountInfo,
  WithdrawalDatabaseRow,
  WithdrawalLedger,
} from "./types";

export const getAccountInfoById = async (
  accountId: number
): Promise<AccountInfo | null> => {
  const dbResponse = await dbQuery(selectUserAccountById, [accountId]);
  if (!dbResponse.rows.length) return null;

  const dbRow: AccountDatabaseRow = dbResponse.rows[0];

  return {
    accountName: dbRow.name,
    amount: dbRow.amount,
    accountType: dbRow.type,
    creditLimit: dbRow.credit_limit,
  };
};

export const updateAccountAmountInDb = async (
  accountId: number,
  amountToUpdate: number
): Promise<{ amount: number }> => {
  const existingAmount = await dbQuery(selectAmountById, [accountId]);

  const dbAmount: number = existingAmount.rows[0].amount;
  const newAmount = dbAmount + amountToUpdate;

  await dbQuery(updateAmount, [accountId, newAmount]);

  return {
    amount: newAmount,
  };
};

export const getWithdrawalInfoById = async (
  accountId: number
): Promise<WithdrawalLedger[] | null> => {
  const dbResponse = await dbQuery(selectDailyWithdrawalsById, [accountId]);
  if (!dbResponse.rows.length) return null;

  const dbRows: WithdrawalDatabaseRow[] = dbResponse.rows;

  return dbRows.map((row) => {
    return {
      accountNumber: row.account_number,
      amount: row.amount,
      transactionDate: row.transaction_date,
    };
  });
};

export const insertWithdrawalRecordInDb = async (
  accountId: number,
  amountToInsert: number
): Promise<{ amount: number }> => {
  const dbRow = await dbQuery(insertWithdrawalRecord, [
    accountId,
    amountToInsert,
  ]);

  return {
    amount: dbRow.rows[0].amount,
  };
};
