from flask import Flask, request, render_template
import json

app = Flask(__name__)


@app.route('/customer', methods=['POST'])
def customer_form():
    if request.is_json:
        order_data = request.get_json(force=True)
        user = order_data.copy()
        order_items = user.pop("cartOrder")

        with open('customers.json', encoding='utf8') as c_r:
            customers = json.load(c_r)
        customers.append(user)
        with open('customers.json', 'w', encoding='utf8') as c:
            json.dump(customers, c, ensure_ascii=False)
        with open('orders.json', encoding='utf8') as o_r:
            orders = json.load(o_r)
        orders.append(order_data)
        with open('orders.json', 'w', encoding='utf8') as  o:
            json.dump(orders, o, ensure_ascii=False)
    else:
        pass

    return "Your order is added to 'Orders'"


@app.route('/')
def show_books():
    with open('books.json', encoding='utf-8') as f:
        books = json.load(f)
    return render_template('index.html', books=books)


if __name__ == "__main__":
    app.run(debug=True)
