// Author: Jacob Jan Tuinstra

var INNER = 'INNER',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    OUTER = 'OUTER',
    LEFTEX = 'LEFTEXCLUDING',
    RIGHTEX = 'RIGHTEXCLUDING',
    OUTEREX = 'OUTEREXCLUDING';

/**
* Create an inner SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLINNERJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, INNER);
}  

/**
* Create a left SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLLEFTJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, LEFT);
}  

/**
* Create a right SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLRIGHTJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, RIGHT);
}  

/**
* Create an outer SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLOUTERJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, OUTER);
}  

/**
* Create a left excluding SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLLEFTEXCLUDINGJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, LEFTEX);
}  

/**
* Create a right excluding SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLRIGHTEXCLUDINGJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, RIGHTEX);
}  

/**
* Create an outer excluding SQL join 
*
* @param {A1:B26} range1 first data range
* @param {number|string} pk1 primairy key of the first data range 
* @param {C1:D26} range2 second data range
* @param {number|string} pk2 primairy key of the second data range 
* @param {boolean} opt_header use TRUE to include a header range
* @return The corresonding SQL join table
* @customfunction
*/
function SQLOUTEREXCLUDINGJOIN(range1, pk1, range2, pk2, opt_header) {
  return sqlJoin(range1, pk1, range2, pk2, opt_header, OUTEREX);
}  

function sqlJoin(range1, pk1, range2, pk2, opt_header, type) {
  var join = [], innerPK = [], ind1 = pk1 - 1, ind2 = pk2 - 1, header = [], std = null;
  opt_header = opt_header || false;
  
  if(opt_header === true) {
    var h1 = range1[0], h2 = range2[0];
    std = h1.concat(h2);
    range1.shift();
    range2.shift();
  }  
  
  var innerJoin = range1.reduce ( function (j1, r1, i) {
    range2.reduce ( function (j2, r2, j) { 
      if(r1[ind1] == r2[ind2]) {
        j1.push(r1.concat(r2));
        innerPK.push(r1[ind1]);
      }
      return j2;
    }, []);
    return j1;
  }, []);
  
  if(type === LEFT || type === LEFTEX || type === OUTER || type === OUTEREX) {
    var left = range1.filter ( function (d) {
      return innerPK.indexOf(d[ind1]) < 0;
    });
  }
  
  if(type === RIGHT || type === RIGHTEX || type === OUTER || type === OUTEREX) {
    var right = range2.filter ( function (d) {
      return innerPK.indexOf(d[ind2]) < 0;
    });
    
    if(type === OUTER || type === OUTEREX || type === RIGHT) {
      var outerRight = right.reduce ( function (ul, l, g) {
        range1[0].forEach ( function () {
          l.unshift(null);
        });
        ul.push(l);
        return ul;
      }, []); 
    }
  }
  
  switch(type) {
    case INNER:
      join = innerJoin;
      header.push(std);
      break;
    case LEFT:
      join = innerJoin.concat(left);
      header.push(std);
      break;
    case RIGHT:
      join = innerJoin.concat(outerRight);
      header.push(std);
      break;
    case OUTER:
      join = (innerJoin.concat(left)).concat(outerRight);
      header.push(std);
      break;
    case LEFTEX:
      join = left;
      header.push(h1);
      break;
    case RIGHTEX:
      join = right;
      header.push(h2);
      break;
    case OUTEREX:
      join = left.concat(right);  
      header.push(std);
      break;      
  } 
  
  return opt_header === true ? header.concat(join) : join;
}
