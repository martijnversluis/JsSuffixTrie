class JsSuffixTrie

  constructor: () ->
    @count = 0
    @structure = {}
    @prefix = ""
  
  add: (string) ->
    node = @structure
    length = string.length
    index = 0
    
    while index < length
      chr = string[index++]
      next = node[chr]
      
      if next
        node = next
      else
        node[chr] = {}
        node = node[chr]
      
    if node.terminator
      false
    else
      node.terminator = true
      @count++
      true
    
  remove: (string) ->
    node = @structure
    length = string.length
    index = 0
    
    while index < length
      chr = string[index++]
      node = node[chr]
      return false unless node
      
    if node.terminator
      delete node.terminator
      @count--
      true
    else
      false
  
  contains: (string) ->
    node = @findNode(string)
    node isnt null && node.terminator
    
  subTrie: (prefix) ->
    node = @findNode(prefix)
    subTrie = new JsSuffixTrie
    subTrie.structure = node
    subTrie.prefix = prefix
    subTrie
    
  find: (prefix) -> JsSuffixTrie.nodeToArray @findNode(prefix), prefix
    
  findNode: (string) ->
    node = @structure
    length = string.length
    index = 0
    
    while index < length
      currentChar = string[index++]
      node = node[currentChar]
      return null unless node
      
    return node
    
  each: (callback) -> JsSuffixTrie.each(callback, @structure, 0, @prefix)
    
  @each: (callback, node, index, string) ->
    callback(index++, string) if node && node.terminator
  
    for property of node
      index = @each(callback, node[property], index, string + property)
      
    index

  size: -> @count
  
  calculateSize: (node = @structure) ->
    size = if node.terminator then 1 else 0
    
    for property of node
      size += @calculateSize node[property]
      
    size
  
  @fromArray: (array) ->
    trie = new JsSuffixTrie

    length = array.length
    i = 0
    trie.add array[i++] while i < length

    trie.count = i
    trie
    
  toArray: -> JsSuffixTrie.nodeToArray(@structure, @prefix)
    
  @nodeToArray: (node, prefix) ->
    array = []
    
    @each (index, value) ->
      array[index] = value
    , node, 0, prefix
    
    array

  @fromJSON: (json) ->
    trie = new JsSuffixTrie
    trie.structure = JSON.parse json
    trie.calculateSize()
    trie  
  
  toJSON: -> JSON.stringify @structure
