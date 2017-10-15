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
        token = data["token"]
        #Looks for the signin string within the path that is passed
        if "signIn" in self.path:
            username = data["username"]
            id = logic.login(token, username)
            response = { "id": id }
        #Looks for getFriends in self path then calls getFriends in logic
        elif "getFriends" in self.path:
            response = logic.getFriends(token)
        #Loosk for addFriend in self path then gets friendID from data then calls add friend with ID from token and friendID
        elif "addFriend" in self.path:
            friendId = data["friendId"]
            response = logic.addFriend(logic.get_id_from_token(token),friendId)
        elif "createEvent" in self.path:
            eventName = data["eventName"]
            startTime = data["startTime"]
            endTime = data["endTime"]
            response = logic.createEvent(logic.get_id_from_token(token), eventName, startTime, endTime)
        elif "joinEvent" in self.path:
            eventId = ["eventId"]
            response = logic.joinEvent(logic.get_id_from_token(token),eventId)
        elif "getEvent" in self.path:
            response = logic.getEvent(logic.get_id_from_token(token))
        response_string = json.dumps(response)
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Content-length',str(len(response_string)))
        self.end_headers()
        self.wfile.write(response_string.encode('utf-8'))
