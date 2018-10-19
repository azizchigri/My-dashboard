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
        //url: '/server/login',
        url: 'http://localhost:1908/login',
        type: 'POST',
        data: JSON.stringify({ username : $('#loginUsername').val(), password : $('#loginPassword').val() }),
        contentType: "application/json",
        complete: function(result, status) {
            if (status == 'success') {
                console.log("connecté");
                console.log(result);
                console.log('Token:' + result.getResponseHeader("authorization"))
                setCookie("username", $('#loginUsername').val(), 1)
                setCookie("authorization", result.getResponseHeader("authorization"), 1)
                $("#loginModal").modal("hide");
            } else
            {
                console.log("pas connecté")
                var error = '<div class="alert alert-danger alert-dismissible fade in " >'
                error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
                error += '<strong>Error</strong>'
                error += '</div>'
                $("#loginDisplay").append(error)
            }
            console.log(getCookie("username"))
            console.log(getCookie("authorization"))
        }
    });
}