var draw = (function() {
    var that = {};



// PUBLIC INTERFACE

    that.start_draw = function (){
        var figure = store.get_figure();
        figure.triangles.forEach( function ( triangle ){
            draw_triangle( triangle );
        });             
    }

//    that.make_draw = function(){
//        var picture = document.getElementById('picture');
//        if (picture.getContext){
//            var context = picture.getContext('2d');
//            context.fillStyle = "rgb(255,0,0)";
//            context.fillRect(150, 150, 50, 50);
//        }
//    }

// E N D   PUBLIC INTERFACE




// PRIVATE INTERFACE
    function draw_triangle( trian ) {
        var picture = document.getElementById('picture');
        var pointA = store.get_transform_point( trian.a )[0];
        var pointB = store.get_transform_point( trian.b )[0];
        var pointC = store.get_transform_point( trian.c )[0];
        var Ax = pointA.cor.x;
        var Ay = pointA.cor.y;
        var Bx = pointB.cor.x;
        var By = pointB.cor.y;
        var Cx = pointC.cor.x;
        var Cy = pointC.cor.y;
        
        
        
        
        if (picture.getContext){
            var ctx = picture.getContext('2d');
            ctx.strokeStyle = "rgb(255,0,0)";
            
            ctx.beginPath();
            ctx.moveTo( Ax, Ay );
            ctx.lineTo( Bx, By );
            ctx.lineTo( Cx, Cy );
            ctx.closePath();
            ctx.stroke();
           //ctx.fillRect(150, 150, 150, 50);
        }
        
    }
// E N D   PRIVATE INTERFACE


    return that;

    
}) ();

window.onload = function () {
//       if (picture.getContext){
//            var ctx = picture.getContext('2d');
//            ctx.strokeStyle = "rgb(255,0,0)";
//ctx.beginPath();
//ctx.moveTo(75,50);
//ctx.lineTo(100,75);
//ctx.lineTo(100,25);
//ctx.closePath();
//ctx.stroke();
//}
    draw.start_draw();
//    draw.make_draw();
}
