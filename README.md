# PAYMENT GATEWAY

## Installation

1. Download nodejs
2. Install nodejs, just click the defaults
3. Clone this repository
4. Open a terminal inside the cloned repository
5. Run `npm install`
6. Run `npm run dev`

## Testing the app

### Create a payment

METHOD: `POST`

`URL:`

```
http://localhost:3000/v1/payments
```

`Body`

```json
{
  "description": "Order payment",
  "billing_name": "John Doe",
  "billing_email": "johndoe@yopmail.com",
  "billing_phone": "9089888999",
  "line_item_amount": 10000,
  "line_item_name": "Laptop",
  "line_item_quantity": 1,
  "currency": "PHP",
  "payment_method": "card"
}
```
