var TodoListView = Backbone.View.extend({
  el: $("#todo-list").get(0),
  template: App.templates.todoList,
  events: {
    "click a.add": "newTodo",
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
    this.listenTo(this.collection, "update change sort", this.render);
  }
});
