# prototype chain:

## 1️⃣ What you’re doing

You typed:

```js
console.dir(document.querySelector("h1"))
```

That gave you a **JavaScript object representation** of the `<h1>` element in your HTML page.

---

## 2️⃣ Why you see `[[Prototype]]` chains

JavaScript objects don’t just have their own properties — they can also *inherit* properties and methods from other objects.

This chain of inheritance is called the **prototype chain**.

When you see:

```
[[Prototype]]: HTMLHeadingElement
```

It means:

> "This `<h1>` element’s prototype is an object called `HTMLHeadingElement`."

And `HTMLHeadingElement` itself has its own prototype:

```
[[Prototype]]: HTMLElement
```

…and so on.

---

## 3️⃣ The chain you saw is the DOM inheritance hierarchy

Here’s what it looks like in your example:

```
<h1>
↓
HTMLHeadingElement   → special stuff for <h1>, <h2>, etc.
↓
HTMLElement          → stuff common to ALL HTML elements (<p>, <div>, etc.)
↓
Element              → stuff common to ALL DOM elements (HTML, SVG, etc.)
↓
Node                 → stuff common to ALL nodes (text nodes, comment nodes, etc.)
↓
EventTarget          → ability to listen to events (.addEventListener)
↓
Object               → base object in JS (toString, hasOwnProperty, etc.)
```

---

## 4️⃣ Why `HTMLHeadingElement` is a function

When you type:

```js
HTMLHeadingElement
```

The browser prints:

```
f HTMLHeadingElement() { [native code] }
```

That means `HTMLHeadingElement` is actually a **constructor function** provided by the browser.
It’s written in native code (C++ inside Chrome, not JavaScript) and is responsible for creating heading elements in memory.

In fact, when you do:

```js
let h = document.createElement("h1");
```

Internally, the browser calls `new HTMLHeadingElement()` under the hood.

---

## 5️⃣ How this relates to **prototypal inheritance**

In JavaScript:

* Every object has a `[[Prototype]]` (except `null`).
* When you access a property/method, JavaScript first looks **on the object itself**.
* If it’s not there, it looks **up the prototype chain** until it finds it or reaches `null`.

Example:

```js
let h1 = document.querySelector("h1");

console.log(h1.innerHTML); // found in HTMLElement
console.log(h1.nodeName);  // found in Node
console.log(h1.toString);  // found in Object
```

If a property doesn’t exist in `HTMLHeadingElement`, JS climbs up the chain to `HTMLElement`, then to `Element`, and so on.

---

💡 **Easy analogy**:
Think of this like your family tree for abilities:

* **HTMLHeadingElement** = special skills for heading tags.
* **HTMLElement** = common skills for all HTML tags.
* **Element** = common skills for all elements in the DOM (HTML, SVG, MathML).
* **Node** = universal abilities for all DOM nodes.
* **EventTarget** = ability to listen/respond to events.
* **Object** = basic skills every object in JS has.

---

If you want, I can draw you a **visual diagram** of this prototype chain so you can see it clearly like a family tree. That would make it click instantly.

Do you want me to make that diagram for you?


# Here is also a prototype inheritance , here the array is actually made from object

Exactly ✅ — you’ve just spotted another example of **prototypal inheritance**, but this time in plain JavaScript rather than the DOM.

Let’s break down what you saw:

---

## 1️⃣ What you typed

```js
[]
```

That’s just an empty array.

---

## 2️⃣ What Chrome shows

```
length: 0
[[Prototype]]: Array(0)
```

Here:

* `length: 0` → property directly on the array itself.
* `[[Prototype]]: Array(0)` → means this array’s prototype is `Array.prototype`.

---

## 3️⃣ The **array’s prototype chain**

Here’s the chain for `[]`:

```
[]                        → your actual empty array instance
↓
Array.prototype           → methods like push, pop, map, filter
↓
Object.prototype          → methods like toString, hasOwnProperty
↓
null                      → end of chain
```

So **yes** — arrays are *actually objects* in JavaScript.
They’re just **special kinds of objects** that have a `length` property and some magic indexing behavior.

In fact:

```js
typeof [] // "object"
```

---

## 4️⃣ How it works

When you call:

```js
[].push(1);
```

JavaScript does this:

* Checks if your array has a `push` property.
* It doesn’t — so it goes to `Array.prototype`.
* Finds `push` there, runs it.
* If it didn’t find it, it would go to `Object.prototype`.

---

💡 **Key takeaway**
Both your `<h1>` example and this `[]` example work the same way:
JavaScript **searches up a prototype chain** until it finds the property or reaches `null`.

---

If you want, I can show you **side-by-side prototype chains** for `<h1>` and `[]` so you can compare DOM objects vs pure JS objects.
That would make the pattern pop out clearly.


# Prototype chain ends on object. ?

Almost, but not **always** — here’s the precise truth:

---

### **1️⃣ In “normal” JavaScript objects**

For something like:

```js
let obj = {};
```

The chain looks like:

```
obj
↓
Object.prototype
↓
null   ← end of chain
```

So yes — for plain objects, the prototype chain ends at `Object.prototype`, whose own `[[Prototype]]` is `null`.

---

### **2️⃣ In Arrays**

For:

```js
let arr = [];
```

It’s:

```
[]
↓
Array.prototype
↓
Object.prototype
↓
null
```

So it **passes through** `Object.prototype` before ending.

---

### **3️⃣ In DOM elements (like your `<h1>` case)**

Example:

```js
let h1 = document.querySelector("h1");
```

The chain is:

```
<h1>
↓
HTMLHeadingElement.prototype
↓
HTMLElement.prototype
↓
Element.prototype
↓
Node.prototype
↓
EventTarget.prototype
↓
Object.prototype
↓
null
```

So even for DOM objects, the very last stop is still `Object.prototype`, which then points to `null`.

---

💡 **Rule:**

* `Object.prototype` is **the top of the “normal” inheritance world** in JavaScript.
* Its `[[Prototype]]` is `null`, which is how JS knows it’s reached the end.
* Everything (arrays, DOM nodes, functions) eventually passes through `Object.prototype` unless they were intentionally created with no prototype (like `Object.create(null)`).

---

If you want, I can make you a **one-page visual map** showing the prototype chain for arrays, objects, functions, and DOM elements so you see exactly where they all meet at the top. That would make the concept stick in your head.


# Inherit using Extend:

```js
class User {
  constructor(firstName, lastName, age) {
    super()
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  getBirthYear() {
    return new Date().getFullYear() - this.age
  }

  work() {
    console.log('user is working');
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(value) {
    const [firstName, lastName] = value.split(' ')
    this.firstName = firstName
    this.lastName = lastName
  }
}


class Student extends User{}
class Employee extends User{}

const student1 = new Student('Aman', 'Mishra', 32, 'BCA')
const employee1 = new Employee('Anurag', 'Singh', 72, 'Google')
```

Alright Moaz — let’s go step-by-step in **simple language** so this clicks for you.

---

## 1️⃣ What’s going on here

You made **one main class**:

```js
class User { ... }
```

And then you made **two other classes**:

```js
class Student extends User {}
class Employee extends User {}
```

By using `extends`, you’re saying:

> *"Hey `Student` and `Employee`, you should **inherit** everything from `User` so you don’t have to write it all again."*

---

## 2️⃣ What “inherit” means here

When you create a `Student`:

```js
const student1 = new Student('Aman', 'Mishra', 32, 'BCA');
```

JavaScript will:

* Look for a `constructor` in `Student` → none found
* So it automatically uses `User`’s `constructor` to set:

  * `firstName = "Aman"`
  * `lastName = "Mishra"`
  * `age = 32`
* `BCA` is ignored because your `User` constructor only takes **3 parameters**.

---

## 3️⃣ What you get for free

Because of `extends`, `student1` and `employee1`:

* Have all properties from `User` (`firstName`, `lastName`, `age`)
* Can call:

  ```js
  student1.getBirthYear();
  student1.fullName; // getter
  student1.fullName = "John Doe"; // setter
  ```

They don’t need you to write those methods again — they **inherited** them.

---

## 4️⃣ The prototype chain behind the scenes

When you do:

```js
student1.getBirthYear();
```

JavaScript will search like this:

```
student1
↓
Student.prototype (nothing here)
↓
User.prototype (finds getBirthYear ✅)
↓
Object.prototype
↓
null
```

That’s **prototypal inheritance** but using **class syntax** (a nicer way to write it).

---

## 5️⃣ Easy analogy

Think of `User` as a **blueprint** for a human:

* Has `firstName`, `lastName`, `age`
* Can **calculate birth year** and **get/set full name**

Then `Student` and `Employee` are **special kinds** of that human:

* They automatically get all the features from `User`
* You can later add **extra things** that only apply to students or employees.

---

# extends + constructors in JavaScript :

Ah — yes Moaz, that’s an important rule about **`extends` + constructors** in JavaScript.

Let’s go step-by-step so you understand *why* the parent constructor (`User`’s constructor) stops working when you make your own in `Student`.

---

## 1️⃣ What happens without your own constructor

If `Student` doesn’t have its own constructor:

```js
class Student extends User {}
```

When you do:

```js
new Student('Aman', 'Mishra', 32);
```

JavaScript automatically calls `User`’s constructor for you — passing those arguments along — so everything works.

---

## 2️⃣ What happens **with** your own constructor

Example:

```js
class Student extends User {
  constructor(firstName, lastName, age, course) {
    this.course = course; // ❌ Error if you do this first
  }
}
```

Now, JavaScript **does NOT** automatically call `User`’s constructor anymore.
You have to do it yourself using **`super()`**.

---

## 3️⃣ Why you must call `super()` first

`super(...)`:

* Calls the **parent class’s constructor**
* Sets up `this` so you can use it
* Passes arguments to the parent

If you try to use `this` before calling `super()`, you’ll get an error:

```
ReferenceError: Must call super constructor in derived class before accessing 'this'
```

---

## 4️⃣ Correct way to keep `User` constructor working

```js
class Student extends User {
  constructor(firstName, lastName, age, course) {
    super(firstName, lastName, age); // ✅ Call parent constructor
    this.course = course; // Now safe to use this
  }
}
```

Now when you do:

```js
const s = new Student('Aman', 'Mishra', 32, 'BCA');
```

The steps are:

1. `Student` constructor runs
2. Calls `super(...)` → runs `User` constructor → sets `firstName`, `lastName`, `age`
3. Back to `Student` constructor → sets `course`

---

💡 **Rule to remember:**
If your derived class (`Student`, `Employee`) has its own `constructor`, **you must** call `super(...)` before using `this` — otherwise the parent’s setup code (properties, initialization) won’t run.

---

If you want, I can draw you a **flow diagram** showing exactly how control moves from `Student` to `User` and back when `super()` is used.
It makes the process super clear.


# Method overriding in the context of prototypal inheritance.

Alright Moaz — this is a perfect example to explain **method overriding** in the context of **prototypal inheritance**.

---

## 1️⃣ The setup

```js
class User {
  work() {
    console.log("User is working");
  }
}

class Student extends User {
  work() {
    console.log("Student is studying");
  }
}

const s = new Student();
s.work();
```

---

## 2️⃣ Which method runs?

✅ **The child method runs** → `"Student is studying"`

---

## 3️⃣ Why? (Prototype Inheritance Explanation)

When you call:

```js
s.work();
```

JavaScript looks for `work` in the **prototype chain**:

```
s (instance)  
↓
Student.prototype (finds `work` ✅)  
↓
User.prototype (ignored — search stops here)  
↓
Object.prototype  
↓
null
```

The rule is:

> The first matching property/method found in the prototype chain is the one that gets used.

Since `Student.prototype` **already has its own `work` method**, it **overrides** the one in `User.prototype`.

---

## 4️⃣ How to still call the parent method

Sometimes you want the child to add behavior but still use the parent’s version:

```js
class Student extends User {
  work() {
    super.work(); // calls parent's work method
    console.log("Student is studying after work");
  }
}

const s = new Student();
s.work();
```

Output:

```
User is working
Student is studying after work
```

---

💡 **Key takeaway**:

* In prototypal inheritance, the search for a property/method starts from the object itself, then moves **up** the chain.
* If a child class defines a method with the same name as the parent, it **shadows/overrides** the parent’s method.
* To reach the parent’s version from the child, use `super.methodName()`.

---

If you want, I can show you **exactly** how the prototype chain looks in memory for this case — so you can literally see `work` living in `Student.prototype` above `User.prototype`. That makes the concept click instantly.


