import http.server
import socketserver
import requesthandler

PORT = 8000

Handler = requesthandler.Handler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
