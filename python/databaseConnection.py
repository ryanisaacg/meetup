from pymongo import MongoClient

def addUser(id):
    client = MongoClient()
    database = client.primer
    if not idInDatabase(id, database):
        #TODO add usernames and other info to database
        database.users.insert_one(
            {
                "id": id
            }
        )

def idInDatabase(id, database):
    return database.users.find({"id": id}).count() > 0

def printDatabase(database):
    for item in database.users.find():
        print(item)
