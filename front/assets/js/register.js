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
            respond = JSON.parse(result.responseText);
            var error = '<div class="alert alert-danger alert-dismissible fade in text-left" >'
            error += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>'
            for (err in respond.errors) {
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