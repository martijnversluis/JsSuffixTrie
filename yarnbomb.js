function YarnBomb() {
  // Call JsSuffixTrie's constructor
  YarnBomb.super_.call(this);
  // Set up an empty object to store values in
  this.values = {};
}
// Inherit from JsSuffixTrie without adding 'inherits' to the namespace
// this function via https://www.andrewzammit.com/blog/javascript-inheritance-and-method-overriding/
(function inherits(ctor, superCtor) {
  // took this right from requrie('util').inherits
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}(YarnBomb, JsSuffixTrie));

YarnBomb.prototype.add = function add(key, value) {
  // Store the value against the key
  this.values[key] = value;
  // Add the key to the suffix trie
  return YarnBomb.super_.prototype.add.call(this, key);
}

YarnBomb.prototype.find = function find(prefix, withKeys) {
  // Store a reference to this.values for when we lose access to 'this'
  var myValues = this.values;
  // Find matching keys and map them onto values
  return YarnBomb.super_.prototype.find.call(this, prefix).map(function (key) {
    if (withKeys === true) {
      return {
        key: key,
        value: myValues[key]
      };
    } else {
      return myValues[key];
    }
  });
}

// Preserve access to the original way of finding
YarnBomb.prototype.findKeys = function findKeys(prefix) {
  return YarnBomb.super_.prototype.find.call(this, prefix);
};