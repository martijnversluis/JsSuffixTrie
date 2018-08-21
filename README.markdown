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

Possible applications
---------------------

* whitelists or blacklists
* large arrays of string (e.g. email adresses)
* autocomplete (e.g. tagging)
* dictionary (e.g. Wordfeud)

Documentation
-------------

###Constructor

####<code>JsSuffixTrie()</code>

Creates an empty instance

###Methods

####add(string)

Adds the specified string to the trie. Returns <code>true</code> if the string is not already in the trie, otherwise <code>false</code>

####remove(string)

Removes the specified string from the trie. Returns <code>true</code> if the string was found, otherwise <code>false</code>.

####contains(string)

Returns <code>true</code> if the specified string is in the trie, otherwise <code>false</code>.

####subTrie(prefix)

Returns a new trie representing all strings of the original trie that match the prefix

_example:_

<pre>var trie = new JsSuffixTrie;
trie.add("foo");
trie.add("foobar");
trie.add("barber");
trie.subTrie("foo").toArray();  // returns ["foo", "foobar"]
trie.size();                    // returns 2</pre>

####find(prefix)

Returns an array containing all the strings in the trie that match the prefix

_example:_

<pre>var trie = new JsSuffixTrie;
trie.add("foo");
trie.add("foobar");
trie.add("barber");
trie.find("foo");   // returns ["foo", "foobar"]</pre>

####each(callback)

Calls the specified callback for each item in the trie. Returns the size of the trie.

_example:_

<pre>var trie = new JsSuffixTrie;
...
trie.each(function (index, item) {
    console.log("#" + index + ": " + items);
});</pre>

####size()

Returns the number of items in the trie

####toArray()

Creates a new array containing all item from the trie.

####toJSON()

Creates a JSON serialization of the internal structure of the trie. The trie can be recreated with <code>JsSuffixTrie.fromJSON()</code>

####JsSuffixTrie.fromArray(array)

Creates an instance an adds each item in the array to the trie.

_example:_

<pre>var array = ['one', 'two', 'three'];
var trie = JsSuffixTrie.fromArray(array);</pre>

####JsSuffixTrie.fromJSON(json)

Recreates a JsSuffixTrie that has been serialized to JSON.

_example:_

<pre>var trie = new JsSuffixTrie;
trie.add("foobar");
...
var json = trie.toJSON();
...
var originalTrie = JsSuffixTrie.fromJSON(json);</pre>

YarnBomb
----------
YarnBomb is a wrapper for JsSuffixTrie.

It allows the storage of values as well as keys, by extending JsSuffixTrie in 3 ways:

1) Add now takes a second argument; the value to store against this key

2) Find now takes an optional second argument; withKeys

If withKeys is true, find returns an array of key/value objects
If withKeys is anything other than true, find returns an array of values

3) A new method called findKeys is added, which preserves the functionality of JsSuffixTrie's original find method

YarnBomb Example
----------
<code>
var yb = new YarnBomb();

yb.add('doofoo', 'barbaz');
yb.add('foo', 'myValue');
yb.add('foobar', {"boys": "yard"});

console.log(yb.find('foo')); // ["myValue", {"boys":"yard"}]
console.log(yb.find('foo', true)); // [{"key":"foo","value":"myValue"},{"key":"foobar","value":{"boys":"yard"}}]
console.log(yb.findKeys('foo')); // ["foo", "foobar"]
</code>

Benchmarks
----------

I benchmarked the JavaScript version on Ubuntu 11.04 x64

![Js Suffix Trie benchmark results](https://github.com/martijnversluis/JsSuffixTrie/raw/master/benchmarks.png)

Planned
-------

* Internet Explorer benchmarks
* More detailed benchmarks
* rewriting #each without recursion
