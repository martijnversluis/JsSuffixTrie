benchmarkFind = (calls, prefix) ->
  trie = JsSuffixTrie.fromArray(array)
  
  console.time("Array")
  c = 0
  
  while c++ < calls
    ret = []
    i = 0
    len = array.length
    regex = new RegExp("^#{prefix}")

    while i++ < len
      ret.push array[i] if regex.test array[i]    
  console.timeEnd("Array")
  
  console.time("JsSuffixTrie")
  c = 0
  trie.find(prefix) while c++ < calls
  console.timeEnd("JsSuffixTrie")
  
benchmarkContains = (calls, item) ->
  trie = JsSuffixTrie.fromArray(array)
  
  console.time("Array.indexOf")
  j = 0
  array.indexOf(item) while j++ < calls
  console.timeEnd("Array.indexOf")
  
  console.time("JsSuffixTrie.contains")
  j = 0
  trie.contains(item) while j++ < calls
  console.timeEnd("JsSuffixTrie.contains")