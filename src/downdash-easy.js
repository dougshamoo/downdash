(function(){
  'use strict';

  window._ = {};

/*============/
/ COLLECTIONS /
/============*/

/*
  _.each

  Example:
    _([1, 2]).each(function(n) {
      console.log(n);
    }).value();
    >>> 1
    >>> 2
*/
  _.each = function(collection, iterator){
    if (!collection) return; // handle null object
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; ++i) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

/*
  _.indexOf

  Example:
    _.indexOf([1, 2, 1, 2], 2);
    >>> 1
*/
  _.indexOf = function(array, value){
    for (var i = 0; i < array.length; ++i) {
      if (array[i] === value) return i; 
    }
    return -1;
  };

/*
  _.map

  Example:
    function timesThree(n) {
      return n * 3;
    }

    _.map([1, 2], timesThree);
    >>> [3, 6]
*/
  _.map = function(collection, iterator){
    var results = [];
    _.each(collection, function(value) {
      results.push(iterator(value));
    });
    return results;
  };
  
/*
  _.reduce

  Example:
    _.reduce([1, 2], function(total, n) {
      return total + n;
    });
    >>> 3
*/
  _.reduce = function(collection, iterator, accumulator){
    _.each(collection, function(value) {
      if (accumulator === undefined) accumulator = value;
      else accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };

/*
  _.filter

  Example:
    _.filter([4, 5, 6], function(n) {
      return n % 2 == 0;
    });
    >>> [4, 6]
*/
  _.filter = function(collection, predicate){
    return _.reduce(collection, function(results, value) {
      if (predicate(value)) {
        results.push(value);
      }
      return results;
    }, []);
  };

/*
  _.at

  Example:
    _.at(['a', 'b', 'c'], [0, 2]);
    >>> ['a', 'c']
*/
  _.at = function(collection){
    var indices = Array.prototype.slice.call(arguments, 1);
    if (!indices) return [];
    indices = Array.isArray(indices[0]) ? indices[0] : indices;
    return _.reduce(indices, function(results, index) {
      results.push(collection[index]);
      return results;
    }, []);
  };

/*
  _.every

  Alias: _.all

  Example:
    _.every([true, 1, null, 'yes'], Boolean);
    >>> false
*/
  _.every = function(collection, predicate){
    return _.reduce(collection, function(isGood, item) {
      if (!isGood) return false;
      return predicate(item);
    }, true);
  };

/*
  _.includes

  Example:
    _.includes([1, 2, 3], 1);
    >>> true
*/
  _.includes = function(collection, target){
    return _.reduce(collection, function(found, value) {
      if (found) return found;
      return (value === target);
    }, false)
  };

/*
  _.partition

  Example:
    _.partition([1, 2, 3], function(n) {
      return n % 2;
    });
    >>> [[1, 3], [2]]
*/
  _.partition = function(collection, predicate){
    return _.reduce(collection, function(partitions, value) {
      if (predicate(value)) partitions[0].push(value);
      else partitions[1].push(value);
      return partitions;
    }, [[], []]);
  };

}());
