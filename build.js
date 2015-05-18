'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

// cursor walkers

exports.walk = walk;
exports.add = add;
exports.remove = remove;
exports.move = move;
exports.up = up;
exports.down = down;
exports.type = type;
exports.props = props;
exports.transpose = transpose;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

//tree helpers

//return a new tree everytime
//so cool

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function valid(tree, path) {
  if (path.length === 1) {
    if (path[0] !== 0) {
      throw new Error('tree paths must start with 0');
    }
  }
  return !!tree && true;
}
function walk(tree, path) {
  valid(tree, path);

  return path.slice(1).reduce(function (node, i) {
    if (!node || !node.getIn(['children', i])) {
      throw new Error('node does not exist at path');
    }
    return node.getIn(['children', i]);
  }, tree);
}

function add(tree, path, child) {
  valid(tree, path);

  if (!walk(tree, path.slice(0, path.length - 1))) {
    throw new Error('no parent exists to add child');
  }
  // todo - out of bounds violation in children
  var path$ = path.slice(1, path.length - 1).map(function (i) {
    return ['children', i];
  }).reduce(function (arr, p) {
    return [].concat(_toConsumableArray(arr), _toConsumableArray(p));
  }, []);

  return tree.updateIn(path$, function (parent) {
    return parent.set('children', (parent.get('children') || _immutable2['default'].fromJS([])).splice(path[path.length - 1], 0, _immutable2['default'].fromJS(child)));
  });
}

function remove(tree, path) {
  valid(tree, path);

  if (!walk(tree, path.slice(0, path.length - 1))) {
    throw new Error('no parent exists to add child');
  }
  // todo - out of bounds violation in children
  var path$ = path.slice(1, path.length - 1).map(function (i) {
    return ['children', i];
  }).reduce(function (arr, p) {
    return [].concat(_toConsumableArray(arr), _toConsumableArray(p));
  }, []);

  return tree.updateIn(path$, function (parent) {
    return parent.set('children', parent.get('children').splice(path[path.length - 1], 1));
  });
}

function move(tree, oldPath, newPath) {
  return add(remove(tree, oldPath), newPath, walk(tree, oldPath));
}

function up(tree, path) {
  move(tree, path, path.slice(0, path.length - 2).concat([path[path.length - 1] - 1]));
}

function down(tree, path) {
  move(tree, path, path.slice(0, path.length - 2).concat([path[path.length - 1] + 1]));
}

function type(tree, path, $type) {
  return tree.updateIn(path, function (node) {
    return node.set('type', $type);
  });
}

function props(tree, path, $props) {
  return tree.updateIn(path, function (node) {
    return node.set('props', $props);
  });
}

function transpose() {}

/*paths*/
// transpose matlab calculate what the new positions of those paths are, if required.
// used to figure out if active path has moved/etc
// unsure what the api here should be

