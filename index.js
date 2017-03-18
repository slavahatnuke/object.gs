const get = (path, separator = '.') => {
    path = Array.isArray(path) ? path : path.split(separator);

    let readers = path.map((key) => (context) => {
        if (context instanceof Object) {
            return context[key] === undefined ? undefined : context[key];
        } else {
            return undefined;
        }
    });

    return (object) => {
        object = object instanceof Object ? object : {};
        let context = object;

        for (let index = 0; index < readers.length; index++) {
            if (context === undefined) {
                break;
            }

            context = readers[index](context);
        }

        return context;
    };
};

const set = (path, separator = '.') => {
    path = Array.isArray(path) ? path : path.split(separator);

    let keys = [...path];
    let last = keys.pop();

    let writers = keys.map((key) => (context) => {
        if (!(context[key] instanceof Object)) {
            context[key] = {};
        }

        return context[key];
    });

    return (object) => (value) => {
        object = object instanceof Object ? object : {};
        let context = object;

        for (let writer of writers) {
            context = writer(context)
        }

        context[last] = value;
        return object;
    };
};

const del = (path, separator = '.') => {
    path = Array.isArray(path) ? path : path.split(separator);

    let keys = [...path];
    let last = keys.pop();

    let items = keys.map((key) => (context) => {
        return context[key] instanceof Object ? context[key] : undefined;
    });

    return (object) => {
        object = object instanceof Object ? object : {};
        let context = object;

        for (let writer of items) {
            if (context instanceof Object) {
                context = writer(context);
            }
        }

        if (context instanceof Object) {
            delete context[last];
        }

        return object;
    };
};

module.exports.get = get;
module.exports.set = set;
module.exports.del = del;
