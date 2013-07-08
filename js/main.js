var menu_elements = Backbone.View.extend({
    events:{
        "click": "onElementClick"
    },
    activated: false,
    initialize: function(){
        var that = this;
        this.position = this.$el.offset();
        this.main_list = this.options.main_list;
        this.menu = this.options.menu;
        this.index = this.options.index;
        this.content = this.options.content;
        this.top = this.$el.offset().top;
        this.left = this.$el.offset().left;
        var random_inc = {
            x: Math.floor((Math.random()*100)+1),
            y: Math.floor((Math.random()*25)+1)
        }
        function start() {
            that.$el.animate({
                top: that.top + random_inc.y,
                left: that.left + random_inc.x
            },
            {
                step: function(){
                    $("#canvas").attr("width", document.width + "px");
                        $("#canvas").attr("height", document.height + "px");
                        var canvas=document.getElementById("canvas");
                        var x=canvas.getContext("2d");
                        x.beginPath();
                        x.strokeStyle = "#FF0000";
                        x.stroke();
                        $.each(that.main_list.menu_elements, function(index, value){
                            if(index!=0){
                                var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                    top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                    left1 = that.main_list.menu_elements[index].$el.offset().left,
                                    left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                                x.moveTo(left1, top1);
                                x.lineTo(left2, top2);
                                x.strokeStyle = "#FF0000";
                                x.stroke();
                            }
                        });
                },
                done: function(){
                    that.$el.animate({
                        top: that.top - random_inc.y,
                        left: that.left - random_inc.x
                    },{
                        step: function(){
                            $("#canvas").attr("width", document.width + "px");
                            $("#canvas").attr("height", document.height + "px");
                            var canvas=document.getElementById("canvas");
                            var x=canvas.getContext("2d");
                            x.beginPath();
                            x.strokeStyle = "#FF0000";
                            x.stroke();
                            $.each(that.main_list.menu_elements, function(index, value){
                                if(index!=0){
                                    var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                        top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                        left1 = that.main_list.menu_elements[index].$el.offset().left,
                                        left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                                    x.moveTo(left1, top1);
                                    x.lineTo(left2, top2);
                                    x.strokeStyle = "#FF0000";
                                    x.stroke();
                                }
                            });
                        },
                        done: function(){
                            random_inc.x = Math.floor((Math.random()*100)+1);
                            random_inc.y = Math.floor((Math.random()*25)+1);                    
                            start();
                        }
                    }, random_inc.x * 100, 'linear');
                }
            },
             random_inc.x * 100, 'linear');
        }
        start();    
    },
    onElementClick:function(){
        var that = this,
            left_offset = this.main_list.last_selected_el ? (this.main_list.last_selected_el.$el.width() + 50 + this.main_list.last_selected_el.left) : 50;
        $.each(this.main_list.menu_elements, function(){
            this.$el.stop().fadeOut();
        });
        this.$el.addClass("menu__element_active");
        this.$el.stop().animate({
            top: 50,
            left: left_offset
        }, {
            step: function(pos, handler) {
                if(handler.prop === "top"){
                    that.top = pos;
                    console.log(that.top);
                } else if(handler.prop === "left"){                
                    that.left = pos;
                }
            },
            done: function(){
                if(!that.menu){
                    that.$el.removeClass("menu__element_active");
                    that.$el.addClass("menu__element_leaf");
                }
                new menu({
                    el:that.main_list.$el,
                    menu_data:that,
                    last_selected_el: that
                });
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
        this.model.clear();
        this.model.set(this.options.menu_data);
        this.last_selected_el = this.options.last_selected_el;
        that.menu_elements = [];
        //TODO брать данные с сервера
        this.render();
    },
    render: function() {
        var that = this;
        if(this.model.get("menu")){
            $.each(this.model.get("menu"), function(i, v){
                var inserted_el = $("<div></div>",{
                    class: "menu__element",
                }).css({
                    left: this.pos.x,
                    top: this.pos.y
                }).html(this.title);
                that.$el.append(inserted_el);
                that.menu_elements.push(
                    new menu_elements({
                        el:inserted_el, 
                        main_list:that, 
                        index:i,
                        menu: this.menu,
                        content: this.content
                    })
                );
            });            
        } else {
            $(".content-box").css("width", document.width - this.last_selected_el.$el.offset().left + 10);
            $(".content-box").show('slide', {direction: 'right'}, 1000);
            $(".content-box .content").html(this.model.get("content"));
            debugger;
            $(".content").css("margin-left", this.last_selected_el.$el.width() + 50);
        }

    }

});

menuObj = new menu({el:$(".menu"), menu_data:dataJSON});