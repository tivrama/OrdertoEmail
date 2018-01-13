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



var currentState1 = state.call1schema;
var currentState2 = state.call2schema;
var currentState = state.alertEmailTypes;



// put values in here for testing
var sample1 = {
    logon: "",
    password: "",
    retailer: "brownells",
    order: "1507672400"
}




// First call
$(document).ready(function(){
    $( "#step1" ).submit(function( event ) {
        
        var lintedRetailer = $("#retailer").val().toLowerCase().replace(/[-]/gi, '_');

        currentState1.retailer = lintedRetailer;
        currentState2.retailer = currentState1.retailer;
        currentState1.logon = $("#logon").val();
        currentState1.password = $("#password").val();
        currentState1.order = $("#order").val();


        // Toggle this for testing
        $.post('/api/getorder', currentState1, function(data, status){
        // $.post('/api/getorder', sample1, function(data, status){

            // add catch if ordernumber does not exist
            if (data.status === "FAILURE") {
                alert("Sorry... We can't find that order");
                return;
            }

            if (data.status === null) {
                alert("Sorry... Those credentials are not working");
                return;
            }

            if (!data.emailTypes) {
                alert("The Retailer Moniker is not right");
                return;
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
        });

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
        currentState2.recipients[0].address.name = $("#name").val();
        currentState2.recipients[0].address.email = $("#email").val();
        // currentState2 = JSON.stringify(currentState2);

        console.log("currentState2: ", currentState2.OrderAPIJSON)

        // send off to make an email
        $.post('/api/sendemail', currentState2, function(data, status){

            console.log("Data: " + data + "\nStatus: " + status);

        });

    event.preventDefault();
    });
});


// Reset form 1
$(document).ready(function(){
    $( "#reset1" ).click(function( event ) {

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

        event.preventDefault();
    });
});



