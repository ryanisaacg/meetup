
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'signin.html')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = function() {
    console.log("onload")
        Cookies.set('id', id_token)
        window.location.replace('https://google.com')
    };
    xhr.send(id_token)
}
