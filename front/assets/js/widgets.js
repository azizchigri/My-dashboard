// ----------Temperaturr Widgets --------------//
function displayTemperature(element) {
    console.log(element.name);
    $.ajax({
        url: '/server/services/weather',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ city: $('#temperatureCityName' + element.name).val()}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#widgetDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond.weather)
                $("#temperatureModal" + element.name).modal("hide");
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

function addTemperature() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>Temperature</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#temperatureModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="widgetDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);
    var modal = '<div class="modal fade" id="temperatureModal' + getCookie("widgetId") + '" role="dialog">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" >' +
        '                <h4 class="modal-title text-center">Temperature</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="temperatureCityName' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="City Name" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayTemperature(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
}

function displayCityAdvanced(element) {
    console.log(element.name);
    $.ajax({
        url: '/server/services/weather',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ city: $('#cityAdvancedCityName' + element.name).val()}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#widgetDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond.weather)
                $("#cityAdvancedModal" + element.name).modal("hide");
                console.log(respond.main.temp);
                var temp = Math.round((parseInt(respond.main.temp) - 273.15));
                var disp = '<br><strong>CityAdvanced: </strong>' + temp.toString() + ' °C<br>';
                disp += '<strong>City: </strong>' + respond.name + '<br>';
                disp += '<strong>Description: </strong>' + respond.weather[0].description+ '<br>';
                disp += '<strong>Humidity: </strong>' + respond.main.humidity + '%'+ '<br>';
                disp += '<strong>Wind speed: </strong>' + respond.wind.speed + ' meter/sec<br>';
                disp += '<strong>Wind orientation: </strong>' + respond.wind.deg + ' degrees<br>';
                disp += '<strong>pressure: </strong>' + respond.main.pressure + ' hPa<br>';
                $("#widgetDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services")
            }
        }
    });
}

function addCityAdvanced() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>CityAdvanced</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#cityAdvancedModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="widgetDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);
    var modal = '<div class="modal fade" id="cityAdvancedModal' + getCookie("widgetId") + '" role="dialog">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" >' +
        '                <h4 class="modal-title text-center">CityAdvanced</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="cityAdvancedCityName' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="City Name" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayCityAdvanced(this)>Finish</button>' +
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
            $("#currencyDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
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

// ----------Steam Widgets --------------//
function displayGameInformataions(element) {
    console.log(element.name);
    console.log($("#gameInfo" + element.name).val());
    $.ajax({
        url: '/server/services/steam',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ appId: $("#gameInfo" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#gameInfoDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                $("#gameInfoModal" + element.name).modal("hide");
                var disp = '<br><strong>Name: </strong>' + respond.name + '<br>';
                disp += '<strong>Application ID: </strong>' + respond.appid + '<br>';
                disp += '<strong>Developer: </strong>' + respond.developer + '<br>';
                disp += '<strong>Price: </strong>' + respond.price  / 100 + '$<br>';
                disp += '<strong>Discount: </strong>' + respond.discount+ '$<br>';
                $("#gameInfoDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services");
            }
        }
    });
}

function addGameInformations() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>Game Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameInfoModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameInfoDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameInfoModal' + getCookie("widgetId") + '" role="dialog" >' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameInfo' + getCookie("widgetId") + '"></select>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayGameInformataions(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)

    $.ajax({
        url: '/server/services/steam',
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
                for (var gameInfo in list_curency)
                {
                    options += '<option value="'+ list_curency[gameInfo] +'">' + list_keys[gameInfo] + '</option>';

                }
                $("#gameInfo" + id).html(options);
                $("#gameInfo" + id).selectpicker('refresh');
            } else {
                console.log("Error loading gameInfo list")
            }
        }
    });
}

function displayGameStatistics(element) {
    console.log(element.name);
    console.log($("#gameStats" + element.name).val());
    $.ajax({
        url: '/server/services/steam',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ appId: $("#gameStats" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            $("#gameStatsDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                $("#gameStatsModal" + element.name).modal("hide");
                var disp = '<br><strong>Name: </strong>' + respond.name + '<br>';
                disp += '<strong>Application ID: </strong>' + respond.appid + '<br>';
                disp += '<strong>Steam rank: </strong>' + respond.score_rank + '<br>';
                disp += '<strong>Positive evaluation: </strong>' + respond.positive + '<br>';
                disp += '<strong>Negative evaluation: </strong>' + respond.negative+ '<br>';
                disp += '<strong>Evaluation score: </strong>' + respond.userscore+ '%<br>';
                $("#gameStatsDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services");
            }
        }
    });
}

function addGameStatistics() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center"><strong>Game Statistics</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'"> '+
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameStatsModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameStatsDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameStatsModal' + getCookie("widgetId") + '" role="dialog" >' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameStats' + getCookie("widgetId") + '"></select>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=displayGameStatistics(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)

    $.ajax({
        url: '/server/services/steam',
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
                for (var gameStats in list_curency)
                {
                    options += '<option value="'+ list_curency[gameStats] +'">' + list_keys[gameStats] + '</option>';

                }
                $("#gameStats" + id).html(options);
                $("#gameStats" + id).selectpicker('refresh');
            } else {
                console.log("Error loading gameStats list")
            }
        }
    });
}