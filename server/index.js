import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3000;
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/api/search", async (req, res) => {
  try {
    const searchString = req.query.q;
    const conf = process.env.OPEN_AI_KEY;
    const getRes = await openai.createImage({
      prompt: searchString,
      n: 1,
      size: "256x256",
    });
    const result = getRes.data.data[0].url;

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => console.log(`Server is on Port ${port} `));
