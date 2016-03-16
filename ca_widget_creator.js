(function($){

  WidgetDemo = function() {

    this.script_path = "http://test.changeagain.me/demo_experiments/widget";

    this.code_field       = null;
    this.widget_example   = null;
    this.activeTypeButton = null;

    this.setEventsAndConst = function(){
      self = this;

      this.code_field       =  $('#field_code');
      this.widget_example   =  $('.widget-example');
      this.activeTypeButton =  $('.type-switch>button.current');

      $('.widget-options input, select#field_quantity').on(
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
      this.widget_example.height( $('.options').height() - 60);
    }

    this.updateCode = function(){
      var code = null;
      var chosen_type = this.activeTypeButton.data("type");
      if(chosen_type == "HTML"){
        code = this.getCurrentWidgetUrlFor("html");
      }else if (chosen_type == "JS") {
        url  =  this.getCurrentWidgetUrlFor("js");
        // FIXME
        code = "<script type='text/javascript' src='" + url + "'> </script>";
      };
      this.code_field.val(code);
    };

    this.updateWidgetExample = function(){
      url = this.getCurrentWidgetUrlFor("html"),
      this.widget_example.prop('src', url);
    };

    this.getCurrentWidgetUrlFor = function(type){
      url = this.script_path+"."+type+"?";
      if( $("input[value='Fullsize']").is(":checked") )
      {
        url += "&fullsize=" + "true";
      };

      if( $("input[value^='Add']").is(":checked") )
      {
        url += "&already_changed=" + "true" +
               "&quantity="        + $("#field_quantity").val();
      };
      return url;
    };

    this.init = function(){
      self = this;
      $(document).ready(function(){
        $('input[type="submit"]').remove()
        self.setEventsAndConst();
        self.updateWidget();
        setTimeout(function(){self.widget_example.fadeIn()}, 1000);
      });
    };

  };

  window.WidgetDemo = new WidgetDemo();
  window.WidgetDemo.init();

})(jQuery)