// let a = 9;
// var b = 10;
// console.log(a);

function example() {
  // This variable is function-scoped and can be accessed throughout the entire function
  var functionScopedVariable = "I am function-scoped";
  console.log(functionScopedVariable); // 'I am function-scoped'
  if (true) {
    // This variable is block-scoped and can only be accessed within this block
    let blockScopedVariable = "I am block-scoped";
  }
  console.log(blockScopedVariable); // ReferenceError: blockScopedVariable is not defined
}
example();
