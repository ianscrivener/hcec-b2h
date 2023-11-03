// ##############################################################
// helper function - sort an array or objects
function sortArrayOfObjectsByKey(array, key) {
  return array.sort(function(a, b) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  });
}


// ##############################################################
// helper coord rounding ########################################
function coordRounding(val) {
  return Number(val).toFixed(conf.coordRounding)
}
