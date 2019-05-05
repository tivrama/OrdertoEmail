# Instructions:

- clone repo and run npm i
- make a file called server/config/config.js and add creds for sparkpost
- nodemon
- open on localhost:3000


# New Functionality
# Input an order number and credentials, and get a template payload in the response

This can only be used with Postman or curl as a post request.  There is no GUI:
- First Call: http://localhost:3000/api/getpayload
```
{
  "retailer": "<Retailer_Moniker>",
  "logon": "<Retailer_Logon>",
  "password": "<Retailer_Password>",
  "order": "<Valid_Order_Number>",
  "environment": "<"qa" or "production">"
}
```

Example Response:
```
{
    "order_info": {
        "order_number": "12345678",
        "order_date": "2018-09-01T18:18:44Z",
        "first_name": "Buckaroo",
        "last_name": "Banzai",
        "address": {
            "line1": "50 Beale St",
            "line2": "",
            "line3": "",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94705",
            "country": "US"
        },
        "status": "",
        "current_shipment": {
            "tracking_number": "12345678-1",
            "carrier_moniker": "peninsula",
            "carrier_name": "peninsula",
            "carrier_status": "",
            "carrier_phone_number": "1.800.8000",
            "guaranteed_delivery_date": "2018-09-01T18:18:44Z",
            "tracking_url": "https://tracking.narvar.com/peninsula/tracking/ups?tracking_numbers=12345678-1",
            "address": {
              "line1": "50 Beale St",
              "line2": "",
              "line3": "",
              "city": "San Francisco",
              "state": "CA",
              "zip": "94705",
              "country": "US"
            },
            "shipment_date": "2018-09-01T18:18:44Z",
            "order_items": [
                {
                    "name": "Narvar Mug",
                    "quantity": 1,
                    "description_url": "Stylish Mug",
                    "product_sku": "143866",
                    "attributes": {
                        "color": "white",
                        "size": "M",
                        "price": 12,
                        "image_url": "https://assets.narvar.com/retailers/peninsula/peninsula_01.png"
                    }
                }
            ]
        },
        "multi_shipment": [],
        "items_being_processed": []
    }
}
```


---End Current Functionality---








# Old functionality
## This flow worked when the Template Processor API was online.  It has since been disabled. 

No need to always use the front end.  All calls can be make with curl or Postman.  All calls are Posts.  Use these schemas:
- First Call: http://localhost:3000/api/getorder
```
{
  "logon": "<Retailer_Logon>",
  "password": "<Retailer_Password>",
  "retailer": "<Retailer_Mooniker>",
  "order": "<Valid_Order_Number>"
}
```
- Second Call: http://localhost:3000/api/sendemail
```
{
  "retailer": ""<Retailer_Mooniker>",       // saved in front end state
  "alertEmailType": "<alert_Email_Type>",   // numeric code of the email type
  "OrderAPIJSON": "<Response_From_First_Call>",
  "emailNames": {
    "address": {
      "email": "<email_of_recipient>",
      "name": "<name_of_recipient>"
    }
  }
}
```


# User entery fields:
Reailer Moniker
Logon
Password
Order number
To email addresses and names
select alert type

Flow:
1) Server presents homepage (only monker, auth and order number fields shown).
2) User fills in the 4 fields.
3) Post to server with user entered data.
4) Server makes call 1 to Order API with logon, password, order number. Response has Order API JSON.
5) Server adds retailer email types to Order API JSON and sends to Client.
6) Client displayes aprroval of credentials, high level order details, dropdown or email types, an fields for entering name and email recipients.
7) Client posts to Server with user entered data (email type, emails and mames).
8) Server converts Order API data into Sparkpost fromatted data.
9) Server makes call 2 to Template Processer with data from Order API, and code for email type.
10) Server makes call 3 to Sparkpost to send the email.
11) Call status to Sparkpost is sent to client and displayed to user.

# TODO:
- Add price to items
