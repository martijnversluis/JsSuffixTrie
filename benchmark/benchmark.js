var benchmarkContains, benchmarkFind;
benchmarkFind = function(calls, prefix) {
  var c, i, len, regex, ret, trie;
  trie = JsSuffixTrie.fromArray(array);
  console.time("Array");
  c = 0;
  while (c++ < calls) {
    ret = [];
    i = 0;
    len = array.length;
    regex = new RegExp("^" + prefix);
    while (i++ < len) {
      if (regex.test(array[i])) {
        ret.push(array[i]);
      }
    }
  }
  console.timeEnd("Array");
  console.time("JsSuffixTrie");
  c = 0;
  while (c++ < calls) {
    trie.find(prefix);
  }
  return console.timeEnd("JsSuffixTrie");
};
benchmarkContains = function(calls, item) {
  var j, trie;
  trie = JsSuffixTrie.fromArray(array);
  console.time("Array.indexOf");
  j = 0;
  while (j++ < calls) {
    array.indexOf(item);
  }
  console.timeEnd("Array.indexOf");
  console.time("JsSuffixTrie.contains");
  j = 0;
  while (j++ < calls) {
    trie.contains(item);
  }
  return console.timeEnd("JsSuffixTrie.contains");
};