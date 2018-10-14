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
    console.log("clicked")
}