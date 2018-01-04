var obj = {
    logon: "22615df5d6d440f28dcb80122a789a2e",
    password: "3e68906aea364164a6dc230a87a84bf6",
    retailer: "brownells",
    order: "1507672400"
}

obj = JSON.stringify(obj);

$(document).ready(function(){
    $("button.formSubmit").click(function(){
        $.get('/api/test', function(data, status){
            alert(data);
        });
    });
});



$(document).ready(function(){
    $("button.secondCall").click(function(){
        console.log('TEST secondCall');
        $.post('/api/getorder', obj,
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});

$(document).ready(function(){
    $("button.thirdCall").click(function(){
        console.log('TEST thirdCall');
        $.post('/api/sendemail', obj,
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});