var App = {
  templates: cacheTemplates(),
  updateStorage: function() {
    localStorage.setItem("todos", JSON.stringify(this.todos.toJSON()));
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    $(window).on("unload", this.updateStorage.bind(this));
  },
  initialize: function() {
    this.todos = new Todos(JSON.parse(localStorage.getItem("todos")));
    this.todoList = new TodoListView({ collection: this.todos });
    this.bindEvents();
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
