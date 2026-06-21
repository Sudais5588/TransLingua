import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Urdu");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Result");

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("translationHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const languages = [
    "English",
    "Urdu",
    "Arabic",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Turkish",
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText("Please enter some text to translate.");
      return;
    }

    try {
      setIsLoading(true);
      setTranslatedText("");
      setCopyStatus("Copy Result");

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL ||
        "https://translingua-dcl4.onrender.com";

      const response = await fetch(`${backendUrl}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          sourceLang: sourceLang,
          targetLang: targetLang,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setTranslatedText(data.error);
        return;
      }

      setTranslatedText(data.translatedText);

      const newHistoryItem = {
        id: Date.now(),
        sourceLang: sourceLang,
        targetLang: targetLang,
        originalText: inputText,
        translatedText: data.translatedText,
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 5);

      setHistory(updatedHistory);
      localStorage.setItem("translationHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Translation error:", error);
      setTranslatedText("Request failed. Check browser console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranslatedText("");
    setCopyStatus("Copy Result");
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setCopyStatus("Copy Result");
  };

  const handleCopy = async () => {
    if (!translatedText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(translatedText);
      setCopyStatus("Copied!");

      setTimeout(() => {
        setCopyStatus("Copy Result");
      }, 1500);
    } catch (error) {
      setCopyStatus("Copy Failed");
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translationHistory");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <h2>TransLingua</h2>
        </div>

        <nav>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">History</a>
        </nav>
      </header>

      <main className="hero-section">
        <section className="hero-text">
          <span className="badge">Smart Translation Tool</span>
          <h1>Translate text instantly between languages</h1>
          <p>
            A clean and modern language translation platform built with React.
            Enter your text, select languages, and get translated output in a
            simple and professional interface.
          </p>
        </section>

        <section className="translator-card">
          <div className="card-header">
            <div>
              <h2>Language Translator</h2>
              <p>Choose languages and enter your text below.</p>
            </div>

            <span className="status">
              {isLoading ? "Translating" : "Ready"}
            </span>
          </div>

          <div className="language-row">
            <div className="select-group">
              <label>From</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>

            <button className="swap-btn" onClick={handleSwapLanguages}>
              ⇄
            </button>

            <div className="select-group">
              <label>To</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-area-grid">
            <div className="text-box">
              <div className="box-title">
                <span>Original Text</span>
                <small>{inputText.length} characters</small>
              </div>

              <textarea
                placeholder="Type or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>

            <div className="text-box output-box">
              <div className="box-title">
                <span>Translated Text</span>
                <small>{targetLang}</small>
              </div>

              <div className="output">
                {isLoading
                  ? "Translating your text..."
                  : translatedText || "Your translated text will appear here..."}
              </div>
            </div>
          </div>

          <div className="actions">
            <button
              className="primary-btn"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              {isLoading ? "Translating..." : "Translate Now"}
            </button>

            <button
              className="secondary-btn"
              onClick={handleCopy}
              disabled={!translatedText || isLoading}
            >
              {copyStatus}
            </button>

            <button className="secondary-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </section>
      </main>

      <section className="history-section">
        <div className="history-header">
          <div>
            <span className="section-badge">Saved in Browser</span>
            <h2>Recent Translations</h2>
          </div>

          {history.length > 0 && (
            <button className="secondary-btn" onClick={handleClearHistory}>
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="empty-history">
            No translations yet. Your recent translations will appear here.
          </p>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div className="history-card" key={item.id}>
                <span className="language-tag">
                  {item.sourceLang} → {item.targetLang}
                </span>

                <p className="history-original">{item.originalText}</p>
                <p className="history-translated">{item.translatedText}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>⚡ Fast Translation</h3>
          <p>
            Translate your text quickly between multiple languages with a smooth
            user experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>🕘 Translation History</h3>
          <p>
            Save your previous translations and access them anytime from your
            browser history.
          </p>
        </div>

        <div className="feature-card">
          <h3>👤 User Account</h3>
          <p>
            Create an account in future updates, manage your translations, and
            keep your work organized.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;