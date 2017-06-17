var Todo = Backbone.Model.extend({
  defaults: {
    complete: false
  },
  setDueDate: function() {
    var newDueDate;
    if (this.get("month") && this.get("year")) {
      newDueDate = this.get("month") + "/" + this.get("year").slice(2, 4);
    } else {
      newDueDate = "No Due Date";
    }
    this.set("dueDate", newDueDate);
  },
  initialize: function() {
    this.setDueDate();
    this.on("change:month change:year", this.setDueDate);
  }
});
