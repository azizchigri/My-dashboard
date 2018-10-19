function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function    loginMe()
{
    $.ajax({
        url: '/server/login',
        type: 'POST',
        data: JSON.stringify({ username : $('#loginUsername').val(), password : $('#loginPassword').val() }),
        contentType: "application/json",
        complete: function(result, status) {
            console.log(result)
            if (status == 'success') {
                setCookie("username", $('#loginUsername').val(), 1)
                setCookie("authorization", result.getResponseHeader("authorization"), 1)
                $("#loginModal").modal("hide");
                getNameWidgets();
                getUserInfo()
                var service = {}
                service.services = ["weather", "currency_exchange", "steam"]
                console.log(JSON.stringify(service));
                setCookie("services", JSON.stringify(service), 1);
                setCookie("widgetId", "0", 10);
            } else
            {
                console.log("pas connecté")
                var error = '<div class="alert alert-danger alert-dismissible fade in " >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
                error += '<strong>Error</strong>'
                error += '</div>'
                $("#loginDisplay").append(error)
            }
        }
    });
}

function    registerMe()
{
    $.ajax({
        url: '/server/sign-up',
        type: 'POST',
        data: JSON.stringify({ email: $('#registerEmail').val(), username : $('#registerUsername').val(), firstName : $('#registerFirstname').val(), lastName : $('#registerLastname').val(), password : $('#registerPassword').val() }),
        contentType: "application/json",
        complete: function(result, status) {
            console.log(result);
            if (status == 'success') {
                $("#registerModal").modal("hide");
            } else {
                var respond = JSON.parse(result.responseText);
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>'
                for (var err in respond.errors) {
                    console.log(respond.errors[err].defaultMessage);
                    error += respond.errors[err].defaultMessage + '<br>';
                }
                error += '</strong></div>'
                $("#registerDisplay").append(error)
            }
        }
    });
    console.log("clicked")
}

function    getUserInfo()
{
    $.ajax({
        url: '/server/users?username=' + getCookie('username'),
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            console.log(result);
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                $('#updateUsername').val(respond.username);
                $('#updateFirstname').val(respond.firstName);
                $('#updateLastname').val(respond.lastName);
                $('#updateEmail').val(respond.email);
            } else {
            }
        }
    });
    console.log("clicked")
}