(function($){

  WidgetDemo = function() {

    this.code        = null;
    this.currentType = null;

    this.setEventsAndConst = function(){
      self = this;

      $(document).ready(function(){
        self.currentType =  $('.type-switch>button.current');
        self.code        =  $('.widget-code>textarea');
        $('.widget-options>.option>label>input, select.already-changed-quantity').on(
          "change", function(){
            self.updateWidget();
          }
        );

        $('.type-switch>button').on("click", function(){
          self.switchWidgetType( $(this) );
        });
      });
    };

    this.updateWidget = function() {
      console.log("updated");
    }

    this.switchWidgetType = function(type_chosen){
      var currentType = type_chosen.data("type")
      this.currentType.removeClass("current");
      this.currentType = type_chosen;
      type_chosen.addClass("current");
      this.updateWidget();
    }

    this.updateWidget = function(){
      this.updateExample();
      this.updateCode();
    }

    this.updateExample = function(){
      consle.log("updated example")
    };

    this.updateCode = function(){
      code = this.code
    };


    this.init = function(){
      this.setEventsAndConst();
      this.updateWidget();
    }
  };

  window.WidgetDemo = new WidgetDemo();
  window.WidgetDemo.init();

})(jQuery)