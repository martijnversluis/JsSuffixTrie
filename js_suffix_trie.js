var JsSuffixTrie;
JsSuffixTrie = (function() {
    function JsSuffixTrie() {
        this.count = 0;
        this.structure = {};
    }
    JsSuffixTrie.prototype.add = function(string) {
        var chr, index, length, next, node;
        node = this.structure;
        length = string.length;
        index = 0;
        while (index < length) {
            chr = string[index++];
            next = node[chr];
            if (next) {
                node = next;
            } else {
                node[chr] = {};
                node = node[chr];
            }
        }
        if (node.terminator) {
            return false;
        } else {
            node.terminator = true;
            this.count++;
            return true;
        }
    };
    JsSuffixTrie.prototype.remove = function(string) {
        var chr, index, length, node;
        node = this.structure;
        length = string.length;
        index = 0;
        while (index < length) {
            chr = string[index++];
            node = node[chr];
            if (!node) {
                return false;
            }
        }
        if (node.terminator) {
            delete node.terminator;
            this.count--;
            return true;
        } else {
            return false;
        }
    };
    JsSuffixTrie.prototype.contains = function(string) {
        var node;
        node = this.findNode(string);
        return node && node.terminator;
    };
    JsSuffixTrie.prototype.subTrie = function(prefix) {
        var node;
        node = this.findNode(prefix);
        return new JsSuffixTrie(prefix);
    };
    JsSuffixTrie.prototype.find = function(prefix) {
        return this.toArray(this.findNode(prefix), "");
    };
    JsSuffixTrie.prototype.findNode = function(string) {
        var currentChar, index, length, node;
        node = this.structure;
        length = string.length;
        index = 0;
        while (index < length) {
            currentChar = string[index++];
            node = node[currentChar];
            if (!node) {
                return null;
            }
        }
        return node;
    };
    JsSuffixTrie.prototype.each = function(callback) {
        return JsSuffixTrie.each(callback, this.structure, 0, "");
    };
    JsSuffixTrie.each = function(callback, node, index, string) {
        var property;
        if (node.terminator) {
            callback(index++, string);
        }
        for (property in node) {
            index = this.each(callback, node[property], index, string + property);
        }
        return index;
    };
    JsSuffixTrie.prototype.size = function() {
        return this.count;
    };
    JsSuffixTrie.prototype.calculateSize = function(node) {
        var property, size;
        if (node == null) {
            node = this.structure;
        }
        size = node.terminator ? 1 : 0;
        for (property in node) {
            size += this.calculateSize(node[property]);
        }
        return size;
    };
    JsSuffixTrie.fromArray = function(array) {
        var i, length, tree;
        tree = new DictionaryTree;
        length = array.length;
        i = 0;
        while (i < length) {
            tree.add(array[i++]);
        }
        tree.calculateSize();
        return tree;
    };
    JsSuffixTrie.prototype.toArray = function() {
        return JsSuffixTrie.toArray(this.structure, "")(function() {});
    };
    JsSuffixTrie.toArray = function(node, prefix) {
        var array;
        array = [];
        this.each(function(index, value) {
            return array[index] = value;
        }, this.structure, 0, "");
        return array;
    };
    JsSuffixTrie.fromJSON = function(json) {
        var tree;
        tree = new DictionaryTree;
        tree.structure = JSON.parse(json);
        tree.calculateSize();
        return tree;
    };
    JsSuffixTrie.prototype.toJSON = function() {
        return JSON.stringify(this.structure);
    };
    return JsSuffixTrie;
})();