import express, { Request, Response } from "express";
import { AccountInfo } from "./types";
import { getAccountById } from "./service";

export const router = express.Router();

// GET Account Info By Account ID
router.get('/:id', async (req: Request, res: Response) => {
    const accountId: number = parseInt(req.params.id);

    try {
        const account: AccountInfo | null = await getAccountById(accountId);

        if(account) {
            return res.status(200).send(account);
        }
    
        res.status(404).send('Account Not Found, Try Another Account Number');
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});