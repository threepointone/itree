itree
---

_(alpha)_

simple tree operations on immutable.js "trees"

many interesting things can be modelled as trees. for example, consider the following layout for a movie banner
```js
<view>
  <image src='poster.jpg'>
    <text style={{fontSize: 10, fontFamily: 'helvetica'}}> Movie Title </text>
    <text className='description'> Where dreams are made </text>
  </image>
</view>
```
this can also be represented as the following
```js
let tree = immutable.fromJS({
  type: 'view',
  children: [{
    type: 'image',
    props: {
      src: 'poster.jpg'
    },
    children: [{
      type: 'text',
      props: {
        style: {
          fontSize: 10,
          fontFamily: 'helvetica'
        }
      },
      children: ['Movie Title']
    }, {
      type: 'text',
      props: {
        className: 'description'
      },
      children: ['Where dreams are made']
    }]
  }]
});
```

itree gives you the primitives to manipulate this structure, while leaving the original unchanged.

```js
import {walk, add, remove, move, type, props} from 'itree';

// you can point to any node in the tree with a path like so -
// [0] -> <view><image...</view>
// [0, 0] -> <image.... </image>
// [0, 0, 1] -> <text className='description'...</text>

// get node at path
walk(tree, [0, 0]) // <image.... </image>

// add a node at path
add(tree, [0], {type: 'image', src: 'thumb.jpg'})
// <view>
//  <image src='thumb.jpg'/>
//  <image src='poster.jpg'>
//    ...
//  </image>
// </view>

// remove a node from path
remove(tree, [0, 0])
// <view></view>

// move a node from one path to another
move(tree, [0, 0, 0], [0, 0])
// <view>
//  <text style={{fontSize...</text>
//  <image src='poster.jpg'>
//    <text className='description'...</text>
//  </image>
// </view>

// change the type of a node
type(tree, [0], 'xyz')
// <xyz>
//  <image src='poster.jpg'>
//    ...
//  </image>
// </xyz>

// set the props of a node
props(tree, [0, 0], {a: 1})
// <view>
//  <image src='poster.jpg', a={1}>
//    ...
//  </image>
// </view>


```

tests
---
`npm test`

further work
---

- more functions (up, down, diff, patch, etc)
- demos
