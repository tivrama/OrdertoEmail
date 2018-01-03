


$(document).ready(function(){
    $("button").click(function(){
        $.get('/api/test', function(data, status){
            alert(data);
        });
    });
});


// $(document).ready(function(){
//     $("button").click(function(){
//         $.get("http://api.openweathermap.org/data/2.5/weather?appid=f6b4e0af94ea86bd430741b441c487bb&q=" + city + ",us", function(data, status){
//             alert("Data: " + data + "\nStatus: " + status);
//         });
//     });
// });