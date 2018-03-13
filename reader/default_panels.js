var ContainerPanel = require('./panels/container_panel');

var figuresPanel = new ContainerPanel({
  type: 'resource',
  name: 'figures',
  container: 'figures',
  title: 'Multimedia',
  icon: 'fa-picture-o',
  references: ['figure_reference'],
  zoom: true,
});

var citationsPanel = new ContainerPanel({
  type: 'resource',
  name: 'citations',
  container: 'citations',
  title: 'References',
  icon: 'fa-link',
  references: ['citation_reference'],
});

var footnotesPanel = new ContainerPanel({
    type: 'resource',
    name: 'footnotes',
    container: 'footnotes',
    title: 'Footnotes',
    icon: 'fa-link',
    references: ['footnote_reference'],
});


var definitionsPanel = new ContainerPanel({
  type: 'resource',
  name: 'definitions',
  container: 'definitions',
  title: 'Glossary',
  icon: 'fa-book',
  references: ['definition_reference'],
});

var infoPanel = new ContainerPanel({
  type: 'resource',
  name: 'info',
  container: 'info',
  title: 'Info',
  icon: 'fa-info',
  references: ['contributor_reference'],
});

module.exports = [
    citationsPanel, definitionsPanel, figuresPanel, footnotesPanel,  infoPanel
];
