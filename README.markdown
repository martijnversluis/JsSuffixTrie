Js Suffix Trie
==============

Js Suffix Trie is a suffix trie implementation that is originally written in [CoffeeScript](http://jashkenas.github.com/coffee-script/), but a JavaScript compilation is also available.

You can install [Node.js](http://nodejs.org/) to compile CoffeeScript, use the [CoffeeScript core compiler](http://jashkenas.github.com/coffee-script/extras/coffee-script.js) or try the [Js2coffee](http://js2coffee.org/) online converter.

About suffix tries
------------------

* A suffix trie (not to be confused with a suffix _tree_) stores __unique__ string values in a tree-like way.
* It provides fast lookup
* It saves memory when handling larger amounts of strings
* It does not keep order or indices

For more information about suffix tries:

* [http://www.heppenstall.ca/academics/doc/242/F2001Archives/Ch11&#95;3&#95;tries.pdf](http://www.heppenstall.ca/academics/doc/242/F2001Archives/Ch11_3_tries.pdf)

Documentation
-------------

###Constructor

####<pre>JsSuffixTrie()</pre>

Creates an empty instance

###Methods

####<pre>add(string)</pre>

Adds the specified string to the trie. Returns <code>true</code> if the string is not already in the trie, otherwise <code>false</code>

####<pre>remove(string)</pre>

Removes the specified string from the trie. Returns <code>true</code> if the string was found, otherwise <code>false</code>.

####<pre>contains(string)</pre>

Return <code>true</code> is the specified string is in the trie, an <code>false</code> otherwise.

####<pre>each(callback)</pre>

Calls the specified callback for each item in the trie.

_example:_

<pre>var trie = new JsSuffixTrie;
...
trie.each(function (index, item) {
    console.log("#" + index + ": " + items);
});</pre>

####<pre>size()</pre>

Returns the number of items in the trie

####<pre>toArray()</pre>

Creates a new array containing all item from the trie.

####<pre>toJSON()</pre>

Creates a JSON serialization of the internal structure of the trie. The trie can be recreated with <code>JsSuffixTrie.fromJSON()</code>

####<pre>JsSuffixTrie.fromArray(array)</pre>

Creates an instance an adds each item in the array to the trie.

_example:_

<pre>var array = ['one', 'two', 'three'];
var trie = JsSuffixTrie.fromArray(array);</pre>

####<pre>JsSuffixTrie.fromJSON(json)</pre>

Recreates a JsSuffixTrie that has been serialized to JSON.

_example:_

<pre>var trie = new JsSuffixTrie;
trie.add("foobar");
...
var json = trie.toJSON();
...
var originalTrie = JsSuffixTrie.fromJSON(json);</pre>

Possible applications
---------------------

* whitelists or blacklists
* large arrays of string (e.g. email adresses)
* autocomplete (e.g. tagging)
* dictionary (e.g. Wordfeud)

Benchmarks
----------

I benchmarked the JavaScript version on Ubuntu 11.04 x64

![Js Suffix Trie benchmark results](https://github.com/martijnversluis/JsSuffixTrie/raw/master/benchmarks.png)

Planned
-------

* Internet Explorer benchmarks
* providing string search by prefix (all strings that begin with...)
* rewriting #each without recursion
