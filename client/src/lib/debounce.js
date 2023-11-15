/*
    to use on when interested by the final state, at end of a wait time
    here I use it for search inputs
*/

const debounce = (fn, delay) => {
    let id;
    return (...args) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}