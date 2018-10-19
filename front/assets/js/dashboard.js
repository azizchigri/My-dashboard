function addWidgeMeteo()
{
    var el = $.parseHTML('<div><div class="grid-stack-item  bg-info text-white"><div class="grid-stack-item-content"> ' +
        'New widget <button class="btn pull-right bg-dark widget-config"><i class="fa fa-cog"></i></button></div> <div/>');
    var grids = $('.grid-stack').data('gridstack');
    grids.add_widget(el, 2, 2, 2, 2, true);
}

function addWidget()
{
    var el = $.parseHTML('<div><div class="grid-stack-item  bg-dark text-white"><div class="grid-stack-item-content"> ' +
        'New widget <button class="btn pull-right widget-config"><i class="fa fa-cog"></i></button></div> <div/>');
    var grids = $('.grid-stack').data('gridstack');

    grids.add_widget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-dark text-white"><div class="grid-stack-item-content bg-dark text-white"> New widget  <button class="btn pull-right bg-dark widget-config"><i class="fa fa-cog"></i></button></div></div>' ), 0, 0, 2, 2, true);
}

function getNameWidgets()
{
    console.log(getCookie('authorization'))
    $.ajax({
        url: '/server/widget',
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            console.log(getCookie('authorization'))
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond)
                for (var elem in respond)
                {
                    console.log(respond[elem].name)
                    $("#widgetList").append("<li><a href=\"#\">" + respond[elem].name + "</a></li>");
                }
            } else {
                console.log("Error loading widgets names")
            }
        }
    });
}

$(function () {
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };
    $('.grid-stack').gridstack(options);
})
