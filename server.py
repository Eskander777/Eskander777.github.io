from flask import Flask, request, render_template
import json

app = Flask(__name__)

@app.route('/customer', methods=['GET', 'POST'])
def form():
    order_data = request.get_json(force=True)
    user = order_data.copy()
    order_items = user.pop("cartOrder")
    return "hello"

@app.route('/')
def show_books():
    with open('books.json', encoding='utf-8') as f:
        books = json.load(f)
    return render_template('index.html', booksLoad=books)

if __name__ == "__main__":
    app.run(debug=True)
