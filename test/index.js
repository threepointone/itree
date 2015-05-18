/* global describe, it */
import immutable from 'immutable'; // using this here just

import {walk, add, remove, move} from '../index.js';

let plant = immutable.fromJS({
  type: 'a',
  children: [{
    type: 'b'
  }, {
    type: 'c'
  }, {
    type: 'c',
    children: [{
      type: 'd'
    }, {
      type: 'e'
    }, {
      type: 'd'
    }]
  }]
});


describe('immutable tree', () => {
  it('can walk a path on the tree', done => {
    walk(plant, [0, 1]).get('type').should.equal('c');
    walk(plant, [0, 2]).get('children').size.should.equal(3);
    walk(plant, [0, 2, 1]).get('type').should.equal('e');
    try{
      walk(plant, [1]);
    }
    catch(e){
      e.should.be.an.Error;
      done();
    }
  });

  it('can add a node', done => {
    var p2 = add(plant, [0, 2, 1], {
      type: 'pin'
    });
    walk(p2, [0, 2, 1]).get('type').should.equal('pin');
    try{
      add(plant, [1]);
    }
    catch(e){
      e.should.be.an.Error;
      done();
    }
  });

  it('can remove a node', () => {
    walk(remove(plant, [0, 2, 0]), [0, 2]).getIn(['children', 0, 'type']).should.equal('e');
  });

  it('can move a node', () => {
    var p2 = move(plant, [0, 2, 1], [0, 1]);
    walk(p2, [0, 1]).get('type').should.equal('e');
  });

});
