var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
describe("JsSuffixTrie", function() {
  beforeEach(function() {
    this.trie = new JsSuffixTrie;
    this.string = "foo";
    this.string2 = "foobar";
    this.string3 = "barber";
    this.prefix = "fo";
    this.count = 5;
    return this.findPrefix = "test";
  });
  describe("constructor", function() {
    return describe("calling the constructor", function() {
      it("should set @count to 0", function() {
        return expect(this.trie.count).toBe(0);
      });
      return it("should initialize @structure as an empty plain object", function() {
        return expect(this.trie.structure).toEqual({});
      });
    });
  });
  describe("#add", function() {
    return describe("adding a string to the trie", function() {
      beforeEach(function() {
        return this.result = this.trie.add(this.string);
      });
      describe("when the string is not in the trie yet", function() {
        it("should define @structure", function() {
          return expect(this.trie.structure).toBeDefined();
        });
        it("should set the full path", function() {
          var _ref, _ref2, _ref3;
          return expect((_ref = this.trie.structure) != null ? (_ref2 = _ref.f) != null ? (_ref3 = _ref2.o) != null ? _ref3.o : void 0 : void 0 : void 0).toBeDefined();
        });
        it("should set the right terminator", function() {
          var _ref, _ref2, _ref3, _ref4;
          return expect((_ref = this.trie.structure) != null ? (_ref2 = _ref.f) != null ? (_ref3 = _ref2.o) != null ? (_ref4 = _ref3.o) != null ? _ref4.terminator : void 0 : void 0 : void 0 : void 0).toBe(true);
        });
        it("should not set the terminator on the other nodes", function() {
          var _ref, _ref2, _ref3, _ref4, _ref5;
          expect((_ref = this.trie.structure) != null ? (_ref2 = _ref.f) != null ? _ref2.terminator : void 0 : void 0).toBeUndefined();
          return expect((_ref3 = this.trie.structure) != null ? (_ref4 = _ref3.f) != null ? (_ref5 = _ref4.o) != null ? _ref5.terminator : void 0 : void 0 : void 0).toBeUndefined();
        });
        return it("should have return value true", function() {
          return expect(this.result).toBe(true);
        });
      });
      return describe("when the string is already in the trie", function() {
        beforeEach(function() {
          this.secondTrie = new JsSuffixTrie;
          this.secondTrie.structure = {
            f: {
              o: {
                o: {
                  terminator: true
                }
              }
            }
          };
          return this.result = this.trie.add(this.string);
        });
        it("should not change the structure", function() {
          return expect(this.trie.structure).toEqual(this.secondTrie.structure);
        });
        return it("should return false", function() {
          return expect(this.result).toBe(false);
        });
      });
    });
  });
  describe("#remove", function() {
    return describe("removing a string from the trie", function() {
      describe("when the trie contains the string to be removed", function() {
        beforeEach(function() {
          this.trie.add(this.string);
          return this.result = this.trie.remove(this.string);
        });
        it("should undefine the terminator of the last node", function() {
          var _ref, _ref2, _ref3, _ref4;
          return expect((_ref = this.trie.structure) != null ? (_ref2 = _ref.f) != null ? (_ref3 = _ref2.o) != null ? (_ref4 = _ref3.o) != null ? _ref4.terminator : void 0 : void 0 : void 0 : void 0).toBeUndefined();
        });
        return it("should return true", function() {
          return expect(this.result).toBe(true);
        });
      });
      return describe("when the trie does not contain the string to be removed", function() {
        beforeEach(function() {
          this.secondTrie = new JsSuffixTrie;
          return this.result = this.trie.remove("nonExistingString");
        });
        it("should not change the structure", function() {
          return expect(this.trie.structure).toEqual(this.secondTrie.structure);
        });
        return it("should return false", function() {
          return expect(this.result).toBe(false);
        });
      });
    });
  });
  describe("#contains", function() {
    return describe("checking if the trie contains a particular string", function() {
      it("should call #findNode with the string", function() {
        spyOn(this.trie, "findNode").andReturn({});
        this.trie.contains(this.string);
        return expect(this.trie.findNode).toHaveBeenCalledWith(this.string);
      });
      describe("when the trie contains the string", function() {
        beforeEach(function() {
          this.trie.add(this.string);
          return this.trie.findNode = __bind(function() {
            return this.trie.structure.f.o.o;
          }, this);
        });
        return it("should return true", function() {
          return expect(this.trie.contains(this.string)).toBe(true);
        });
      });
      return describe("when the trie does not contain the string", function() {
        beforeEach(function() {
          return this.trie.findNode = function() {
            return null;
          };
        });
        return it("should return false", function() {
          return expect(this.trie.contains(this.string)).toBe(false);
        });
      });
    });
  });
  describe("#subTrie", function() {
    return describe("retrieving a sub trie from the trie", function() {
      return describe("when the trie contains string matching the prefix", function() {
        beforeEach(function() {
          this.trie.add(this.string);
          this.trie.add(this.string2);
          return this.trie.add(this.string3);
        });
        it("should call #findNode with the prefix", function() {
          spyOn(this.trie, "findNode");
          this.trie.subTrie(this.prefix);
          return expect(this.trie.findNode).toHaveBeenCalledWith(this.prefix);
        });
        it("should return a trie with the right structure", function() {
          var expectedStructure, subTrie;
          this.trie.findNode = __bind(function() {
            return this.trie.structure.f.o;
          }, this);
          subTrie = this.trie.subTrie(this.prefix);
          expectedStructure = {
            o: {
              terminator: true,
              b: {
                a: {
                  r: {
                    terminator: true
                  }
                }
              }
            }
          };
          return expect(subTrie.structure).toEqual(expectedStructure);
        });
        return it("should set the trie-wide prefix", function() {
          var subTrie;
          this.trie.findNode = __bind(function() {
            return this.trie.structure.f.o;
          }, this);
          subTrie = this.trie.subTrie(this.prefix);
          return expect(subTrie.prefix).toEqual(this.prefix);
        });
      });
    });
  });
  describe("#find", function() {
    return describe("finding an array of strings that match the prefix", function() {
      it("should call #findNode with the prefix", function() {
        JsSuffixTrie.toArray = function() {
          return [];
        };
        spyOn(this.trie, "findNode").andReturn({});
        this.trie.find(this.prefix);
        return expect(this.trie.findNode).toHaveBeenCalledWith(this.prefix);
      });
      return it("should call ::nodeToArray with the result of #findNode", function() {
        var stubbedFindNode;
        stubbedFindNode = {};
        this.trie.findNode = function() {
          return stubbedFindNode;
        };
        spyOn(JsSuffixTrie, "nodeToArray").andReturn([]);
        this.trie.find(this.prefix);
        return expect(JsSuffixTrie.nodeToArray).toHaveBeenCalledWith(stubbedFindNode, "");
      });
    });
  });
  describe("#findNode", function() {
    return describe("finding a subNode", function() {
      describe("when the trie contains strings that match the prefix", function() {
        beforeEach(function() {
          this.structure = {
            f: {
              o: {
                o: {
                  b: {
                    a: {
                      r: {
                        terminator: true
                      }
                    }
                  }
                }
              }
            }
          };
          return this.trie.structure = this.structure;
        });
        return it("should return the right node", function() {
          var node;
          node = this.trie.findNode(this.prefix);
          return expect(node).toBe(this.structure.f.o);
        });
      });
      return describe("when the trie does not contain strings that match the prefix", function() {
        return it("should return null", function() {
          var node;
          node = this.trie.findNode(this.string);
          return expect(node).toBeNull();
        });
      });
    });
  });
  describe("#each", function() {
    return describe("iterating over all strings in the trie", function() {
      return it("should call ::each with the right arguments", function() {
        spyOn(JsSuffixTrie, "each");
        this.callback = function() {};
        this.trie.each(this.callback);
        return expect(JsSuffixTrie.each).toHaveBeenCalledWith(this.callback, this.trie.structure, 0, this.trie.prefix);
      });
    });
  });
  describe("::each", function() {
    return describe("iterating over string of an arbitrary node", function() {
      beforeEach(function() {
        this.callback = jasmine.createSpy();
        this.trie.add(this.string);
        this.trie.add(this.string2);
        return this.trie.add(this.string3);
      });
      it("should call the callback function for every string in the trie", function() {
        JsSuffixTrie.each(this.callback, this.trie.structure, 0, "");
        expect(this.callback.callCount).toBe(3);
        expect(this.callback.argsForCall[0]).toEqual([0, this.string]);
        expect(this.callback.argsForCall[1]).toEqual([1, this.string2]);
        return expect(this.callback.argsForCall[2]).toEqual([2, this.string3]);
      });
      return it("should add the trie-wide prefix to each yielded string", function() {
        JsSuffixTrie.each(this.callback, this.trie.structure, 0, this.findPrefix);
        expect(this.callback.callCount).toBe(3);
        expect(this.callback.argsForCall[0][1]).toEqual(this.findPrefix + this.string);
        expect(this.callback.argsForCall[1][1]).toEqual(this.findPrefix + this.string2);
        return expect(this.callback.argsForCall[2][1]).toEqual(this.findPrefix + this.string3);
      });
    });
  });
  describe("#size", function() {
    return describe("retrieving the number of strings in the trie", function() {
      return it("should return @count", function() {
        var size;
        this.trie.count = this.count;
        size = this.trie.size();
        return expect(size).toBe(this.count);
      });
    });
  });
  describe("#calculateSize", function() {
    return describe("calculating trie size when constructing from a structure dump", function() {
      beforeEach(function() {
        this.structure = {
          f: {
            o: {
              o: {
                terminator: true,
                b: {
                  a: {
                    r: {
                      terminator: true
                    }
                  }
                }
              }
            }
          },
          b: {
            a: {
              r: {
                b: {
                  e: {
                    r: {
                      terminator: true
                    }
                  }
                }
              }
            }
          }
        };
        return this.trie.structure = this.structure;
      });
      describe("when called without arguments", function() {
        return it("should return the right size", function() {
          var size;
          size = this.trie.calculateSize();
          return expect(size).toBe(3);
        });
      });
      return describe("when called with a structure", function() {
        return it("should return the right size", function() {
          var size;
          size = this.trie.calculateSize(this.structure.f);
          return expect(size).toBe(2);
        });
      });
    });
  });
  describe("::fromArray", function() {
    return describe("adding all string in an array to the trie", function() {
      it("call #add for each string", function() {
        var trie;
        JsSuffixTrie.prototype.__realAdd = this.trie.add;
        JsSuffixTrie.prototype.add = function(string) {
          this.__argsForCallToAdd || (this.__argsForCallToAdd = []);
          this.__argsForCallToAdd.push(string);
          return this.__realAdd(string);
        };
        trie = JsSuffixTrie.fromArray([this.string, this.string2, this.string3]);
        expect(trie.__argsForCallToAdd).toEqual([this.string, this.string2, this.string3]);
        JsSuffixTrie.prototype.add = JsSuffixTrie.prototype.__realAdd;
        return delete JsSuffixTrie.prototype.__realAdd;
      });
      return it("should set the right count", function() {
        var size, trie;
        trie = JsSuffixTrie.fromArray([this.string, this.string2, this.string3]);
        size = trie.size();
        return expect(size).toBe(3);
      });
    });
  });
  describe("#toArray", function() {
    return describe("converting the trie to an array", function() {
      return it("should call ::toArray with the right arguments", function() {
        this.trie.prefix = this.findPrefix;
        spyOn(JsSuffixTrie, "nodeToArray");
        this.trie.toArray();
        return expect(JsSuffixTrie.nodeToArray).toHaveBeenCalledWith(this.trie.structure, this.findPrefix);
      });
    });
  });
  describe("::nodeToArray", function() {
    return describe("converting any node to array", function() {
      beforeEach(function() {
        this.trie.add(this.string);
        this.trie.add(this.string2);
        return this.trie.add(this.string3);
      });
      it("should call ::each", function() {
        spyOn(JsSuffixTrie, "each");
        JsSuffixTrie.nodeToArray(this.trie.structure, "");
        return expect(JsSuffixTrie.each).toHaveBeenCalled();
      });
      return it("should return the right array", function() {
        var array;
        array = JsSuffixTrie.nodeToArray(this.trie.structure, "");
        return expect(array).toEqual([this.string, this.string2, this.string3]);
      });
    });
  });
  describe("::fromJSON", function() {
    return describe("creating a suffix trie with a JSON serialized structure", function() {
      beforeEach(function() {
        return this.json = "{'some':'json'}";
      });
      it("should call JSON.parse with the json", function() {
        JsSuffixTrie.prototype.calculateSize = function() {};
        spyOn(JSON, "parse");
        JsSuffixTrie.fromJSON(this.json);
        return expect(JSON.parse).toHaveBeenCalledWith(this.json);
      });
      return it("should call #calculateSize", function() {
        JSON.parse = function() {
          return {
            f: {
              o: {
                o: {
                  terminator: true
                }
              }
            }
          };
        };
        spyOn(JsSuffixTrie.prototype, "calculateSize");
        JsSuffixTrie.fromJSON(this.json);
        return expect(JsSuffixTrie.prototype.calculateSize).toHaveBeenCalled();
      });
    });
  });
  return describe("#toJSON", function() {
    return describe("serializing the trie structure to JSON", function() {
      return it("should call JSON.stringify with the structure", function() {
        spyOn(JSON, "stringify");
        this.trie.toJSON();
        return expect(JSON.stringify).toHaveBeenCalledWith(this.trie.structure);
      });
    });
  });
});