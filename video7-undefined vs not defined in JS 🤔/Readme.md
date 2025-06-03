# loosely typed language

In a loosely typed language like JavaScript, you don't have to explicitly declare the data type of a variable when you create it. This means you can assign different types of values to a variable without any restrictions.

Here's an easy explanation:

1. **No Need to Declare Types**: In JavaScript, when you create a variable using `var`, `let`, or `const`, you don't have to say whether it will hold a number, a string, or any other type of data. You just create the variable and assign a value to it.

2. **Type Can Change**: The type of value stored in a variable can change during the execution of your program. For example, you might start with a variable holding a number and later assign it a string value.

3. **Flexible**: This flexibility can make coding faster and easier because you don't have to worry about declaring types or converting between them.

4. **Potential Pitfalls**: However, this flexibility can also lead to mistakes if you're not careful. For example, if you accidentally use a variable expecting it to be a number when it actually contains a string, your program might not behave as expected.

In short, in a loosely typed language like JavaScript, you have more freedom in how you use variables and assign values to them, but you also need to be cautious to avoid unexpected behaviors.

# Interview Question:

### Q. Is javascript a statically typed or a dynamically typed language?

- JavaScript is a dynamically typed language, but TypeScript is a statically typed language.

- In dynamically typed languages all type checks are performed in a runtime, only when your program is executing. So this means you can just assign anything you want to the variable and it will work.
  let a

### Q. Explain the difference between undefined and not defined in JavaScript?

The primary distinction between undefined and not defined is:

- A variable that has been declared but not assigned a value is undefined.
- A variable that has not been declared at all is not defined.

- undefined is a JavaScript keyword that has a special meaning. Everything which gets a space in memory will contain undefined until we assign a value to that memory space.
