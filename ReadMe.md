https://ordertoemail.herokuapp.com/

# Instructions:

## Run Locally
- clone repo , cd into the folder, and run ```npm i```
- make a file called ```server/config/config.js``` and add creds for sparkpost.  The file should look like this:
```
module.exports = {
  sparkpost: '<sparkpost-key>',
};
```
- run ```nodemon``` or ```npm start```
- open on ```localhost:3000```

## Make API Calls
No need to always use the front end.  All calls can be make with curl or Postman.  All calls are Posts.  Use these schemas:
- First Call: ```https://ordertoemail.herokuapp.com/api/getorder``` or ```http://localhost:3000/api/getorder```
```
{
  "logon": "<Retailer_Logon>",
  "password": "<Retailer_Password>",
  "retailer": "<Retailer_Moniker>",
  "order": "<Valid_Order_Number>"
}
```
- Second Call: ```https://ordertoemail.herokuapp.com/api/sendemail``` or ```http://localhost:3000/api/sendemail```
```
{
  "retailer": "<Retailer_Mooniker>",         // saved in front end state
  "alertEmailType": "<alert_Email_Type>",    // numeric code of the email type
  "OrderAPIJSON": "<Response_From_OrderAPI>",
  "recipients": [
    {
      "address": {
        "email": "<email_of_recipient>",
        "name": "<name_of_recipient>"
      }
    }
  ]
}
```


Flow 1:
1) Server presents homepage (only monker, auth and order number fields are availble for use in the first call).
2) User fills in the 4 fields.
3) Post to server with user entered data.
4) Server makes call 1 to Order API with logon, password, order number. Response has Order API JSON.
5) Server adds retailer email types to Order API JSON and sends to Client.
6) Client displayes aprroval of credentials, dropdown or email types, and activates fields for entering name and email recipients.
7) Client posts to Server with user entered data (email type, emails and mames).
8) Server converts Order API data into Sparkpost fromatted data.
9) Server makes call 2 to Template Processer with data from Order API, and code for email type.
10) Server makes call 3 to Sparkpost to send the email.
11) Call status to Sparkpost is sent to client and displayed to user.

## TODOs

Flow 2: (TODO)
1) Server presents homepage (all fields shown)
2) User enters all fields.  The alert type dropdown activates when a retailer moniker is added.
3) Post to server with all user entered data.
4) Server makes call 1 to Order API with logon, password, order number.  Response has Order API JSON.
5) Server converts Order API data into Sparkpost fromatted data.
6) Server loops through email types. Server makes call 2 to Template Processer with data from Order API for each type.
7) Server makes call 3 to Sparkpost to send all of the email types.
8) Call status to Sparkpost is sent to client and displayed to user.

Flow 3: (TODO)
1) Server presents homepage (only monker, auth and order number fields shown).
2) User fills in moniker, logon and password
3) Post to server
4) Sever posts to Order API just to make sure the user is authorized to view the templates
5) Server uses moniker code and stubed OrderAPI data to generate all email types
6) Server turnes each response into a new .html file
7) server makes a link to each email.html (to be opened in a new tab)


TODO:
- Confirmation of success on step 1
- Fix step 2 Reset button
- Make a toggle between QA and Prod/Staging
- Display actual email in a new tab (find \" and replace with "). save as .html and serve in an new tab