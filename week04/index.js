const list = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];

const arr = []
list.forEach(item => {
    const obj = {
        id: item.name || item[Symbol.toStringTag] || 'Reflect',
        children: []
    }
    Object.getOwnPropertyNames(item).forEach(name => {
        const descObj = Object.getOwnPropertyDescriptor(obj, name);
        if (descObj) {
            ['value', 'get', 'set'].forEach(key => {
                if (descObj[key]) {
                    obj.children.push({
                        id: `${obj.id}.${name}`
                    })
                }
            })
        } else {
            obj.children.push({
                id: `${obj.id}.${name}`
            })
        }
    })
    arr.push(obj)

})