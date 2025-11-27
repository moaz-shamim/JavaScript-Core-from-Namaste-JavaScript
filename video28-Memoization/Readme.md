# What is Memoization?

In programming, memoization is an optimization technique that makes applications more efficient and hence faster. It does this by storing computation results in cache, and retrieving that same information from the cache the next time it's needed instead of computing it again.


## How Does Memoization Work?

The concept of memoization in JavaScript relies on two concepts:

- Closures: The combination of a function and the lexical environment within which that function was declared.

- Higher Order Functions: Functions that operate on other functions, either by taking them as arguments or by returning them.

# Example 1 : 

```js
const memoize = (fun) => {
    let cache = {};
    return function(...args){
        let n = args[0];
        if (n in cache) {
            return cache[n];
        } else {
            let result = fun(n);
            cache[n] = result;
            return result;
        } 
    }
}

console.time()
const efficient = memoize(calc);
console.log(efficient(5));
console.timeEnd()


console.time()
console.log(efficient(5));
console.timeEnd()
```


### **1️⃣ Check if answer is already in cache**

If yes → return the cached value (fast).

### **2️⃣ Otherwise compute it → store it in cache → return it**

(first time calculation → slow).

---

### 📝 Let’s explain *your code* with a small story

### Function: `calc(n)`

It calculates:

```
sum = 0 + 1 + 2 + ... + n
```

### Memoize:

```js
const efficient = memoize(calc);
```

---

### 📦 **FIRST CALL → efficient(5)**

### Step 1: Cache is empty

```
cache = {}
```

### Step 2: Since 5 isn’t in cache:

```
calculating first time
```

### Step 3: calc(5) runs:

```
sum = 0+1+2+3+4+5 = 15
```

### Step 4: Store result in cache:

```
cache = {
    5: 15
}
```

### Step 5: Return 15

---

### 📦 **SECOND CALL → efficient(5)**

### Step 1: Check cache

```
is 5 in cache?  YES!
```

### Step 2: No calculation

```
cache
```

### Step 3: Return stored value instantly

```
15
```

---

### ⚡Final Output Flow:

```
calculating first time
15
cache
15
```


# Example 2:

```js
const fib = (n, memo) => {
    memo = memo || {}

    if (memo[n]) return memo[n]

    if (n <= 1) return 1
    return memo[n] = fib(n-1, memo) + fib(n-2, memo)
}
```

## 🧠 What is Fibonacci?

```
fib(0) = 1
fib(1) = 1
fib(2) = fib(1) + fib(0) = 2
fib(3) = fib(2) + fib(1) = 3
fib(4) = fib(3) + fib(2) = 5
...
```

---

## 🔍 Step-by-step Explanation of the Code

### **1️⃣ memo = memo || {}**

If memo is passed → use it
If not passed → create an empty object `{}`

So this line ensures we always have a memo object.

---

### **2️⃣ If result is already stored:**

```js
if (memo[n]) return memo[n]
```

If we already calculated `fib(n)` earlier, return it immediately.

This is what makes the algorithm **fast**.

---

### **3️⃣ Base Case:**

```js
if (n <= 1) return 1
```

fib(0) → 1
fib(1) → 1

This stops infinite recursion.

---

### **4️⃣ Recursive case + storing in memo**

```js
return memo[n] = fib(n-1, memo) + fib(n-2, memo)
```

Before returning the sum, we store it in:

```
memo[n]
```

So next time fib(n) is requested → instantly returned.

---

## 🎯 Let’s Walk Through Example: `fib(5)`

### Start:

```
fib(5)
```

memo = {}

### Now follow calls:

```
fib(5)
  → fib(4) + fib(3)

fib(4)
  → fib(3) + fib(2)

fib(3)
  → fib(2) + fib(1)

fib(2)
  → fib(1) + fib(0)
```

Let’s visualize…

---

## 🧩 **Call Tree Without Memoization (slow version)**

```
fib(5)
 ├── fib(4)
 │    ├── fib(3)
 │    │    ├── fib(2)
 │    │    │    ├── fib(1)
 │    │    │    └── fib(0)
 │    │    └── fib(1)
 │    └── fib(2)
 │         ├── fib(1)
 │         └── fib(0)
 └── fib(3)
      ├── fib(2)
      ├── fib(1)
      └── fib(0)
```

Notice how:

* **fib(3) is repeated**
* **fib(2) is repeated 3 times**
* **fib(1) is repeated many times**

This is why naive recursion is slow.

---

## 🚀 Now With Memoization (your version)

Memoization cuts off repeated branches:

### Step-by-step:

1. fib(5) calls
2. fib(4) calls
3. fib(3) calls
4. fib(2) calls → computes once → stores in memo
5. fib(1) returns 1
6. Now memo has:

```
memo = {
  2: 2
}
```

7. fib(3) result computed → stored:

```
memo = {
  2: 2,
  3: 3
}
```

8. fib(4) computed → stored:

```
memo = {
  2: 2,
  3: 3,
  4: 5
}
```

9. fib(5) computed → stored:

```
memo = {
  2: 2,
  3: 3,
  4: 5,
  5: 8
}
```

After that — any fib(5), fib(4), fib(3)... call is **instant**.

---

## 🔥 Final Understanding

### This line:

```js
return memo[n] = fib(n-1, memo) + fib(n-2, memo)
```

Does **three things at once**:

1. computes fib(n)
2. stores fib(n) in memo
3. returns fib(n)

Very clean & efficient.

---

## ⭐ Final Summary

| Part                          | Meaning                  |     |                     |
| ----------------------------- | ------------------------ | --- | ------------------- |
| `memo = memo                  |                          | {}` | prepare memo object |
| `if (memo[n]) return memo[n]` | return cached answer     |     |                     |
| `if (n <= 1) return 1`        | base condition           |     |                     |
| `memo[n] = fib(n-1)+fib(n-2)` | compute + store + return |     |                     |

---

[Memoization from free code camp ](https://www.freecodecamp.org/news/memoization-in-javascript-and-react/)