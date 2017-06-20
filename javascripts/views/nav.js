var NavView = Backbone.View.extend({
  el: $("nav").get(0),
  template: App.templates.navTmpl,
  events: {
    "click #all header": "selectAll",
    "click #completed header": "selectCompleted",
    "click dl": "selectDueDate",
  },
  setActiveRow: function($row) {
    this.$(".active").removeClass("active");
    $row.addClass("active");
  },
  selectAll: function(e) {
    this.setActiveRow($(e.currentTarget));
    this.collection.trigger("select_all");
  },
  selectCompleted: function(e) {
    this.setActiveRow($(e.currentTarget));
    this.collection.trigger("select_completed");
  },
  selectDueDate: function(e) {
    var $row = $(e.currentTarget);
    var dueDate = $row.find(".title").text();
    var complete = $row.closest("section").attr("id") === "completed";

    this.setActiveRow($row);
    this.collection.trigger("select_due_date", dueDate, complete);
  },
  render: function() {
    var id = this.$(".active").closest("section").attr("id");
    var title = this.$(".active").find(".title").text();
    this.$el.html(this.template({
      count: this.collection.length,
      dateCounts: this.collection.dateCounts(),
      completedCount: this.collection.completedCount(),
      completedDateCounts: this.collection.dateCounts(true)
    }));
    this.$("#" + id).find(":contains(" + title + ")").closest(".row").addClass("active");
  },
  initialize: function() {
    this.render();
    this.$("#all header").addClass("active");
    this.listenTo(this.collection, "add remove change", this.render);
  }
});
