console.log("HIIII!!!")


var state = {
    call1schema: {
        logon: "",
        password: "",
        retailer: "",
        order: ""
    },

    call2schema: {
        alertEmailType: "",
        orderAPIJSON: {},
        emailNames: []
    },
    
    alertEmailTypes: []
     
};

var currentState1 = state.call1schema;
var currentState2 = state.call2schema;
var currentState = state.alertEmailTypes;


// put values in here for testing
var sample1 = {
    logon: "",
    password: "",
    retailer: "brownells",
    order: ""
}




$(document).ready(function(){
    $( "#target" ).submit(function( event ) {
        console.log(event)
        currentState1.retailer = $("#retailer").val();
        currentState1.logon = $("#logon").val();
        currentState1.password = $("#password").val();
        currentState1.order = $("#order").val();

        // Toggle this for testing
        // $.post('/api/getorder', currentState1, function(data, status){
        $.post('/api/getorder', sample1, function(data, status){
            console.log("Data: " + data.order_info.order_number + "\nStatus: " + status);
            currentState2.orderAPIJSON = data.order_info;
            currentState = data.emailTypes
        });

      // alert('logon: ', event.target);
      event.preventDefault();
    });
});


