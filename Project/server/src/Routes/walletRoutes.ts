// server/src/routes/walletRoutes.ts
import { getWalletDetails } from "../Controllers/walletController";

router.get("/users/:userId/wallet", async (req, res) => {
  try {
    const data = await getWalletDetails(Number(req.params.userId));
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});