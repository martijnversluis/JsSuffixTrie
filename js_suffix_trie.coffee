class JsSuffixTrie

  constructor: () ->
    @count = 0
    @structure = {}
  
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
    subTrie
    
  find: (prefix) ->
    @toArray @findNode(prefix), ""
    
  findNode: (string) ->
    node = @structure
    length = string.length
    index = 0
    
    while index < length
      currentChar = string[index++]
      node = node[currentChar]
      return null unless node
      
    return node
    
  each: (callback) -> JsSuffixTrie.each(callback, @structure, 0, "")
    
  @each: (callback, node, index, string) ->
    callback(index++, string) if node.terminator
  
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
    tree = new JsSuffixTrie

    length = array.length
    i = 0
    tree.add array[i++] while i < length

    tree.calculateSize()
    tree
    
  toArray: ->
    JsSuffixTrie.toArray(@structure, "") ->
    
  @toArray: (node, prefix) ->
    array = []
    @each (index, value) ->
      array[index] = value
    , @structure, 0, ""
    array

  @fromJSON: (json) ->
    tree = new JsSuffixTrie
    tree.structure = JSON.parse json
    tree.calculateSize()
    tree  
  
  toJSON: -> JSON.stringify @structure
