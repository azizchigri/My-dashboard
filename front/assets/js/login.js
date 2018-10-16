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
	console.log(JSON.stringify({ username : $('#loginUsername').val(), password : $('#loginPassword').val() }));
    $.ajax({
        url: '/server/login',
        type: 'POST',
        data: JSON.stringify({ username : $('#loginUsername').val(), password : $('#loginPassword').val() }),
        contentType: "application/json",
        complete: function(result) {
            console.log(result);
            var error = '<div class="alert alert-danger alert-dismissible fade in " >'
            error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
            error += '<strong>Error</strong>'
            error += '</div>'
            $("#loginDisplay").append(error)
        }
    });
    if (data) {
        var user = JSON.parse(data);
        console.log("connecté")
    } else
    {
        console.log("pas connecté")
    }
    console.log("unsername:" + user.username)
    console.log("clicked")
}