angular.module('DlFilters', [])
  .filter('capitalize', function() {
    return function(input, scope) {
      if (input!== null);
      input = input.toLowerCase();
      var arr = input.split(' ');
      var newStr = "";
      if(arr.length === 2) {
        arr.forEach(function(val) {
          newStr = newStr + " " + val.substring(0,1).toUpperCase()+val.substring(1);
        });
        return newStr;
      }
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  });