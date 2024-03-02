import express, { Request, Response } from "express";
import { AccountInfo, WithdrawalLedger } from "./types";
import {
  getAccountById,
  getWithdrawalsById,
  insertWithdrawalRecord,
  updateAccountAmount,
} from "./service";

export const router = express.Router();

// GET Account Info By Account ID
router.get("/:id", async (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.id);

  try {
    const account: AccountInfo | null = await getAccountById(accountId);

    if (account) {
      return res.status(200).send(account);
    }

    res.status(404).send("Account Not Found, Try Another Account Number");
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT Update Account Amount
router.put("/:id", async (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.id);

  try {
    const amountToUpdate = req.body.amount;
    const existingAccount = await getAccountById(accountId);

    if (existingAccount) {
      const newAmount = await updateAccountAmount(accountId, amountToUpdate);
      return res.status(200).send(newAmount);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET Withdrawal Information by Account ID
router.get("/withdrawals/:id", async (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.id);

  try {
    const withdrawalLedger: WithdrawalLedger[] | null =
      await getWithdrawalsById(accountId);

    if (withdrawalLedger?.length) {
      return res.status(200).send(withdrawalLedger);
    }

    res.status(404).send("Could not get withdrawal information");
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST Update Withdrawal Transaction
router.post("/withdrawals/:id", async (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.id);
  try {
    const amountToUpdate = req.body.amount;

    const newRecordAmt = await insertWithdrawalRecord(
      accountId,
      amountToUpdate
    );

    return res.status(200).send(newRecordAmt);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
