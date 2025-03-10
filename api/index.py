from flask import Flask, json, request
app = Flask(__name__)

@app.route("/api", methods=["GET"])
def index_endpoint():
    responseObject = {
        "body": "Hello World!",
        "status": "success"
    }

    response = app.response_class(
        response=json.dumps(responseObject),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/api/echo", methods=["POST"])
def echo_endpoint():
    data = request.get_json()

    responseObject = {
        "body": data,
        "status": "success"
    }

    response = app.response_class(
        response=json.dumps(responseObject),
        status=200,
        mimetype='application/json'
    )
    return response