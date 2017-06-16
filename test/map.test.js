const assert = require('assert');
const {map} = require('..');


describe('Map', () => {
  it('Map object', () => {
    let object = {
      path: {
        to: {
          data: 'OK here'
        }
      }
    };

    let mapper = map({
      key: 'path.to.data'
    });

    let data = mapper(object);

    assert.deepEqual({key: 'OK here'}, data);
  });

  it('Map array', () => {
    let object1 = {
      path: {
        to: {
          data: 'OK here'
        }
      }
    };
    let object2 = {
      path: {
        to: {
          data: 'New one here'
        }
      }
    };

    let object3 = {
      path: {
        to: {
          // nothing here
        }
      }
    };

    let mapper = map({
      key: 'path.to.data'
    });

    let data = mapper([object1, object2, object3]);

    assert.deepEqual([
      {
        key: 'OK here'
      },
      {
        key: 'New one here'
      },
      {
        key: undefined
      }
    ], data);

  });

  it('Map object with nested result fields', () => {
    let object = {
      path: {
        to: {
          data: 'OK here'
        }
      }
    };

    let mapper = map({
      'nested.key.here': 'path.to.data',
      'nested.key.new': 'path.to'
    });

    let data = mapper(object);

    assert.deepEqual({
      nested: {
        key: {
          here: 'OK here',
          new: {
            data: 'OK here'
          }
        }
      }
    }, data);
  });

});