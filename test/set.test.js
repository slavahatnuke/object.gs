const assert = require('assert');
const {set} = require('..');


describe('Set', () => {
    it('set field', () => {
        let object = {};
        let setter = set('key');
        let objectSetter = setter(object);

        assert.deepEqual({key: 10}, objectSetter(10));
        assert.deepEqual({key: 20}, objectSetter(20));
        assert.deepEqual({key: 35}, objectSetter(35));

        assert.deepEqual({key: 35}, object);
    });

    it('set nested field', () => {
        let object = {key: 1};
        let setter = set('key.xxx.yyy');
        let objectSetter = setter(object);

        assert.deepEqual({key: {xxx: {yyy: 11}}}, objectSetter(11));
        assert.deepEqual({key: {xxx: {yyy: 11}}}, object);

        assert.deepEqual({key: {xxx: {yyy: undefined}}}, objectSetter(undefined));
    });

});