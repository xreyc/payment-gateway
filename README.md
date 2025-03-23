# PAYMENT GATEWAY

### Create a payment

METHOD: `POST`

`URL:`

```
http://localhost:3003/v1/pay
```

`Body`

```json
{
  "description": "Order payment",
  "billing_name": "John Doe",
  "billing_email": "johndoe@yopmail.com",
  "billing_phone": "09089888999",
  "line_item_amount": 10000,
  "line_item_name": "Laptop",
  "line_item_quantity": 1,
  "currency": "PHP",
  "payment_method": "card"
}
```
