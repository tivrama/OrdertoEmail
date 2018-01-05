console.log("HIIII!!!")

$(document).ready(function(){
    $("button.formSubmit").click(function(){
        console.log("Test in viewControl");
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