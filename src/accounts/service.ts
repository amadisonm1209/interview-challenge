import { getUserBalance } from "./repository";
import { AccountInfo } from "./types";

export const getAccountById = async (accountId: number): Promise<AccountInfo | null> => {
  const userAccount = await getUserBalance(accountId);

  if (userAccount) return userAccount;

  return null;
};
