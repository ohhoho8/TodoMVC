$(document).ready(function(){
        $("#new-todo").keypress(function(event){
            if(event.which === 13) {
                addTodoItem();
            }
        });

        $(document).on("click", ".destroy", function() {
            $(this).closest("li").remove();
        });
        

        $.uuid = function() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            };
          
        function addTodoItem() {
            var itemText = $("#new-todo").val();
            if (itemText !== "") {
                var uuid=$.uuid();
                var listItem = $("<li id='"+uuid+"'><div class=\"view\"><input class=\"toggle\" type=\"checkbox\"><label>" + itemText + "</label><button class=\"destroy\"></button></div><input class=\"edit\" value=\"" + itemText + "\"></li>");
                listItem.click(function () {
                    $(this).toggleClass("completed")
                });
                $("#todo-list").append(listItem);
                $("#new-todo").val("");
            }
        }        
    });
