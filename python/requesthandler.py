from http.server import SimpleHTTPRequestHandler
class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['content-length'])
        data_string = str(self.rfile.read(length))
        print (data_string)
        response = "to do Ryan C's olaf"
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Content-length',str(len(response)))
        self.end_headers()
        self.wfile.write(response.encode('utf-8'))
