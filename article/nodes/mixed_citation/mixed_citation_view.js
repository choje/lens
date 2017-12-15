"use strict";

var _ = require('underscore');
var $$ = require("../../../substance/application").$$;
var NodeView = require("../node").View;
var ResourceView = require('../../resource_view');

// Lens.Citation.View
// ==========================================================================


var MixedCitationView = function (node, viewFactory, options) {
    NodeView.apply(this, arguments);

    // Mix-in
    ResourceView.call(this, options);

};


MixedCitationView.Prototype = function () {

    // Mix-in
    _.extend(this, ResourceView.prototype);

    this.renderBody = function () {
        var frag = document.createDocumentFragment();
        var node = this.node;

        // Add text
        // -------
        //
        var italic, xref;
        var text = node.properties.text[0].nodes;
        if (text !== undefined) {
            for (var i = 0; i < text.length; i++) {
                if (text[i].tagName == 'italic') {
                    italic = document.createElement('span');
                    italic.className = "citation-italic";
                    italic.innerHTML = text[i].innerHTML;
                    frag.appendChild(italic);
                }
                else {
                    if (text[i].tagName == 'ext-link') {
                        xref = document.createElement("a");
                        xref.className = "content-node link";
                        xref.setAttribute("href", text[i]);
                        var href = text[i].getAttributeNodeNS("http://www.w3.org/1999/xlink", "href")
                        if (href) {
                            xref.innerHTML = text[i].innerHTML;
                            xref.setAttribute("href", href.textContent);
                        }
                        xref.setAttribute("target","_blank");

                        frag.appendChild(xref);

                    }
                    else {
                        frag.appendChild(text[i]);
                    }


                }
            }

            this.content.appendChild(frag);
        }
        ;
    };
};

MixedCitationView.Prototype.prototype = NodeView.prototype;
MixedCitationView.prototype = new MixedCitationView.Prototype();
MixedCitationView.prototype.constructor = MixedCitationView;

module.exports = MixedCitationView;
