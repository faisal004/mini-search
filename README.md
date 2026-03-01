# Build a Mini Search Engine

This repository documents the step-by-step creation of a mini search engine in JavaScript. 

## Step 1: Text Processing Pipeline

The first step in building a search engine is **text processing** (or text analysis). When a user searches for a query, or when a document is added to the search engine, the text needs to be normalized so that we can accurately match queries to documents. For instance, searching for "Running" should match documents containing "run", "runs", or "ran".

In this step, we built an `Analyzer` pipeline (`src/analysis/Analyzer.js`) that processes raw text through the following stages:

1. **Case Sensitivity (`LowercaseFilter.js`)**
   - **What we do:** Convert all text to lowercase.
   - **Why:** To make the search case-insensitive. Searching for "Apple" should match "apple".
   
2. **Punctuation (`PunctuationFilter.js`)**
   - **What we do:** Remove all non-alphanumeric characters (like `,`, `.`, `!`, `?` etc.).
   - **Why:** Punctuation usually doesn't add meaning to a keyword search. 'Hello!' and 'Hello' should be indexed as the exact same term.

3. **Tokenization (`Tokenizer.js`)**
   - **What we do:** Split the text string into individual words (tokens) based on whitespace.
   - **Why:** The search engine needs individual terms to build its index and to evaluate queries word by word.

4. **Stop Words (`StopWordFilter.js`)**
   - **What we do:** Filter out extremely common words like "the", "is", "at", "which".
   - **Why:** These words appear in almost every document and rarely help distinguish one document from another. Removing them significantly reduces the index size and speeds up search.

5. **Stemming (`Stemmer.js`)**
   - **What we do:** Reduce words to their root or base form (e.g., "running", "runs" → "run").
   - **Why:** This increases recall. If a user searches for "run", they likely also want documents detailing "running" shoes. We use the Porter Stemmer algorithm (via the `natural` library) for this.

**How it comes together:**
The `Analyzer` class chains these filters sequentially. Raw text goes in, and an array of normalized tokens comes out, ready to be indexed!
