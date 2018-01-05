# Instructions:

- clone repo and run npm i
- make a file called server/config/config.js and add creds for sparkpost
- nodemon
- open on localhost:3000

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
	"retailer": ""<Retailer_Mooniker>",
	"alertEmailType": "<alert_Email_Type>", // numeric code of the email type
	"OrderAPIJSON": "<Response_From_OrderAPI>",
	"emailNames": {
		"<name_of_recipient>": "<email_of_recipient>",
		"<name_of_recipient>": "<email_of_recipient>"
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


Flow 1:
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



Alternative Possible Flow 2:
1) Server presents homepage (all fields shown)
2) User enters all fields.  The alert type dropdown activates when a retailer moniker is added.
3) Post to server with all user entered data.
4) Server makes call 1 to Order API with logon, password, order number.  Response has Order API JSON.
5) Server converts Order API data into Sparkpost fromatted data.
6) Server makes call 2 to Template Processer with data from Order API, and code for emay type.
7) Server makes call 3 to Sparkpost to send the email.
8) Call status to Sparkpost is sent to client and displayed to user.

Future Features:
Add Carrier and Tracking Number(s)