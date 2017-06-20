var TodoListView = Backbone.View.extend({
  el: $("#todo-list").get(0),
  template: App.templates.todoList,
  events: {
    "click a.add": "newTodo",
    "click .todo label": "editTodo",
    "click div.todo": "toggleComplete",
    "click a.delete": "deleteTodo"
  },
  getID: function(e) {
    return $(e.target).closest("li").data("id");
  },
  toggleComplete: function(e) {
    var id = this.getID(e);

    this.collection.trigger("toggle_complete", id);
  },
  editTodo: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = this.getID(e);
    var todo = this.collection.get(id);

    App.trigger("edit_todo", todo);
  },
  deleteTodo: function(e) {
    e.preventDefault();
    var id = this.getID(e);

    this.collection.remove(id);
  },
  newTodo: function(e) {
    e.preventDefault();
    App.trigger("new_todo");
  },
  render: function() {
    this.$el.html(this.template({
      title: this.collection.title,
      count: this.collection.selectedItems().length,
      todos: this.collection.selectedItems()
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "update change sort group_selected", this.render);
  }
});
