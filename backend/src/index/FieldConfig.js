/**
 * FieldConfig: Defines searchable fields and their weights
 * Why: Title matches should rank higher than description matches
 */
class FieldConfig {
    constructor() {
        this.fields = {
            title: { weight: 2.0, stored: true },
            description: { weight: 1.0, stored: true },
            brand: { weight: 1.5, stored: true },
            category: { weight: 1.2, stored: true }
        };
    }

    getWeight(fieldName) {
        return this.fields[fieldName]?.weight || 1.0;
    }

    getSearchableFields() {
        return Object.keys(this.fields);
    }
}

export default FieldConfig;