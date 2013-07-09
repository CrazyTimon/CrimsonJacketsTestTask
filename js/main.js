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
                    var grad= x.createLinearGradient(0, 0, 600, 1000);
                            grad.addColorStop(0, "#15ABE9");
                            grad.addColorStop(0.5, "#6DB653");
                            grad.addColorStop(1, "#15ABE9");
                            x.strokeStyle = grad;
                    $.each(that.main_list.menu_elements, function(index, value){
                        if(index===1 && index!=0 && index != that.main_list.menu_elements.length-1){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            if(that.main_list.last_selected_el){
                                    x.lineTo(left2-10, top2-10);                                        
                            } else{
                                x.lineTo(left2+10, top2+10);                                        
                            }
                            x.stroke();
                        } else if(index == that.main_list.menu_elements.length-1 && that.main_list.menu_elements.length > 1){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(0 , 650);
                            x.stroke();
                        } else if(index!=0){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                        } else if(index===0 && !that.main_list.last_selected_el){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left;
                            x.moveTo(left1, top1+10);
                            x.lineTo(0, top1);
                            x.stroke();
                        } else if(index===0 && that.main_list.last_selected_el){
                            var top1 = that.main_list.last_selected_el.$el.offset().top,
                                left1 = that.main_list.last_selected_el.$el.offset().left,
                                top2 = that.main_list.menu_elements[index].$el.offset().top,
                                left2 = that.main_list.menu_elements[index].$el.offset().left;
                            x.moveTo(left1+20, top1+10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                        }
                        if(that.main_list.last_selected_el){
                                var top = that.main_list.last_selected_el.$el.offset().top,
                                    left = that.main_list.last_selected_el.$el.offset().left;
                                x.moveTo(left, top+10);
                                x.lineTo(0, top+10);
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
                            var grad= x.createLinearGradient(0, 0, 600, 1000);
                                grad.addColorStop(0, "#15ABE9");
                                grad.addColorStop(0.5, "#6DB653");
                                grad.addColorStop(1, "#15ABE9");
                                x.strokeStyle = grad;
                            $.each(that.main_list.menu_elements, function(index, value){
                                if(index===1 && index!=0 && index != that.main_list.menu_elements.length-1){
                                    var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                        top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                        left1 = that.main_list.menu_elements[index].$el.offset().left,
                                        left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                                    x.moveTo(left1-10, top1-10);
                                    if(that.main_list.last_selected_el){
                                        x.lineTo(left2-10, top2-10);                                        
                                    } else{
                                        x.lineTo(left2+10, top2+10);                                        
                                    }
                                    x.stroke();
                                } else if(index == that.main_list.menu_elements.length-1 && that.main_list.menu_elements.length > 1){
                                    var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                        top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                        left1 = that.main_list.menu_elements[index].$el.offset().left,
                                        left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                                    x.moveTo(left1-10, top1-10);
                                    x.lineTo(left2-10, top2-10);
                                    x.stroke();
                                    x.moveTo(left1-10, top1-10);
                                    x.lineTo(0 , 650);
                                    x.stroke();
                                } else if(index!=0){
                                    var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                        top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                        left1 = that.main_list.menu_elements[index].$el.offset().left,
                                        left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                                    x.moveTo(left1-10, top1-10);
                                    x.lineTo(left2-10, top2-10);
                                    x.stroke();
                                } else if(index===0 && !that.main_list.last_selected_el){
                                    var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                        left1 = that.main_list.menu_elements[index].$el.offset().left;
                                    x.moveTo(left1, top1+10);
                                    x.lineTo(0, top1);
                                    x.stroke();
                                } else if(index===0 && that.main_list.last_selected_el){
                                    var top1 = that.main_list.last_selected_el.$el.offset().top,
                                        left1 = that.main_list.last_selected_el.$el.offset().left,
                                        top2 = that.main_list.menu_elements[index].$el.offset().top,
                                        left2 = that.main_list.menu_elements[index].$el.offset().left;
                                    x.moveTo(left1+20, top1+10);
                                    x.lineTo(left2-10, top2-10);
                                    x.stroke();
                                }
                                if(that.main_list.last_selected_el){
                                    var top = that.main_list.last_selected_el.$el.offset().top,
                                        left = that.main_list.last_selected_el.$el.offset().left;
                                    x.moveTo(left, top+10);
                                    x.lineTo(0, top+10);
                                    x.stroke();
                                }
                            });
                        },
                        done: function(){
                            random_inc.x = Math.floor((Math.random()*100)+1);
                            random_inc.y = Math.floor((Math.random()*25)+1);                    
                            start();
                        },
                        duration: random_inc.x * 100,
                        easing: "linear"
                    });
                },
                duration: random_inc.x * 100,
                easing: "linear"
            });
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
                $("#canvas").attr("width", document.width + "px");
                    $("#canvas").attr("height", document.height + "px");
                    var canvas=document.getElementById("canvas");
                    var x=canvas.getContext("2d");
                    x.beginPath();
                    var grad= x.createLinearGradient(0, 0, 600, 1000);
                    grad.addColorStop(0, "#15ABE9");
                    grad.addColorStop(0.5, "#6DB653");
                    grad.addColorStop(1, "#15ABE9");
                    x.strokeStyle = grad;
                    $.each(that.main_list.menu_elements, function(index, value){
                        if(index===1 && index!=0 && index != that.main_list.menu_elements.length-1){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            if(that.main_list.last_selected_el){
                                    x.lineTo(left2-10, top2-10);                                        
                            } else{
                                x.lineTo(left2+10, top2+10);                                        
                            }
                            x.stroke();
                        } else if(index == that.main_list.menu_elements.length-1 && that.main_list.menu_elements.length > 1){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(0 , 650);
                            x.stroke();
                        } else if(index!=0){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                top2 = that.main_list.menu_elements[index-1].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left,
                                left2 = that.main_list.menu_elements[index-1].$el.offset().left;
                            x.moveTo(left1-10, top1-10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                        } else if(index===0 && !that.main_list.last_selected_el){
                            var top1 = that.main_list.menu_elements[index].$el.offset().top,
                                left1 = that.main_list.menu_elements[index].$el.offset().left;
                            x.moveTo(left1, top1+10);
                            x.lineTo(0, top1);
                            x.stroke();
                        } else if(index===0 && that.main_list.last_selected_el){
                            var top1 = that.main_list.last_selected_el.$el.offset().top,
                                left1 = that.main_list.last_selected_el.$el.offset().left,
                                top2 = that.main_list.menu_elements[index].$el.offset().top,
                                left2 = that.main_list.menu_elements[index].$el.offset().left;
                            x.moveTo(left1+20, top1+10);
                            x.lineTo(left2-10, top2-10);
                            x.stroke();
                        }
                        if(that.main_list.last_selected_el){
                                var top = that.main_list.last_selected_el.$el.offset().top,
                                    left = that.main_list.last_selected_el.$el.offset().left;
                                x.moveTo(left, top+10);
                                x.lineTo(0, top+10);
                                x.stroke();
                            }
                    });
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

            $(".content-box").show('slide', {direction: 'right'}, 1000, function(){
                $("#canvas").attr("width", (document.width - $(".content-box").width()+50) + "px");
                var canvas=document.getElementById("canvas");
                var x=canvas.getContext("2d");
                x.beginPath();
                var grad= x.createLinearGradient(0, 0, 600, 1000);
                grad.addColorStop(0, "#15ABE9");
                grad.addColorStop(0.5, "#6DB653");
                grad.addColorStop(1, "#15ABE9");
                x.strokeStyle = grad;
                x.moveTo(that.last_selected_el.$el.offset().left+150, that.last_selected_el.$el.offset().top+10);
                x.lineTo(0, that.last_selected_el.$el.offset().top+10);
                x.stroke();
            });

            $(".content-box .content").html(this.model.get("content"));
            $(".content").css("margin-left", this.last_selected_el.$el.width() + 50);
        }

    }

});

menuObj = new menu({el:$(".menu"), menu_data:dataJSON});