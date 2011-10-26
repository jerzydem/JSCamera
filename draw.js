var draw = (function() {
    var that = {};
    var z0 = 2;
    var step = 0.02;
    var radian_step = 0.02;


// PUBLIC INTERFACE

    that.start_draw = function() {
        var triangles = store.get_triangles();
        var tr_points = store.tranform_points( z0 );

        var canvas = document.getElementById('picture');
        if ( canvas.getContext ){
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);                        

            triangles.forEach( function ( triangle ){
                draw_triangle( triangle, tr_points, ctx );
            });             
        }
    }    
    
    that.prepare_interface = function() {
        $('#cam-zoom-in').click( zoom_in );
        $('#cam-zoom-out').click( zoom_out );
        $('#cam-move-left').click( function () {
            move_object(-step, 0, 0); 
        });
        $('#cam-move-right').click( function () {
            move_object(step, 0, 0); 
        });        
        $('#cam-move-up').click( function () {
            move_object(0, step, 0); 
        });        
        $('#cam-move-down').click( function () {
            move_object(0, - step, 0); 
        });        
        $('#cam-move-closer').click( function () {
            move_object(0, 0, -step); 
        });        
        $('#cam-move-further').click( function () {
            move_object(0, 0, step); 
        });        

        // ROTATION
        $('#cam-rotateX-left').click( function () {
            rotation( 'X' , -radian_step ); 
        });        
        $('#cam-rotateX-right').click( function () {
            rotation( 'X' , radian_step ); 
        });        
        $('#cam-rotateY-left').click( function () {
            rotation( 'Y' , -radian_step ); 
        });        
        $('#cam-rotateY-right').click( function () {
            rotation( 'Y' , radian_step ); 
        });        
        $('#cam-rotateZ-left').click( function () {
            rotation( 'Z' , -radian_step ); 
        });        
        $('#cam-rotateZ-right').click( function () {
            rotation( 'Z' , radian_step ); 
        });        

        
         $(document).keypress( function( event ) {
          //  alert('wcisnales - '+ event.keyCode );
            if( event.keyCode === 122 ) {
                $('#cam-zoom-in').trigger( $.Event('click') );
            }else if( event.keyCode === 97 ) {
                $('#cam-zoom-out').trigger( $.Event('click') );
            }else if( event.keyCode === 110 ) {
                $('#cam-move-closer').trigger( $.Event('click') );
            }else if( event.keyCode === 109 ) {
                $('#cam-move-further').trigger( $.Event('click') );
            }else if( event.keyCode === 106 ) {
                $('#cam-move-left').trigger( $.Event('click') );
            }else if( event.keyCode === 108 ) {
                $('#cam-move-right').trigger( $.Event('click') );
            }else if( event.keyCode === 105 ) {
                $('#cam-move-up').trigger( $.Event('click') );
            }else if( event.keyCode === 107 ) {
                $('#cam-move-down').trigger( $.Event('click') );
            }else if( event.keyCode === 120 ) {
                $('#cam-rotateX-right').trigger( $.Event('click') );
            }else if( event.keyCode === 115 ) {
                $('#cam-rotateX-left').trigger( $.Event('click') );
            }else if( event.keyCode === 100 ) {
                $('#cam-rotateY-left').trigger( $.Event('click') );
            }else if( event.keyCode === 99 ) {
                $('#cam-rotateY-right').trigger( $.Event('click') );
            }else if( event.keyCode === 102 ) {
                $('#cam-rotateZ-left').trigger( $.Event('click') );
            }else if( event.keyCode === 118 ) {
                $('#cam-rotateZ-right').trigger( $.Event('click') );
            }
            
            
            
        });

    }

    that.test_rotation = function( ax ){
        rotation(ax, radian_step );
    }
    
    
// E N D   PUBLIC INTERFACE




// PRIVATE INTERFACE


    function zoom_in(){
        z0 = z0 + step;
        if (z0 < 0 ){
            z0 = 0;
        }
        that.start_draw();
    
    }
  
    function zoom_out(){
        z0 = z0 - step;
        if (z0 < 0 ){
            z0 = 0;
        }
        that.start_draw();    
    }

    function move_object( Tx, Ty, Tz ){
        store.move_points( Tx, Ty, Tz );
        that.start_draw();    
    }
    
    function rotation( ax, angle ){
        store.rotate_points( ax, angle );
        that.start_draw();        
    }

    function draw_triangle( trian, tranform_points, ctx ) {
        var pointA = store.get_point_from_points( tranform_points, trian.a )[0];
        var pointB = store.get_point_from_points( tranform_points, trian.b )[0];
        var pointC = store.get_point_from_points( tranform_points, trian.c )[0];
        var Ax = pointA.cor.x;
        var Ay = pointA.cor.y;
        var Bx = pointB.cor.x;
        var By = pointB.cor.y;
        var Cx = pointC.cor.x;
        var Cy = pointC.cor.y;
 
        ctx.strokeStyle = "rgb( "+ trian.colR +", " + trian.colG + " , " + trian.colB +" )";
            
        ctx.beginPath();
        ctx.moveTo( Ax, Ay );
        ctx.lineTo( Bx, By );
        ctx.lineTo( Cx, Cy );
        ctx.closePath();
        ctx.stroke();
       //ctx.fillRect(150, 150, 150, 50);
        
    }
// E N D   PRIVATE INTERFACE


    return that;

    
}) ();

window.onload = function () {
    draw.prepare_interface();
    draw.start_draw();
}
