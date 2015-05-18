//tree helpers

//return a new tree everytime
//so cool
import immutable from 'immutable';


function valid(tree, path){
  if (path.length === 1) {
    if (path[0] !== 0) {
      throw new Error('tree paths must start with 0');
    }

  }
  return !!tree && true;
}

// cursor walkers

export function walk(tree, path) {
  valid(tree, path);

  return path.slice(1).reduce((node, i) => {
    if (!node || !node.getIn(['children', i])) {
      throw new Error('node does not exist at path');
    }
    return node.getIn(['children', i]);
  }, tree);
}

export function add(tree, path, child) {
  valid(tree, path);

  if (!walk(tree, path.slice(0, path.length - 1))) {
    throw new Error('no parent exists to add child');
  }
  // todo - out of bounds violation in children
  var path$ = path
    .slice(1, path.length - 1)
    .map(i => ['children', i])
    .reduce((arr, p) => [...arr, ...p], []);

  return tree.updateIn(path$, parent => {
    return parent.set('children',
      (parent.get('children') || immutable.fromJS([]))
        .splice(path[path.length - 1], 0, immutable.fromJS(child)));
  });
}

export function remove(tree, path) {
  valid(tree, path);

  if (!walk(tree, path.slice(0, path.length - 1))) {
    throw new Error('no parent exists to add child');
  }
  // todo - out of bounds violation in children
  var path$ = path
    .slice(1, path.length - 1)
    .map(i => ['children', i])
    .reduce((arr, p) => [...arr, ...p], []);

  return tree.updateIn(path$, parent => {
    return parent.set('children',
      parent.get('children').splice(path[path.length - 1], 1));
  });
}

export function move(tree, oldPath, newPath) {
  return add(remove(tree, oldPath), newPath, walk(tree, oldPath));
}

export function up(tree, path){
  move(tree, path, path.slice(0, path.length-2).concat([path[path.length-1] -1]));
}

export function down(tree, path){
  move(tree, path, path.slice(0, path.length-2).concat([path[path.length-1] +1]));
}

export function type(tree, path, $type){
  return tree.updateIn(path, node => node.set('type', $type));
}

export function props(tree, path, $props){
  return tree.updateIn(path, node => node.set('props', $props));
}


export function transpose( /*paths*/ ) {
  // transpose matlab calculate what the new positions of those paths are, if required.
  // used to figure out if active path has moved/etc
  // unsure what the api here should be
}

