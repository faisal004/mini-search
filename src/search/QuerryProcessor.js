import Analyzer from "../analysis/Analyzer.js";

class QueryProcessor {
    constructor() {
        this.analyzer = new Analyzer();
    }

    processQuery(query) {
        if (!query || typeof query !== 'string') return [];
        const tokens = this.analyzer.analyze(query);
        return tokens;
    }
}

export default QueryProcessor;