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

function getFormObject($form) {
  var object = {};

  $form.serializeArray().forEach(function(input) {
    var key = input.name;
    var value = input.value;

    if (key === 'id') { value = parseInt(value, 10); }
    object[key] = value;
  });
  return object;
}

var App = {
  templates: cacheTemplates(),
  newTodo: function() {
    new ModalView();
  },
  updateTodo: function($form) {
    var todo = getFormObject($form);
    this.todos.addOrUpdate(todo);
  },
  readStorage: function() {
    this.todos = new Todos(JSON.parse(localStorage.getItem("todos")));
    this.todos.setLastID();
  },
  updateStorage: function() {
    localStorage.setItem("todos", JSON.stringify(this.todos.toJSON()));
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("new_todo", this.newTodo);
    this.on("update_todo", this.updateTodo);
    $(window).on("unload", this.updateStorage.bind(this));
  },
  initialize: function() {
    this.readStorage();
    this.todoList = new TodoListView({ collection: this.todos });
    this.bindEvents();
  }
};
