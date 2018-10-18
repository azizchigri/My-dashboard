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
    $.ajax({
        url: '/server/sign-up',
        type: 'GET',
        data: JSON.stringify({ email: $('#registerEmail').val()}),
        contentType: "application/json",
        complete: function(result, status) {
            console.log(result);
            respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond)
            } else {
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>'
                error += respond.error + '<br>';
                error += '</strong></div>'
                $("#registerDisplay").append(error)
            }
        }
}

$(function () {
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };
    $('.grid-stack').gridstack(options);
})
