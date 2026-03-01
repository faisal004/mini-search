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

## Step 2: The Inverted Index

After processing the text of our documents, we need a way to store it so we can quickly find which documents contain which words. For this, we use an **Inverted Index** (`src/index/InvertedIndex.js`).

Unlike a forward index (which maps documents to words), an inverted index maps words to the documents that contain them.

**What we do:**
- For every new document added, we run its fields through our `Analyzer` to get the tokens.
- We count how many times each token appears in the document (Term Frequency or TF).
- We update our index map: for every token (term), we maintain a list of "postings". Each posting tells us:
  - Document ID
  - Term Frequency (TF) for that document
  - Total tokens in the document (used to normalize TF)

**Why:** It allows for O(1) or O(log N) lookups for query words, rather than scanning every document one by one (O(N) time).

## Step 3: Document Scoring (TF-IDF)

When multiple documents match a search query, how do we decide which one is the "best" match? To rank the results, we implemented **TF-IDF Scoring** (`src/scoring/TFIDFScorer.js`).

TF-IDF stands for **Term Frequency - Inverse Document Frequency**.

1. **Term Frequency (TF):** How often does the term appear in this specific document? The more it appears, the more relevant the document probably is. It is normalized by the total number of terms in the document to prevent long documents from unfairly scoring higher.
2. **Inverse Document Frequency (IDF):** How rare is the term across *all* documents? If a word is rare (like "xylophone") and appears in a document, it's a very strong signal. If it's common (like "engine" in a car database), it's a weaker signal.
   - `IDF = Math.log(total_documents / documents_containing_the_term)`

**What we do:**
- When a query is searching for a term, for each matching document, we calculate its score as `TF * IDF * field_weight` (allowing us to boost matches in titles over bodies, for example).
- If a query has multiple terms, we sum up the scores for all matched terms in the document.

**Why:** This approach elegantly balances both the local importance of a word to a document (TF) and the global importance of the word to the entire collection (IDF), leading to highly relevant search results.
