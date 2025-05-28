// server/src/dao/WalletDAO.ts
import { db } from "../Config/db";

export class WalletDAO {
  static async findByUserId(userId: number) {
    const [rows] = await db.execute(
      "SELECT * FROM wallets WHERE user_id = ?",
      [userId]
    );
    return rows[0]; // { user_id, address, eth_balance, token_balance }
  }

  static async updateBalance(
    userId: number,
    ethBalance: string,
    tokenBalance: string
  ) {
    await db.execute(
      "UPDATE wallets SET eth_balance = ?, token_balance = ? WHERE user_id = ?",
      [ethBalance, tokenBalance, userId]
    );
  }
}