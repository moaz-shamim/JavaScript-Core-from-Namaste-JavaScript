# What is Callback Hell?

The phenomenon which happens when we nest multiple callbacks within a function is called a callback hell. The shape of the resulting code structure resembles a pyramid and hence callback hell is also called the “pyramid of the doom”. It makes the code very difficult to understand and maintain.

### Let's take an Example:

```js
function asyncFunction1(callback) {
  setTimeout(() => {
    console.log("Async Function 1 Done");
    callback();
  }, 1000);
}

function asyncFunction2(callback) {
  setTimeout(() => {
    console.log("Async Function 2 Done");
    callback();
  }, 1000);
}

function asyncFunction3(callback) {
  setTimeout(() => {
    console.log("Async Function 3 Done");
    callback();
  }, 1000);
}


asyncFunction1(() => {
  asyncFunction2(() => {
    asyncFunction3(() => {
      console.log("All Async Functions Completed");
    });
  });
});
```

```js
const cart = ["shoes", "pants", "kurta"];
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet();
    });
    I;
  });
});
```

### Breaking It Down:

1. `api.createOrder(cart, function () {...})` creates an order with the cart items. Once this finishes, it calls the provided function (the callback).
2. Inside this first callback, another function `api.proceedToPayment(function () {...})` is executed, and another callback is passed in.
3. In this second callback, `api.showOrderSummary(function () {...})` is called, and it also contains a callback.
4. Lastly, inside the third callback, `api.updateWallet();` is executed.

### Why is it a Problem?

- The code is deeply nested, making it challenging to understand the flow.
- If you want to modify any part of this sequence, you'll have to go through multiple levels of nesting.
- Error handling can be messy in this structure.

[A decent Blog on CallBack Hell](https://medium.com/dsc-srm/javascript-callback-hell-or-pyramid-of-doom-4f786d14b997)

### Solution:

You can use **Promises** or **async/await** to make the code more readable. For example, using promises, it might look like this:

## Promise
A Promises is an **object** representing the eventual completion or failure of an **asynchronous Operation** . 

[Promise from freecodecamp](https://www.freecodecamp.org/news/javascript-promise-object-explained/)

```javascript
api
  .createOrder(cart)
  .then(() => api.proceedToPayment())
  .then(() => api.showOrderSummary())
  .then(() => api.updateWallet())
  .catch((error) => console.error("An error occurred:", error));
```

This makes the code flatter, more readable, and easier to handle errors.



# How we can create our Promises:

### **What is Happening?**
Your code simulates an **online shopping process** using **Promises** in JavaScript. Promises are a way to handle asynchronous tasks, meaning tasks that take some time to complete (like ordering an item or making a payment). This code performs three main steps:

1. **Create an order for the items in the cart.**
2. **Proceed to payment for the order.**
3. **Handle success or errors in the process.**

---

### **The Steps in Detail**

#### **1. Declaring the `cart`**
```javascript
const cart = ["shoes", "pants", "kurta"];
```
This is a list (array) of items the customer wants to buy.

---

#### **2. Calling the `createOrder(cart)` Function**
```javascript
createOrder(cart)
```
- `createOrder(cart)` is a **function that creates an order** based on the items in the cart.
- It returns a **Promise**, which is like a "promise to do something in the future."

---

#### **3. Inside the `createOrder` Function**
```javascript
function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      setTimeout(function () {
        resolve(orderId);
      }, 5000);
    }
  });
  return pr;
}
```
- The `Promise` has two parts: **`resolve`** (for success) and **`reject`** (for failure).
- **Steps inside `createOrder`:**
  1. **Cart Validation:** It checks if the cart is valid using `validateCart(cart)`. If invalid, it triggers `reject(err)`, and the process stops.
     - Here, the cart is always valid because `validateCart` returns `true`.
  2. **Simulating Order Creation:** An `orderId` is assigned ("12345"). After 5 seconds, the function resolves with the `orderId`.
  3. **Return the Promise:** The function returns the promise (`pr`).

---

#### **4. Handling the `createOrder` Promise**
```javascript
.then(function (orderId) {
  console.log(orderId);
  return orderId;
})
```
- The `.then()` block runs when the `createOrder` promise is resolved successfully.
- The `orderId` ("12345") is logged and passed to the next `.then()`.

---

#### **5. Calling `proceedToPayment(orderId)`**
```javascript
.then(function (orderId) {
  return proceedToPayment(orderId);
})
```
- `proceedToPayment(orderId)` starts the payment process for the given order ID.
- This also returns a **Promise**.

---

#### **6. Inside `proceedToPayment`**
```javascript
function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successful");
  });
}
```
- This function simulates the payment process.
- It **always resolves** with the message `"Payment Successful"`.

---

#### **7. Handling the Payment Promise**
```javascript
.then(function (paymentInfo) {
  console.log(paymentInfo);
})
```
- Once the payment promise is resolved, it logs the success message: `"Payment Successful"`.

---

#### **8. Handling Errors**
```javascript
.catch(function (err) {
  console.log(err.message);
});
```
- If anything goes wrong (like an invalid cart), the `.catch()` block catches the error and logs its message.

---

### **Summary Flow**
1. A cart is validated.
2. If the cart is valid:
   - An order ID is generated after 5 seconds.
   - Payment is processed for the order.
   - If successful, the message `"Payment Successful"` is displayed.
3. If any step fails, the `.catch()` block logs the error.

---

### **Output of the Code**
If there are no errors:
1. After 5 seconds: `12345` (Order ID)
2. Immediately after: `Payment Successful`

# Promise Chaining

This code is an example of **Promise chaining**, where multiple asynchronous operations are executed one after the other in a specific order. Let's break it down step by step and explain the flow:

---

### 1. **Cart and Initial Function Call**
- You have an array `cart` that contains some items: `["shoes", "pants", "kurta"]`.
- The `createOrder(cart)` function is called to start the process of creating an order for the items in the cart.

---

### 2. **`createOrder(cart)` Function**
This function is responsible for creating an order. It:
1. **Returns a Promise**: 
   - A **Promise** is like a "future container" for a value that might be available later.
2. **Inside the Promise**:
   - First, it validates the cart using the `validateCart(cart)` function, which returns `true` (indicating the cart is valid in this case).
   - If the cart is invalid, the `reject()` function is called with an error message: `"Cart is not valid"`. This stops further execution and jumps to the `.catch()` block.
   - If the cart is valid, an `orderId` is created (hardcoded as `"12345"` here) and resolved after a 5-second delay using `setTimeout`.

   ### In Simple Words:
   - If the cart is valid, the order is created, and the `orderId` is returned.
   - If the cart is invalid, the Promise is rejected with an error.

---

### 3. **Promise Chaining with `createOrder(cart)`**
After calling `createOrder(cart)`, you use `.then()` to chain operations:
```javascript
createOrder(cart)
  .then(function (orderId) {
    console.log(orderId); // Logs "12345" after 5 seconds
    return orderId; // Passes `orderId` to the next `.then()`
  })
```
- When the `createOrder` Promise resolves, the first `.then()` is executed.
- The `orderId` ("12345") is logged to the console.
- The `orderId` is returned so the next `.then()` can use it.

---

### 4. **`proceedToPayment(orderId)` Function**
- This function is called in the second `.then()`:
```javascript
.then(function (orderId) {
  return proceedToPayment(orderId);
})
```
- It **returns a new Promise** that resolves with the message `"Payment Successful"`.
- This simulates the payment process based on the `orderId`.

---

### 5. **Chaining with `proceedToPayment`**
- The `proceedToPayment(orderId)` Promise resolves with the message `"Payment Successful"`.
- This message is passed to the third `.then()`:
```javascript
.then(function (paymentInfo) {
  console.log(paymentInfo); // Logs "Payment Successful"
})
```
- The final `.then()` logs the payment success message to the console.

---

### 6. **Error Handling with `.catch()`**
- If at any point a Promise is rejected (e.g., if the cart is invalid), the `.catch()` block is executed:
```javascript
.catch(function (err) {
  console.log(err.message); // Logs the error message
});
```
- In this case, the error message `"Cart is not valid"` would be logged if the cart validation fails.

---

### **How the Flow Works**
1. `createOrder(cart)` starts the order creation process.
2. If the cart is valid:
   - It resolves with the `orderId` ("12345") after 5 seconds.
3. The `orderId` is passed to `proceedToPayment(orderId)`.
4. `proceedToPayment(orderId)` resolves with the payment message `"Payment Successful"`.
5. The final `.then()` logs the payment message to the console.
6. If any step fails, the `.catch()` block logs the error.

---

### **Summary in Simple Terms**
1. **Promises** help handle asynchronous tasks (e.g., waiting for 5 seconds, processing payments) without nested callbacks.
2. **Promise chaining** allows you to process results step by step, passing data from one step to the next.
3. If anything goes wrong at any step, the `.catch()` block will handle the error, ensuring a clean flow.

