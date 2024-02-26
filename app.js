$(document).ready(function(){

    function addTodoItem() {
        var itemText = $("#new-todo").val();
        if (itemText !== "") {
            var uuid=$.uuid();
            var listItem = $("<li id='"+uuid+"'><div class=\"view\"><input class=\"toggle\" type=\"checkbox\"><label>" + itemText + "</label><button class=\"destroy\"></button></div><input class=\"edit\" value=\"" + itemText + "\"></li>");
            $("#todo-list").append(listItem);
            $("#new-todo").val("");
        }
    } 

    $("#new-todo").keypress(function(event){
        if(event.which === 13) {
            addTodoItem();
        }
        updateItemCount();
    });

    $(document).on("click", ".destroy", function() {
        $(this).closest("li").remove();
        updateItemCount();
    });

    $(document).on("click", ".view", function() {
        $(this).closest("li").toggleClass("completed");
        $(this).find("input.toggle").toggleClass("checked");
        updateItemCount();
    })

    $(document).on("click", ".toggle-all", function() {
        var items = $("#todo-list").children();
        var hasCompleted = items.filter('.completed').length === items.length;

        items.each(function() {
            if (hasCompleted) {
                $(this).removeClass("completed");
                $(this).find("input.toggle").removeClass("checked");
            } else {
                $(this).addClass("completed");
                $(this).find("input.toggle").addClass("checked");
            }
        });
        updateItemCount();
    });

    function updateItemCount() {
        var remainingItemsCount = $("#todo-list").children().not('.completed').length;
        $("strong").text(remainingItemsCount);
    }

    $(document).on("dblclick", ".view label", function() {
        var label = $(this);
        var listItem=label.closest("li");
        listItem.append($("<input type='text' class='edit'>").val(label.text()));
        input.focus();
    
        input.on("keypress focusout", function(event) {
            if (event.which !== 13) {
                return;
            }
    
            var newText = input.val().trim();
            if (newText !== "") {
                label.text(newText);
            }
    
            input.replaceWith(label);
        });
    });

    updateItemCount();

    $.uuid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };       
});
