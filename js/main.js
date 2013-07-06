"use strict";

var menu_elements = Backbone.View.extend({
    initialize: function(){
        this.position = this.$el.offset(); 
        this.$el.offset({top:0,left:0});
    },
    goTop: function(){
        this.$el.offset({top:0});
    }
});

var menu = Backbone.View.extend({
    
    events: {
        "click .menu__element": "onElementClick"
    },
    initialize: function(){
        var that = this;
        this.menu_elements = [];
        $.each(this.$(".menu__element"), function(){
            that.menu_elements.push( new menu_elements({el:this}) );
        });
        that.render();
        $.each(that.menu_elements, function(){
            this.$el.animate({
                top: this.position.top,
                left: this.position.left
            }, {
              step: function(x,y) {
                that.render();
              }
            }, 2000);
        });
    },
    jumping: function(){

    },
    onElementClick:function(e){
        var that = this;
        $(e.currentTarget).animate({
            top: 50
        }, {
          step: function() {
            that.render();
          }
        }, 2000);
    },
    render: function() {
        var that = this;
        $("#canvas").attr("width", document.width + "px");
        $("#canvas").attr("height", document.height + "px");
        var canvas=document.getElementById("canvas");
        var x=canvas.getContext("2d");
        debugger;
        x.beginPath();
        x.strokeStyle = "#FF0000";
        x.stroke();
        $.each(that.menu_elements, function(index, value){
            if(index!=0){
                var top1 = that.menu_elements[index].$el.offset().top,
                    top2 = that.menu_elements[index-1].$el.offset().top,
                    left1 = that.menu_elements[index].$el.offset().left,
                    left2 = that.menu_elements[index-1].$el.offset().left;
                x.moveTo(left1, top1);
                x.lineTo(left2, top2);
                x.strokeStyle = "#FF0000";
                x.stroke();
            }
        });
    }

});

var  menuObj = new menu({el:$(".menu")});