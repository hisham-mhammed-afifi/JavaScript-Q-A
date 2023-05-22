**1. Hoisting:** Use Case: Hoisting allows you to use functions or variables before they are declared.

```js
// Example
console.log(message); // Output: undefined
var message = "Hello!";
```

In this example, the `message` variable is hoisted to the top, but its value is `undefined` until the assignment statement is reached.
**2. `null` vs. `undefined`:** Use Case: Differentiating intentional absence (`null`) from uninitialized or missing value (`undefined`).

```js
// Example
let name = null; // Explicitly set to null to indicate absence
let age; // Implicitly undefined since no value is assigned
console.log(name); // Output: null
console.log(age); // Output: undefined
```

Here, `name` is set to `null` to indicate that there is no name available, while `age` is undefined because it hasn't been assigned a value.
**3. Closures: Use Case:** Closures are useful for data encapsulation and creating private variables.

```js
// Example
function createCounter() {
  let count = 0;

  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // Output: 1
```

In this example, the `createCounter` function returns an object with two methods: `increment` and `getCount`. The `count` variable is enclosed within the returned object, creating a closure that allows accessing and modifying the `count` variable.
**4. Synchronous vs. Asynchronous programming:** Use Case: Asynchronous programming is essential for handling time-consuming operations without blocking the main execution thread.

```js
// Example
console.log("Start");
setTimeout(() => {
  console.log("Async operation");
}, 2000);
console.log("End");
```

In this example, the `setTimeout` function is used to simulate an asynchronous operation that will execute after 2 seconds. While the timer is running, the program continues executing the rest of the code, resulting in "Start" and "End" being logged before the "Async operation".
**5. Event loop: Use Case:** The event loop handles asynchronous operations and ensures the responsive and non-blocking nature of JavaScript.

```js
// Example
console.log("Start");
setTimeout(() => {
  console.log("Async operation");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise resolved");
});
console.log("End");
```

In this example, `setTimeout` and `Promise.resolve().then()` are queued in the event loop for execution. Even though the timeout is set to 0 milliseconds, the "Async operation" will be logged after "Promise resolved" due to the event loop's order of execution.
**6. `let`, `const`, and `var`:** Use Case: Choosing the appropriate variable declaration based on scope and mutability requirements.

```js
// Example
function example() {
  if (true) {
    var x = 5; // Function-scoped variable
    let y = 10; // Block-scoped variable
    const z = 15; // Block-scoped constant
    console.log(x, y, z); // Output: 5 10 15
  }
  console.log(x); // Output: 5
  console.log(y); // Throws ReferenceError: y is not defined
  console.log(z); // Throws ReferenceError: z is not defined
}
example();
```

In this example, `var` declares a variable that is function-scoped, allowing it to be accessed outside the `if` block. However, `let` and `const` are block-scoped and can only be accessed within their respective blocks.
**7. Shallow copy vs. Deep copy:** Use Case: Copying objects or arrays while maintaining data integrity and avoiding unintended mutations.

```js
// Example - Shallow Copy
const originalArray = [1, 2, 3];
const shallowCopy = originalArray;
shallowCopy.push(4);
console.log(originalArray); // Output: [1, 2, 3, 4]
console.log(shallowCopy); // Output: [1, 2, 3, 4]
```

In this example, the `shallowCopy` variable references the same array as `originalArray`. Modifying `shallowCopy` also affects `originalArray` because they point to the same reference in memory.

```js
// Example - Deep Copy
const originalArray = [1, 2, 3];
const deepCopy = [...originalArray];
deepCopy.push(4);
console.log(originalArray); // Output: [1, 2, 3]
console.log(deepCopy); // Output: [1, 2, 3, 4]
```

In this example, the spread operator (`...`) creates a new array with the same values as `originalArray`. Modifying `deepCopy` does not affect `originalArray` since they are separate arrays in memory.
**8. `this` keyword:** Use Case: Understanding the dynamic context of `this` based on how a function is called.

```js
// Example
const person = {
  name: "John",
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },
};
const greet = person.greet;
greet(); // Output: Hello, undefined
const boundGreet = person.greet.bind(person);
boundGreet(); // Output: Hello, John!
```

In this example, when `greet` is called directly, the `this` keyword refers to the global object (in non-strict mode), resulting in `undefined` for `this.name`. However, using `bind` explicitly binds the `person` object as the `this` value, allowing the correct name to be logged.
**9. `==` vs. `===`:** Use Case: Comparing values for equality and understanding the differences in coercion behavior.

```js
// Example
console.log(5 == "5"); // Output: true
console.log(5 === "5"); // Output: false
```

In JavaScript, `==` performs type coercion before comparison, allowing different types to be considered equal if their values match. However, `===` performs a strict equality comparison, checking for both value and type.
**10. Data types in JavaScript:** Use Case: Identifying and working with different types of data.

```js
// Example
const age = 30; // number
const name = "John"; // string
const isStudent = true; // boolean
const person = { name: "John", age: 30 }; // object
const greet = function () {
  console.log("Hello!");
}; // function
let value; // undefined
const empty = null; // null
console.log(typeof age); // Output: number
console.log(typeof name); // Output: string
console.log(typeof isStudent); // Output: boolean
console.log(typeof person); // Output: object
console.log(typeof greet); // Output: function
console.log(typeof value); // Output: undefined
console.log(typeof empty); // Output: object
```

In this example, various data types in JavaScript are assigned to different variables, and the `typeof` operator is used to determine their types.
**11. Event delegation:** Use Case: Efficiently handling events on dynamically added elements or child elements within a parent container.

```js
// Example
const parentContainer = document.getElementById("parent");
parentContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked!");
  }
});
```

In this example, instead of attaching individual event listeners to each button element, a single event listener is attached to the parent container. The event is then delegated to the appropriate button element based on the target of the event.
**12. Callback functions:** Use Case: Handling asynchronous operations or executing code after a specific event or task completes.

```js
// Example
function fetchData(url, callback) {
  // Simulating an asynchronous request
  setTimeout(function () {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 2000);
}
function processData(data) {
  console.log(`Processing data: ${JSON.stringify(data)}`);
}
fetchData("https://api.example.com/data", processData);
```

In this example, the `fetchData` function performs an asynchronous request and accepts a callback function as an argument. Once the data is fetched, the callback function `processData` is invoked with the retrieved data as its argument.
**13. `bind` method:** Use Case: Setting the `this` value explicitly for a function or creating partially applied functions.

```js
// Example
const person = {
  name: "John",
  greet: function (message) {
    console.log(`${message}, ${this.name}!`);
  },
};
const greet = person.greet;
greet("Hello"); // Output: undefined, Hello!
const boundGreet = person.greet.bind(person, "Hi");
boundGreet(); // Output: Hi, John!
```

In this example, the `greet` function is initially assigned to `greet`, causing the `this` value to become `undefined`. However, using `bind` to bind `person` as the `this` value and provide the message argument creates a new function `boundGreet` that logs the desired greeting.
**14. Lexical scoping:** Use Case: Resolving variable names based on their placement in the source code and scoping rules.

```js
// Example
function outer() {
  const x = 10;
  function inner() {
    const x = 20;
    console.log(x); // Output: 20
  }
  inner();
  console.log(x); // Output: 10
}
outer();
```

In this example, the `inner` function has its own `x` variable, which shadows the `x` variable in the outer function. The concept of lexical scoping allows accessing the inner `x` within the `inner` function, while the outer `x` remains unaffected.
**15. `map` method:** Use Case: Transforming elements of an array to create a new array.

```js
// Example
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(function (num) {
  return num * num;
});
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

In this example, the `map` method is used to transform each element of the `numbers` array by squaring it. The resulting array, `squaredNumbers`, contains the squared values of the original numbers.
**16. Promises:** Use Case: Handling asynchronous operations and chaining multiple operations.

```js
// Example
function fetchData(url) {
  return new Promise(function (resolve, reject) {
    // Simulating an asynchronous request
    setTimeout(function () {
      const data = { name: "John", age: 30 };
      resolve(data);
    }, 2000);
  });
}
function processData(data) {
  console.log(`Processing data: ${JSON.stringify(data)}`);
}
fetchData("https://api.example.com/data")
  .then(processData)
  .catch(function (error) {
    console.log(`Error: ${error}`);
  });
```

In this example, the `fetchData` function returns a Promise that resolves with the fetched data. The `processData` function is then called with the resolved data using the `then` method. If any errors occur during the Promise chain, they are caught and logged using the `catch` method.
**17. Arrow functions:** Use Case: Writing concise function expressions and avoiding the need for `this` binding.

```js
// Example
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((num) => num * 2);
console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
```

In this example, the arrow function syntax is used to create a concise function expression that doubles each element of the `numbers` array, resulting in the `doubledNumbers` array.
**18. `apply` and `call` methods:** Use Case: Invoking a function with a specific `this` value and arguments.

```js
// Example
const person = {
  name: "John",
  greet: function (message) {
    console.log(`${message}, ${this.name}!`);
  },
};
function greet(message) {
  console.log(`${message}, ${this.name}!`);
}
greet.call(person, "Hello"); // Output: Hello, John!
greet.apply(person, ["Hi"]); // Output: Hi, John!
```

In this example, the `call` and `apply` methods are used to invoke the `greet` function with `person` as the `this` value and "Hello" and "Hi" as the respective message arguments.
**19. `forEach` method:** Use Case: Iterating over an array and performing an operation on each element.

```js
// Example
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(function (num) {
  console.log(num * 2);
});
// Output:
// 2
// 4
// 6
// 8
// 10
```

In this example, the `forEach` method is used to iterate over each element of the `numbers` array and log its double.
**20. `localStorage` vs. `sessionStorage`:** Use Case: Storing data in the browser and understanding the differences in data persistence.

```js
// Example
localStorage.setItem("name", "John");
sessionStorage.setItem("age", "30");
const storedName = localStorage.getItem("name");
const storedAge = sessionStorage.getItem("age");
console.log(storedName); // Output: John
console.log(storedAge); // Output: 30
```

In this example, data is stored in both `localStorage` and `sessionStorage` using the `setItem` method. The `getItem` method is then used to retrieve the stored data. `localStorage` stores data that persists even after the browser is closed and reopened, while `sessionStorage` stores data that persists only within the same session.
