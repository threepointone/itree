itree
---

simple tree operations on immutable.js "trees"

many interesting things can be modelled as trees. for example, consider the following layout for a movie banner(in jsx notation)
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
you can point to any node in the tree with a path like so -
```js
[0] -> <view><image...</view>
[0, 0] -> <image.... </image>
[0, 0, 1] -> <text className='description'...</text>
```

itree gives you the primitives to manipulate this structure, while leaving the original unchanged.

```js
import {walk, add, remove, move} from 'itree';

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

```
