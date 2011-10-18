// normalizacja
// generowanie macierzy
// obliczenia na macierzach
// generowanie rzutu z punktów na ekran

var store = (function () {
    var that = {};


    var points = [
        { num: 1, x: -1, y: -1, z:  1, p: 1 }, //under square
        { num: 2, x:  1, y: -1, z:  1, p: 1 },
        { num: 3, x:  1, y: -1, z: -1, p: 1 },
        { num: 4, x: -1, y: -1, z: -1, p: 1 },
        { num: 5, x: -1, y:  1, z:  1, p: 1 }, //top square
        { num: 6, x:  1, y:  1, z:  1, p: 1 },
        { num: 7, x:  1, y:  1, z: -1, p: 1 },
        { num: 8, x: -1, y:  1, z: -1, p: 1 },
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
    
    function all_points_normalization( points_table ){
        points_table.forEach(function ( point ) {
            point_normalization(point);
        })                
        return points_table;
    }

// OBJECT FACTORY

    function figure (){
        return {
            'points': get_points(),
            'triangles': get_triangles(),
        };    
    }

    return that;
}) ();
