


$(document).ready(function(){
    $("button.formSubmit").click(function(){
        $.get('/api/test', function(data, status){
            alert(data);
        });
    });
});


$(document).ready(function(){
	
    $("button.secondCall").click(function(){
        $.post('/api/getorder', function(data, status){
            alert(data);
        });
    });
});
