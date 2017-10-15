const BUTTON_TEXT = 'Meet Up!'

const create = (type, children) => {
    const elem =  document.createElement(type)
    children.map(child => document.appendChild)
}
const text = (text) => document.createTextNode(text)

const new_post = (name, status, body) => {
    document.getElementById('main-content')
        .appendChild(
            create('details', 
                create('summary',
                    create('b', text(name)),
                    create('i', text(status)),
                    create('button', text(BUTTON_TEXT)))))
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