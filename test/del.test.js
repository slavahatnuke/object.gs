const assert = require('assert');
const {del} = require('..');


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