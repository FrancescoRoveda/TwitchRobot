// Prevent scrolling on every click!

// super sweet vanilla JS delegated event handling!
document.body.addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "A") {
    e.preventDefault();
	}
});


$(function() {
    $('.movement').on('click', function(e) {
        e.preventDefault()
        SendComand($(this).attr("id"));
    });
    $(document).on('keydown', function(e) {
        switch(e.which) {
            case 37:
                SendComand('left');
                break;
            case 39:
                SendComand('right');
                break;
            case 38:
                SendComand('forward');
                break;
            case 40:
                SendComand('back');
                break;
            }
        });
    });
    
    function SendComand(comand){
    console.log(comand)
    $.ajax({
        type: "POST",
        url: "/movement",
        data: comand,
        dataType:'JSON',
        success: function(response){
            console.log(response);
        }
    });
}