from http.server import SimpleHTTPRequestHandler
from google.oauth2 import id_token
from google.auth.transport import requests
import json
import logic

CLIENT_ID = "776193161746-7hdn119r7hp3lg8ovl4s87q54fm135fk.apps.googleusercontent.com"

class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['content-length'])
        data_string = self.rfile.read(length).decode('utf-8')
        data = json.loads(data_string)
        if "sign_in" in self.path:
            token = data["token"]
            username = data["username"]
            id = logic.login(token, username)
            response = { "id": id }
        response_string = json.dumps(response)
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Content-length',str(len(response_string)))
        self.end_headers()
        self.wfile.write(response_string.encode('utf-8'))
