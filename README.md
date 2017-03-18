# object.gs
`Object`, `G`et, `S`et 
- +`D`el

Object getter and setter helpers.
This solution allows to manage object fields in `fn()` way.

## How to install:
- `npm install object.gs --save`

## Examples

### Get
```javascript

const assert = require('assert');
const {get, set, del} = require('..');

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

```

### Set
```javascript
const assert = require('assert');
const {get, set, del} = require('..');


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
```

### Del
```javascript
const assert = require('assert');
const {get, set, del} = require('..');


describe('Delete', () => {
    it('del field', () => {
        let object = {key: 1};
        let deleter = del('key');
        deleter(object);

        assert.deepEqual({}, object);
    });

    it('del nested field', () => {
        let object = {key: {xxx: {aaa: 1}}};

        let deleter = del('key.xxx.aaa');
        assert.deepEqual({key: {xxx: {}}}, deleter(object));
    });

    it('del nested field not exists', () => {
        let object = {key: {xxx: {aaa: 2}}};

        let deleter = del('key.xxx.aaa');
        assert.deepEqual({key: {xxx: {}}}, deleter(object));
    });
});
```