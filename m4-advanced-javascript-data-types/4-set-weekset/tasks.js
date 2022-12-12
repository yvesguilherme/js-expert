/*
  Filter unique array members
  Let arr be an array.

  Create a function unique(arr) that should return an array with unique items
  of arr.

  For instance:

  function unique(arr) {
    // your code.
  }

  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];

  console.log(unique(values)); // Hare, Krishna, :-O
  P.S.Here strings are used, but can be values of any type.
*/

function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log('### 1)', unique(values), '\n');

/*
  Filter anagrams
  Anagrams are words that have the same number of same letters, but in different
  order.

  For instance:

  nap - pan
  ear - are - era
  cheaters - hectares - teachers
  Write a function aclean(arr) that returns an array cleaned from anagrams.

  For instance:
  let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

  console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
  From every anagram group should remain only one word, no matter which one.
*/

function aclean(arr) {
  const map = new Map();

  for (const word of arr) {
    const sorted = word.toLowerCase().split('').sort().join('');
    map.set(sorted, word);
  }

  return Array.from(map.values());
  // or
  // return Array.from(map.keys());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log('### 2)', aclean(arr), '\n');

/*
  Iterable keys
  We’d like to get an array of map.keys() in a variable and then apply array-specific
  methods to it, e.g. .push.

  But that doesn’t work:

  let map = new Map();

  map.set("name", "John");

  let keys = map.keys();

  // Error: keys.push is not a function
  keys.push("more");
*/
let map = new Map();
map.set("name", "John");
const keys = [...map.values(), 'more'];
console.log('### 3)', keys, '\n');