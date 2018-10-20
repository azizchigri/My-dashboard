function addWidget(elem)
{
    var id = parseInt(getCookie("widgetId"));
    id = id + 1;
    setCookie("widgetId", id.toString(), 10);
    if(elem.innerHTML == "city_temperature")
    {
        addTemperature();
    } else if(elem.innerHTML == "currency_exchange") {
        addCurrency();
    } else if(elem.innerHTML == "city_advanced") {
        addCityAdvanced();
    } else if(elem.innerHTML == "game_informations") {
        addGameInformations();
    }else if(elem.innerHTML == "game_statistics") {
        addGameStatistics();
    } else if(elem.innerHTML == "album_info") {
        addSpotifyMusic();
    }
    else if(elem.innerHTML == "track_info") {
        addSpotifyTrack();
    }
}

function serviceInputweather(box) {
    if(box.checked) {
        document.getElementById("weather0").style.visibility = "visible";
        document.getElementById("weather1").style.visibility = "visible";
    } else{
        document.getElementById("weather0").style.visibility = "hidden";
        document.getElementById("weather1").style.visibility = "hidden";
    }
}

function serviceInputcurrency_exchange(box) {
    if(box.checked) {
        document.getElementById("currency_exchange0").style.visibility = "visible";
    } else{
        document.getElementById("currency_exchange0").style.visibility = "hidden";
    }
}

function serviceInputsteam(box) {
    if(box.checked) {
        document.getElementById("steam0").style.visibility = "visible";
        document.getElementById("steam1").style.visibility = "visible";
    } else{
        document.getElementById("steam0").style.visibility = "hidden";
        document.getElementById("steam1").style.visibility = "hidden";
    }
}

function serviceInputspotify(box) {
    if(box.checked) {
        document.getElementById("spotify0").style.visibility = "visible";
        document.getElementById("spotify1").style.visibility = "visible";
    } else{
        document.getElementById("spotify0").style.visibility = "hidden";
        document.getElementById("spotify1").style.visibility = "hidden";
    }
}


function getNameWidgets()
{
    $("#widgetList").html('');
    $.ajax({
        url: '/server/services',
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status){
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                var alowed_services = JSON.parse(getCookie("services"));
                for (var service in respond)
                {
                    if (alowed_services.services.indexOf(respond[service].name) != -1) {
                        $("#servicesList").append('<li style="cursor: pointer;"><a><label><input type="checkbox" onclick="serviceInput' + respond[service].name +'(this)" checked data-toggle="toggle">' + respond[service].name + '</label></a></li>');
                        for (var widget in respond[service].widgets) {
                            $("#widgetList").append('<li style="cursor: pointer;" id="' + respond[service].name + widget +'"><a href="#" onclick=addWidget(this)>' + respond[service].widgets[widget].name + '</a></li>');
                        }
                    } else {
                        $("#servicesList").append('<li style="cursor: pointer;"><a><label><input type="checkbox" id="serviceInput' + respond[service].name +'" data-toggle="toggle">' + respond[service].name + '</label></a></li>');
                        for (var widget in respond[service].widgets) {
                            $("#widgetList").append('<li style="cursor: pointer;" id="' + respond[service].name + widget +'" hidden><a href="#" onclick=addWidget(this)>' + respond[service].widgets[widget].name + '</a></li>');
                        }
                    }
                }
            } else {
                console.log("Error loading services")
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
