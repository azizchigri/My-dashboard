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
    }
}

function getNameWidgets()
{
    console.log(getCookie('authorization'));
    $("#widgetList").html('');
    $.ajax({
        url: '/server/services',
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status){
            console.log(result);
            var respond = JSON.parse(result.responseText);
            if (status == 'success') {
                console.log(respond)
                var alowed_services = JSON.parse(getCookie("services"));
                for (var service in respond)
                {
                    if (alowed_services.services.indexOf(respond[service].name) != -1) {
                        for (var widget in respond[service].widgets) {
                            $("#widgetList").append("<li><a href=\"#\" onclick=addWidget(this)>" + respond[service].widgets[widget].name + "</a></li>");

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
