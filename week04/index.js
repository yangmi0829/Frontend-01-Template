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
    let obj
    if (item) {
        obj = {
            id: item.name || item[Symbol.toStringTag] || 'Reflect',
            object: item,
            children: []
        }
        Object.getOwnPropertyNames(item).forEach(name => {
            obj.children.push({
                id: `${item.name || item[Symbol.toStringTag]}.${name}`,
                object: item[name],
                children: []
            })
        })

    } else {
        obj = {
            id: String(item),
            object: item
        }
    }

    arr.push(obj)

})