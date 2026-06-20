const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const languageCodes = {
  English: "en",
  Urdu: "ur",
  Arabic: "ar",
  Hindi: "hi",
  Spanish: "es",
  French: "fr",
  German: "de",
  Chinese: "zh",
  Japanese: "ja",
  Turkish: "tr",
};

app.get("/", (req, res) => {
  res.send("Backend server is running successfully");
});

app.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  const sourceCode = languageCodes[sourceLang];
  const targetCode = languageCodes[targetLang];

  if (!sourceCode || !targetCode) {
    return res.status(400).json({
      error: "Invalid language selected",
    });
  }

  if (sourceCode === targetCode) {
    return res.json({
      translatedText: text,
    });
  }

  try {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceCode}|${targetCode}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const translatedText = data.responseData.translatedText;

    res.json({
      originalText: text,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      translatedText: translatedText,
    });
  } catch (error) {
    res.status(500).json({
      error: "Translation failed. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});