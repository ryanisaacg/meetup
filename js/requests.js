const BUTTON_TEXT = 'Meet Up!'

let token;
let id;

function create(type) {
    const elem =  document.createElement(type)
    console.log(Array.prototype.slice.call(arguments).slice(1))
    Array.prototype.slice.call(arguments).slice(1).map(child => elem.appendChild(child))
    return elem
}
const text = (text) => document.createTextNode(text)

const new_friend = (name, status) => {
    document.getElementById('friends-feed')
        .appendChild(
            create('div',
                create('b', text(name)),
                create('i', text(status))))
}
    

const new_post = (name, status, body) => {
    document.getElementById('friends-feed')
        .appendChild(
            create('details', 
                create('summary',
                    create('div',
                        create('b', text(name)),
                        create('i', text(status))),
                    create('button', text(BUTTON_TEXT))),
                body))
}

function onSignIn(googleUser) {
    token = googleUser.getAuthResponse().id_token
    id = googleUser.getBasicProfile().getId()
    const name = googleUser.getBasicProfile().getName()
    post_request('signIn', { 'token': token, 'username': name }, (response) => {
        document.title = "Meet Up!"
        document.getElementById('sign-in-container').style.display = 'none'
        document.getElementById('content-container').style.display = 'flex'
        document.getElementById('username').innerHTML = name
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
            let status;
            let joinable = false;
            console.log(child)
            if(!child.event) {
                status = "Idle";
            } else {
                if(child.event.attendees.includes(id)) {
                    status = "Joinable"
                    joinable = true;
                } else {
                    status = "Busy"
                }
            }
            if(joinable) {
                new_post(child.username, status, "BODY!")
            } else {
                new_friend(child.username, status)
            }
        })
    })
}

function makeEvent() {
    const text = document.getElementById('event-text').value
    const start = document.getElementById('event-start').value
    const duration = document.getElementById('event-duration').value
    const datetime = /^(\d\d)\:(\d\d)$/
    const start_parsed = datetime.exec(start)
    if(start_parsed == null) {
        alert("Please put start time in HH:MM format")
        return
    }
    const duration_parsed = datetime.exec(duration)
    if(duration_parsed == null) {
        alert("Please put duration in HH:MM format")
        return
    }
    const start_hour = start_parsed[1] - 0
    const start_minute = start_parsed[2] - 0
    const duration_hour = duration_parsed[1] - 0
    const duration_minute = duration_parsed[2] - 0
    const startDate = new Date()
    const endDate = new Date()
    startDate.setHours(start_hour)
    startDate.setMinutes(start_minute)
    endDate.setHours(start_hour + duration_hour)
    endDate.setMinutes(start_minute + duration_minute)
    post_request('createEvent', { 'token': token, 'eventName': text, 'startTime': startDate.getTime(), 'endTime': endDate.getTime() }, (response) => {
    })
}
        

function post_request(url, contents, response_callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => response_callback(JSON.parse(xhr.responseText))
    xhr.send(JSON.stringify(contents))
}
