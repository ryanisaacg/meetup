from pymongo import MongoClient
import uuid

client = MongoClient()
database = client.primer

#adds user to database, returns if user was sucessfully added
def addUser(id, username):
    if not idInDatabase(id):
        database.users.insert_one(
            {
                "id": id,
                "username": username,
                "friends": [],
                "eventId": None
            }
        )
        return True
    else:
        return False

#returns dictionary of user info of user with ID number id
def getById(id):
    if idInDatabase(id):
        return database.users.find({"id": id})[0]
    else:
        return None

#returns if user with ID number id is in users
def idInDatabase(id):
    return database.users.find({"id": id}).count() > 0

#returns username of user with ID number id
def getUsername(id):
    if idInDatabase(id):
        return getById(id)["username"]
    else:
        return None

#lets user with ID number id to change their username
def changeUsername(id, newUsername):
    if idInDatabase(id):
        database.users.update_one(
            {"id": id},
            {"$set": {"username": newUsername}}
        )
        return True
    else:
        return False

#adds user with ID friendID to user with ID addingToId, returns if friend was sucessfully added
def addFriend(addingToId, friendId):
    if idInDatabase(addingToId) and idInDatabase(friendId) and (friendId not in getFriends(addingToId)):
        database.users.update(
            {"id": addingToId},
            {"$push": {"friends": friendId}}
        )
        database.users.update(
            {"id": friendId},
            {"$push": {"friends": addingToId}}
        )
        return True
    else:
        return False

#returns list of friends of user with ID number id
def getFriends(id):
    if idInDatabase(id):
        return getById(id)["friends"]
    else:
        return None

#prints list of friends for user with ID number id
def printFriends(id):
    for friend in getFriends(id):
        print(friend)

#prints all user dictionaries in users
def printUsers():
    for item in database.users.find():
        print(item)

#creates new event and adds event ID to user info
def createEvent(title, creatorId, startTime, duration):
    id = str(uuid.uuid4())
    database.users.update_one(
        {"id": creatorId},
        {"$set": {"eventId": id}}
    )
    database.events.insert_one(
        {
            "title": title,
            "creatorId": creatorId,
            "startTime": startTime,
            "endTime": startTime + duration,
            "attendees": [creatorId],
            "id": id
        }
    )
    return id

#add attendee to event using user id and event id
def addAttendee(userId, eventId):
    if not userId in database.events.find({"id": eventId})[0]["attendees"]:
        database.events.update(
            {"id": eventId},
            {"$push": {"attendees": userId}}
        )

#gets event info from event id
def getEvent(id):
    if eventInDatabase(id):
        return database.events.find({"id": id})[0]
    else:
        return None

#returns if the event with ID number id exists
def eventInDatabase(id):
    return database.events.find({"id": id}).count() > 0

#get list of attendees for a given event ID number id
def getAttendees(id):
    if eventInDatabase(id):
        return getEvent(id)["attendees"]
    else:
        return None

#prints information for all events
def printEvents():
    for event in database.events.find():
        print(event)

addUser("144", "danny")
addUser("42", "alex")
createEvent("Honors COllege", "42", 0, 1)
#addUser(7, "nathan")
#addFriend(144, 42)
#addFriend(144, 7)
#changeUsername(42, "andrew")
#print(type(getById(144)))
#printUsers()
#tempId = createEvent("memetest", 144, 6, 6)
#addAttendee(42, tempId)
