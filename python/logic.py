from google.oauth2 import id_token
from google.auth.transport import requests
import databaseConnection

CLIENT_ID = "776193161746-7hdn119r7hp3lg8ovl4s87q54fm135fk.apps.googleusercontent.com"

def login(token, username):
    id = get_id_from_token(token)
    if not databaseConnection.idInDatabase(id):
        databaseConnection.addUser(id, username)
    return id

getUsername = databaseConnection.getUsername

def getFriends(token):
    id = get_id_from_token(token)
    friends = []
    for friend in databaseConnection.getFriends(id):
        friends.append({"id": friend, "username": databaseConnection.getUsername(friend), "event": databaseConnection.getEvent(databaseConnection.getById(friend))["eventId"]})
    return friends

def addFriend(id, otherId):
    return databaseConnection.addFriend(id, otherId)
def createEvent(id,eventName,startTime,endTime):
    return databaseConnection.createEvent(eventName,id,startTime,endTime)
def joinEvent(id,eventId):
    return databaseConnection.addAttendee(id,eventId)
def getEvent(id):
    return databaseConnection(getEvent(id))
def get_id_from_token(token):
    userid = None
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # If auth request is from a G Suite domain:
        # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
        #     raise ValueError('Wrong hosted domain.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
    except ValueError:
        # Invalid token
        pass
    return userid
