var state = {
    call1schema: {
        logon: "",
        password: "",
        retailer: "",
        order: "",
        env: "production"
    },

    call2schema: {
        retailer: "",
        alertEmailType: "",
        OrderAPIJSON: {},
        recipients: []
    },
    
    alertEmailTypes: {}
     
};

// Set initial state
var currentState1 = state.call1schema;
var currentState2 = state.call2schema;
var currentState = state.alertEmailTypes;
var emailCount = 1;
var previousLine = 0;




// First call
$(document).ready(function(){
    $( "#step1" ).submit(function( event ) {
        
        // Reset everyting in form 2
        resetForm2();

        var lintedRetailer = $("#retailer").val().toLowerCase().replace(/[-]/gi, '_');

        currentState1.retailer = lintedRetailer;
        currentState2.retailer = currentState1.retailer;
        currentState1.logon = $("#logon").val();
        currentState1.password = $("#password").val();
        currentState1.order = $("#order").val();
        currentState1.env = $("input[name='env']:checked").val();

        $.post('/api/getorder', currentState1, function(data, status){

            // catch if ordernumber does not exist
            if (data.status === "FAILURE") {
                alert("Sorry... We can't find that order");
                return;
            }
            // catch if bad credentials
            if (data.status === null) {
                alert("Sorry... Those credentials are not working");
                return;
            }
            // catch if moniker not found
            if (!data.emailTypes) {
                alert("The Retailer Moniker is not right");
                return;
            }
            // warning if order had not shipped
            if (!data.order_info.shipments) {
                alert("Nothing on this order has shipped.  That's OK, we'll stub in a shipment.  But know that we'll be making that part up")
            } else {
                alert("Success!  See the template types in the 'Emails Alert Type' section below.")   
            }

            console.log("Data: " + data.order_info.order_number + "\nStatus: " + status);

            currentState2.OrderAPIJSON = data;
            currentState = data.emailTypes;

            var a = '<option class="li" value="';
            var b = '">'
            var c = '</option>';
            // Loop through currentState and make dropdown values
            for (var key in currentState) {
                var emailListItem =  a + currentState[key] + b + currentState[key] + c;
                // add each new element to the dropdown
                 $(emailList).append(emailListItem);
            }
            // remove disabled attribute from form 2
            $("#name1").attr("disabled", false);
            $("#email1").attr("disabled", false);
            $("#send2").attr("disabled", false);
            $("#addRow").attr("disabled", false);
            $("#reset2").attr("disabled", false);
            $("#addRow").attr("disabled", false);
        });

        event.preventDefault();
    });
});




// Add emails imputs to DOM
$(document).ready(function(){
    $( "#addRow" ).click(function( event ) {
        
        if (emailCount >= 4) {
            alert("That's all for this round");
            return;
        }

        // make new item
        previousLine = emailCount;
        emailCount++;
        var newLine = '<div id=' + emailCount + '>Name:<br><input type="text" id="name' + emailCount + '" class="fieldInput" placeholder="Enter Name"><br>email:<br><input type="email" id="email' + emailCount + '" class="fieldInput" placeholder="Enter Email"><br></div>';
        $( emailRecipients ).append(newLine);

        if (previousLine === 1) {
            var deleteRowButton = '<button id="removeRow" class="buttonLarge" type="button">Remove a Row</button>';
            $( controls ).append(deleteRowButton);
        }

        event.preventDefault();
    });
});




// Second call
$(document).ready(function(){
    $( "#step2" ).submit(function( event ) {

        // get alert email number
        for (var key in currentState) {
            if (currentState[key] === $("#emailList").val()) {
                currentState2.alertEmailType = key;
            }
        }

        // Reset the state so we can add in the current list of recipients
        currentState2.recipients = [];

        // Add user endered emails
        for (var i = 0; i < emailCount; i++) {
            var line = i + 1;
            var name = '#name' + line;
            var email = '#email' + line;
            name = $(name).val();
            email = $(email).val();

            if (name && email) {
                var currentContact = new MakeEmailItem(name, email);
                currentState2.recipients.push(currentContact);
            }

        }

        // send off to make an email
        $.post('/api/sendemail', currentState2, function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            data = JSON.parse(data);
            if (data.results.total_accepted_recipients > 0) {
                var recipientCount = "The email was sent to " + data.results.total_accepted_recipients + " recipient(s)";
                alert(recipientCount);
            } else {
                alert("Something went wrong.  Could be the order. Please try a different order or leave the order field blank.")
            }

        });

        event.preventDefault();
    });
});




var MakeEmailItem = function(name, email) {
    var contact = {
        address: {
            email: email,
            name: name
        }
    };
    return contact;
};




var resetEmailRows = function() {
    if (emailCount > 1) {
        for (var i = emailCount; i > 1; i--) {
            var id = '#' + emailCount;
            $( id ).remove();
            emailCount--;
            previousLine--;

            if (emailCount === 1) {
                $( '#removeRow' ).remove();
            }
            currentState2.recipients.pop();
        }
    }

};




var resetEverything = function() {
        currentState1 = state.call1schema;
        currentState2 = state.call2schema;
        currentState = state.alertEmailTypes;

        resetEmailRows();

        // Reset Form Values
        $("#retailer").val("");
        $("#logon").val("");
        $("#password").val("");
        $("#order").val("");
        // Set env to Prod
        $("[name=env]").filter("[value='production']").prop("checked",true);
        $("[name=env]").filter("[value='qa']").prop("checked",false);

        $("option").remove();
        $("#name1").val("");
        $("#email1").val("");

        $("#name1").attr("disabled", true);
        $("#email1").attr("disabled", true);
        $("#send2").attr("disabled", true);
        $("#reset2").attr("disabled", true);
        $("#addRow").attr("disabled", true);
};




var resetForm2 = function() {
        currentState = state.alertEmailTypes;

        resetEmailRows();

        $("option").remove();
        $("#name1").val("");
        $("#email1").val("");

};




// Remove a row
$(document).ready(function(){
     $('body').on('click', "#removeRow", function () {

        var id = '#' + emailCount;
        $( id ).remove();
        emailCount--;
        previousLine--;

        if (emailCount === 1) {
            $( '#removeRow' ).remove();
        }

        currentState2.recipients.pop();

        event.preventDefault();
    });
});




// Reset form 1
$(document).ready(function(){
    $( "#reset1" ).click(function( event ) {

        resetEverything();

        event.preventDefault();
    });
});




// Reset form 2
$(document).ready(function(){
    $( "#reset2" ).click(function( event ) {

        currentState2 = state.call2schema;
        currentState = state.alertEmailTypes;

        // Reset Form Values
        $("#name1").val("");
        $("#email1").val("");

        resetEmailRows();

        event.preventDefault();
    });
});




// Reset the whole page
$(document).ready(function(){
    $( "#resetAll" ).click(function( event ) {

        resetEverything();

        event.preventDefault();
    });
});





// MODAL Section
//   $( function() {
//     $( "#dialog" ).dialog();
//   } );

// Create element and append to the dom
// <div id="dialog" title="Basic dialog">
//   <p>TSorry... Those credentials are not working</p>
// </div>

// Open the modal
// $("#dialog").dialog("open");


