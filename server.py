from flask import Flask, request

app = Flask(__name__)

@app.route('/customer', methods=['GET', 'POST'])
def form():
    data = request.get_json(force=True)
    user = data.copy()
    order = user.pop("cartOrder")
    for key, value in data.items():
        print(key, '-', value)
    print()
    for key, value in user.items():
        print(key, '-', value)
    return "hello"

if __name__ == "__main__":
    app.run()
