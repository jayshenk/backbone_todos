var Todos = Backbone.Collection.extend({
  model: Todo,
  title: "All Todos",
  filters: {},
  selectedItems: function() {
    return _(this.toJSON()).where(this.filters);
  },
  toggleComplete: function(id) {
    var todo = this.get(id);
    todo.set("complete", !todo.get("complete"));
  },
  initialize: function() {
    this.on("toggle_complete", this.toggleComplete);
  }
});
