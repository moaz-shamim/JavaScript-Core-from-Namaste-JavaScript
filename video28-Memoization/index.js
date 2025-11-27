let sum = 0;
const calc = (n) => {
	for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// console.time()
// console.log(calc(5));
// console.timeEnd()


// const memoize = (fun) => {
//     let cache = {};
//     return function(...args){
//         let n = args[0];
//         if (n in cache) {
//             return cache[n];
//         } else {
//             let result = fun(n);
//             cache[n] = result;
//             return result;
//         } 
//     }
// }

// console.time()
// const efficient = memoize(calc);
// console.log(efficient(5));
// console.timeEnd()


// console.time()
// console.log(efficient(5));
// console.timeEnd()


const slowFib = (n) => {
    if (n <= 1) return 1;
    return slowFib(n-1) + slowFib(n-2);
}


const fib = (n, memo) => {
    memo = memo || {}

    if (memo[n]) return memo[n]

    if (n <= 1) return 1

    return memo[n] = fib(n-1, memo) + fib(n-2, memo)
}


console.time("slow");
console.log("slow fib:", slowFib(40));
console.timeEnd("slow");


// console.time("fast");
// console.log("fast fib:", fib(40)); // MUCH faster
// console.timeEnd("fast");
