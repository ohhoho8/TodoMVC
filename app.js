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
        var listItem = $(this).closest("li");
        listItem.toggleClass("completed");
        var checkbox = listItem.find("input.toggle");
        checkbox.prop("checked", listItem.hasClass("completed"));
        updateItemCount();
    });

    $(document).on("click", ".toggle-all", function() {
        var items = $("#todo-list").children();
        var hasCompleted = items.filter('.completed').length === items.length;

        items.each(function() {
            if (hasCompleted) {
                var listItem = $(this).closest("li");
                listItem.removeClass("completed");
                var checkbox = listItem.find("input.toggle");
                checkbox.prop("checked", listItem.hasClass("completed"));
            } else {
                var listItem = $(this).closest("li");
                listItem.addClass("completed");
                var checkbox = listItem.find("input.toggle");
                checkbox.prop("checked", listItem.hasClass("completed"));
            }
        });
        updateItemCount();
    });

    function updateItemCount() {
        var remainingItemsCount = $("#todo-list").children().not('.completed').length;
        $("strong").text(remainingItemsCount);
    }

    updateItemCount();

    $("a").on("click", function(){
        $("a").removeClass("selected");
        $(this).addClass("selected");
        var linkText = $("a.selected").text();

        if(linkText === "Active") {
            $(this).closest(".main").find(".completed").hide();
        } else if (linkText ==="Completed") {
            $(this).closest(".main").find("li:not(.completed)").hide();
        } else {
            console.log(linkText);
        }
    })

    $.uuid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };       
});
