// ----------Weather Widgets --------------//
function displayWeather(element) {
    console.log(element.name);
    $.ajax({
        url: '/server/services/weather',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ city: $('#weatherCityName' + element.name).val()}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#widgetDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond.weather)
                $("#weatherModal" + element.name).modal("hide");
                console.log(respond.main.temp);
                var temp = Math.round((parseInt(respond.main.temp) - 273.15));
                var disp = '<br><strong>Temperature: </strong>' + temp.toString() + ' °C<br>';
                disp += '<strong>City: </strong>' + respond.name + '<br>';
                disp += '<strong>Description: </strong>' + respond.weather[0].description;
                $("#widgetDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services")
            }
        }
    });
}

function addWeather() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>Weather</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#weatherModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="widgetDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);
    var modal = '<div class="modal fade" id="weatherModal' + getCookie("widgetId") + '" role="dialog">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" >' +
        '                <h4 class="modal-title text-center">Weather</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="weatherCityName' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="City Name" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayWeather(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
}

// ----------Currency Widgets --------------//
function displayCurrency(element) {
    console.log(element.name);
    console.log($("#currencyCurrency" + element.name).val());
    $.ajax({
        url: '/server/services/exchange',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ currency: $("#currencyCurrency" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#widgetDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond.weather)
                $("#currencyModal" + element.name).modal("hide");
                var disp = '<br><strong>Rate: </strong>' + respond.rate + '<br>';
                disp += '<strong>Currency: </strong>' + respond.currency + '<br>';
                $("#currencyDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services");
            }
        }
    });
}

function addCurrency() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>Currency</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#currencyModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="currencyDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="currencyModal' + getCookie("widgetId") + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Currency</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-euro"></i></span> <span class="input-group-addon"><i class="glyphicon glyphicon-arrow-right"></i></span>' +
        '                       <select class="selectpicker" id="currencyCurrency' + getCookie("widgetId") + '"></select>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayCurrency(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)

    $.ajax({
        url: '/server/services/exchange',
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status, id = getCookie("widgetId")) {
            console.log(result);
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                var list_curency = Object.values(respond);
                var list_keys = Object.keys(respond);
                var options = "";
                for (var currency in list_curency)
                {
                    options += '<option value="'+ list_keys[currency] +'">' + list_curency[currency] + '</option>';

                }
                $("#currencyCurrency" + id).html(options);
                $("#currencyCurrency" + id).selectpicker('refresh');
            } else {
                console.log("Error loading currency list")
            }
        }
    });
}
