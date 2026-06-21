# TransLingua - Language Translation Tool

TransLingua is a modern web-based language translation application built with React.js and Node.js. It allows users to translate text between multiple languages through a clean, responsive, and professional interface.

## Project Links

**Live Demo:**
https://trans-lingua-2hfr.vercel.app

**GitHub Repository:**
https://github.com/Sudais5588/TransLingua

**Backend API:**
https://translingua-dcl4.onrender.com



## Features

* Translate text between multiple languages
* Clean and professional React user interface
* Backend API built with Node.js and Express.js
* Real-time translation using MyMemory Translation API
* Copy translated text with one click
* Swap source and target languages
* Recent translation history using browser localStorage
* Loading state while translation is processing
* Error handling for empty input or failed requests
* Responsive design for desktop and mobile screens
* Environment variable setup for backend URL

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon

### API

* MyMemory Translation API

## Project Structure

```text
Language Translator Tool
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone your-repository-link
cd Language-Translator-Tool
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### 3. Run the Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside the `frontend` folder and add:

```env
VITE_BACKEND_URL=http://localhost:5000
```

This allows the frontend to connect with the backend server.

## How It Works

The user enters text and selects source and target languages from the frontend. The React frontend sends the text and selected languages to the Express backend. The backend sends a request to the MyMemory Translation API and receives the translated text. The translated result is then sent back to the frontend and displayed to the user.

## Application Flow

```text
User enters text
        ↓
React frontend sends request
        ↓
Node.js backend receives request
        ↓
Backend calls MyMemory Translation API
        ↓
API returns translated text
        ↓
Backend sends response to frontend
        ↓
Frontend displays translated text
```

## Future Improvements

* User login and signup system
* Save translation history in a database
* User dashboard
* More language support
* Text-to-speech feature
* Dark/light theme toggle
* Better translation API integration such as Microsoft Translator or Google Cloud Translation
* Full deployment on Vercel and Render

## Author

Developed by Muhammad Sudais
