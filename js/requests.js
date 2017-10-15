const BUTTON_TEXT = 'Meet Up!'
const new_post = (name, status, body) => {
    const post = document.createElement('details')
    const summary = document.createElement('summary')
    const contents = document.createElement('div')
    const name_widget = document.createElement('b')
    name_widget.appendChild(document.createTextNode(name))
    const status_widget = document.createElement('i')
    status_widget.appendChild(document.createTextNode(status))
    const button_widget = document.createElement('button')
    button_widget.appendChild(document.createTextNode(BUTTON_TEXT))
    contents.appendChild(name_widget)
    contents.appendChild(status_widget)
    contents.appendChild(button_widget)
    summary.appendChild(contents)
    post.appendChild(summary)
    post.appendChild(document.createTextNode(body))
    const post_container = document.getElementById('main-content')
    post_container.appendChild(post)
}

function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token
    const name = googleUser.getBasicProfile().getName()
    var id_token = googleUser.getAuthResponse().id_token
    post_request('sign_in', { 'token': token, 'username': name }, (response) => {
        document.title = "Meet Up!"
        document.getElementById('sign-in-container').style.display = 'none'
        document.getElementById('content-container').style.display = 'block'
    })
}

function post_request(url, contents, response_callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => response_callback(JSON.parse(xhr.responseText))
    xhr.send(JSON.stringify(contents))
}
