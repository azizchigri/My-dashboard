// ----------Temperaturr Widgets --------------//
function displayTemperature(element) {
    console.log("Temperature Updated");
    $.ajax({
        url: '/server/services/weather',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ city: $('#temperatureCityName' + element.name).val()}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            $("#widgetDisplay" + element.name).html('');
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                $("#temperatureModal" + element.name).modal("hide");
                var temp = Math.round((parseInt(respond.main.temp) - 273.15));
                var disp = '<br><strong>Temperature: </strong>' + temp.toString() + ' °C<br>';
                disp += '<strong>City: </strong>' + respond.name + '<br>';
                disp += '<strong>Description: </strong>' + respond.weather[0].description;
                $("#widgetDisplay" + element.name).append(disp);
            } else {
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong> Invalid city name</strong></div>'
                $("#errorDisplayTemperature" + element.name).append(error)
                console.log("Error loading Temperature");
            }
        }
    });
}

function refreshTemperature(elem) {
    displayTemperature(elem);
    var frequency = $("#temperatureRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "city_temperature";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $('#temperatureCityName' + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displayTemperature(elem); }, frequency);
}

function deleteTemperature(elem){
    $("#temperatureModal" + elem.name).remove();
    $("#widgetTemperature" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addTemperature() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetTemperature' + getCookie("widgetId") + '"><strong>Temperature</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Temperature"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteTemperature(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
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
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="temperatureRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayTemperature' + getCookie("widgetId") + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshTemperature(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
}

function displayCityAdvanced(element) {
    console.log("CityAdvanced Updated");
    $.ajax({
        url: '/server/services/weather',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ city: $('#cityAdvancedCityName' + element.name).val()}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            $("#widgetDisplay" + element.name).html('');
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                $("#cityAdvancedModal" + element.name).modal("hide");
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
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong> Invalid city name</strong></div>'
                $("#errorDisplayCityAdvanced" + element.name).append(error)
                console.log("Error loading City Advanced");
            }
        }
    });
}

function refreshCityAdvanced(elem) {
    displayCityAdvanced(elem);
    var frequency = $("#cityAdvancedRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "city_advanced";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $('#cityAdvancedCityName' + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displayCityAdvanced(elem); }, frequency);
}

function deleteCityAdvanced(elem){
    $("#cityAdvancedModal" + elem.name).remove();
    $("#widgetcityAdvanced" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addCityAdvanced() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetcityAdvanced' + getCookie("widgetId") + '"><strong>CityAdvanced</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="CityAdvanced"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteCityAdvanced(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
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
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="cityAdvancedRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayCityAdvanced' + getCookie("widgetId") + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshCityAdvanced(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
}

// ----------Currency Widgets --------------//
function displayCurrency(element) {
    console.log("Currency Updated");
    $.ajax({
        url: '/server/services/exchange',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ currency: $("#currencyCurrency" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            $("#currencyDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                $("#currencyModal" + element.name).modal("hide");
                var disp = '<br><strong>Rate: </strong>' + respond.rate + '<br>';
                disp += '<strong>Currency: </strong>' + respond.currency + '<br>';
                $("#currencyDisplay" + element.name).append(disp);
            } else {
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Can\'t connect to Currency\'s Service</strong></div>'
                $("#errorDisplayCurrency" + element.name).append(error)
                console.log("Error loading Temperature");
                console.log("Error loading Currency");
            }
        }
    });
}

function refreshCurrency(elem) {
    displayCurrency(elem);
    var frequency = $("#currencyRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "currency_exchange";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $("#currencyCurrency" + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displayCurrency(elem); }, frequency);
}

function deleteCurrency(elem){
    $("#widgetCurrency" + elem.name).remove();
    $("#currencyModal" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addCurrency() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetCurrency' + getCookie("widgetId") + '"><strong>Currency</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name ="Currency"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteCurrency(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
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
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="currencyRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayCurrency' + getCookie("widgetId") + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshCurrency(this)>Finish</button>' +
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
function displayGameInformations(element) {
    console.log("Game inofrmations Updated");
    $.ajax({
        url: '/server/services/steam',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ appId: $("#gameInfo" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
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
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Can\'t connect to Game Informations Service</strong></div>'
                $("#errorDisplayGameInfo" + element.name).append(error)
                console.log("Error loading Game Informations");
            }
        }
    });
}

function refreshGameInformations(elem) {
    displayGameInformations(elem);
    var frequency = $("#gameInformationsRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "game_informations";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $("#gameInfo" + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displayGameInformations(elem); }, frequency);
}

function deleteGameInformations(elem){
    $("#widgetGameInformations" + elem.name).remove();
    $("#gameInfoModal" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addGameInformations() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetGameInformations' + getCookie("widgetId") + '"><strong>Game Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Game Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteGameInformations(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameInfoModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameInfoDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameInfoModal' + getCookie("widgetId") + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameInfo' + getCookie("widgetId") + '"></select>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="gameInformationsRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayGameInfo' + getCookie("widgetId") + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshGameInformations(this)>Finish</button>' +
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
    console.log("Game Statistics Updated");
    $.ajax({
        url: '/server/services/steam',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ appId: $("#gameStats" + element.name).val(), date: ""}),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
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
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong> Invalid city name</strong></div>'
                $("#errorDisplayGameStats" + element.name).append(error)
                console.log("Error loading Game Statistics");
            }
        }
    });
}

function refreshGameStatistics(elem) {
    displayGameStatistics(elem);
    var frequency = $("#gameStatisticsRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "game_statistics";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $("#gameStats" + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displayGameStatistics(elem); }, frequency);
}

function deleteGameStatistics(elem){
    $("#widgetGameStatistics" + elem.name).remove();
    $("#gameStatsModal" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addGameStatistics() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetGameStatistics' + getCookie("widgetId") + '"><strong>Game Statistics</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Game Statistics"> '+
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Game Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteGameStatistics(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameStatsModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameStatsDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameStatsModal' + getCookie("widgetId") + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameStats' + getCookie("widgetId") + '"></select>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="gameStatisticsRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayGameStats' + getCookie("widgetId") + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshGameStatistics(this)>Finish</button>' +
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

// ----------Spotify Widgets --------------//

function displaySpotifyMusic(element) {
    console.log("Spotify Album Updated");
    $.ajax({
        url: '/server/services/spotify/search',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ keyword: $("#spotifyMusicKeyword" + element.name).val(), type: "album", limit: "1"}),

        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            $("#spotifyMusicDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                $("#spotifyMusicModal" + element.name).modal("hide");
                var disp = "";
                if (respond.albums.items[0] != null) {
                    disp += '<br><strong>Album name: </strong>' + respond.albums.items[0].name + '<br>';
                    disp += '<strong>Artist name: </strong>' + respond.albums.items[0].artists[0].name + '<br>';
                    disp += '<strong>Date: </strong>' + respond.albums.items[0].release_date + '<br>';
                    disp += '<strong>Type: </strong>' + respond.albums.items[0].album_type + '<br>';
                } else {
                    disp += '<br><strong>Album name: </strong>Unknow<br>';
                }
                $("#spotifyMusicDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services");
            }
        }
    });
}

function refreshSpotifyMusic(elem) {
    displaySpotifyMusic(elem);
    var frequency = $("#spotifyMusicRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "album_info";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $("#spotifyMusicKeyword" + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displaySpotifyMusic(elem); }, frequency);
}

function deleteSpotifyMusic(elem){
    $("#widgetSpotifyMusic" + elem.name).remove();
    $("#spotifyMusicModal" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addSpotifyMusic() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetSpotifyMusic' + getCookie("widgetId") + '"><strong>Album Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Album Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteSpotifyMusic(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#spotifyMusicModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="spotifyMusicDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="spotifyMusicModal' + getCookie("widgetId") + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Album Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-music"></i></span>' +
        '                       <input type="text" class="form-control" id="spotifyMusicKeyword' + getCookie("widgetId") + '" placeholder="Keyword" required>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="spotifyMusicRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshSpotifyMusic(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal);
}

function displaySpotifyTrack(element) {
    console.log("Spotify Track Updated");
    $.ajax({
        url: '/server/services/spotify/search',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ keyword: $("#spotifyMusicTrack" + element.name).val(), type: "track", limit: "1"}),

        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            $("#spotifyTrackDisplay" + element.name).html('');
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                $("#spotifyTrackModal" + element.name).modal("hide");
                var disp ="";
                if (respond.tracks.items[0] != null) {
                    disp += '<br><strong>Track name: </strong>' + respond.tracks.items[0].name + '<br>';
                    disp += '<strong>Duration: </strong>' + (parseInt(respond.tracks.items[0].duration_ms) / 60000).toString() + ' min<br>';
                    disp += '<strong>Album name: </strong>' + respond.tracks.items[0].album.name + '<br>';
                    disp += '<strong>Artist name: </strong>' + respond.tracks.items[0].artists[0].name + '<br>';
                    disp += '<strong>Spotify rank: </strong>' + respond.tracks.items[0].popularity + '<br>';
                } else {
                    disp += '<br><strong>Album name: </strong>Unknow<br>';
                }
                $("#spotifyTrackDisplay" + element.name).append(disp);
            } else {
                console.log("Error loading services");
            }
        }
    });
}

function refreshSpotifyTrack(elem) {
    displaySpotifyTrack(elem);
    var frequency = $("#spotifyTrackRefresh" + elem.name).val();
    frequency = frequency * 60000;
    if (frequency < 60000) {
        frequency = 60000;
    }
    var save = JSON.parse(getCookie("save"));
    var my_widget = {};
    my_widget.name = "track_info";
    my_widget.size = "0";
    my_widget.position = "0";
    my_widget.preference = "" + $("#spotifyMusicTrack" + elem.name).val() + ":" + frequency;
    save.widget[parseInt(elem.name)] = my_widget;
    setCookie("save", JSON.stringify(save) , 10);
    setInterval(function() { displaySpotifyTrack(elem); }, frequency);
}

function deleteSpotifyTrack(elem){
    $("#widgetSpotifyTrack" + elem.name).remove();
    $("#spotifyTrackModal" + elem.name).remove();
    var save = JSON.parse(getCookie('save'));
    save.widget.splice(elem.name, 1);
    setCookie("save", JSON.stringify(save), 10);
}

function addSpotifyTrack() {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetSpotifyTrack' + getCookie("widgetId") + '"><strong>Track Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + getCookie("widgetId") +'" name="Album Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ getCookie("widgetId") +'" onclick="deleteSpotifyTrack(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#spotifyTrackModal' + getCookie("widgetId") + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="spotifyTrackDisplay' + getCookie("widgetId") + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="spotifyTrackModal' + getCookie("widgetId") + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + getCookie("widgetId") + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Track Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-music"></i></span>' +
        '                       <input type="text" class="form-control" id="spotifyMusicTrack' + getCookie("widgetId") + '" placeholder="Track" required>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="spotifyTrackRefresh' + getCookie("widgetId") + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" name="' + getCookie("widgetId") + '" onclick=refreshSpotifyTrack(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal);
}