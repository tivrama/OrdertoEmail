var state = {
    call1schema: {
        logon: "",
        password: "",
        retailer: "",
        order: ""
    },

    call2schema: {
        retailer: "",
        alertEmailType: "",
        OrderAPIJSON: {},
        recipients: [
            {
                address: {
                    email: "",
                    name: ""
                }
            }
        ]
    },
    
    alertEmailTypes: {}
     
};

// Set initial state
var currentState1 = state.call1schema;
var currentState2 = state.call2schema;
var currentState = state.alertEmailTypes;
var emailCount = 1;


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
            $("#name").removeAttr("disabled");
            $("#email").removeAttr("disabled");
            $("#send2").removeAttr("disabled");
            $("#addRow").removeAttr("disabled");
        });

        event.preventDefault();
    });
});



// Add emails to list
$(document).ready(function(){
    $( "#addRow" ).click(function( event ) {
        console.log("Inside add row")
        // make new item
        var previousLine = emailCount;
        emailCount++;
        var newLine = '<input type="text" id="name' + emailCount + '" class="fieldInput" required="true" placeholder="Enter Name"><br>email:<br><input type="text" id="email' + emailCount + '" class="fieldInput" required="true" placeholder="Enter Email"><br>'
console.log(newLine)
        $( email1 ).append(newLine);

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

        // add emails
        currentState2.recipients[0].address.name = $("#name1").val();
        currentState2.recipients[0].address.email = $("#email1").val();

        // send off to make an email
        $.post('/api/sendemail', currentState2, function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            data = JSON.parse(data);
            if (data.results.total_accepted_recipients > 0) {
                alert("The email was sent")
            } else {
                alert("Something went wrong.  Could be the order. Please try a different order or leave the order field blank.")
            }

        });

        event.preventDefault();
    });
});


var resetEverything = function() {
        currentState1 = state.call1schema;
        currentState2 = state.call2schema;
        currentState = state.alertEmailTypes;

        $("#name").attr("disabled");
        $("#email").attr("disabled");
        $("#send2").attr("disabled");

        // Reset Form Values
        $("#retailer").val("");
        $("#logon").val("");
        $("#password").val("");
        $("#order").val("");

        $("option").remove();
        $("#name").val("");
        $("#email").val("");
}

var resetForm2 = function() {
        currentState = state.alertEmailTypes;

        $("option").remove();
        $("#name").val("");
        $("#email").val("");
}

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

        currentState1 = state.call1schema;
        currentState = state.alertEmailTypes;

        // Reset Form Values
        $("#name").val("");
        $("#email").val("");

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


