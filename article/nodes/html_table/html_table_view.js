"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;

var $$ = require("../../../substance/application").$$;


var HTMLTableView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

HTMLTableView.Prototype = function () {

    this.render = function () {

        NodeView.prototype.render.call(this);
        var i, childView, childViewEl, htmlTable, row, tr, td;
        htmlTable = document.createElement('table');
        var attrs = this.node.properties.html_table_attributes;
        if (attrs.length > 0) {

            for (var k=0; k < attrs.length; k++) {
                htmlTable.setAttribute(attrs[k].nodeName, attrs[k].nodeValue);

            }
        }

        else {
            htmlTable.setAttribute('class', 'daten-tabelle');
        }
        var tr, i, j, k;
        var rows = this.node.getChildrenIds();

        if (rows !== undefined) {
            for (var r in rows) {
                row = rows[r];
                tr = document.createElement('tr');
                for (i in row) {
                    td = document.createElement('td');
                    var cell = row[i];
                    for (j in cell) {
                        var cell_nodes = cell[j].nodes;
                        var attr = cell[j].attributes;
                        if (cell_nodes !== undefined) {
                            for (var k = 0; k < cell_nodes.length; k++) {
                                childView = this.createChildView(cell_nodes[k].id);
                                childViewEl = childView.render().el;
                                td.appendChild(childViewEl);

                            }
                            for (var m=0; m < attr.length; m++) {
                                td.setAttribute(attr[m].nodeName, attr[m].nodeValue);

                            }
                        }


                    }
                    tr.appendChild(td);
                    htmlTable.appendChild(tr);
                }
            }
        }
        this.content.appendChild(htmlTable);
        this.el.appendChild(this.content);
        return this;

    };
};

HTMLTableView.Prototype.prototype = CompositeView.prototype;
HTMLTableView.prototype = new HTMLTableView.Prototype();

module.exports = HTMLTableView;


/**
 var footers = $$('.footers', {
      children: _.map(this.node.footers, function(footer) {
        return $$('.footer', { html: "<b>"+footer.label+"</b> " + footer.content });
      })
    });

 // Display caption


 if (this.node.caption) {
      var captionView = this.createView(this.node.caption);
      this.content.appendChild(captionView.render().el);
    }

 this.content.appendChild(footers);
 **/
