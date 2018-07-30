"use strict";

var _ = require('underscore');
var $$ = require("../../../substance/application").$$;
var NodeView = require("../node").View;
var ResourceView = require('../../resource_view');

// Lens.Citation.View
// ==========================================================================


var CitationView = function (node, viewFactory, options) {
    NodeView.apply(this, arguments);

    // Mix-in
    ResourceView.call(this, options);

};


CitationView.Prototype = function () {

    // Mix-in
    _.extend(this, ResourceView.prototype);

    this.renderBody = function () {
        var frag = document.createDocumentFragment();
        var node = this.node;
        var i,j;


        // Add text
        // -------
        //
        var italic, xref;

        var texts = node.properties.text;

    for (i=0; i< texts.length; i++) {
        var text = texts[i].nodes;
        var div= document.createElement("div");
        if (text !== undefined) {
            for (j = 0; j < text.length; j++) {
                if (text[j].tagName == 'italic') {
                    italic = document.createElement('span');
                    italic.className = "citation-italic";
                    italic.innerHTML = text[j].innerHTML;
                    div.appendChild(italic);
                }
                else if (text[j].tagName == 'xref' && text[j].getAttribute('ref-type') === "sec") {
                    xref = document.createElement("a");
                    xref.className = "annotation cross_reference cross-reference";
                    xref.setAttribute("data-id", text[j].target);
                    xref.innerHTML = text[j].innerHTML;
                    div.appendChild(xref);

                }
                else if (text[j].tagName == 'xref' && text[j].getAttribute('ref-type') === "bibr") {
                    //console.log('data',text[j]);
                    xref = document.createElement("a");
                    xref.className = "annotation citation_reference resource-reference";
                    xref.setAttribute("data-id", text[j].target.replace('article_citation','citation_reference'));
                    //console.log("fn ref",text[j].target);
                    //xref.setAttribute("data-id", "citation_reference_1");

                    xref.innerHTML = text[j].innerHTML;
                    div.appendChild(xref);

                }
                else {
                    if (text[j].tagName == 'ext-link') {

                        xref = document.createElement("a");
                        xref.className = "content-node link";
                        xref.setAttribute("href", text[j]);
                        xref.setAttribute("target", "_blank");
                        var href = text[j].getAttributeNodeNS("http://www.w3.org/1999/xlink", "href")
                        if (href) {
                            xref.innerHTML = text[j].innerHTML;
                            xref.setAttribute("href", href.textContent);
                        }

                        div.appendChild(xref);

                    }
                    else {
                        div.appendChild(text[j]);
                    }

                }
            }
            frag.appendChild(div);
        }
    }



        // Add Authors
        // -------
        frag.appendChild($$('.authors', {
            html: node.authors.join(', ')
        }));

        // Add Source
        // -------

        var sourceText = "",
            sourceFrag = "",
            pagesFrag = "",
            publisherFrag = "";

        // Hack for handling unstructured citation types and render prettier
        if (node.source && node.volume === '') {
            sourceFrag = node.source;
        } else if (node.source && node.volume) {
            sourceFrag = [node.source, node.volume].join(', ');
        }

        if (node.fpage && node.lpage) {
            pagesFrag = [node.fpage, node.lpage].join('-');
        }

        // Publisher Frag

        var elems = [];

        if (node.publisher_name && node.publisher_location) {
            elems.push(node.publisher_name);
            elems.push(node.publisher_location);
        }

        if (node.year) {
            elems.push(node.year);
        }

        publisherFrag = elems.join(', ');

        // Put them together
        sourceText = sourceFrag;

        // Add separator only if there's content already, and more to display
        if (sourceFrag && (pagesFrag || publisherFrag)) {
            sourceText += ": ";
        }

        if (pagesFrag && publisherFrag) {
            sourceText += [pagesFrag, publisherFrag].join(", ");
        } else {
            // One of them without a separator char
            sourceText += pagesFrag;
            sourceText += publisherFrag;
        }

        frag.appendChild($$('.source', {
            html: sourceText
        }));

        if (node.comment) {
            var commentView = this.createTextView({path: [node.id, 'comment'], classes: 'comment'});
            frag.appendChild(commentView.render().el);
        }

        // Add DOI (if available)
        // -------

        if (node.doi) {
            frag.appendChild($$('.doi', {
                children: [
                    $$('b', {text: "DOI: "}),
                    $$('a', {
                        href: node.doi,
                        target: "_new",
                        text: node.doi
                    })
                ]
            }));
        }

        if (node.citation_urls.length > 0) {
            var citationUrlsEl = $$('.citation-urls');

            _.each(node.citation_urls, function (url) {
                citationUrlsEl.appendChild($$('a.url', {
                    href: url.url,
                    text: url.name,
                    target: "_blank"
                }));
            });

            frag.appendChild(citationUrlsEl);
        }
        this.content.appendChild(frag);
    };
};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
