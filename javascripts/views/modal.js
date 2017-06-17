var ModalView = Backbone.View.extend({
  id: "modal",
  events: {
    "submit": "updateTodo",
    "click #complete": "completeTodo",
    "click": "cancel"
  },
  template: App.templates.modalTmpl,
  cancel: function(e) {
    if (!$(e.target).is(this.$el)) { return; }
    this.destroy();
  },
  updateTodo: function(e) {
    e.preventDefault();
    var $form = $(e.target);

    App.trigger("update_todo", $form);
    this.destroy();
  },
  completeTodo: function() {
    if (this.model) {
      this.model.set("complete", true);
    } else {
      alert("Cannot mark as complete as item has not been created yet!");
    }
    this.destroy();
  },
  destroy: function() {
    this.$el.fadeOut(400, function() {
      this.remove();
    }.bind(this));
  },
  render: function() {
    if (this.model) {
      this.$el.html(this.template(this.model.toJSON()));
    } else {
      this.$el.html(this.template());
    }
    this.$el.insertAfter($("main")).fadeIn();
  },
  initialize: function(){
    this.render();
  }
});
