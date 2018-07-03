"use strict";

var Document = require('../../../substance/document');
var Composite = Document.Composite;

// Lens.Quote
// -----------------
//

var Tr = function(node, doc) {
    Composite.call(this, node, doc);
};

// Type definition
// -----------------
//

Tr.type = {
    "id": "htm_table_tr",
    "parent": "html_table_tr",
    "properties": {
        "source_id": "string",
        "children": ["array", "object"]
    }
};

// This is used for the auto-generated docs
// -----------------
//

Tr.description = {

};


// Example Quote
// -----------------
//

Tr.example = {

};

Tr.Prototype = function() {

    this.getChildrenIds = function() {
        return this.properties.children;
    };

};

Tr.Prototype.prototype = Composite.prototype;
Tr.prototype = new Tr.Prototype();
Tr.prototype.constructor = Tr;

Document.Node.defineProperties(Tr);

module.exports = Tr;
