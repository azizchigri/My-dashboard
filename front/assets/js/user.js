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
            if (status === 'success') {
                setCookie("username", $('#loginUsername').val(), 1);
                setCookie("authorization", result.getResponseHeader("authorization"), 1);
                $("#loginModal").modal("hide");
                getNameWidgets();
                var service = {};
                service.services = ["weather", "currency_exchange", "steam", "spotify"];
                setCookie("services", JSON.stringify(service), 1);
                setCookie("widgetId", "0", 10);
                var save = {}
                save.username = $('#loginUsername').val();
                save.widget = [];
                setCookie("save", JSON.stringify(save) , 10);
                getUserInfo()
                document.getElementById("profileref").style.visibility = "visible";
                document.getElementById("saveref").style.visibility = "visible";
                document.getElementById("logoutref").style.visibility = "visible";
                document.getElementById("signupref").style.visibility = "hidden";
                document.getElementById("loginref").style.visibility = "hidden";
            } else
            {
                var error = '<div class="alert alert-danger alert-dismissible fade in " >';
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';

                error += '<strong>Invalid password or login.</strong>';
                error += '</div>';
                $("#loginDisplay").append(error)
            }
        }
    });
}

function logout(){
    setCookie("services", "", 1);
    setCookie("widgetId", "", 10);
    setCookie("saved", "", 10);
    document.location.reload(true)
}

function    registerMe()
{
    $.ajax({
        url: '/server/sign-up',
        type: 'POST',
        data: JSON.stringify({ email: $('#registerEmail').val(), username : $('#registerUsername').val(), firstName : $('#registerFirstname').val(), lastName : $('#registerLastname').val(), password : $('#registerPassword').val() }),
        contentType: "application/json",
        complete: function(result, status) {
            if (status == 'success') {
                $("#registerModal").modal("hide");
            } else {
                var respond = JSON.parse(result.responseText);
                var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>'
                for (var err in respond.errors) {
                    error += respond.errors[err].defaultMessage + '<br>';
                }
                error += '</strong></div>'
                $("#registerDisplay").append(error)
            }
        }
    });
}

function    getUserInfo()
{
    $.ajax({
        url: '/server/users?username=' + getCookie('username'),
        type: 'GET',
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        complete: function(result, status) {
            if (status == 'success') {
                var respond = JSON.parse(result.responseText);
                $('#updateUsername').val(respond.username);
                $('#updateFirstname').val(respond.firstName);
                $('#updateLastname').val(respond.lastName);
                $('#updateEmail').val(respond.email);
                if (respond.widget[0] != null){
                    var save = JSON.parse(getCookie("save"));
                    save.widget = respond.widget;
                    setCookie("save", JSON.stringify(save) , 10);
                    setCookie("widgetId", respond.widget.length.toString(), 10);
                    restoreWidgets(respond.widget)
                }
            } else {
            }
        }
    });
}