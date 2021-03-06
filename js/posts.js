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
