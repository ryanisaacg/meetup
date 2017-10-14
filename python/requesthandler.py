from http.server import SimpleHTTPRequestHandler
from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = "776193161746-7hdn119r7hp3lg8ovl4s87q54fm135fk.apps.googleusercontent.com"

class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['content-length'])
        data_string = self.rfile.read(length).decode('utf-8')
        print (data_string)
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Content-length',str(len(response)))
        self.end_headers()
        self.wfile.write(response.encode('utf-8'))
