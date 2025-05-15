// filepath: src/index.ts
// api di prova
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3010;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});