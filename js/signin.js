function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    post_request('sign_in', { 'token': id_token }, () => {})
}

function post_request(url, contents, response_callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'signin.html')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => response_callback(JSON.parse(xhr.responseText))
    xhr.send(id_token)
}
