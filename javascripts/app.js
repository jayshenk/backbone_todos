var App = {
  initialize: function() {
    this.templates = cacheTemplates();
    this.todos = new Todos(JSON.parse(localStorage.getItem("todos")));
  }
};

function cacheTemplates() {
  var templates = {};

  $("script[type='text/x-handlebars']").each(function() {
    var $template = $(this);
    templates[$template.attr('id')] = Handlebars.compile($template.html());
  });

  $("[data-type='partial']").each(function() {
    var $partial = $(this);
    Handlebars.registerPartial($partial.attr('id'), $partial.html());
  });

  return templates;
}

App.initialize();
