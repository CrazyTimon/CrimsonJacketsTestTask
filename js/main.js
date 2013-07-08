
var dataJSON = {
    menu:[
        {
            title:"о компании",
            pos:{
                x:100,
                y:50
            }
        },
        {
            title:"аппаратное обеспечение",
            pos:{
                x:250,
                y:150
            },
            menu:[{
                title: "аппаратная линейка",
                pos:{
                    x:0,
                    y:0
                }
            },{
                title: "серверные решения",
                pos:{
                    x:20,
                    y:20
                }
            },{
                title: "система хранения данных",
                pos:{
                    x:30,
                    y:30
                }
            },{
                title: "компьютерные кластеры",
                pos:{
                    x:80,
                    y:110
                }
            }]
        },
        {
            title:"програмные решения",
            pos:{
                x:380,
                y:250
            }
        },
        {
            title:"партнеры",
            pos:{
                x:480,
                y:380
            }
        },
        {
            title:"контакты",
            pos:{
                x:480,
                y:680
            }
        }
        ]
    };
         //"апаратное обеспечение","програмные решения","партнеры","контакты"]


var menu_elements = Backbone.View.extend({
    events:{
        "click": "onElementClick"
    },
    activated: false,
    initialize: function(){
        this.position = this.$el.offset(); 
        this.$el.offset({top:0,left:0});
        this.main_list = this.options.main_list;
        this.index = this.options.index;
        this.top = this.$el.offset().top;
        this.left = this.$el.offset().left;
    },
    onElementClick:function(){
        var that = this;
        this.activated = true;
        this.$el.animate({
            top: 50,
            left: 200
        }, {
          step: function(pos, handler) {
            if(handler.prop === "top"){
                that.top = pos;
                console.log(that.top);
            } else if(handler.prop === "left"){                
                that.left = pos;
            }
            that.main_list.render();
          }
        }, 2000);
    },
    updateCoord: function(){
        this.top = this.$el.offset().top;
        this.left = this.$el.offset().left;
    },
    getPrev: function(){
        return this.main_list.menu_elements[this.index-1] ? this.main_list.menu_elements[this.index-1] : null;
    },
    getNext: function(){
        return this.main_list.menu_elements[this.index+1] ? this.main_list.menu_elements[this.index+1] : null;
    }
});

var testModel = Backbone.Model.extend({
});

var menu = Backbone.View.extend({
    model: new testModel(),
    initialize: function(){
        var that = this;
        //TODO брать данные с сервера
        this.model.set(dataJSON);
        //TODO брать данные с сервера
        this.menu_elements = [];
        $.each(this.$(".menu__element"), function(i,v){
            that.menu_elements.push( new menu_elements({el:this, main_list:that, index:i}) );
        });
        debugger;
        that.render();
        $.each(that.menu_elements, function(i,v){
            var that_element = this;
            this.$el.animate({
                top: this.position.top,
                left: this.position.left
            }, {
              step: function(x,y) {
                that.render();
              },
              complete: function(){
                that_element.updateCoord();
              }
            }, 2000);
        });
    },
    render: function() {
        var that = this;
        $("#canvas").attr("width", document.width + "px");
        $("#canvas").attr("height", document.height + "px");
        var canvas=document.getElementById("canvas");
        var x=canvas.getContext("2d");
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

menuObj = new menu({el:$(".menu")});