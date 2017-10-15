const BUTTON_TEXT = 'Meet Up!'

let token;

function create(type) {
    const elem =  document.createElement(type)
    console.log(Array.prototype.slice.call(arguments).slice(1))
    Array.prototype.slice.call(arguments).slice(1).map(child => elem.appendChild(child))
    return elem
}
const text = (text) => document.createTextNode(text)

const new_post = (name, status, body) => {
    document.getElementById('friends-feed')
        .appendChild(
            create('details', 
                create('summary',
                    create('div',
                        create('b', text(name)),
                        create('i', text(status))),
                    create('button', text(BUTTON_TEXT))),
                text(body)))
}

function onSignIn(googleUser) {
    token = googleUser.getAuthResponse().id_token
    const name = googleUser.getBasicProfile().getName()
    post_request('signIn', { 'token': token, 'username': name }, (response) => {
        document.title = "Meet Up!"
        document.getElementById('sign-in-container').style.display = 'none'
        document.getElementById('content-container').style.display = 'flex'
        refresh()
    })
}

function addFriend() {
    const otherID = prompt("Enter your friend's Meet Up ID")
    if(otherID) {
        post_request('addFriend', { 'token': token, 'friendId': otherID }, (response) => {
            console.log("Added friend: " + response);
            refresh()
        })
    }
}

function refresh() {
    post_request('getFriends', { 'token': token }, (response) => {
        const contents = document.getElementById('friends-feed')
        while (contents.firstChild) {
            contents.removeChild(contents.firstChild);
        }
        response.map((child) => {
            new_post(child.username, "Status:...", "BODY!")
        })
    })
}
        

function post_request(url, contents, response_callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => response_callback(JSON.parse(xhr.responseText))
    xhr.send(JSON.stringify(contents))
}
