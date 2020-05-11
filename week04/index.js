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
            id: item.name || item[Symbol.toStringTag],
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


var set = new Set();
var objects = list
objects.forEach(o => set.add(o));

for (var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for (var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if (!set.has(d.value))
                console.log(d.value)
        set.add(d.value), objects.push(d.value);
        /* if (d.get)
            if (!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if (d.set)
            if (!set.has(d.set))
                set.add(d.set), objects.push(d.set); */
    }
}
console.log(set)