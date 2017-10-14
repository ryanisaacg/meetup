from http.server import SimpleHTTPRequestHandler
from data_manager import DataManager
import json
manager = DataManager()
class Handler(SimpleHTTPRequestHandler):
    def do_Post(self):
        length = int(self,.headers['content-length'])
        data_string = str(self.rfile.read(length))
