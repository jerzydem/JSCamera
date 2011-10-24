var draw = (function() {
    var that = {};
    var picture = document.getElementById('picture');
    if (picture.getContext){
        var context = picture.getContext('2d');
        context.fillStyle = "rgb(255,0,0)";
        context.fillRect(30, 30, 50, 50);
    }

    return that;

    
}) ();

window.onload = function () {
    var figure = store.get_figure();
 //   figure.triangles.forEach( function 
    draw();
}