function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token
    const name = googleUser.getBasicProfile().getName()
    var id_token = googleUser.getAuthResponse().id_token
    post_request('sign_in', { 'token': token, 'username': name }, (response) => { console.log(response) })
}

function post_request(url, contents, response_callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => response_callback(JSON.parse(xhr.responseText))
    xhr.send(JSON.stringify(contents))
}
