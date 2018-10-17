function    loginMe()
{
    $.ajax({
        url: '/server/login',
        type: 'POST',
        data: JSON.stringify({ username : $('#loginUsername').val(), password : $('#loginPassword').val() }),
        contentType: "application/json",
        complete: function(result, status) {
            if (status == 'success') {
                console.log("connecté");
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