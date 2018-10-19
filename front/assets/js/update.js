function    updateProfile()
{
    console.log(getCookie('authorization'))
    $.ajax({
        url: '/server/update',
        type: 'POST',
        data: JSON.stringify({ email: $('#updateEmail').val(), username : $('#updateUsername').val(), firstName : $('#updateFirstname').val(), lastName : $('#updateLastname').val(), password : $('#updatePassword').val() }),
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', getCookie('authorization'));},
        contentType: "application/json",
        complete: function(result) {
            console.log(result);
            var alert = '<div class="alert alert-success alert-dismissible fade in " >'
            alert += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
            alert += '<strong>Error</strong>'
            alert += '</div>'
            $("#profile").append(alert)
        }
    });
    console.log("clicked")
}
