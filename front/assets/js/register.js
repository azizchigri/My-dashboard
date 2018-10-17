function    registerMe()
{
	$.ajax({
    url: 'server/sign-up',
    type: 'POST',
    data: JSON.stringify({ email: $('#registerEmail').val(), username : $('#registerUsername').val(), firstName : $('#registerFirstname').val(), lastName : $('#registerLastname').val(), password : $('#registerPassword').val() }),
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