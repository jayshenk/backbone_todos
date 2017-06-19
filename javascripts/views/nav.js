var NavView = Backbone.View.extend({
  el: $("nav").get(0),
  template: App.templates.navTmpl,
  render: function() {
    this.$el.html(this.template({
      count: this.collection.length,
      dateCounts: this.collection.dateCounts(),
      completedCount: this.collection.completedCount(),
      completedDateCounts: this.collection.dateCounts(true)
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "add remove change", this.render);
  }
});
