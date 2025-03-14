import datetime
from flask import Flask, json, request

app = Flask(__name__)

@app.route("/api", methods=["GET"])
def index_endpoint():
    responseObject = {
        "body": "Hello World!",
        "status": "success"
    }

    return app.response_class(
        response = json.dumps(responseObject),
        status = 200,
        mimetype = 'application/json'
    )

@app.route("/api/echo", methods=["POST"])
def echo_endpoint():
    data = request.get_json()

    responseObject = {
        "body": data,
        "status": "success"
    }

    return app.response_class(
        response = json.dumps(responseObject),
        status = 200,
        mimetype = 'application/json'
    )

@app.route("/api/count", methods=["POST"])
def count_endpoint():
    # Get count from request body and store in cookie

    data = request.get_json()
    countData = getattr(data, "count", 0)

    cookie = request.cookies.get("count", type = int)

    count = countData

    if countData:
        count = int(cookie) + 1

    cookieIsValid = False

    if cookie:
        try:
            cookie = int(cookie)
            cookieIsValid = True
        except:
            cookieIsValid = False

    if cookieIsValid:
        count = cookie + 1

    
    responseObject = {
        "body": {
            "count": count
        },
        "status": "success"
    }
    resp = app.response_class(
        response = json.dumps(responseObject),
        status = 200,
        mimetype = 'application/json',
    )

    resp.set_cookie(
        "count",
        str(count),
        path = "/",
        expires= datetime.datetime.now() + datetime.timedelta(days=7)
    )

    return resp