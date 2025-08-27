##  Async keyword in front of a function, JavaScript automatically makes the function return a promise.

```js
async function getData() {
  return "Namaste Js";
}

const data = getData();

console.log(data); // Promise {<fulfilled>: 'Namaste Js'}
```



### Why does `getData()` return a promise?

1. **`async` keyword**:

   - When you use the `async` keyword in front of a function, JavaScript automatically makes the function return a promise.
   - Even if the function doesn't explicitly return a promise, the `async` keyword wraps the returned value in a promise.

2. **What does a promise do?**
   - A promise represents a value that will be available **now** or **in the future**.
   - It can either be in a "pending" state, or it can resolve (fulfilled) with a value, or reject with an error.



### What happens in your `getData()` function?

1. Inside the `getData()` function:

   - You return the string `"Namaste Js"`.
   - Since `getData` is marked as `async`, JavaScript wraps `"Namaste Js"` in a promise and automatically resolves it.

   So, the function's output is not `"Namaste Js"` directly but a **promise** that resolves to `"Namaste Js"`.

2. When you call `getData()`:
   - The result is a promise, not the actual value `"Namaste Js"`.
   - That's why `console.log(data)` prints:
     ```js
     Promise {<fulfilled>: 'Namaste Js'}
     ```



### How to get the actual value from the promise?

To get the resolved value from the promise, you need to use `.then()` or `await`.

#### Example using `.then()`:

```js
getData().then((value) => {
  console.log(value); // Prints: Namaste Js
});
```

#### Example using `await`:

But for `await` to work, you need to be inside another `async` function.

```js
async function fetchData() {
  const value = await getData();
  console.log(value); // Prints: Namaste Js
}

fetchData();
```


### Note :

- When you use the async keyword in front of a function, JavaScript automatically makes the function return a `promise`.
- Even if the function doesn't explicitly return a promise, the async keyword wraps the returned value in a `promise`.<br><br><br><br><br><br><br><br>




## What a async function return in case of actual Promise :

```js
const p = new Promise((resolve, reject) => {
    resolve("Promise 1st Resolved value!");
});

async function getData() {
  return p;
}


const data = getData();

console.log(data); // Promise {<pending>}
```


### Understanding the Code

1. **First, you create a promise `p`:**

   ```javascript
   const p = new Promise((resolve, reject) => {
     resolve("Promise 1st Resolved value!");
   });
   ```

   - A new promise object is created.
   - Inside the promise, the `resolve()` function is called immediately with the value `"Promise 1st Resolved value!"`.
   - This means `p` is a **resolved promise** at the time it’s created.

2. **Inside `getData()`, you return `p`:**

   ```javascript
   async function getData() {
     return p;
   }
   ```

   - The `async` function wraps the returned value (`p`) into another promise.
   - But since `p` is already a promise, JavaScript keeps it as is. No additional wrapping happens.

3. **When you call `getData()`:**

   ```javascript
   const data = getData();
   ```

   - `getData()` is an `async` function, so it **always** returns a promise, regardless of whether it’s wrapping an existing promise (`p`) or a plain value.

4. **When you log `data`:**
   ```javascript
   console.log(data); // Promise {<pending>}
   ```
   - When `data` is logged, the promise (`p`) returned by `getData()` is **still in the process of resolving**, so its state shows as `<pending>`.
   - This is because logging happens **immediately**, but resolving the promise is an asynchronous operation.



### How to Get the Resolved Value?

To access the value resolved by the promise, you must use `.then()` or `await`, just like before.

#### Example with `.then()`:

```javascript
getData().then((value) => {
  console.log(value); // Prints: Promise 1st Resolved value!
});
```

#### Example with `await`:

```javascript
async function fetchData() {
  const value = await getData();
  console.log(value); // Prints: Promise 1st Resolved value!
}

fetchData();
```


### Why Does `Promise {<pending>}` Appear?

This happens because promises are asynchronous by nature:

1. When you log `data` immediately after calling `getData()`, the promise hasn't had time to resolve yet.
2. After JavaScript finishes running all synchronous code, it will process the promise and resolve its value.


### Key Takeaways:

- **`getData()`** always returns a promise because it’s an `async` function.
- Even if it returns an already resolved promise (`p`), you can’t get its value immediately without using `.then()` or `await`.
- `Promise {<pending>}` appears because the logging happens before the promise is resolved.

<br><br><br><br><br><br><br><br>

## Difference between Async Awai and .then() Execution Comparison

### **Version 1: Using `await`**

```javascript
async function handlePromise() {
  // JS Engine will wait for Promise to resolve
  const val1 = await p; // Wait for the promise `p` to resolve
  console.log(val1); // Prints: "Promise Resolved value!" (after 2 seconds)
  console.log("Hello World"); // Prints after the above line
}
```

#### How it works:
1. **`await p`:**
   - The `await` keyword pauses the execution of the function until the promise `p` is resolved.
   - The resolved value of `p` (`"Promise Resolved value!"`) is assigned to `val1`.

2. **`console.log(val1)`:**
   - After 2 seconds (when the promise resolves), the value `"Promise Resolved value!"` is printed.

3. **`console.log("Hello World")`:**
   - This is executed **only after** the `await` line is done, so it prints after `"Promise Resolved value!"`.

---

### **Version 2: Using `.then()`**

```javascript
async function handlePromise() {
  // JS Engine will not wait for Promise to resolve
  const val1 = p.then((resolve) => console.log(resolve)); // Start the promise's .then() chain
  console.log(val1); // Prints: Promise {<pending>}
  console.log("Hello World"); // Prints immediately
}
```

#### How it works:
1. **`p.then(...)`:**
   - The `then()` method is called on the promise `p`, which starts the process of attaching a callback to handle the resolved value.
   - However, `.then()` itself **does not wait** for the promise to resolve. It returns another promise (representing the operation of the callback).
   - The callback inside `.then()` (`resolve => console.log(resolve)`) will execute **asynchronously** after 2 seconds, when the promise resolves.

2. **`console.log(val1)`:**
   - The return value of `.then()` is a new promise, which is still **pending** at the time of logging. 
   - So it prints something like:
     ```javascript
     Promise {<pending>}
     ```

3. **`console.log("Hello World")`:**
   - This line is executed immediately after `.then()` is attached, without waiting for the promise to resolve.

4. **When the promise resolves (after 2 seconds):**
   - The `.then()` callback logs `"Promise Resolved value!"`.

---

### **Execution Comparison**

| **Aspect**                | **Version 1 (`await`)**              | **Version 2 (`.then()`)**            |
|----------------------------|--------------------------------------|--------------------------------------|
| **Pause Function Execution** | The function pauses at `await p` until the promise resolves. | The function does not pause; `.then()` is asynchronous. |
| **Order of Logs**           | 1. Resolved value: `"Promise Resolved value!"` <br> 2. `"Hello World"` | 1. `"Promise {<pending>}"` <br> 2. `"Hello World"` <br> 3. Resolved value: `"Promise Resolved value!"` (after 2 seconds). |
| **Key Behavior**            | Synchronous-like behavior; execution waits for the promise. | Fully asynchronous; logs are not blocked by the promise. |

---

### **Key Takeaways:**
1. **`await`:**
   - Makes asynchronous code behave more synchronously (pauses the function until the promise resolves).
   - Ideal for situations where you need the resolved value **before continuing**.

2. **`.then()`:**
   - Continues execution immediately, allowing asynchronous operations to happen in the background.
   - Useful if you don't need to wait for the promise's result to continue.

In short:
- Use `await` if you want to wait for the promise to finish before moving forward.
- Use `.then()` if you want to proceed without waiting, handling the resolved value later.


<br><br><br><br><br><br><br><br>

## Code Analysis and Execution Order of Promise 1 and Promise 2

Let’s go through the **overall execution flow** of the provided code step by step, **correctly this time**, accounting for both the `setTimeout` behavior and `await`.

---

### **Code:**

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1st Resolved value!");
  }, 10000); // Resolves after 10 seconds
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2nd Resolved value!");
  }, 20000); // Resolves after 20 seconds
});

async function handlePromise() {
  console.log("Hello World");

  const val1 = await p1;
  console.log(val1);

  const val2 = await p2;
  console.log(val2);
}

handlePromise();
```

---

### **Step-by-Step Execution Flow:**

1. **Step 1: Script Starts Execution**
   - The `p1` and `p2` promises are created. These immediately set their timers for `10,000ms` (10 seconds) and `20,000ms` (20 seconds), respectively.
   - At this point, both `p1` and `p2` are in the **pending** state.

2. **Step 2: `handlePromise()` Starts Execution**
   - The `handlePromise` function is called.
   - Inside `handlePromise`, the first line is:
     ```javascript
     console.log("Hello World");
     ```
     This logs:
     ```
     Hello World
     ```

3. **Step 3: First `await p1`**
   - The `await p1` pauses the execution of `handlePromise` until `p1` resolves.
   - Since `p1` was created earlier and its timer started immediately, it will resolve after **10 seconds** from the start of the script.

4. **Step 4: `p1` Resolves**
   - After 10 seconds, `p1` resolves with the value `"Promise 1st Resolved value!"`.
   - The `await p1` now completes, and the next line in `handlePromise` executes:
     ```javascript
     console.log(val1);
     ```
     This logs:
     ```
     Promise 1st Resolved value!
     ```

5. **Step 5: Second `await p2`**
   - After logging the value of `p1`, the code encounters:
     ```javascript
     const val2 = await p2;
     ```
   - This pauses the execution of `handlePromise` until `p2` resolves.
   - Since `p2`’s timer started **at the beginning of the script**, it will resolve **20 seconds after the script started**. However, 10 seconds have already elapsed waiting for `p1`. So, the function now waits for an additional **10 seconds** for `p2` to resolve.

6. **Step 6: `p2` Resolves**
   - After a total of 20 seconds from the start of the script, `p2` resolves with the value `"Promise 2nd Resolved value!"`.
   - The `await p2` completes, and the next line in `handlePromise` executes:
     ```javascript
     console.log(val2);
     ```
     This logs:
     ```
     Promise 2nd Resolved value!
     ```

---

### **Final Output in the Console:**

| Time Elapsed | Output                              |
|--------------|-------------------------------------|
| 0 seconds    | `Hello World`                      |
| 10 seconds   | `Promise 1st Resolved value!`      |
| 20 seconds   | `Promise 2nd Resolved value!`      |

---

### **Key Points to Understand:**

1. **`setTimeout` Starts Immediately**:
   - Both `p1` and `p2` start their timers as soon as the promises are created. They resolve independently, without waiting for each other.

2. **`await` Pauses Function Execution**:
   - The `await` keyword pauses the execution of the `async` function at that line until the promise resolves. It does **not** block the entire JavaScript runtime.

3. **Sequential `await` Adds Waiting Time**:
   - The second `await p2` only starts after the first `await p1` is complete, even though `p2` has already started running in the background. This is why the total time taken by `handlePromise` is **20 seconds**.

---

### Optimized Version:

If you want to handle both promises **in parallel** and reduce the total waiting time, you can use `Promise.all`:

```javascript
async function handlePromise() {
  console.log("Hello World");

  const [val1, val2] = await Promise.all([p1, p2]);
  console.log(val1); // Logs after 20 seconds
  console.log(val2); // Logs after 20 seconds
}
handlePromise();
```

With this version:
- Both promises are awaited **simultaneously**.
- Total execution time: **20 seconds**, not 20 + 10 = 30 seconds.

<br><br><br><br><br><br><br><br>

## API Request using Async Await :

```javascript
async function handlePromise() {
  const response = await fetch("https://api.github.com/users/moaz-shamim");

  const data = await response.json();

  console.log("data", data);
}

handlePromise();

console.log("lula bee");
```

---

### **Step-by-Step Execution Flow:**

#### **1. Script Starts Execution**
- The JavaScript engine starts executing the code **synchronously** from the top.
- The `handlePromise` function is declared but not executed yet.

#### **2. `handlePromise()` is Called**
- The `handlePromise` function is invoked, and execution enters the function.

---

#### **3. `fetch()` and `await` Behavior**
- Inside the `handlePromise` function:
  ```javascript
  const response = await fetch("https://api.github.com/users/moaz-shamim");
  ```
  - The `fetch` function starts an **asynchronous HTTP request** to get data from the GitHub API.
  - The `await` keyword pauses the **execution of the `handlePromise` function** until the `fetch` promise is resolved.
  - **Note**: While `await` pauses the function, it does **not block the main thread**. The JavaScript engine continues executing other parts of the code.

---

#### **4. `console.log("lula bee")` Executes**
- Since the `await` keyword has paused the `handlePromise` function, the JavaScript engine moves to the next line **outside the function**:
  ```javascript
  console.log("lula bee");
  ```
  This logs:
  ```
  lula bee
  ```

---

#### **5. The `fetch` Promise Resolves**
- After the HTTP request completes (which takes some time depending on network speed), the `fetch` promise resolves with a `Response` object.
- The paused `handlePromise` function resumes execution, and the `response` variable is assigned the resolved value.

---

#### **6. Parsing the Response**
- Next, the code calls:
  ```javascript
  const data = await response.json();
  ```
  - The `response.json()` method is also **asynchronous** and returns a promise. It parses the HTTP response body into a JSON object.
  - The `await` keyword pauses execution again until the `response.json()` promise resolves.
- Once resolved, the parsed JSON data is assigned to the `data` variable.

---

#### **7. Logging the Data**
- Finally, the code executes:
  ```javascript
  console.log("data", data);
  ```
  This logs the parsed JSON data from the GitHub API.

---

### **Final Output in the Console:**

| Time Elapsed | Output         |
|--------------|----------------|
| 0 seconds    | `lula bee`     |
| 1-2 seconds  | `data` object (GitHub API response) |

---

### **Important Concepts in Action:**

1. **`async/await` Pauses Execution in the Function, Not the Script**:
   - The `await` keyword pauses only the `async` function’s execution but allows other synchronous code (like `console.log("lula bee")`) to run.

2. **Non-Blocking Nature of JavaScript**:
   - The `fetch` operation runs asynchronously in the background, and JavaScript does not block the main thread waiting for it.

3. **Order of Execution**:
   - The synchronous `console.log("lula bee")` runs before the asynchronous `console.log("data", data)` because the latter is delayed by the `await` operations.

---

### **Execution Flow Summary**:

1. The `handlePromise` function is called.
2. It pauses at `await fetch(...)`, allowing `console.log("lula bee")` to execute.
3. The HTTP request completes, and the function resumes.
4. The JSON data is parsed, and the `data` object is logged.