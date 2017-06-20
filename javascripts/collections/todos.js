var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: "complete",
  title: "All Todos",
  lastID: 0,
  filters: {},
  selectedItems: function() {
    return _(this.toJSON()).where(this.filters);
  },
  toggleComplete: function(id) {
    var todo = this.get(id);
    todo.set("complete", !todo.get("complete"));
    this.sort();
  },
  addOrUpdate: function(todo) {
    todo.id = todo.id || ++this.lastID;
    this.add(todo, { merge: true });
  },
  setLastID: function() {
    if (!this.length) { return; }
    this.lastID = _(this.toJSON()).max(function(todo) { return todo.id; }).id;
  },
  completedItems: function() {
    return _(this.toJSON()).where({ complete: true });
  },
  completedCount: function() {
    return this.completedItems().length;
  },
  sortByDueDate: function(todos) {
    return todos.sort(function(todo1, todo2) {
      var n = Number(todo1.year) - Number(todo2.year);
      if (n !== 0) { return n; }
      return Number(todo1.month) - Number(todo2.month);
    });
  },
  dateCounts: function(completed) {
    var todos = completed ? this.completedItems() : this.toJSON();
    var result = {};

    this.sortByDueDate(todos).forEach(function(todo) {
      var dueDate = todo.dueDate;

      if (result[dueDate]) {
        result[dueDate] = result[dueDate] + 1;
      } else {
        result[dueDate] = 1;
      }
    });
    return result;
  },
  selectAll: function() {
    this.filters = {};
    this.title = "All Todos";
    this.trigger("group_selected");
  },
  selectCompleted: function() {
    this.filters = { complete: true };
    this.title = "Completed";
    this.trigger("group_selected");
  },
  selectDueDate: function(dueDate, complete) {
    this.filters = { dueDate: dueDate };
    if (complete) { this.filters.complete = true; }
    this.title = dueDate;
    this.trigger("group_selected");
  },
  initialize: function() {
    this.on("toggle_complete", this.toggleComplete);
    this.on("select_all", this.selectAll);
    this.on("select_completed", this.selectCompleted);
    this.on("select_due_date", this.selectDueDate);
  }
});
