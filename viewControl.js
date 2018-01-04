


$(document).ready(function(){
    $("button").click(function(){
        $.get('/api/test', function(data, status){
            alert(data);
        });
    });
});
