describe "JsSuffixTrie", ->
  beforeEach ->
    @trie = new JsSuffixTrie
    @string = "foo"
    @string2 = "foobar"
    @string3 = "barber"
    @prefix = "fo"
    @count = 5
    @findPrefix = "test"
  
  describe "constructor", ->
    describe "calling the constructor", ->
    
      it "should set @count to 0", ->
        expect(@trie.count).toBe 0
        
      it "should initialize @structure as an empty plain object", ->
        expect(@trie.structure).toEqual {}
        
  describe "#add", ->
    describe "adding a string to the trie", ->
      beforeEach -> @result = @trie.add(@string)
    
      describe "when the string is not in the trie yet", ->      
        it "should define @structure", ->
          expect(@trie.structure).toBeDefined()
          
        it "should set the full path", ->
          expect(@trie.structure?.f?.o?.o).toBeDefined()
          
        it "should set the right terminator", ->
          expect(@trie.structure?.f?.o?.o?.terminator).toBe(true)
          
        it "should not set the terminator on the other nodes", ->
          expect(@trie.structure?.f?.terminator).toBeUndefined()
          expect(@trie.structure?.f?.o?.terminator).toBeUndefined()
          
        it "should have return value true", ->
          expect(@result).toBe(true)
      
      describe "when the string is already in the trie", ->
        beforeEach ->
          @secondTrie = new JsSuffixTrie
          @secondTrie.structure = f:o:o:terminator:true
          @result = @trie.add(@string)
          
        it "should not change the structure", ->
          expect(@trie.structure).toEqual(@secondTrie.structure)
          
        it "should return false", ->
          expect(@result).toBe(false)
          
  describe "#remove", ->
    describe "removing a string from the trie", ->
    
      describe "when the trie contains the string to be removed", ->
        beforeEach ->
          @trie.add(@string)
          @result = @trie.remove(@string)
        
        it "should undefine the terminator of the last node", ->
          expect(@trie.structure?.f?.o?.o?.terminator).toBeUndefined()
          
        it "should return true", ->
          expect(@result).toBe(true)
          
      describe "when the trie does not contain the string to be removed", ->
        beforeEach ->
          @secondTrie = new JsSuffixTrie
          @result = @trie.remove("nonExistingString")
          
        it "should not change the structure", ->
          expect(@trie.structure).toEqual(@secondTrie.structure)
        
        it "should return false", ->
          expect(@result).toBe(false)
          
  describe "#contains", ->
    describe "checking if the trie contains a particular string", ->
    
      it "should call #findNode with the string", ->
        spyOn(@trie, "findNode").andReturn {}
        @trie.contains(@string)
        expect(@trie.findNode).toHaveBeenCalledWith(@string)
    
      describe "when the trie contains the string", ->
        beforeEach ->
          @trie.add(@string)
          @trie.findNode = => @trie.structure.f.o.o # stub #findNode
        
        it "should return true", ->
          expect(@trie.contains @string).toBe(true)
          
      describe "when the trie does not contain the string", ->
        beforeEach ->
          @trie.findNode = -> null # stub #findNode
      
        it "should return false", ->
          expect(@trie.contains @string).toBe(false)
          
  describe "#subTrie", ->
    describe "retrieving a sub trie from the trie", ->
    
      describe "when the trie contains string matching the prefix", ->
        beforeEach ->
          @trie.add(@string)
          @trie.add(@string2)
          @trie.add(@string3)
          
        it "should call #findNode with the prefix", ->
          spyOn(@trie, "findNode")
          @trie.subTrie(@prefix)
          expect(@trie.findNode).toHaveBeenCalledWith(@prefix)
          
        it "should return a trie with the right structure", ->
          @trie.findNode = => @trie.structure.f.o # stub #findNode
        
          subTrie = @trie.subTrie(@prefix)
          expectedStructure = 
            o:
              terminator: true
              b: a: r: terminator: true
          expect(subTrie.structure).toEqual(expectedStructure)
          
        it "should set the trie-wide prefix", ->
          @trie.findNode = => @trie.structure.f.o # stub #findNode
          subTrie = @trie.subTrie(@prefix)
          expect(subTrie.prefix).toEqual(@prefix)
          
  describe "#find", ->
    describe "finding an array of strings that match the prefix", ->
    
      it "should call #findNode with the prefix", ->
        JsSuffixTrie.toArray = -> []
        spyOn(@trie, "findNode").andReturn {}
        
        @trie.find(@prefix)
        expect(@trie.findNode).toHaveBeenCalledWith(@prefix)
        
      it "should call ::nodeToArray with the result of #findNode", ->
        stubbedFindNode = {}
        @trie.findNode = -> stubbedFindNode
        spyOn(JsSuffixTrie, "nodeToArray").andReturn []
        
        @trie.find(@prefix)
        expect(JsSuffixTrie.nodeToArray).toHaveBeenCalledWith(stubbedFindNode, "")
        
  describe "#findNode", ->
    describe "finding a subNode", ->
    
      describe "when the trie contains strings that match the prefix", ->
        beforeEach ->
          @structure = f:o:o:b:a:r:terminator:true
          @trie.structure = @structure
        
        it "should return the right node", ->
          node = @trie.findNode(@prefix)
          expect(node).toBe(@structure.f.o)
          
      describe "when the trie does not contain strings that match the prefix", ->
        it "should return null", ->
          node = @trie.findNode(@string)
          expect(node).toBeNull()
          
  describe "#each", ->
    describe "iterating over all strings in the trie", ->      
      it "should call ::each with the right arguments", ->
        spyOn(JsSuffixTrie, "each")
        @callback = ->
        @trie.each(@callback)
        expect(JsSuffixTrie.each).toHaveBeenCalledWith(@callback, @trie.structure, 0, @trie.prefix)
        
  describe "::each", ->
    describe "iterating over string of an arbitrary node", ->
      beforeEach ->
        @callback = jasmine.createSpy()
        @trie.add(@string)
        @trie.add(@string2)
        @trie.add(@string3)
        
      it "should call the callback function for every string in the trie", ->
        JsSuffixTrie.each(@callback, @trie.structure, 0, "")
        
        expect(@callback.callCount).toBe(3)
        expect(@callback.argsForCall[0]).toEqual [0, @string]
        expect(@callback.argsForCall[1]).toEqual [1, @string2]
        expect(@callback.argsForCall[2]).toEqual [2, @string3]
        
      it "should add the trie-wide prefix to each yielded string", ->
        JsSuffixTrie.each(@callback, @trie.structure, 0, @findPrefix)
        
        expect(@callback.callCount).toBe(3)
        expect(@callback.argsForCall[0][1]).toEqual(@findPrefix + @string)
        expect(@callback.argsForCall[1][1]).toEqual(@findPrefix + @string2)
        expect(@callback.argsForCall[2][1]).toEqual(@findPrefix + @string3)
        
        
  describe "#size", ->
    describe "retrieving the number of strings in the trie", ->
      it "should return @count", ->
        @trie.count = @count
        size = @trie.size()
        expect(size).toBe(@count)
        
  describe "#calculateSize", ->
    describe "calculating trie size when constructing from a structure dump", ->
      beforeEach ->
        @structure = 
          f:
            o:
              o: terminator: true
              b:
                a:
                  r: terminator: true
          b:
            a:
              r:
                b:
                  e:
                    r: terminator:true

        @trie.structure = @structure
    
      describe "when called without arguments", ->
        it "should return the right size", ->
          size = @trie.calculateSize()
          expect(size).toBe(3)
          
      describe "when called with a structure", ->
        it "should return the right size", ->
          size = @trie.calculateSize(@structure.f)
          expect(size).toBe(2)
          
  describe "::fromArray", ->
    describe "adding all string in an array to the trie", ->
    
      it "call #add for each string", ->
        JsSuffixTrie::__realAdd = @trie.add
        JsSuffixTrie::add = (string) ->
          @__argsForCallToAdd or= []
          @__argsForCallToAdd.push(string)
          @__realAdd(string)
          
        trie = JsSuffixTrie.fromArray [@string, @string2, @string3]
        expect(trie.__argsForCallToAdd).toEqual [@string, @string2, @string3]
        
        JsSuffixTrie::add = JsSuffixTrie::__realAdd
        delete JsSuffixTrie::__realAdd
        
      it "should set the right count", ->
        trie = JsSuffixTrie.fromArray [@string, @string2, @string3]
        size = trie.size()
        expect(size).toBe(3)
        
  describe "#toArray", ->
    describe "converting the trie to an array", ->
      it "should call ::toArray with the right arguments", ->
        @trie.prefix = @findPrefix
        spyOn(JsSuffixTrie, "nodeToArray")
        @trie.toArray()
        expect(JsSuffixTrie.nodeToArray).toHaveBeenCalledWith(@trie.structure, @findPrefix)
        
  describe "::nodeToArray", ->
    describe "converting any node to array", ->
      beforeEach ->
        @trie.add(@string)
        @trie.add(@string2)
        @trie.add(@string3)
    
      it "should call ::each", ->
        spyOn(JsSuffixTrie, "each")
        JsSuffixTrie.nodeToArray(@trie.structure, "")
        expect(JsSuffixTrie.each).toHaveBeenCalled()
        
      it "should return the right array", ->
        array = JsSuffixTrie.nodeToArray(@trie.structure, "")
        expect(array).toEqual [@string, @string2, @string3]
        
  describe "::fromJSON", ->
    describe "creating a suffix trie with a JSON serialized structure", ->
      beforeEach -> @json = "{'some':'json'}"
    
      it "should call JSON.parse with the json", ->
        JsSuffixTrie::calculateSize = ->
        spyOn(JSON, "parse")
        JsSuffixTrie.fromJSON(@json)
        expect(JSON.parse).toHaveBeenCalledWith(@json)
        
      it "should call #calculateSize", ->
        JSON.parse = -> f:o:o:terminator:true
        spyOn(JsSuffixTrie.prototype, "calculateSize")
        JsSuffixTrie.fromJSON(@json)
        expect(JsSuffixTrie::calculateSize).toHaveBeenCalled()
        
  describe "#toJSON", ->
    describe "serializing the trie structure to JSON", ->
      it "should call JSON.stringify with the structure", ->
        spyOn(JSON, "stringify")
        @trie.toJSON()
        expect(JSON.stringify).toHaveBeenCalledWith(@trie.structure)