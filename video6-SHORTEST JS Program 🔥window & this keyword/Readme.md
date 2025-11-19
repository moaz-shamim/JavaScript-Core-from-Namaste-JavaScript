[Stack overflow the real definition](https://stackoverflow.com/questions/49662203/what-does-binding-mean-in-javascript)

[let's Understand this](https://medium.com/codex/binding-in-js-explained-4a2481a0b01a)

[let's Deep into binding](https://medium.com/@amsingh714/common-javascript-interview-question-what-is-the-purpose-of-this-e9f5e11720c5)

[Uncover the concept of call apply and bind method](https://dev.to/thesanjeevsharma/call-apply-and-bind-in-javascript-2nno)

## ✅ **What is Binding in JavaScript — Clear Definition**

> **Binding means deciding what `this` will refer to when a function is called.**

## Q.What is this Binding in JavaScript ?

- "Binding in JavaScript refers to how variables, functions, and the `this` keyword are associated with their values and execution context. When you declare a variable or function, JavaScript ‘binds’ it to a specific environment (like a workspace) where it can be accessed. The `this` keyword is also bound dynamically based on **how a function is called**."


### Types of  Binding with Examples:
#### **a. Default Binding:**

- Definition: When a function is invoked in the global scope (without any context), this points to the global object (e.g., window in browsers, global in Node.js). In strict mode, this becomes undefined to avoid unintended global references this is called Default Binding.

```javascript
function sayHi() {
  console.log(this.name); // `this` = global object (e.g., `window` in browsers)
}
sayHi(); // Default: `this` refers to the global scope.
```

#### **b. Implicit Binding (Method Call):**

- when a function is invoked with the dot notation, ‘this’ will reference the object to the left of our dot this is called implicit binding.

```javascript
const user = {
  name: "Alice",
  sayHi() {
    console.log(this.name); // `this` = `user` object
  }
};
user.sayHi(); // Output: "Alice" (implicitly bound to `user`)
```

#### **c. Explicit Binding (Using `call`, `apply`, `bind`):**

- when we explicitly provide value of ‘this’ by using call, apply and bind functions
then this is  called Explicit Binding .

```javascript
function greet() {
  console.log(this.name);
}
const person = { name: "Bob" };
greet.call(person); // Output: "Bob" (explicitly set `this` to `person`)
```

#### **d. `new` Binding (Constructor):**

- Definition: When a function is invoked with the new keyword (as a constructor), this points to the newly created instance of the object.

```javascript
function Car(model) {
  this.model = model; // `this` = new instance
}
const myCar = new Car("Tesla"); // `this` binds to `myCar`
```

#### **e. Arrow Functions (Lexical `this`):**
```javascript
const obj = {
  name: "Charlie",
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // Inherits `this` from `greet` (lexical scope)
    }, 100);
  }
};
obj.greet(); // Output: "Charlie"
```

---

### ** Pitfalls & Fixes of this:**
- **Losing `this` in Callbacks**:  
  ```javascript
  const user = {
    name: "Dave",
    greet() {
      setTimeout(function() {
        console.log(this.name); // `this` defaults to global (not `user`!)
      }, 100);
    }
  };
  user.greet(); // Output: undefined (if no global `name` exists)
  ```
  **Fix with `bind`**:  
  ```javascript
  setTimeout(function() { ... }.bind(user), 100); // Force `this` = user
  ```


## ✅ **What is `this` in JavaScript — Simple Definition**

> **`this` keyword refers to the object that is currently calling the function.**


## Q.Explain how this works in js / What is this keyword and how to implement it ?

- In JavaScript, this is a keyword that refers to the current execution context of a function or the global context.

- In the global scope, this refers to the global object, which is the window object in a web browser or the global object in a Node.js environment.


### Use of this Within a regular function call:

- When a function is called in the global context or as a standalone function, this refers to the global object.


```js
function showThis() {
  console.log(this);
}

showThis(); // In non-strict mode: Window (global object). In strict mode: undefined.

```


### Use of this Within a method call:

- When a function is called as a method of an object, this refers to the object that the method is called on.


```js
const obj = {
  name: 'John',
  showThis: function () {
    console.log(this);
  },
};

obj.showThis(); // { name: 'John', showThis: ƒ }
```

### Use of this Within a function constructor:

- When a function is used as a constructor (called with the new keyword), this refers to the newly-created instance/objects.

```js
function Person(name) {
  this.name = name;
}

const person = new Person('John');
console.log(person.name); // "John"

```
- In the following example, this refers to the Person object being created, and the name property is set on that object.

### Use of this Within arrow functions:

- Arrow functions do not have their own this context. Instead, the this is lexically scoped, which means it inherits the this value from its surrounding scope at the time they are defined.

```js
const person = {
  name: 'John',
  sayHello: () => {
    console.log(`Hello, my name is ${this.name}!`);
  },
};

person.sayHello(); // "Hello, my name is undefined!"
```


### Use of this Within event handlers:

- When a function is called as a DOM event handler, this refers to the element that triggered the event. In this example, this refers to the `<button>` element that was clicked.

```js
<button id="my-button" onclick="console.log(this)">Click me</button>
```
<!-- Logs the button element -->

- When setting an event handler using JavaScript, this also refers to the element that received the event.

```js
  document.getElementById('my-button').addEventListener("click",()=>{
    console.log(this)  // Logs the button element
  })
```


## Q.Explain the concept of function borrowing ?

- Function borrowing in JavaScript is a technique where a method from one object is reused on another object by explicitly setting the this context. This is achieved using the call(), apply(), or bind() methods, which allow you to invoke a function with a specific this value and arguments

JavaScript provides three main methods for this:
- call() - runs the function immediately with a specified this value
- apply() - same as call() but takes arguments as an array
- bind() - returns a new function with this bound to a specific object

```js
const person1 = {
  firstName: 'Alice',
  lastName: 'Smith',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const person2 = {
  firstName: 'Bob',
  lastName: 'Johnson'
};

// Borrow getFullName from person1 for person2
const fullName = person1.getFullName.call(person2);
console.log(fullName); // Output: "Bob Johnson"
```

## Q.Explain the concept of call() apply() and bind() ?

call()

- The call() method calls a function with a given this value and arguments provided individually.

```js
function personIntro() {
  console.log(`${this.firstName} ${this.lastName}`);
};

const person1 = {
  firstName: 'Sanjeev',
  lastName: 'Sharma'
};

personIntro(); // Output 1: undefined undefined

personIntro.call(person1); // Output 2: Sanjeev Sharma

personIntro.call({ firstName : 'Harry', lastName : 'Potter' }); // Output 3: Harry Potter
```

```js
function personIntro(city, state) {
  console.log(`${this.name} is from ${city}, ${state}`);
};

const person = {
  name: 'Max',
  age: 26
}

personIntro.call(person, 'Los Angeles', 'California'); // Output: Max is from Los Angeles, California
```




apply()

- The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).

```js
function greet(city, country) {
  console.log(`Hello, my name is ${this.name}. I live in ${city}, ${country}`);
}

const person = { name: "Moaz" };

// Using call
greet.call(person, "Delhi", "India");

// Using apply (notice arguments are inside an array)
greet.apply(person, ["Delhi", "India"]);

```

```js
function sum(num1, num2) {
  console.log(this + num1 + num2);
}

sum.call(2, 3, 4); // Output: 9
sum.apply(2, [3, 4]); // Output: 9

```


bind()

- The bind() method Creates a new function wherethis keyword set to the provided value. It doesn’t call the function immediately.

```js
function getPerson(person) {
  console.log(`${ person } is from ${ this.state }.`);
}

getPerson.call({ state : 'California' }, 'Max'); // Output 1: Max is from California.

const personFromCalifornia = getPerson.bind({ state : 'California' });

personFromCalifornia('Max'); // Output 2: Max is from California.
personFromCalifornia('Ben'); // Output 3: Ben is from California.
```