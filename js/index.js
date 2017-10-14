const id = Cookies.get('id')
if(!id) {
    window.location.replace('signin.html')
}
