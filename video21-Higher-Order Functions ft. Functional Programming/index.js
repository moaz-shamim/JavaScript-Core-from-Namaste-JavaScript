const radious = [1, 2, 3, 4];

const calculateArea = function (radious) {
  const output = [];
  for (let i = 0; i < radious.length; i++) {
    output.push(Math.PI * radious[i] * radious[i]);
  }
  return output;
};

console.log(calculateArea(radious));

const calculateCircumference = function (radious) {
  const output = [];
  for (let i = 0; i < radious.length; i++) {
    output.push(2 * Math.PI * radious[i]);
  }
  return output;
};

console.log(calculateCircumference(radious));

const calculateDiameter = function (radious) {
  const output = [];
  for (let i = 0; i < radious.length; i++) {
    output.push(2 * radious[i]);
  }
  return output;
};

console.log(calculateDiameter(radious));

// Code with Dry Principal

const area = function (radious) {
  return Math.PI * radious * radious;
};

const circumference = function (radious) {
  return 2 * Math.PI * radious;
};

const diameter = function (radious) {
  return 2  * radious;
};

const calculate = function (radious, logic) {
  const output = [];
  for (let i = 0; i < radious.length; i++) {
    output.push(logic(radious[i]));
  }
  return output;
};

console.log(calculate(radious, area));
console.log(calculate(radious, circumference));
console.log(calculate(radious, diameter));
