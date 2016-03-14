(function($){

  WidgetDemo = function() {

    this.script_path = "http://test.changeagain.me/demo_experiments/widget";

    this.code_field       = null;
    this.widget_example   = null;
    this.activeTypeButton = null;

    this.setEventsAndConst = function(){
      self = this;

      this.code_field       =  $('.widget-code>textarea');
      this.widget_example   =  $('.widget_example');
      this.activeTypeButton =  $('.type-switch>button.current');
      $('.widget-options>.option>label>input, select.already-changed-quantity').on(
        "change", function(){
          self.updateWidget();
        }
      );

      $('.type-switch>button').on("click", function(){
        self.switchWidgetType( $(this) );
      });
    };

    this.switchWidgetType = function(chosen_type){
      var activeTypeButton = chosen_type.data("type")
      this.activeTypeButton.removeClass("current");
      this.activeTypeButton = chosen_type;
      chosen_type.addClass("current");
      this.updateWidget();
    }

    this.updateWidget = function(){
      this.updateWidgetExample();
      this.updateCode();
    }

    this.updateCode = function(){
      var code = null;
      var chosen_type = this.activeTypeButton.data("type");
      if(chosen_type == "HTML"){
        this.updateWidgetExample();
        code = this.getCurrentWidgetUrlFor("html");
        console.log("code for HTML updated")
      }else if (chosen_type == "JS") {
        url  =  this.getCurrentWidgetUrlFor("js");
        code = "<script type='text/javascript' src='" + url + "</script>";
        console.log("code for js updated");
      };
      this.code_field.text(code);
    };

    this.updateWidgetExample = function(){
      jQuery.ajax({
        url:  this.getCurrentWidgetUrlFor("html"),
        type: "GET",
        success: function(data) { this.widget_example.html(data) }
      });
    };

    this.getCurrentWidgetUrlFor = function(type){
      url = this.script_path+"."+type+"?" +
        "&fullsize=" + $(".option-fullsize").is(":checked");

        if( $(".option-already-changed").is(":checked") )
        {
          url += "&already-changed=" + $(".option-already-changed").is(":checked") +
                 "&quantity="        + $(".already-changed-quantity").val();
        };
      return url;
    };

    this.init = function(){
      self = this;
      $(document).ready(function(){
        self.setEventsAndConst();
        self.updateWidget();
      });
    };

  };

  window.WidgetDemo = new WidgetDemo();
  window.WidgetDemo.init();

})(jQuery)