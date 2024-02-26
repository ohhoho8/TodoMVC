$(document).ready(function(){
        $("#new-todo").keypress(function(event){
            if(event.which === 13) {
                addTodoItem();
            }
        });

        function addTodoItem() {
            var itemText = $("#new-todo").val();
            if (itemText !== "") {
                var listItem = $("<li><div class=\"view\"><input class=\"toggle\" type=\"checkbox\"><label>" + itemText + "</label><button class=\"destroy\"></button></div><input class=\"edit\" value=\"" + itemText + "\"></li>");
                listItem.click(function () {
                    $(this).toggleClass("completed")
                });
                $("#todo-list").append(listItem);
                $("#new-todo").val("");
            }
        }        
    });
