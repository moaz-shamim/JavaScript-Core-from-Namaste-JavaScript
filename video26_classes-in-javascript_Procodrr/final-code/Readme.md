# when We call a function in js using new keyword then It return an object :

Yes — when you call a function in JavaScript with the `new` keyword, it becomes a **constructor call**, and by default, it returns a new object.

Here’s what happens step-by-step when you do:

```js
function Person(name) {
	this.name = name;
}

const p = new Person("Moaz");
console.log(p);
```

### How `new` works internally

When you call `new Person("Moaz")`, JavaScript does roughly this under the hood:

1. **Creates a new empty object**:

   ```js
   let obj = {};
   ```

2. **Links it to the function’s prototype**:

   ```js
   obj.__proto__ = Person.prototype;
   ```

3. **Binds `this` inside the function to the new object**:

   ```js
   Person.call(obj, "Moaz");
   ```

4. **Returns the new object** (unless the function explicitly returns another object).

---

### Special case:

If the constructor function **explicitly returns an object**, that object is returned instead of the new one.

```js
function Test() {
	this.name = "Hello";
	return { custom: "I override the default" };
}

const t = new Test();
console.log(t); // { custom: "I override the default" }
```

If it returns a **primitive value**, it’s ignored and the newly created object is returned.

---

If you want, I can also show you **how `new` can be manually implemented** so you can fully understand it. That makes the concept stick much better.

# Here this point the window object Because we do not call the function using new keyword


```js
function createUser (firstName, LastName, age) {
this.firstName = firstName
this.lastName = LastName
this.age = age
}
// createUser.commonMethods = {
//
// getBirthYear() {
// return new Date().getFullYear() this.age
//
//},
//}
const user1 = createUser('Aman', 'Mishra', 32)
const user2 = createUser('Anurag', 'Singh', 72)

```



Exactly ✅ — in your example, since you’re calling `createUser(...)` **without** the `new` keyword, `this` is not bound to a newly created object.

Here’s what’s happening step-by-step:

---

### 1. Function call without `new`

```js
const user1 = createUser('Aman', 'Mishra', 32);
```

* Since you didn’t use `new`, JavaScript treats this as a **normal function call**.
* In **non–strict mode**, `this` inside the function refers to the **global object**:

  * In browsers → `window`
  * In Node.js → `global`
* In **strict mode**, `this` will be `undefined`, and trying to set properties like `this.firstName` will cause an error.

---

### 2. Effect of your current code in a browser

```js
createUser('Aman', 'Mishra', 32);
// sets window.firstName = "Aman"
// sets window.lastName = "Mishra"
// sets window.age = 32
```

`user1` will be `undefined` because your function doesn’t return anything.

---

### 3. Correct way using `new`

If you intended to create user objects:

```js
function createUser(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

createUser.prototype.getBirthYear = function () {
  return new Date().getFullYear() - this.age;
};

const user1 = new createUser('Aman', 'Mishra', 32);
console.log(user1.getBirthYear()); // correct result
```

---

💡 If you want, I can show you a **side-by-side comparison** of what happens to `this` with and without `new` so you can clearly see the difference.
Do you want me to make that?


# prototype for common methods

Alright, Moaz — let’s break this down slowly and clearly so the concept sticks.

---

## 1️⃣ First: Why use **prototype** for common methods?

When you create multiple objects with the `new` keyword, **each object gets its own copy of the properties** you set inside the function.

Example:

```js
function createUser(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

const user1 = new createUser("Aman", "Mishra", 32);
const user2 = new createUser("Anurag", "Singh", 72);
```

Here:

* `firstName`, `lastName`, and `age` are **inside each object** separately.
* If we put a method inside the function like:

  ```js
  this.getBirthYear = function() {
    return new Date().getFullYear() - this.age;
  }
  ```

  …then **each object will get its own separate copy** of the method.
  This **wastes memory** if you have many objects.

---

## 2️⃣ The better way — Using `.prototype`

Every function in JavaScript automatically has a **`prototype`** property.
When you use `new`, the created object **links** to that function’s `.prototype`.
So, if you add a method to `.prototype`, **all objects share the same method** instead of each having a copy.

Example:

```js
createUser.prototype.getBirthYear = function() {
  return new Date().getFullYear() - this.age;
};
```

* Now, `getBirthYear` is stored **only once** in memory.
* `user1` and `user2` **both can use it** because of JavaScript’s **prototype chain**.

---

## 3️⃣ How it works internally (simplified)

When you do:

```js
user1.getBirthYear();
```

JS looks for `getBirthYear` in `user1`:

* If **not found** inside `user1`, it checks the object’s **prototype** (linked to `createUser.prototype`).
* Finds `getBirthYear` there and runs it.

So both `user1` and `user2` “share” the same method without duplicating it in each object.

---

## 4️⃣ Final working code

```js
function createUser(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

// Add common method using prototype
createUser.prototype.getBirthYear = function() {
  return new Date().getFullYear() - this.age;
};

const user1 = new createUser('Aman', 'Mishra', 32);
const user2 = new createUser('Anurag', 'Singh', 72);

console.log(user1.getBirthYear()); // same method for both objects
console.log(user2.getBirthYear());
```

---

💡 **Easy way to remember**:
Think of `.prototype` like a **shared toolbox**.
When you make new objects using `new`, all of them get a **reference** to the same toolbox.
If you put a tool (method) inside the toolbox, every object can use it — but you only store it once.

---

If you want, I can also **draw a diagram** showing how `prototype` linking works in memory so it’s super clear.
Do you want me to do that?



# Is class is a function in js ?

Yes ✅ — in JavaScript, a **class is actually a special kind of function**.

---

### 1️⃣ Example

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

console.log(typeof Person); // "function"
```

Even though it looks like a new syntax, `typeof Person` returns `"function"`.

---

### 2️⃣ Why?

* The `class` syntax in JS is **syntactic sugar** over the older **constructor function + prototype** pattern we just talked about.
* Internally:

  * The `constructor` method becomes the **function body**.
  * Methods you define inside the class are added to **`ClassName.prototype`**.

---

### 3️⃣ Same thing without `class`

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, I am ${this.name}`);
};
```

This is basically what the `class` example above compiles down to.

---

### 4️⃣ Key differences between class and normal function

1. **Classes are not hoisted** like regular functions.
2. **Class methods are non-enumerable** by default (won’t show up in `for...in` loops).
3. **Class constructors throw an error if called without `new`**:

   ```js
   Person(); // ❌ TypeError
   ```

---

So, in short:

> A JavaScript `class` is still a function under the hood, but with cleaner, stricter, and more structured syntax for creating constructor functions and prototypes.

---

If you want, I can **show you exactly how the JavaScript engine transforms a class into a function with prototype assignments** so you can see the equivalence.


# If you try to call the class without new:

When you call a **class constructor** using the `new` keyword, JavaScript treats it just like a special kind of constructor function — it creates a new object and runs the `constructor` method to initialize it.

---

### Example

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person("Moaz"); // ✅ works
console.log(p.name); // "Moaz"
```

Here’s what happens step-by-step when you do `new Person("Moaz")`:

1. **A new empty object is created**:

   ```js
   let obj = {};
   ```

2. **The object is linked to the class’s `.prototype`**:

   ```js
   obj.__proto__ = Person.prototype;
   ```

3. **The `constructor` method is called with `this` pointing to that new object**:

   ```js
   Person.constructor.call(obj, "Moaz");
   ```

4. **The new object is returned** unless the constructor explicitly returns another object.

---

### Special note about classes:

If you try to call the class **without** `new`:

```js
Person("Moaz"); // ❌ TypeError: Class constructor Person cannot be invoked without 'new'
```

This is a safety feature so you don’t accidentally mess up `this` like in normal functions.

---

If you want, I can also show you **the internal difference between `class Person {}` and a `function Person()` when called with `new`**, so you can see exactly how the engine treats them.

# In a constructor function, you have to add methods to .prototype manually:

Yes — exactly!
When you write methods inside a JavaScript `class`, **JavaScript automatically puts them into the class’s `.prototype`** for you.
You don’t need to do the manual `CreateUser.prototype.methodName = ...` like with normal constructor functions.

---

### 1️⃣ Your class example (fixed a couple of typos)

```js
class CreateUser {
  getBirthYear() {
    return new Date().getFullYear() - this.age;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

If you check:

```js
console.log(CreateUser.prototype);
```

You’ll see:

```js
{
  constructor: CreateUser,
  getBirthYear: ƒ getBirthYear(),
  getFullName: ƒ getFullName()
}
```

So both `getBirthYear` and `getFullName` live on **`CreateUser.prototype`**, not inside each object — meaning all objects share one copy.

---

### 2️⃣ How to use it

```js
class CreateUser {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getBirthYear() {
    return new Date().getFullYear() - this.age;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const user1 = new CreateUser('Aman', 'Mishra', 32);
console.log(user1.getFullName());  // Aman Mishra
console.log(user1.getBirthYear()); // currentYear - 32
```

---

### 3️⃣ Key takeaway

* In a **constructor function**, you have to add methods to `.prototype` manually:

  ```js
  function CreateUser(...) { ... }
  CreateUser.prototype.getBirthYear = function() { ... };
  ```
* In a **class**, methods inside the body (outside `constructor`) **are automatically added** to `.prototype`.

---

If you want, I can **show you the “hidden” transformation** of your class into the equivalent constructor + prototype code, so you can see exactly what JS is doing under the hood. That way you’ll see how it’s “just syntactic sugar.”


# Why can’t we put loose code directly inside the class body?


Exactly ✅ — you’ve got the right understanding.

---

### 1️⃣ When you call a class with `new`

```js
const user1 = new CreateUser('Aman', 'Mishra', 32);
```

What happens is:

* **Only** the `constructor` method is executed immediately.
* The methods (`getBirthYear`, `getFullName`, etc.) are **not run** — they’re just stored on the class’s `.prototype`.
* You have to call them explicitly later (e.g., `user1.getBirthYear()`).

---

### 2️⃣ Why can’t we put loose code directly inside the class body?

If you try:

```js
class CreateUser {
  console.log("Hello");
}
```

You get a **syntax error** — because the **class body** can **only contain method definitions** (constructor + other methods, getters/setters, static methods).
No standalone statements are allowed.

That’s why **any code you want to run immediately upon creating the object must go inside the `constructor`**.

---

### 3️⃣ How the prototype part works

When you write:

```js
getBirthYear() {
  return new Date().getFullYear() - this.age;
}
```

JavaScript actually does something like:

```js
CreateUser.prototype.getBirthYear = function() {
  return new Date().getFullYear() - this.age;
};
```

This means:

* The method **is not executed** when you create the object.
* It’s **shared** by all objects created from the class.
* You must call it explicitly.

---

### 4️⃣ Proof

```js
console.log(CreateUser.prototype);
// { constructor: CreateUser, getBirthYear: ƒ, getFullName: ƒ }
```

You’ll see both methods in `.prototype` — not in each object itself.

---

If you want, I can **draw a diagram** showing:

* `new CreateUser(...)`
* How the constructor runs
* How the prototype is linked
  So you can visually see why the methods don’t run automatically.

Do you want me to prepare that diagram?


# modern JavaScript, there are three main ways to make a member private inside a class.


In modern JavaScript, there are **three main ways** to make a member private inside a class.

---

## **1️⃣ Using `#` Private Fields (Modern, ES2022)**

This is the official **native** way to create truly private members in classes.

```js
class User {
  #password; // private field

  constructor(name, password) {
    this.name = name;
    this.#password = password; // can only be accessed inside the class
  }

  checkPassword(pass) {
    return this.#password === pass;
  }
}

const u = new User("Moaz", "secret123");
console.log(u.name);       // ✅ works
console.log(u.#password);  // ❌ SyntaxError - not accessible outside
```

**Key Points:**

* Private fields start with `#`.
* They’re **only** accessible inside the class.
* They cannot be accessed or modified outside — even via `this["#password"]`.

---

## **2️⃣ Using Closures (Pre-ES2022 / Works Everywhere)**

This is an older trick that uses function scope to hide variables.

```js
function createUser(name, password) {
  let _password = password; // private variable

  return {
    name,
    checkPassword(pass) {
      return _password === pass;
    }
  };
}

const u = createUser("Moaz", "secret123");
console.log(u.name);         // ✅ works
console.log(u._password);    // ❌ undefined
```

Here `_password` is private because it’s inside the closure, not on the object.

---

## **3️⃣ Using WeakMap (Semi-Advanced)**

You can store private data in a `WeakMap` where keys are object instances.

```js
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(pass) {
    return privateData.get(this).password === pass;
  }
}

const u = new User("Moaz", "secret123");
console.log(u.name);              // ✅ works
console.log(privateData.get(u));  // ❌ avoid direct access
```

This hides the data outside the instance but still keeps it associated with the object.

---

💡 **Best choice today:**

* If you’re using modern browsers/Node.js → **Use `#privateField`** (simpler, cleaner, truly private).
* If you need older browser support → Use **closures** or **WeakMap**.

---

If you want, I can also show you **how the prototype works with private fields** so you understand why `#` behaves differently from normal properties.
Do you want me to make that?


# If we make an object and assign a Make Property using hash with the help of his string This is not a truly Private.

Exactly ✅ — if you do it with a string key, like:

```js
this["#password"] = "secret123";
```

…it’s **not** truly private.
It’s just a **normal public property whose name happens to start with `#`**, so anyone can still access it:

```js
console.log(obj["#password"]); // works ❌
```

---

### Why `#password` (string) ≠ `#password` (private field)

* In **true private fields**, the `#` is part of the **language syntax**, not just part of the name.
* When you declare:

  ```js
  #password;
  ```

  JavaScript’s compiler treats it specially:

  * It is **not stored** as a normal object property.
  * It cannot be accessed dynamically using `this["#password"]`.
  * It is only accessible inside the class’s own methods.

---

### Example showing the difference:

```js
class Example {
  #truePrivate = "real secret";
  
  constructor() {
    this["#fakePrivate"] = "not really secret";
  }
  
  showSecrets() {
    console.log(this.#truePrivate);     // ✅ works
    console.log(this["#fakePrivate"]);  // ✅ works
  }
}

const obj = new Example();

// True private field — ❌ SyntaxError
// console.log(obj.#truePrivate);

// Fake private (just a string key) — ✅ works
console.log(obj["#fakePrivate"]);
```

---

💡 **Key takeaway:**
If you just use `"#something"` as a property name, it’s **cosmetic** — anyone can still access it.
If you use `#something` as **actual syntax in the class**, it becomes **truly private** at the language level.

---

If you want, I can show you **how JavaScript stores real `#private` fields internally** so you can see why they can’t be accessed via `obj["#field"]`.


# What is a static property?

Alright — let’s go step-by-step and make **static properties in JavaScript** clear for you.

---

## **1️⃣ What is a static property?**

A **static property** (or method) belongs **to the class itself**, not to the objects created from the class.

* **Normal properties/methods** → live on the object instance (`this` inside constructor)
* **Static properties/methods** → live directly on the class itself (accessed via `ClassName.property`)

---

## **2️⃣ Example**

```js
class Counter {
  static count = 0; // static property

  constructor() {
    Counter.count++; // update class-level property
  }
}

const c1 = new Counter();
const c2 = new Counter();

console.log(Counter.count); // 2 ✅
console.log(c1.count);      // undefined ❌
```

**Explanation:**

* `static count = 0;` → belongs to `Counter` (class), not to `c1` or `c2` (instances).
* You **must** access it via `Counter.count`.

---

## **3️⃣ Static methods**

```js
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3)); // 8 ✅
```

* `add` belongs to the class `MathHelper`.
* You **don’t need to create an object** to use it.

---

## **4️⃣ Where static members live**

```js
class Example {
  static greeting = "Hello";

  static sayHello() {
    console.log(this.greeting);
  }
}

console.log(Example.greeting); // "Hello"
Example.sayHello();            // "Hello"
```

If you check:

```js
console.log(Object.getOwnPropertyNames(Example));
// ["length", "prototype", "name", "greeting", "sayHello"]
```

Static members are stored **directly on the constructor function object**.

---

## **5️⃣ Use cases for static properties**

* Counters / IDs shared between all instances
* Utility functions (e.g., math helpers, string helpers)
* Constants (like config values)
* Factory methods for creating instances

---

💡 **Key takeaway:**
Static members are **shared at the class level**, not at the object level.
Instances **don’t** see static properties directly, but the class can still use them inside its constructor or other methods.

---

If you want, I can also **show a diagram** comparing:

* instance properties
* prototype methods
* static properties
  so you can visually see where each one lives in memory.



# What is a static block?

Got it — let’s talk about **`static {}` blocks** in JavaScript classes.

---

## **1️⃣ What is a static block?**

A **static block** in a class is a special block of code that:

* Runs **once**, when the class is first evaluated.
* Can access **static properties** and **private static fields**.
* Is useful for doing setup logic for the class.

---

## **2️⃣ Syntax**

```js
class Example {
  static counter = 0;

  static {
    console.log("Static block is running...");
    this.counter = 10; // modify static property
  }
}

console.log(Example.counter); // 10
```

Here:

* `static counter = 0;` → static property
* `static { ... }` → runs immediately when the class is created (before any instance is made)

---

## **3️⃣ Multiple static blocks**

You can have more than one:

```js
class Demo {
  static a = 1;

  static {
    console.log("First static block");
    this.a += 1;
  }

  static {
    console.log("Second static block");
    this.a *= 2;
  }
}

console.log(Demo.a); // 4
```

Execution order:

1. Static properties are set
2. Static blocks run **in order of appearance**

---

## **4️⃣ Use cases**

* Complex initialization of static properties
* Computing values that depend on private static fields
* Running setup code for the class before any instance is created

Example:

```js
class Config {
  static baseURL;
  static apiKey;

  static {
    this.baseURL = process.env.BASE_URL || "https://default.api";
    this.apiKey = process.env.API_KEY || "123456";
  }
}
```

---

## **5️⃣ Limitations**

* Runs **only once** when the class is first loaded into memory.
* Cannot be called manually like a method.
* Cannot use `await` directly (unless inside an async function you call inside the block).

---

If you want, I can make you a **diagram showing when static properties, static methods, and static blocks run in the class lifecycle** — it will make the timing crystal clear.


# inside a static {} block, this always refers to the class itself, not an instance.


Yes ✅ — inside a `static {}` block, `this` always refers to **the class itself**, not an instance.

---

### Example

```js
class Test {
  static nameProp = "Moaz";

  static {
    console.log(this); // 👉 points to the class `Test`
    console.log(this.nameProp); // "Moaz"
    this.nameProp = "Updated by static block";
  }
}

console.log(Test.nameProp); // "Updated by static block"
```

---

### Why does `this` point to the class here?

* A **static block** runs in the **class scope**, not in the scope of any object created from the class.
* So `this` behaves just like it does inside a static method:

  ```js
  static someMethod() {
    console.log(this); // class itself
  }
  ```

---

💡 **Key difference from constructor:**

* In `constructor()`, `this` → the **instance** being created.
* In `static {}`, `this` → the **class constructor function** itself.

---

If you want, I can also show a **side-by-side example** comparing how `this` behaves in:

* Constructor
* Instance method
* Static method
* Static block
  so you can see the difference clearly.
