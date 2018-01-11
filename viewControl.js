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
        
        currentState1.retailer = $("#retailer").val();
        currentState2.retailer = currentState1.retailer
        currentState1.logon = $("#logon").val();
        currentState1.password = $("#password").val();
        currentState1.order = $("#order").val();


        // Toggle this for testing
        $.post('/api/getorder', currentState1, function(data, status){
        // $.post('/api/getorder', sample1, function(data, status){
            console.log("Data: " + data.order_info.order_number + "\nStatus: " + status);
            currentState2.OrderAPIJSON = data;
            currentState = data.emailTypes;

            var a = '<option value="';
            var b = '">'
            var c = '</option>';
            // Loop through currentState and make dropdown values
            for (var key in currentState) {
                var d =  a + currentState[key] + b + currentState[key] + c;
                // add each new element to the dropdown
                 $(emailList).append(d);
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


// Reset the whole page
$(document).ready(function(){
    $( "#resetAll" ).submit(function( event ) {

        currentState1 = state.call1schema;
        currentState2 = state.call2schema;
        currentState = state.alertEmailTypes;

        $("#name").addAttr("disabled");
        $("#email").addAttr("disabled");
        $("#send2").addAttr("disabled");

        // TODO: Reset Form Values

    event.preventDefault();
    });

});



