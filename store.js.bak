//TODO:
// obliczenia na macierzach
// generowanie rzutu z punktów na ekran

var store = (function () {
    var that = {};
    
    
    // M A T R I X   O B J E C T
    
    var matrix = {

        // MATRIX TABLE
        value: new Array(),
 
        // MATRIX FUNCTIONS
 
        add_matrix: function ( matrix_table ){
        // TODO add check for matrix_table
            this.value = matrix_table;        
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
        
        
        is_empty: function(){
            return this.value.length < 1 ? true : false;        
        },  

        // END MATRIX FUNCTIONS
        
    };
    
    // E N D  M A T R I X   O B J E C T






    
    // E X A M P L E   V A L U E S
    
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
        [  1, 14, 16 ],
   ];

    // E N D   E X A M P L E   V A L U E S


    
    
    
    
    
    // 3D O B J E C T  D E F I N I T I O N
    
    var points = [
        { num: 1, cor: {x: -1, y: -1, z:  1, p: 1 }, }, //under square
        { num: 2, cor: {x:  1, y: -1, z:  1, p: 1 }, },
        { num: 3, cor: {x:  1, y: -1, z: -1, p: 1 }, },
        { num: 4, cor: {x: -1, y: -1, z: -1, p: 1 }, },
        { num: 5, cor: {x: -1, y:  1, z:  1, p: 1 }, }, //top square
        { num: 6, cor: {x:  1, y:  1, z:  1, p: 1 }, },
        { num: 7, cor: {x:  1, y:  1, z: -1, p: 1 }, },
        { num: 8, cor: {x: -1, y:  1, z: -1, p: 1 }, },
    ];        
    
    var triangles = [
        { a: 1, b: 2, c: 3}, //under square
        { a: 1, b: 3, c: 4},
        { a: 5, b: 6, c: 7}, //top square
        { a: 5, b: 7, c: 8},
        { a: 5, b: 1, c: 2}, //side walls
        { a: 6, b: 2, c: 3},
        { a: 7, b: 3, c: 4},
        { a: 8, b: 4, c: 1},          
    ];

    // E N D   3D O B J E C T  D E F I N I T I O N
    
    
    
    
    

// PUBLIC INTERFACE

    that.get_figure = function(){
        return figure();
    }
    
    
    
    // PUBLIC TESTS
    that.test_point_norm = function( point ){
           point_normalization(point);
           return point; 
    }

    that.all_points_normalization = function ( points_table ){
        return all_points_normalization( get_points());
        
    }
    
    that.get_example_matrix = function (){
        return example_matrix_4x4;
    }
    
    that.get_matrix = function (){
        return matrix;
    }
    
    that.test_matrix = function(  ){
        matrix.add_matrix( example_matrix_4x4);
 //       return matrix;
    }

    that.test_empty_matrix = function(  ){
        that.test_matrix();
        return matrix.is_desame_size(example2_matrix_4x4);
    }
    //E N D PUBLIC TESTS

    
// E N D PUBLIC INTERFACE

  
  
  
  
  
  

// PRIVATE INTERFACE
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
