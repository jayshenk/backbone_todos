var ModalView = Backbone.View.extend({
  id: "modal",
  events: {
    "click": "cancel",
    "submit": "updateTodo"
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
  destroy: function() {
    this.$el.fadeOut(400, function() {
      this.remove();
    }.bind(this));
  },
  render: function() {
    this.$el.html(this.template()).insertAfter($("main")).fadeIn();
  },
  initialize: function(){
    this.render();
  }
});
