const assert = require('assert');
const {get} = require('..');

describe('Get', () => {
    it('get field', () => {
        let object = {key: 10};
        let getter = get('key');

        assert.equal(10, getter(object));
    });

    it('get nested field', () => {
        let object = {a: {b: {d: 2}}, c: 3};
        assert.equal(2, get('a.b.d')(object));
        assert.deepEqual({d: 2}, get('a.b')(object));
    });

    it('get by array key', () => {
        let object = {x: {Y: {Z: 25}}};
        let getter = get(['x', 'Y', 'Z']);

        assert.equal(25, getter(object));
    });

    it('get wrong key', () => {
        let object = {};
        let getter = get('xxx');

        assert.equal(undefined, getter(object));
    });

    it('get wrong nested key', () => {
        let object = {};
        let getter = get('xxx.yyy.zzz');

        assert.equal(undefined, getter(object));
    });

});