function    updateProfile()
{
    $.ajax({
        url: '/server/update',
        type: 'POST',
        data: JSON.stringify({ email: $('#updateEmail').val(), username : $('#updateUsername').val(), firstName : $('#updateFirstname').val(), lastName : $('#updateLastname').val(), password : $('#updatePassword').val() }),
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