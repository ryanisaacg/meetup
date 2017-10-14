function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'signin.html')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = function() {
        Cookies.set('id', id_token)
        document.title = "Meet Up"
        document.getElementById('sign-in-container').style.display = 'none'
        document.getElementById('content-container').style.display = 'block'
    };
    xhr.send(id_token)
}
