function    updateProfile()
{
    console.log(getCookie('authorization'))
    $.ajax({
        url: '/server/update',
        type: 'POST',
        data: JSON.stringify({ email: $('#updateEmail').val(), username : $('#updateUsername').val(), firstName : $('#updateFirstname').val(), lastName : $('#updateLastname').val(), password : $('#updatePassword').val() }),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        contentType: "application/json",
        complete: function(result) {
            console.log(result);
            var alert = '<div class="alert alert-success alert-dismissible fade in " >'
            alert += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
            alert += '<strong>Error</strong>'
            alert += '</div>'
            $("#profile").append(alert)
        }
    });
    console.log("clicked")
}

function saveWidgets() {
    var save = JSON.parse(getCookie('save'));
    var widget = 0
    while (widget < save.widget.length) {
            if (save.widget[widget] == null)
            {
                save.widget.splice(widget, 1);
                widget = 0;
            }
        widget += 1;
    }
    $.ajax({
        url: '/server/users/config',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(save),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            if (status == 'success') {
                console.log("Config saved.")
            } else {
                console.log("Error saving config.")
            }
        }
    });
    console.log("preferences saved");
}

function restoreTemperature(id, city, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetTemperature' + id + '"><strong>Temperature</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="Temperature"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteTemperature(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#temperatureModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="widgetDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);
    var modal = '<div class="modal fade" id="temperatureModal' + id + '" role="dialog">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" >' +
        '                <h4 class="modal-title text-center">Temperature</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="temperatureCityName' + id + '" type="text" class="form-control"  placeholder="City Name" required value="' + city + '">' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="temperatureRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required  value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayTemperature' + id + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnTemperature' + id + '" name="' + id + '" onclick=refreshTemperature(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
    var elem = document.getElementById("btnTemperature" + id);
    refreshTemperature(elem);
}

function restoreCityAdvanced(id, city, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetcityAdvanced' + id + '"><strong>CityAdvanced</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="CityAdvanced"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteCityAdvanced(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#cityAdvancedModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="widgetDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);
    var modal = '<div class="modal fade" id="cityAdvancedModal' + id + '" role="dialog">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" >' +
        '                <h4 class="modal-title text-center">CityAdvanced</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="cityAdvancedCityName' + id + '" type="text" class="form-control"  placeholder="City Name" required value="' + city + '">' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="cityAdvancedRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayCityAdvanced' + id + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnCityAdvanced' + id + '" name="' + id + '" onclick=refreshCityAdvanced(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal)
    var elem = document.getElementById("btnCityAdvanced" + id);
    refreshCityAdvanced(elem);
}

function restoreCurrency(id, currency, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetCurrency' + id + '"><strong>Currency</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name ="Currency"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteCurrency(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#currencyModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="currencyDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="currencyModal' + id + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Currency</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-euro"></i></span> <span class="input-group-addon"><i class="glyphicon glyphicon-arrow-right"></i></span>' +
        '                       <select class="selectpicker" id="currencyCurrency' + id + '" value=" + currency + "></select>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="currencyRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayCurrency' + id + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnCurrency' + id + '" name="' + id + '" onclick=refreshCurrency(this)>Finish</button>' +
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
        complete: function(result, status, ide = id, currencye = currency) {
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                var list_curency = Object.values(respond);
                var list_keys = Object.keys(respond);
                var options = "";
                for (var currency in list_curency) {
                    options += '<option value="' + list_keys[currency] + '">' + list_curency[currency] + '</option>';

                }
                $("#currencyCurrency" + ide).html(options);
                $("#currencyCurrency" + ide).selectpicker('val', currencye);
                $("#currencyCurrency" + ide).selectpicker('refresh');
                var elem = document.getElementById("btnCurrency" + ide);
                refreshCurrency(elem);
            } else {
                console.log("Error loading currency list")
            }
        }
    }, id, currency);

}

function restoreGameInformations(id, appid, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetGameInformations' + id + '"><strong>Game Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="Game Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteGameInformations(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameInfoModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameInfoDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameInfoModal' + id + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameInfo' + id + '"></select>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="gameInformationsRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayGameInfo' + id + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnGameInfo' + id + '" name="' + id + '" onclick=refreshGameInformations(this)>Finish</button>' +
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
        complete: function(result, status, ide = id, appide = appid) {
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                var list_curency = Object.values(respond);
                var list_keys = Object.keys(respond);
                var options = "";
                for (var gameInfo in list_curency)
                {
                    options += '<option value="'+ list_curency[gameInfo] +'">' + list_keys[gameInfo] + '</option>';

                }
                $("#gameInfo" + ide).html(options);
                $("#gameInfo" + ide).selectpicker('val', appide);
                $("#gameInfo" + ide).selectpicker('refresh');
                var elem = document.getElementById("btnGameInfo" + ide);
                refreshGameInformations(elem);
            } else {
                console.log("Error loading gameInfo list")
            }
        }
    }, id, appid);
}

function restoreGameStatistics(id, appid, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetGameStatistics' + id + '"><strong>Game Statistics</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="Game Statistics"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteGameStatistics(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#gameStatsModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="gameStatsDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="gameStatsModal' + id + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Game Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="fa fa-gamepad"></i></span>' +
        '                       <select class="selectpicker" id="gameStats' + id + '"></select>' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="gameStatisticsRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="errorDisplayGameStats' + id + '">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnGameStats' + id + '" name="' + id + '" onclick=refreshGameStatistics(this)>Finish</button>' +
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
        complete: function(result, status, ide = id, appide = appid) {
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                var list_curency = Object.values(respond);
                var list_keys = Object.keys(respond);
                var options = "";
                for (var gameStats in list_curency)
                {
                    options += '<option value="'+ list_curency[gameStats] +'">' + list_keys[gameStats] + '</option>';

                }
                $("#gameStats" + ide).html(options);
                $("#gameStats" + ide).selectpicker('val', appide);
                $("#gameStats" + ide).selectpicker('refresh');
                var elem = document.getElementById("btnGameStats" + ide);
                refreshGameStatistics(elem);
            } else {
                console.log("Error loading gameStats list")
            }
        }
    }, id, appid);
}

function restoreSpotifyMusic(id, keyword, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetSpotifyMusic' + id + '"><strong>Album Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="Album Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteSpotifyMusic(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#spotifyMusicModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="spotifyMusicDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="spotifyMusicModal' + id + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Album Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-music"></i></span>' +
        '                       <input type="text" class="form-control" id="spotifyMusicKeyword' + id + '" placeholder="Keyword" required value="' + keyword + '">' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="spotifyMusicRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnSpotifyMusic' + id + '" name="' + id + '" onclick=refreshSpotifyMusic(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal);
    var elem = document.getElementById("btnSpotifyMusic" + id);
    refreshSpotifyMusic(elem);
}

function restoreSpotifyTrack(id, track, frequency) {
    var grids = $('.grid-stack').data('gridstack');
    grids.addWidget( jQuery( '<div class="ui-draggable ui-resizable ui-resizable-autohide bg-info text-black .text-center" id="widgetSpotifyTrack' + id + '"><strong>Track Informations</strong>' +
        '<div class="grid-stack-item-content bg-dark text-white" id="widget' + id +'" name="Album Informations"> '+
        '<button class="btn pull-right widget-config" name="'+ id +'" onclick="deleteSpotifyTrack(this)">' +
        '<i class="glyphicon glyphicon-remove"></i>' +
        '</button>' +
        '<button class="btn pull-right widget-config" data-toggle="modal" href="#spotifyTrackModal' + id + '">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button> </div> <div  id="spotifyTrackDisplay' + id + '"></div></div>' ), 0, 0, 2, 2, true);

    var modal = '<div class="modal fade" id="spotifyTrackModal' + id + '" role="dialog" >' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content" name="' + id + '">' +
        '            <div class="modal-header" ><button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
        '                <h4 class="modal-title text-center">Track Informations</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-music"></i></span>' +
        '                       <input type="text" class="form-control" id="spotifyMusicTrack' + id + '" placeholder="Track" required value="' + track + '">' +
        '                </div> <br>' +
        '                <div class="input-group">' +
        '                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>' +
        '                    <input id="spotifyTrackRefresh' + id + '" type="text" class="form-control"  placeholder="Refresh frequency in minutes" required value="' + frequency + '">' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer" id="configWidgetModalFooter">' +
        '                <div class="container-fluid">' +
        '                    <button type="submit" class="btn btn-primary pull-right" id="btnSpotifyTrack' + id + '" name="' + id + '" onclick=refreshSpotifyTrack(this)>Finish</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $("body").append(modal);
    var elem = document.getElementById("btnSpotifyTrack" + id);
    refreshSpotifyTrack(elem);
}

function restoreWidgets(data) {
    for (var widget in data) {
        if (data[widget].name == "city_temperature") {
            var preference = data[widget].preference.split(':');
            restoreTemperature(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "city_advanced") {
            var preference = data[widget].preference.split(':');
            restoreCityAdvanced(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "currency_exchange") {
                var preference = data[widget].preference.split(':');
                restoreCurrency(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "game_informations") {
            var preference = data[widget].preference.split(':');
            restoreGameInformations(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "game_statistics") {
            var preference = data[widget].preference.split(':');
            restoreGameStatistics(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "album_info") {
            var preference = data[widget].preference.split(':');
            restoreSpotifyMusic(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        } else if (data[widget].name == "track_info") {
            var preference = data[widget].preference.split(':');
            restoreSpotifyTrack(widget, preference[0], (parseInt(preference[1]) / 60000).toString());
        }
    }
}