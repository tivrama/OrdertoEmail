var obj = {
    logon: "1234",
    password: "5678",
    retailer: "brownells",
    order: "order 123"
}




$(document).ready(function(){
    $("button.formSubmit").click(function(){
        $.get('/api/test', function(data, status){
            alert(data);
        });
    });
});



$(document).ready(function(){
    $("button.secondCall").click(function(){
        console.log('TEST');
        $.post('/api/getorder', obj,
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});