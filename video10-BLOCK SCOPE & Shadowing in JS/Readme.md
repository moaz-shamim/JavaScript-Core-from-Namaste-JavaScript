#  scope:

1. **Scope Rules**: 
Scope determines the visibility or accessibility of a variable or other resource in the area of your code.

2. **Global Scope**: There's only one Global scope in the JavaScript document. The area outside all the functions is consider the global scope and the variables defined inside the global scope can be accessed and altered in any other scopes.

3. **Function Scope**: Whenever you declare a variable in a function, the variable is visible only within the function. You can't access it outside the function. var is the keyword to define variable for a function-scope accessibility.

4. **Block Scope(Compound Statement)**:The block scope of a variable means that the variable is accessible within the block that is between the curly braces

- With the introduction of `let` and `const`, JavaScript gained block scope. A "block" is a chunk of code enclosed in curly braces `{}` like in loops or conditionals.

- A block scope is the area within if, switch conditions or for and while loops. Generally speaking, whenever you see {curly brackets}, it is a block. In ES6, const and let keywords allow developers to declare variables in the block scope, which means those variables exist only within the corresponding block.


5. **Limited Accessibility**: Variables defined with `let` or `const` inside a block are only accessible within that block. They don't "leak out" of the block like variables defined with `var`.

5. **Example**:
   ```javascript
   if (true) {
       let message = "Hello"; // block scope
       console.log(message); // This works
   }
   console.log(message); // This will cause an error because message is not defined outside of the block
   ```

In simple terms, block scope in JavaScript means that variables defined within curly braces `{}` are only usable inside those curly braces. They're like secrets hidden inside a box – you can only see and use them while you're inside the box (the block). Once you step out of the box, you can't access them anymore.


# shadowing

In JavaScript, "shadowing" refers to the concept of declaring a variable within a nested scope that has the same name as a variable in an outer scope. This can lead to unexpected behavior because the inner variable "shadows" or hides the outer variable within its scope. Let's illustrate this with an example:

```javascript
var x = 10;

function outer() {
  var x = 20; // This variable x shadows the outer variable x
  console.log("Inside outer, x:", x); // Output will be 20
  function inner() {
    var x = 30; // This variable x shadows both outer and global variable x
    console.log("Inside inner, x:", x); // Output will be 30
  }
  inner();
}

outer();
console.log("Outside all functions, x:", x); // Output will be 10
```

In this example, we have three variables named `x`. The global variable `x` is assigned the value `10`. Inside the `outer` function, there's another variable `x` declared and assigned the value `20`, which shadows the global `x`. Then, inside the `inner` function, there's yet another variable `x` declared and assigned the value `30`, which shadows both the `outer` function's `x` and the global `x`.

When you refer to `x` inside each function, JavaScript will look for the closest variable named `x` within the current scope. If it doesn't find one, it will look in the outer scope until it finds a matching variable or reaches the global scope.

Shadowing can sometimes lead to bugs and unexpected behavior, especially if it's not done intentionally. To avoid shadowing, it's a good practice to use unique variable names or be mindful of variable scopes.

### Q.What is shadowing in js ?

- In JavaScript, "shadowing" refers to the concept of declaring a variable within a nested scope that has the same name as a variable in an outer scope. This can lead to unexpected behavior because the inner variable "shadows" or hides the outer variable within its scope.