class Document {
    constructor(id, fields) {
        this.id = id;
        this.fields = fields;
    }
    getField(fieldName) {
        return this.fields[fieldName] || "";
    }
    getAllFields() {
        return Object.values(this.fields)
    }
}

export default Document;