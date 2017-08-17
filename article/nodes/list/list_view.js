"use strict";

var CompositeView = require("../composite/composite_view");
var List = require("./list");

// Substance.Image.View
// ==========================================================================

var ListView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

ListView.whoami = "SubstanceListView";


ListView.Prototype = function () {

    // Rendering
    // =============================
    //

    this.render = function () {
        this.el.innerHTML = "";
        console.log("this.node", this.node);

        var list_ordered = (this.node.ordered) ? "OL" : "UL";

        this.content = document.createElement(list_ordered);
        this.content.classList.add("content");

        var ltype = this.node.properties.list_type;
        if (ltype) {
            this.content.classList.add(ltype);
        }

        var i;

        // dispose existing children views if called multiple times
        for (i = 0; i < this.childrenViews.length; i++) {
            console.log ("dispose, childrenViews", this.childrenViews[i]);
            this.childrenViews[i].dispose();
        }

        // create children views
        var children = this.node.getNodes();
        for (i = 0; i < children.length; i++) {
            var child = this.node.document.get(children[i]);
            var childView = this.viewFactory.createView(child);

            var listEl;

            if (child instanceof List) {
                console.log("child list", child);
                listEl = childView.render().el;
            } else {
                listEl = document.createElement("LI");
                listEl.appendChild(childView.render().el);
            }
            this.content.appendChild(listEl);
            this.childrenViews.push(childView);
        }

        this.el.appendChild(this.content);
        return this;
    };

    this.onNodeUpdate = function (op) {
        if (op.path[0] === this.node.id && op.path[1] === "items") {
            this.render();
        }
    };
};

ListView.Prototype.prototype = CompositeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
