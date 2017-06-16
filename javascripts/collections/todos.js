var Todos = Backbone.Collection.extend({
  model: Todo,
  title: "All Todos",
  lastID: 0,
  filters: {},
  selectedItems: function() {
    return _(this.toJSON()).where(this.filters);
  },
  toggleComplete: function(id) {
    var todo = this.get(id);
    todo.set("complete", !todo.get("complete"));
  },
  addOrUpdate: function(todo) {
    todo.id = todo.id || ++this.lastID;
    this.add(todo, { merge: true });
  },
  setLastID: function() {
    if (!this.length) { return; }
    this.lastID = _(this.toJSON()).max(function(todo) { return todo.id; }).id;
  },
  initialize: function() {
    this.on("toggle_complete", this.toggleComplete);
  }
});
