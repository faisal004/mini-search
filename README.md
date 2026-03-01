# Mini Search Engine - Fullstack App

This repository contains a Custom Search Engine implemented from scratch, exposing a REST API, and a beautiful React Frontend to demonstrate its capabilities.

## Architecture

The project has been split into two parts:

### 1. `/backend` (The Search Engine)
A custom-built Mini Search Engine in Node.js/Express.
- **Text Processing**: Case folding, punctuation removal, tokenization, stop words, stemming.
- **Inverted Index**: O(1) term lookups and O(N) memory efficiency mapping words to documents.
- **Scoring**: TF-IDF (Term Frequency - Inverse Document Frequency) for highly relevant ranking.
- **Ingestion**: Fetches real movies from the TMDB API and normalizes them.
- **Persistence**: Serializes and saves the built index memory Maps to disk (`/data/index.json`) for instant boot times.

### 2. `/frontend` (The React App)
A Vite + React application .
It acts as a visual comparison tool. When you search, it fires requests to two different endpoints simultaneously:
1. **🚀 Our Engine (Mini Search)**: Uses the TF-IDF and Inverted Index.
2. **🐢 Naive Search**: A standard database-like `String.includes()` match.

This perfectly demonstrates the superiority of normalized, tokenized indexing over standard string matching!

## How to Run

You will need two terminal windows running simultaneously.

### Start the Backend
```bash
cd backend
npm install
npm run dev
```

### Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open your browser to `http://localhost:5173` to experience the search engine!
