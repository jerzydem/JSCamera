//TODO:
// obliczenia na macierzach
// generowanie rzutu z punktów na ekran

var store = (function () {
    var that = {};
    
    
    // M A T R I X   O B J E C T
    function Matrix() {}
    Matrix.prototype = {

        // MATRIX TABLE
        value: new Array(),
 
        // MATRIX FUNCTIONS
 
        add_new_matrix: function ( matrix_table ){
        // TODO add check for matrix_table
            this.value = matrix_table;        
        },
        
            // MATRIX MATEMATICAL OPERATIONS
        add_matrix: function ( matrix_table ){
            if ( this.is_desame_size( matrix_table ) !== true ){
                return NaN;
            }else{
                var i=0;
                var j=0;            
                this.value.forEach( function( row ) {                    
                    row.forEach( function( num ) {
                        row[j] = num + matrix_table[i][j];
                        j++;
                    });
                    j=0;
                    i++;                
                });
            }
        },
        
        scalar_matrix_multiplication: function ( scalar ){
            if ( typeof scalar !== 'number' ){
                return NaN;
            }else{
                var j = 0;
                this.value.forEach( function( row ) {
                    row.forEach( function( num ) {
                        row[j] = scalar * num;
                        j++;
                    });
                    j=0
                });
        
            }
        },
        
        matrix_multiplication: function ( matrix_table ){
            var new_matrix = [];
            var new_matrix_row;
            if ( this.is_desame_rows_cols_number( matrix_table ) === false ){
                return NaN;
            }else{
                var matrix2_cols = matrix_table[0].length;
                var row_num = 0;
                this.value.forEach( function( row ) {
                    new_matrix_row = [];
                    for ( var i = 0; i < matrix2_cols ; i++ ){
                        var new_value = 0;
                        for (var num in row){
                            new_value = new_value + row[num] * matrix_table[num][i];
                        }
                        new_matrix_row[i] = new_value;
                    }
                    new_matrix[row_num] = new_matrix_row;
                    row_num++;    
                });
                this.add_new_matrix( new_matrix );
            }
                
        },
        
        transposition: function(){
            var new_matrix = [];
            var new_matrix_row;
            var matrix_cols_num = this.value[0].length;
            var matrix_rows_num = this.value.length;

            
            for ( var i = 0; i < matrix_cols_num ; i++ ){
                new_matrix_row = [];
                for (var j = 0; j < matrix_rows_num ; j++ ){
                    new_matrix_row[j] = this.value[j][i];
                }
                new_matrix[i] = new_matrix_row;
            }
            this.add_new_matrix( new_matrix );

        },
        
        right_tringular: function() {
        var rows_num = this.value.length;
        var cols_num = this.value[0].length;
        var i, j, c, p, k = rows_num; 
        var tmp;
        do { 
            i = rows_num - k;
            if ( this.value[i][i] === 0 ) {
                for ( j = i + 1; j < rows_num; j++ ) {
                    if ( this.value[j][i] !== 0 ){
                        tmp = [];
                        c = cols_num;
                        do{
                            p = cols_num - c;
                            tmp.push(this.value[i][p] + this.value[j][p]);
                            
                            
                        }while ( --c );
                        this.value[i] = tmp;
                        break;                    
                    }                
                }
            }        
                if ( this.value[i][i] !== 0 ) {
                    for ( j = i + 1; j < rows_num; j++ ) {
                        var element = this.value[j][i] / this.value[i][i];
                        tmp = [];
                        c = cols_num;
                        do{ 
                            p = cols_num - c;
                            tmp.push(p <= i ? 0 : this.value[j][p] - this.value[i][p] * element);                  
                        } while ( --c );
                        this.value[j] = tmp;
                    }
                }
            } while ( --k );
            return this.value;   
        },
            
        matrix_det: function() {
            if ( !this.is_desame_rows_cols_number ){
                return NaN;
            }
            var matrix_table = this.right_tringular();
            var det_value = this.value[0][0];
            var rows_index = this.value.length - 1;
            var k = rows_index;
            var i;
            do { 
                i = rows_index -k + 1;
                det_value = det_value * this.value[i][i];
            } while ( --k );
            return det_value;
        },

        
        
        matrix_inverse: function() {
            if( !this.is_desame_rows_cols_number ||
                this.matrix_det === 0 ){
                return NaN;
                }
            var rows_num = this.value.length;
            var k = rows_num;
            var i, j;
            var ident = Matrix.identity( rows_num )
            var M = this.augment( ident.value );
            M.right_tringular();
            var np;
            var kp = M.value[0].length;
            var p, tmp, divisor;
            var inverse_elements = [];
            var new_element;
            // Cycle through rows from last to first
            do { 
                i = rows_num - 1;
                // First, normalise diagonal elements to 1
                tmp = [];
                np = kp;
                inverse_elements[i] = [];
                divisor = M.value[i][i];
                do { 
                    p = kp - np;
                    new_element = M.value[i][p] / divisor;
                    tmp.push( new_element );
                    // Shuffle of the current row of the right hand side into the results
                    // array as it will not be modified by later runs through this loop                    
                    if ( p >= k ) {
                        inverse_elements[i].push( new_element );
                    }
                } while ( --np );
                M.value[i] = tmp;
                // Then, subtract this row from those above it to
                // give the identity matrix on the left hand side
                for ( j=0; j < i; j++ ) {
                    tmp = [];
                    np = kp;
                    do {
                        p = kp - np;
                        tmp.push(M.value[j][p] - M.value[i][p] * M.value[j][i]);
                    } while ( --np );
                    M.value[j] = tmp;
                }
            } while ( --rows_num );
            var res = Matrix.create( inverse_elements );
 
            return res;       
        },
        
            // END MATRIX MATEMATICAL OPERATIONS


        //attaching the given argument to the right side of the matrix
        augment: function (matrix_table){
            var M = Matrix.value || matrix_table;
            var T = this.copy();
            var cols_num = T.value[0].length;
            var rows_num = T.value.length;
            var i_rows_num = rows_num;
            var i, nj, j;
            var M_cols_num = M[0].length;
            if ( rows_num !== M.length){
                return NaN;
            }
            do {
                i = rows_num - i_rows_num;
                nj = M_cols_num;
                do{ 
                    j= M_cols_num - nj
                        T.value[i][cols_num + j] = M [i][j];
                }while ( --nj )
            }while ( --i_rows_num );
            return T;
        },

        copy: function(){
            var new_copy = this.constructor();
            for ( var attr in this){
                new_copy[attr] = this[attr];
            }
            return new_copy;
        },
        
        is_desame_size: function( matrix_table ){
            var desame = true;
            var rows = this.value.length;
            var cols = this.value[0].length;
            if ( matrix_table.length === rows ){
                 matrix_table.forEach( function( row ){
                     if ( row.length !== cols ){
                        desame = false;
                        return;
                     }
                 });
            }else{
            desame = false;            
            }
            return desame;
        },
        
        is_desame_rows_cols_number: function( matrix_table ){
            if ( this.value[0].length === matrix_table.length){
                return true;
            }else{
                return false;
            }
        },
        
        is_empty: function(){
            return this.value.length < 1 ? true : false;        
        },  

        // END MATRIX FUNCTIONS
        
    };
    
    // E N D  M A T R I X   O B J E C T


    // M A T R I X   G E N E R A T O R

    //return Identity matrix_table of size n
    Matrix.identity = function(n){
        var tmp = [];
        var k = n;
        var i, nj, j;

        do {
            i = k - n;
            tmp[i] = [];
            nj = k;
            do { 
                j = k - nj;
                tmp[i][j] = ( i === j ) ? 1 : 0;
            } while ( --nj );
        } while ( --n );
        var M = Matrix.create( tmp );        
        return M;
     };
    
     //create new matrix
     Matrix.create = function( matrix_table ){
        
        var M = new Matrix();
        M.add_new_matrix( matrix_table );
        return M;
     };



    // Crete Perspective Projection Matrix

     Matrix.perspective_matrix = function( z ){
        var tmp = [];
        
        tmp[0] = [ 1, 0, 0, 0 ];
        tmp[1] = [ 0, 1, 0, 0 ];
        tmp[2] = [ 0, 0, 1, 0 ];
        tmp[3] = [ 0, 0, 1/z , 0];
        var M = Matrix.create( tmp );
        return M; 
     };

    Matrix.move_matrix = function( Tx, Ty, Tz ) {
        var tmp = [];
        
        tmp[0] = [ 1, 0, 0, Tx ];
        tmp[1] = [ 0, 1, 0, Ty ];
        tmp[2] = [ 0, 0, 1, Tz ];
        tmp[3] = [ 0, 0, 0 , 1];
        var M = Matrix.create( tmp );
        return M;     
    };    
    
    Matrix.rotation_ox = function( angle ){
       var tmp = [];
        
        tmp[0] = [ 1, 0                    , 0                    , 0 ];
        tmp[1] = [ 0, Math.cos( angle ) , -Math.sin( angle ), 0 ];
        tmp[2] = [ 0, Math.sin( angle ) , Math.cos( angle ) , 0 ];
        tmp[3] = [ 0, 0                    , 0                 , 1 ];
        var M = Matrix.create( tmp );
        return M;     
    }

    Matrix.rotation_oy = function( angle ){
       var tmp = [];
        
        tmp[0] = [ Math.cos( angle ), 0, Math.sin( angle ), 0 ];
        tmp[1] = [ 0                , 1, 0                  , 0 ];
        tmp[2] = [-Math.sin( angle ), 0, Math.cos( angle ), 0 ];
        tmp[3] = [ 0                , 0, 0                   , 1 ];
        var M = Matrix.create( tmp );
        return M;     
    }

    Matrix.rotation_oz = function( angle ){
       var tmp = [];
        
        tmp[0] = [ Math.cos( angle ), -Math.sin( angle ), 0, 0 ];
        tmp[1] = [ Math.sin( angle ), Math.cos( angle ) , 0, 0 ];
        tmp[2] = [ 0                 , 0                    , 1, 0 ];
        tmp[3] = [ 0                , 0                    , 0, 1 ];
        var M = Matrix.create( tmp );
        return M;     
    }

    
    // E N D    M A T R I X   G E N E R A T O R


    
    // E X A M P L E   V A L U E S
    
    var example_vector1 = [ 
    [ 17, 4, 5, 3 ]
    ];
    
    var example_vector2 = [ 
    [ -1, 24, 35, 33 ]
    ];

    example_matrix_3x2 = [
        [12, 25],
        [ 9, 10],
        [ 8,  5],
    ];
    
    var example_matrix_3x3 = [
        [  1, 5, 6 ],
        [  4, 5, 6 ],
        [  1, 2, 2 ]
   ];

        // det = 6
       var example2_matrix_3x3 = [
        [ -2, 2, 3 ],
        [ -1, 1, 3 ],
        [  2, 0,-1 ]
   ];

   
    var example_matrix_4x3 = [
        [  7, 8, 6 ],
        [  4, 3, 6 ],
        [  9, 2, 4 ],
        [  5, 2, 2 ]
   ];
    
    var example2_matrix_4x3 = [
        [ 14,  9,  3],
        [  2, 11, 15],
        [  0, 12, 17],
        [  5,  2,  3],
    ];
    
    
    var example_matrix_4x4 = [
        [  1, 4, 5, 6 ],
        [  1, 4, 5, 6 ],
        [  1, 4, 5, 6 ],
        [  1, 4, 5, 6 ]
   ];

    var example2_matrix_4x4 = [
        [  10, 14, 5, 2 ],
        [  6, 1, 2, 9 ],
        [  7, 3, 5, 16 ],
        [  1, 14, 16, 6 ],
   ];
   
   var example3_matrix4x4 = [
        [ 2, 4, 6, 7],
        [ 3, 6, 5, 5],
        [ 4, 2, 3, 2],
        [ 5, 1, 2, 6],
    ];
    
    var example4_matrix4x4 = [
        [1, 2, 3, 4],
        [5, 4, 2, 5],
        [2, 5, 6, 3],
        [8, 4, 1, 3],
    ];

    // E N D   E X A M P L E   V A L U E S


    
    
    
    
    
    // 3D O B J E C T  D E F I N I T I O N
    
    var points = [
        { num: 1, cor: {x: -0.1, y: -0.1, z:  5.9, p: 1 }, }, //under square
        { num: 2, cor: {x:  0.1, y: -0.1, z:  5.9, p: 1 }, },
        { num: 3, cor: {x:  0.1, y: -0.1, z:  5.7, p: 1 }, },
        { num: 4, cor: {x: -0.1, y: -0.1, z:  5.7, p: 1 }, },
        { num: 5, cor: {x: -0.1, y:  0.1, z:  5.9, p: 1 }, }, //top square
        { num: 6, cor: {x:  0.1, y:  0.1, z:  5.9, p: 1 }, },
        { num: 7, cor: {x:  0.1, y:  0.1, z:  5.7, p: 1 }, },
        { num: 8, cor: {x: -0.1, y:  0.1, z:  5.7, p: 1 }, },
        { num: 9, cor: {x: 0,    y:  0.2, z:  5.8, p: 1 }, },
        
        { num: 10,cor: {x: 0.3,  y: -0.1, z:  5.7, p: 1 }, }, //2 figure top square
        { num: 11,cor: {x: 0.3,  y: -0.1, z:  5.5, p: 1 }, },        
        { num: 12,cor: {x: 0.1,  y: -0.1, z:  5.5, p: 1 }, },
        { num: 13,cor: {x: 0.1,  y: -0.3, z:  5.7, p: 1 }, }, //2 figure under square
        { num: 14,cor: {x: 0.3,  y: -0.3, z:  5.7, p: 1 }, }, 
        { num: 15,cor: {x: 0.3,  y: -0.3, z:  5.5, p: 1 }, },        
        { num: 16,cor: {x: 0.1,  y: -0.3, z:  5.5, p: 1 }, },

    ];        


//    var points = [
//        { num: 1, cor: {x: 100, y: 100, z:  100, p: 1 }, }, //under square
//        { num: 2, cor: {x:  200, y: 200, z:  100, p: 1 }, },
//        { num: 3, cor: {x:  0, y: 50, z: -100, p: 1 }, },
//    ];        



    
    var triangles = [
        { a: 5, b: 1, c: 2, colR: 0, colG: 0, colB: 255 }, //side walls
        { a: 6, b: 2, c: 3, colR: 0, colG: 0, colB: 255 },
        { a: 7, b: 3, c: 4, colR: 0, colG: 0, colB: 255 },
        { a: 8, b: 4, c: 1, colR: 0, colG: 0, colB: 255 },          
        { a: 1, b: 2, c: 3, colR: 0, colG: 255, colB: 0 }, //under square 
        { a: 1, b: 3, c: 4, colR: 0, colG: 255, colB: 0 },
        { a: 5, b: 6, c: 7, colR: 255, colG: 0, colB: 0 }, //top square
        { a: 5, b: 7, c: 8, colR: 255, colG: 0, colB: 0 },
        { a: 5, b: 6, c: 9, colR: 255, colG: 0, colB: 0 }, //top point
        { a: 6, b: 7, c: 9, colR: 255, colG: 0, colB: 0 }, 
        { a: 7, b: 8, c: 9, colR: 255, colG: 0, colB: 0 }, 
        { a: 8, b: 5, c: 9, colR: 255, colG: 0, colB: 0 },
        
        { a: 13, b: 14, c: 3 , colR: 0, colG: 255, colB: 0 }, //figure 2 side walls
        { a: 14, b: 15, c: 10, colR: 0, colG: 255, colB: 0 },
        { a: 16, b: 15, c: 11, colR: 0, colG: 255, colB: 0 },
        { a: 13, b: 16, c: 12, colR: 0, colG: 255, colB: 0 },          
        { a: 10, b: 12, c: 11, colR: 0, colG: 255, colB: 0 }, //figure 2 - top square
        { a: 3 , b: 10, c: 12, colR: 0, colG: 255, colB: 0 },
        { a: 13, b: 14, c: 16, colR: 0, colG: 255, colB: 0 }, //figure 2 - under square
        { a: 14, b: 16, c: 15, colR: 0, colG: 255, colB: 0 },


 
    ];

    // E N D   3D O B J E C T  D E F I N I T I O N
    

    
    
    

// PUBLIC INTERFACE

    that.get_figure = function(){
        return figure();
    }
    
    that.get_triangles = function(){
        return triangles;
    }    
    
    that.get_point = function( num ) {
        if ( typeof num !== 'number'){
            return NaN;
        }else{
            return points.filter( function( element, index, aray ){
                return (element.num === num);
            });
        }
    }        
    
    
     that.get_point_from_points = function( tr_points, num ) {
        if ( typeof num !== 'number'){
            return NaN;
        }else{
            return tr_points.filter( function( element, index, aray ){
                return (element.num === num);
            });
        }    
    }
     
    that.move_points = function( Tx, Ty, Tz ){
        points.forEach(function( point ){
            move_point( point, Tx, Ty, Tz );        
        });                
    }
    
    that.rotate_points = function( ax, angle ) {
        points.forEach( function( point ){
            rotate_point( point, ax, angle );
        });
    }
    
    that.get_transform_point = function ( num , z ){
        var point = jQuery.extend( true, {},  that.get_point( num ) );
        point[0].cor.x = point[0].cor.x + 300;
        point[0].cor.y = - point[0].cor.y + 300;
        return point;
    
    }
    
    
    //return points table with x, y transform for 2d draw
    that.tranform_points = function ( z ) {
        
        var tmp_points = jQuery.extend( true, [],  points );
        
        tmp_points.forEach( function ( point ) {
            transform_point_to_2d( point, z );
        });
        all_points_normalization( tmp_points );
        all_to_canvas_cordinates( tmp_points );
        
        return tmp_points;
    
    }
//         points_table.forEach(function ( point ) {
//            point_normalization(point.cor);
//        })                
//        return points_table;   
    
    // PUBLIC TESTS
    that.test_point_norm = function( point ) {
           point_normalization(point);
           return point; 
    }

    that.all_points_normalization = function( points_table ) {
        return all_points_normalization( get_points());
        
    }
    
    that.get_example_matrix = function() {
        return example_matrix_4x4;
    }
    
    that.get_matrix = function() {
        return matrix;
    }
    
    that.test_matrix = function() {
        matrix.add_new_matrix( example_matrix_4x4);
        return matrix;
    }

    that.test_empty_matrix = function() {
        that.test_matrix();
        return matrix.is_desame_size(example2_matrix_4x4);
    }

    that.test_add_matrix = function() {
        matrix.add_new_matrix( example_vector1 );
        matrix.add_matrix( example_vector2 );
        return that.get_matrix();
    }

    that.test_scalar_matrix_multiplication = function() {
        matrix.add_new_matrix( example_matrix_4x4 );
        matrix.scalar_matrix_multiplication(3);
        return that.get_matrix();
    }
    
    that.test_is_desame_rows_cols_number = function() {
        matrix.add_new_matrix( example_matrix_3x3 );
        return matrix.is_desame_rows_cols_number( example_matrix_4x3 );
    
    }
    
    that.test_matrix_multiplication = function() {
        matrix.add_new_matrix( example2_matrix_4x3 );
        matrix.matrix_multiplication( example_matrix_3x2 );
        return that.get_matrix();
    }
    
    that.test_transposition = function(){
        matrix.add_new_matrix( example_matrix_4x4 );
        matrix.transposition();
        return that.get_matrix();
    }
    
    that.test_right_tringular = function() {
        matrix.add_new_matrix( example2_matrix_4x4 );
        return matrix.right_tringular();
    }
    
    that.test_matrix_det = function() {
        matrix.add_new_matrix( example2_matrix_3x3 );
        return matrix.matrix_det();
    }
    
    that.test_augment = function() {
        matrix.add_new_matrix( example2_matrix_3x3 );
        return matrix.augment();
    }
    
    that.test_copy = function() {
        matrix.add_new_matrix( example2_matrix_3x3 );
        var t = matrix.copy();
        matrix.add_new_matrix( example2_matrix_4x4 );
        return t;
    }
    
    that.test_identity = function( n ){
        
        return Matrix.identity(5);
    }
    
    that.test_inverse = function() {
        var M = Matrix.create( example3_matrix4x4 );

        var newM = M.copy();
        return newM.matrix_inverse();
    }
    
    that.test_perspective_matrix = function() {
    
        var M = Matrix.perspective_matrix( 3 );
        return M
    }
    
    that.test_transform_point = function() {
        var my_point = points[1];
        return transform_point( my_point, 50 );
    
    }
    
    that.test_tranform_points = function(){
        return that.tranform_points( 0.3 );
    }
    
    
    //E N D PUBLIC TESTS

    
// E N D PUBLIC INTERFACE

  
  
  
  
  
  

// PRIVATE INTERFACEtranform_points
    function get_points() {
        return points;
    }

    function get_triangles() {
        return triangles;
    }
    
    
    function point_normalization( point ) {
        if ( point.p !== 1 ){
            point.x = point.x / point.p;
            point.y = point.y / point.p;
            point.z = point.z / point.p;
            point.p = 1;
        }
    }
    
    // normalize all points in table
    function all_points_normalization( points_table ){
        points_table.forEach(function ( point ) {
            point_normalization(point.cor);
        })                
        return points_table;
    }  
    
    function all_to_canvas_cordinates( transform_points ){
        transform_points.forEach(function ( point ) {
            point_to_canvas_cordinates(point);
        });                
    }
    
     function point_to_canvas_cordinates( point ) {
        point.cor.x = (point.cor.x * 1000 ) + 300;
        point.cor.y = - ( point.cor.y * 1000 ) + 300;
    }
    
    function point_vector( point ){
        var tmp = [];
        tmp[0] = [ point.cor.x ];
        tmp[1] = [ point.cor.y ];
        tmp[2] = [ point.cor.z ];
        tmp[3] = [ 1 ];
        return tmp;
    }
    
    function vector_to_point( table , point ){
        point.cor.x = table[0][0];
        point.cor.y = table[1][0];
        point.cor.z = table[2][0];
        point.cor.p = table[3][0];
        return point;
    }    
    
    function transform_point_to_2d( point, z ){
        var  pnt_vector = point_vector( point );
        var Mpp = Matrix.perspective_matrix( z );
        Mpp.matrix_multiplication( pnt_vector ); 
        point = vector_to_point( Mpp.value, point ); 
        return point;        
    }
    
    function move_point( point, Tx, Ty, Tz ){
        var pnt_vector = point_vector( point );
        var Mmov = Matrix.move_matrix( Tx, Ty, Tz );
        Mmov.matrix_multiplication( pnt_vector );
        point = vector_to_point( Mmov.value, point );
        return point; 
    }
    
    function  rotate_point( point, ax, angle ){
        var pnt_vector = point_vector( point );
        var Mrot;
        if ( ax === 'X' ){
            Mrot = Matrix.rotation_ox( angle );
        }else if ( ax === 'Y' ){
            Mrot = Matrix.rotation_oy( angle );
        }else if ( ax === 'Z' ){
            Mrot = Matrix.rotation_oz( angle );
        }else{
            return NaN;
        }    
        Mrot.matrix_multiplication( pnt_vector );
        point = vector_to_point( Mrot.value, point );
        return point; 
    //TODO
    }
    
// E N D  PRIVATE INTERFACE
  
// OBJECT FACTORY

    function figure (){
        return {
            'points': get_points(),
            'triangles': get_triangles(),
        };    
    }
// E N D  OBJECT FACTORY

    
    return that;
}) ();
