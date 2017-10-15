from pymongo import MongoClient

client = MongoClient()
database = client.primer

def addUser(id):
    if not idInDatabase(id):
        #TODO add usernames and other info to database
        database.users.insert_one(
            {
                "id": id
            }
        )

def idInDatabase(id):
    return database.users.find({"id": id}).count() > 0

def printDatabase():
    for item in database.users.find():
        print(item)

addUser(144)
addUser(3)
addUser(144)
printDatabase()
