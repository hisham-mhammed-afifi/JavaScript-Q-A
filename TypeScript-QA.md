# Top 50 questions in TypeScript

## **1. How does TypeScript handle structural typing and how does it differ from nominal typing?**

TypeScript uses structural typing to determine type compatibility. Structural typing means that the type of an object is based on its structure, or shape, rather than its name or declaration. This allows TypeScript to infer types based on how objects are used in code, even if those objects were not explicitly defined with a specific type.

Nominal typing, on the other hand, relies on explicit declarations of type names to determine compatibility. This means that two objects with identical structures but different names would be considered incompatible, because they were not explicitly declared as the same type.

In practice, this means that TypeScript's structural typing allows for more flexibility and easier code reuse. For example, if you have two functions that take arguments with the same properties but different names, it would be cumbersome to declare them as the same type under nominal typing. With structural typing, TypeScript can infer that the two argument objects are compatible and allow you to reuse the same function for both.

Of course, there are cases where nominal typing might be more appropriate. For example, if you have two types that happen to have the same structure but are semantically different, it may be clearer to give them distinct type names using nominal typing.

## **2. What is type erasure and how does it affect TypeScript's runtime behavior?**

Type erasure is the process of removing type annotations and type checking information from code during compilation, resulting in a version of the code that does not contain any type information. This is done to improve runtime performance, as type checking can be an expensive operation.

In TypeScript, type erasure occurs during the compilation process, so the resulting JavaScript code does not contain any type annotations or type checking logic. This means that TypeScript's static type checking is purely a compile-time feature and does not affect the runtime behavior of the code.

At runtime, all types in TypeScript are erased and replaced with their JavaScript counterparts. This means that TypeScript’s static types do not provide any additional safety guarantees at runtime. However, they can still be useful in catching common programming errors during development, as well as providing better IDE support and code readability.

It is also worth noting that type erasure is not unique to TypeScript - many other statically-typed languages, such as Java and C++, also use type erasure to improve runtime performance.

## **3. When should you use string literal types versus enum types?**

Both string literal types and enum types can be used to represent a fixed set of values in TypeScript, but they have different use cases.

String literal types are typically used when the set of possible values is small and well-known at design time. They allow you to specify a specific string value as a type, rather than just the generic `string` type. This helps to catch errors at compile time, as it will only allow values that match the specified string literal type.

For example, if you were creating a function that takes a parameter representing a color, you could use a string literal type to limit the valid options:

```ts
type Color = "red" | "green" | "blue";

function printColor(color: Color) {
  console.log(`The color is ${color}`);
}

printColor("red"); // OK
printColor("yellow"); // Error: Argument of type '"yellow"' is not assignable to parameter of type 'Color'.
```

Enum types, on the other hand, are useful when you have a larger set of related values that may be used in multiple places throughout your code. Enums allow you to define a named set of constants with associated numeric values. This makes them more flexible than string literal types - you can easily add or remove values from the enum without having to update all of the references to those values throughout your codebase.

For example, if you were creating a game that had multiple difficulty levels, you could use an enum to represent these levels:

```ts
enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
}

function startGame(difficulty: Difficulty) {
  // ...
}

startGame(Difficulty.Easy); // OK
startGame(4); // Error: Argument of type '4' is not assignable to parameter of type 'Difficulty'.
```

In general, you should prefer string literal types when the set of possible values is small and known at design time, and enums when you have a larger set of related values that may change over time.

## **4. What are the differences between 'const' assertions and 'as const' assertions?**

Both `const` assertions and `as const` assertions in TypeScript can be used to specify that a value should be treated as a readonly or constant value, but they have different use cases:

- `const` assertions are used to specify that an entire object should be treated as `readonly`. When applied to an object literal, `const` assertion tells TypeScript to infer the most specific type possible for each property, and then use `readonly` modifiers on those properties. For example:

```ts
const obj = { foo: "bar" } as const;
// inferred type: { readonly foo: "bar" }
```

- `as const` assertions are used to specify that any expression should be treated as a literal value. This means that TypeScript will infer the most specific type possible for the expression, including literal types like `"foo"` or `42`. This is useful when you want to create a union of literal types without having to manually specify each one. For example:

```ts
const arr = ["foo", "bar"] as const;
// inferred type: readonly ["foo", "bar"]
```

In general, you should use `const` assertions when you want to make an entire object readonly, and `as const` assertions when you want to create a union of literal types.

## **5. How can you declare a union type with a limited set of values?**

You can declare a union type with a limited set of values using the pipe (`|`) operator to separate the possible options. For example, if you wanted to create a type that could only be one of three strings, you could do the following:

```ts
type MyType = "option1" | "option2" | "option3";
```

This creates a custom type `MyType` that represents a value that can only be one of the three specified strings - any other string will result in a type error.

You can also use other types as part of a union type. For example, if you wanted to create a type that could be either a string or a number, but nothing else, you could do the following:

```ts
type MyType = string | number;
```

This creates a union type `MyType` that represents a value that can either be a string or a number.

Union types are useful when you want to constrain a value to a set of specific options. They allow you to catch errors at compile time by ensuring that only valid options are used.

## **6. What is type widening and how does it impact variable assignments?**

Type widening is a behavior in TypeScript where the type of a variable is automatically widened to a more general type based on its context. This can happen when a variable is initially assigned a value with a specific type, but then later assigned a value with a different type.

For example, consider the following code:

```ts
let x = "hello"; // Type of x is string
x = 42; // Type of x is now widened to 'string | number'
```

Initially, the type of `x` is inferred as `string`, since it is assigned the value `"hello"`. However, when it is later assigned the value `42`, which is a number, TypeScript widens the type of `x` to be a union of both `string` and `number`.

Type widening can be helpful for catching potential type errors at compile time. For example, if you accidentally try to use a string-specific method on `x` after assigning it a number value, TypeScript will raise an error at compile time. However, type widening can also lead to unexpected behavior if you are not careful.

To avoid unintended type widening, you can use type annotations to explicitly specify the type of a variable. For example:

```ts
let x: string = "hello"; // Type of x is string
x = 42; // Error: Type 'number' is not assignable to type 'string'.
```

By explicitly specifying the type of `x` as `string`, TypeScript will raise an error at compile-time when you try to assign a number value to it.

## **7. How do you ensure type safety across multiple components in a React application?**

In order to ensure type safety across multiple components in a React application through TypeScript, you can follow these steps:

1.  Define strong types for each component's props and state using TypeScript interfaces or types.

```ts
interface Props {
  name: string;
  age: number;
}

interface State {
  isLoaded: boolean;
  data: Array<number>;
}
```

2.  Use these types to annotate the component's props and state.

```ts
class MyComponent extends React.Component<Props, State> {
  // ...
}
```

3.  Make sure that all props passed to a component match its defined type.

```ts
const App = () => {
  return <MyComponent name="John" age={30} />;
};
```

4.  Use generics to create reusable components that work with different types of data.

```ts
interface ListProps<T> {
  items: Array<T>;
  render: (item: T) => JSX.Element;
}

function List<T>(props: ListProps<T>) {
  const { items, render } = props;

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{render(item)}</li>
      ))}
    </ul>
  );
}
```

5.  Use libraries such as Redux or MobX to manage the state of your application using strongly typed schemas.

```ts
interface AppState {
  user: {
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

const store = createStore<AppState>(...);
```

By following these steps, you can ensure that your React application is well-typed and reduce the chances of runtime errors caused by type mismatches.

## **8. How can you use TypeScript's Omit and Pick utility types to manipulate object types?**

TypeScript provides two utility types, `Omit` and `Pick`, that can be used to manipulate object types.

1.  `Pick<T, K>` creates a new type by picking a subset of properties from the original type. For example:

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonNameAndAge = Pick<Person, "name" | "age">;

// Resulting type:
// type PersonNameAndAge = { name: string; age: number; }
```

2.  `Omit<T, K>` creates a new type by omitting a subset of properties from the original type. For example:

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonWithoutAddress = Omit<Person, "address">;

// Resulting type:
// type PersonWithoutAddress = { name: string; age: number; }
```

These utility types are useful when you need to create new types based on existing ones with slightly different structures. They can also help reduce duplication in your codebase by avoiding the need to define similar types multiple times.

For example, suppose you have an API response object with many properties but you only need to use a few specific ones. You could use `Pick` to create a new type that only includes the relevant properties:

```ts
interface ApiResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  // ...
}

type User = Pick<ApiResponse, "id" | "name" | "email">;

function renderUser(user: User) {
  // Only `id`, `name`, and `email` properties are available here
}
```

Similarly, you could use `Omit` to remove certain properties from a type, such as when defining props for a component:

```ts
interface Props {
  name: string;
  age: number;
  address: string;
  // ...
}

type PropsWithoutAddress = Omit<Props, "address">;

class MyComponent extends React.Component<PropsWithoutAddress> {
  // ...
}
```

By using `Pick` and `Omit`, you can create flexible and reusable types that accurately reflect your data structures without having to define them from scratch every time.

## **9. What are conditional types and how can you use them effectively?**

Conditional types are a powerful feature in TypeScript that allows you to define types based on conditions. They are denoted by the `extends` keyword and use conditional logic to determine the resulting type.

The syntax for defining a conditional type is as follows:

```ts
type MyType<T> = T extends SomeCondition ? TypeA : TypeB;
```

Here, `T` is the type parameter that we want to conditionally check, `SomeCondition` is the conditional expression that evaluates to either `true` or `false`, and `TypeA` and `TypeB` are the resulting types depending on whether the conditional expression is true or false.

Conditional types are useful when you want to define a type that depends on some property of another type. For example:

```ts
interface Animal {
  type: string;
  name: string;
}

// Define a type that extracts the names from an array of objects with a "name" property
type ExtractNames<T> = T extends { name: infer U } ? U : never;

const animals: Array<Animal> = [
  { type: "dog", name: "Rex" },
  { type: "cat", name: "Whiskers" },
];

type AnimalNames = ExtractNames<typeof animals>; // Result: "Rex" | "Whiskers"
```

In this example, we define a conditional type `ExtractNames` that takes a generic type parameter `T`. We then use the `infer` keyword to extract the type of the `name` property of `T`. Finally, we use this type to create a union type of all the possible values of `name`.

Conditional types can also be used to constrain the properties of an object dynamically based on a given condition. For example:

```ts
type ConditionalProps<T> = T extends "a"
  ? { propA: number }
  : { propB: string };

function testFunc<T extends string>(arg: T): ConditionalProps<T> {
  return arg === "a" ? { propA: 1 } : { propB: "test" };
}
```

In this example, we define a function `testFunc` that returns an object with different properties depending on the value of its argument. The return type is constrained by the generic type parameter `T` using a conditional type that checks whether `T` equals `"a"`. If it does, the type of the returned object is `{ propA: number }`; otherwise it is `{ propB: string }`.

By using conditional types effectively, you can make your code more flexible and reduce duplication, while still maintaining strong typing and compile-time safety.

## **10. What are the differences between interfaces and abstract classes in TypeScript?**

Interfaces and abstract classes are both used to define object types in TypeScript, but they have different purposes and behavior.

Some of the key differences between interfaces and abstract classes include:

1.  Interfaces are used to describe the shape of an object or a class, while abstract classes are used as a base class for other classes to extend from.
2.  Interfaces cannot provide implementations for their members, while abstract classes can define abstract methods that must be implemented by any non-abstract derived class.
3.  A class can implement multiple interfaces, but it can only inherit from one abstract class.
4.  Interfaces are open-ended, meaning you can extend them later, while abstract classes are closed and provide a fixed set of functionality.
5.  You can't create instances of an interface, while you can use an abstract class as a template to create new objects.
6.  An interface can't contain implementation details of its properties and methods, while an abstract class can also include concrete methods (i.e. methods with implementations) along with abstract ones.

Here is an example of how an interface and an abstract class might be used to describe a `Person` object:

```ts
// Interface example
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

// Abstract class example
abstract class Person {
  constructor(public name: string, public age: number) {}

  abstract sayHello(): void;

  getDetails(): string {
    return `${this.name} is ${this.age} years old.`;
  }
}
```

In this example, the `Person` interface describes the shape of an object with a `name`, `age`, and a `sayHello` method, while the `Person` abstract class provides a base class for other classes to extend from, with a `name`, `age`, a `sayHello` method, and a concrete `getDetails` method.

Overall, interfaces and abstract classes each have their own strengths and use cases depending on your specific needs. Choosing which to use depends on what you are trying to achieve and how you want to structure your code.

## **11. In what situations would you use an interface over a type alias?**

Both interfaces and type aliases are used to define object types in TypeScript, but there are some situations where you might prefer one over the other.

Interfaces are typically used when:

1.  You need to create a new name for an object type. This can make your code more readable and self-documenting.
2.  You want to define an object type that can be implemented by classes, allowing you to use polymorphism and inheritance.
3.  You want to extend an existing interface, either for a library or for your own codebase.
4.  You need to describe the public API of a class or module.

Type aliases, on the other hand, are typically used when:

1.  You need to define a complex type that is based on other types, such as unions or intersections.
2.  You want to create a shorter or more convenient name for a type that would otherwise be long or unwieldy.
3.  You want to define a specific type that can't be implemented by classes, such as a tuple type.

Here are a few examples to illustrate these differences:

```ts
// Define an interface
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

// Define a type alias
type MyTuple = [string, number];

// Use an interface to define a class
class Employee implements Person {
  constructor(public name: string, public age: number) {}

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

// Use a type alias to define a function parameter
function logTuple(tuple: MyTuple) {
  console.log(`Tuple contains: ${tuple[0]} and ${tuple[1]}`);
}
```

In this example, we use an interface to define a `Person` object type that can be implemented by classes. We then use a type alias to define a `MyTuple` type that describes a tuple with a string and a number. Finally, we use the `Person` interface to define a class `Employee` that implements the interface, and we use the `MyTuple` type alias to define a function parameter.

In general, using an interface makes sense when you are defining something that is more abstract and can be implemented by different classes, while using a type alias makes sense when you are defining something that is more concrete and specific to a particular context.

## **12. How can you define a generic type that takes an arbitrary number of arguments?**

In TypeScript, you can define a generic type that takes an arbitrary number of arguments using the spread operator (`...`) in tuple types. This allows you to create flexible and reusable types that can work with any number of arguments.

Here's an example of how to define a generic type that takes an arbitrary number of arguments:

```ts
type ArbitraryArgsFunction<T extends unknown[], R> = (...args: T) => R;
```

In this example, `T` is a tuple type parameter that represents the types of the function's arguments, and `R` is the return type of the function. The spread operator `...` in `(...args: T)` means that the function can take any number of arguments of any type.

You can use this generic type to define functions that take any number of arguments:

```ts
const sum: ArbitraryArgsFunction<number[], number> = (...nums) => {
  return nums.reduce((total, num) => total + num, 0);
};

const concat: ArbitraryArgsFunction<string[], string> = (...strings) => {
  return strings.join("");
};
```

In this example, we define two functions `sum` and `concat` that use the `ArbitraryArgsFunction` type to take any number of arguments of a specific type and return a value of a specific type.

By using a generic type that takes an arbitrary number of arguments, you can create more flexible and reusable functions that work with any number of input values.

## **13. How can you use mapped types to apply transformations to object properties?**

In TypeScript, mapped types are a powerful feature that allow you to create new types based on an existing type by applying transformations to its properties. One common use case for mapped types is to modify or add properties to an object type.

Here's an example of how to use mapped types to apply transformations to object properties:

```ts
interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

const person: ReadonlyPerson = { name: "John", age: 30 };
person.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.
```

In this example, we define an interface `Person` with two properties, `name` and `age`. We then use a mapped type to create a new type `ReadonlyPerson`, which has the same properties as `Person`, but with all its properties set to read-only using the `readonly` keyword. The mapping function `[K in keyof Person]: Person[K]` is used to preserve the original types of the properties in `Person`.

By applying this transformation to the `Person` type, we can create a new type that guarantees that its properties cannot be modified after creation. When we try to modify the `name` property of a `ReadonlyPerson` object, we get a compile-time error.

Mapped types can also be used to add or remove properties from an object type. Here's an example of how to use mapped types to add a property to an object type:

```ts
interface Person {
  name: string;
  age: number;
}

type PersonWithId = {
  id: string;
  [K in keyof Person]: Person[K];
};

const person: PersonWithId = { id: "123", name: "John", age: 30 };
```

In this example, we use a mapped type to add a new `id` property to the `Person` type, while preserving its existing properties using the `[K in keyof Person]: Person[K]` mapping function.

By using mapped types to apply transformations to object properties, you can create more flexible and reusable types that accurately reflect the structure of your data.

## **14. What is the difference between 'unknown', 'any', and 'never' types in TypeScript?**

In TypeScript, `unknown`, `any`, and `never` are all special types that represent different things.

1.  `unknown` is a type-safe counterpart to the `any` type. It represents values that can be of any type at runtime, but unlike `any`, it requires you to perform a type check before using the value. This helps catch errors at compile-time instead of runtime.
2.  `any` is a type that allows values to have any type at runtime. It is often used when you don't know the type of a value or when you want to bypass type checking altogether. However, overusing `any` can make your code less safe and less maintainable.
3.  `never` is a type that represents a value that will never occur. It is often used to indicate that a function will never return normally (e.g. because it throws an error), or to indicate that a variable can never have a value (e.g. because it is used in a type guard that covers all possible cases).

Here are some examples of how these types can be used:

```ts
// Unknown example
function parseJSON(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return undefined;
  }
}

const json = '{"name": "John", "age": 30}';
const parsed = parseJSON(json);

if (typeof parsed === "object" && parsed !== null) {
  console.log(parsed.name); // OK
  console.log(parsed.age); // OK
  console.log(parsed.foo); // Error: Object is of type 'unknown'.
}

// Any example
let x: any = 123;
x = "hello";
x = { foo: "bar" };
console.log(x); // { foo: "bar" }

// Never example
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

In this example, we define a function `parseJSON` that attempts to parse a JSON string and returns an `unknown` value. We then use a type guard to perform a runtime check on the value before using its properties.

We also define a variable `x` with the `any` type, which can be assigned any value without triggering any type errors. Finally, we define two functions, `throwError` and `infiniteLoop`, that return a value of the `never` type to indicate that they never return normally.

Overall, understanding the differences between `unknown`, `any`, and `never` is important for writing safe and maintainable TypeScript code.

## **15. How do you write a custom type guard to narrow down a union type?**

In TypeScript, type guards are used to narrow down a union type to a more specific type based on a runtime check. They allow you to write code that is both type-safe and flexible.

Here's an example of how to write a custom type guard to narrow down a union type:

```ts
interface Dog {
  kind: "dog";
  name: string;
  breed: string;
}

interface Cat {
  kind: "cat";
  name: string;
  breed: string;
}

type Animal = Dog | Cat;

function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).kind === "dog";
}

function feedAnimal(animal: Animal) {
  if (isDog(animal)) {
    console.log(`Feeding dog ${animal.name} some kibble.`);
  } else {
    console.log(`Feeding cat ${animal.name} some tuna.`);
  }
}
```

In this example, we define two interfaces `Dog` and `Cat` that each have a `kind`, `name`, and `breed` property. We then create a union type `Animal` that can be either a `Dog` or a `Cat`.

We define a function `isDog` that takes an `Animal` parameter and returns a boolean indicating whether the animal is a dog. The `animal is Dog` syntax is a type predicate that tells the compiler to narrow down the type from `Animal` to `Dog` if the function returns `true`.

Finally, we define a function `feedAnimal` that takes an `Animal` parameter and uses the `isDog` type guard to determine whether to feed the animal kibble or tuna.

By using a custom type guard, we can write type-safe code that handles union types in a flexible and robust way. Type guards can help catch errors at compile-time instead of runtime, which can save time and make debugging easier.

## **16. What is variance in TypeScript and how does it apply to function types?**

In TypeScript, variance refers to how subtyping between generic types is affected by the relationships between their type parameters. Specifically, it refers to whether a generic type that has a parameterized type of a subtype can be used in place of another parameterized type.

Variance is important in function types because functions have input and output types, and we need to make sure that subtyping relationships are preserved when we use these types as parameters or return types in other functions.

There are two types of variance in TypeScript: covariance and contravariance.

1.  Covariance applies to cases where a subtyping relationship is preserved in the same direction as the type parameter. For example, if we have a type `Animal` that is a subtype of `Dog`, and we have a generic type `Container<T>`, then `Container<Animal>` is a subtype of `Container<Dog>`. This is because the subtyping relationship between `Animal` and `Dog` is preserved in the same direction as the type parameter `T`.
2.  Contravariance applies to cases where a subtyping relationship is reversed in the opposite direction of the type parameter. For example, if we have a type `Comparator<Dog>` that takes two dogs and returns a number, and we want to use it as a parameter of a function that expects a type `Comparator<Animal>`, then we must reverse the subtyping relationship between `Animal` and `Dog` so that `Comparator<Dog>` is a subtype of `Comparator<Animal>`. This is because the subtyping relationship between `Dog` and `Animal` is reversed in the opposite direction of the type parameter.

Here's an example of how variance applies to function types in TypeScript:

```ts
type AnimalComparator = (a: Animal, b: Animal) => number;

function sortAnimals(comparator: AnimalComparator, animals: Animal[]) {
  // ...
}

function compareDogs(a: Dog, b: Dog): number {
  // ...
}

sortAnimals(compareDogs, [dog1, dog2]); // OK
```

In this example, we define a function `sortAnimals` that takes an `AnimalComparator` function and an array of `Animal` objects, and sorts the animals according to the comparator. We also define a function `compareDogs` that takes two `Dog` objects and returns a number.

Even though `compareDogs` is more specific than `AnimalComparator`, it can still be used as a parameter of `sortAnimals` because `AnimalComparator` is contravariant with respect to its input types (`Animal`) and covariant with respect to its output type (`number`). In other words, the subtyping relationship is reversed for the input types, but preserved for the output type.

Overall, understanding variance in TypeScript is important for writing generic code that is both flexible and type-safe. Variance allows us to use subtypes and supertypes of generic types in a way that preserves the subtyping relationship, and helps catch errors at compile-time instead of runtime.

## **17. What is the difference between ambient and module declarations in TypeScript?**

In TypeScript, ambient and module declarations are used to describe the shape of external code that is not written in TypeScript.

Ambient declarations are used to define types and interfaces for existing JavaScript libraries or APIs. They allow you to use type annotations and benefit from TypeScript's static type checking when working with external code.

Here's an example of an ambient declaration:

```ts
declare module "jquery" {
  function $(selector: string): any;
  export = $;
}
```

In this example, we declare a module `"jquery"` that exports a function `$` which takes a `string` parameter and returns `any`. This allows us to import and use the jQuery library in our TypeScript code with type checking.

Module declarations, on the other hand, are used to define the shape of a module that is defined in TypeScript but compiled to JavaScript. They allow you to encapsulate code and avoid naming collisions.

Here's an example of a module declaration:

```ts
declare module MyModule {
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person): void;
}

// Usage:
const person = { name: "John", age: 30 };
MyModule.greet(person);
```

In this example, we declare a module `MyModule` that exports an interface `Person` and a function `greet` that takes a `Person` object and returns `void`. This allows us to encapsulate our code and avoid naming collisions with other modules or variables.

Overall, ambient and module declarations are both important for working with external code and organizing your own code. They help make TypeScript more flexible and powerful, and can save time and effort by catching errors at compile-time instead of runtime.

## **18. How can you define an intersection type with optional properties in TypeScript?**

In TypeScript, you can define an intersection type with optional properties by using the `&` operator to combine two or more types, and then making some of the properties optional using the `?` operator.

Here's an example of how to define an intersection type with optional properties:

```ts
interface Person {
  name: string;
  age: number;
}

interface ContactInfo {
  email?: string;
  phone?: string;
}

type PersonWithContact = Person & ContactInfo;

const person: PersonWithContact = { name: "John", age: 30 };
person.email = "john@example.com";
```

In this example, we define two interfaces `Person` and `ContactInfo` that represent a person and their contact information, respectively. We then define a new type `PersonWithContact` that is an intersection of `Person` and `ContactInfo`, where the `email` and `phone` properties are optional.

We create a variable `person` of type `PersonWithContact`, which has the required properties of `Person` (i.e. `name` and `age`) and the optional properties of `ContactInfo` (i.e. `email` and `phone`). We can then set the `email` property of `person` to `"john@example.com"`, even though it is optional.

By using an intersection type with optional properties, we can create flexible and reusable types that accurately reflect the structure of our data. This is especially useful when working with complex data structures that may have optional or nullable fields.

## **19. How can you use class decorators and parameter decorators in TypeScript?**

In TypeScript, class decorators and parameter decorators are used to modify the behavior of classes and their methods at runtime. They allow you to add metadata or functionality to your code without directly modifying the underlying implementation.

Here's an example of how to use class decorators and parameter decorators:

```ts
function logClass(target: any) {
  console.log(`Class ${target.name} created.`);
}

class Person {
  constructor(public name: string, public age: number) {}

  @logMethod
  greet(@logParameter message: string): void {
    console.log(`${this.name} says: ${message}`);
  }
}

function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(
    `Method ${propertyKey} of class ${target.constructor.name} decorated.`
  );
}

function logParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log(
    `Parameter ${parameterIndex} of method ${propertyKey} in class ${target.constructor.name} decorated.`
  );
}

const john = new Person("John", 30);
john.greet("Hello!"); // John says: Hello!
```

In this example, we define a class `Person` with a constructor and a `greet` method that takes a message parameter. We also define two decorators `logMethod` and `logParameter` that log information about the method and parameter they decorate, and a class decorator `logClass` that logs information about the class it decorates.

We apply the `@logMethod` decorator to the `greet` method, which causes the decorator function to be executed when the method is called. We also apply the `@logParameter` decorator to the `message` parameter, which causes the decorator function to be executed when the parameter is accessed.

Finally, we create an instance of the `Person` class and call its `greet` method with a message. The decorators log information about the decorated method and parameter, as well as information about the creation of the `Person` class.

By using class decorators and parameter decorators, we can add powerful functionality to our classes and methods, such as logging, validation, and authorization, without directly modifying the underlying code. This makes our code more modular, maintainable, and reusable.

## **20. How can you create type-safe event emitters in TypeScript?**

In TypeScript, you can create type-safe event emitters by defining a custom class that encapsulates the logic for emitting events, and using generic type parameters to specify the types of the event payloads.

Here's an example of how to create a type-safe event emitter:

```ts
type Listener<T> = (payload: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  public on(listener: Listener<T>) {
    this.listeners.push(listener);
  }

  public off(listener: Listener<T>) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  public emit(payload: T) {
    for (const listener of this.listeners) {
      listener(payload);
    }
  }
}

// Example usage:

interface MessageEvent {
  sender: string;
  message: string;
}

const eventEmitter = new EventEmitter<MessageEvent>();

eventEmitter.on((event) => {
  console.log(`Received message "${event.message}" from ${event.sender}.`);
});

eventEmitter.emit({ sender: "John", message: "Hello!" });
```

In this example, we define a generic class `EventEmitter<T>` that has a type parameter `T` representing the type of the event payload. The class has three methods: `on`, `off`, and `emit`.

The `on` method takes a `Listener<T>` function as a parameter and adds it to the list of listeners for the event. The `off` method takes a `Listener<T>` function as a parameter and removes it from the list of listeners. The `emit` method takes a payload of type `T` and calls each listener function with the payload as an argument.

We then create an instance of the `EventEmitter<MessageEvent>` class and add a listener function that logs the incoming message. We emit an event with a `MessageEvent` payload and see the listener function output the log message.

By using a generic class with a type parameter for the event payload, we can ensure that the event emitter is type-safe and provides accurate type checking at compile time. This helps catch errors before runtime and makes our code more robust and reliable.

## **21. How can you declare a tuple type with a fixed length in TypeScript?**

In TypeScript, you can declare a tuple type with a fixed length using square brackets `[]` and specifying the types of its elements separated by commas.

Here's an example of how to declare a tuple type with a fixed length:

```ts
type Point = [number, number];

const point: Point = [1, 2];
```

In this example, we define a type `Point` that represents a tuple of two numbers. We create a variable `point` of type `Point`, which has two elements of type `number`.

By using a tuple type with a fixed length, we can ensure that the structure of our data is well-defined and consistent across our codebase. This can help catch errors at compile time and make our code more robust and maintainable.

## **22. What are index signatures and how can you use them to define dynamic object properties?**

In TypeScript, index signatures allow you to define dynamic object properties by specifying a pattern for the keys and values of an object. They are used to describe the shape of objects that have unknown or variable property names.

Here's an example of how to use index signatures to define dynamic object properties:

```ts
interface Dictionary {
  [key: string]: number;
}

const dict: Dictionary = {
  apples: 5,
  oranges: 3,
  bananas: 2,
};

console.log(dict["apples"]); // Output: 5
```

In this example, we define an interface `Dictionary` that has an index signature `[key: string]: number`. This allows us to create an object with any number of properties whose keys are strings and values are numbers.

We create a variable `dict` of type `Dictionary`, which has three properties: `"apples"`, `"oranges"`, and `"bananas"`. We can access the value of the `"apples"` property using bracket notation, as shown in the `console.log` statement.

By using index signatures, we can define object types that are more flexible and adaptable to changing requirements. This can be especially useful when working with data from external sources or APIs, where the exact structure of the data may not be known in advance. However, it is important to use index signatures judiciously and to provide appropriate typing information whenever possible, in order to avoid unexpected behavior or errors.

## **23. How can you use TypeScript's infer keyword to infer types from other types?**

In TypeScript, the `infer` keyword is used to infer types from other types. It allows us to extract and manipulate specific types within a larger type, and use those types in other contexts.

The most common use case for `infer` is in conditional types, where we want to extract a certain type parameter from a union of types. Here's an example:

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>; // number
```

In this example, we define a generic type `ReturnType<T>` that takes a function type `T` as a parameter. The type uses a conditional type statement to check if `T` is a function type; if so, it uses the `infer` keyword to extract the return type of the function and assign it to the type variable `R`. Otherwise, it assigns the `never` type to `R`.

We then define a function `add` that takes two numbers and returns their sum. We use the `typeof` operator to get the type of the `add` function, and apply the `ReturnType` type to it to extract its return type. The resulting type `AddReturnType` is inferred to be `number`, since the `add` function returns a number.

By using the `infer` keyword, we can create powerful and reusable types that extract specific type information from larger types. This can help make our code more flexible and maintainable, and avoid boilerplate code or redundant typing information.

## **24. How can you define a type that requires certain properties to be present but allows for additional properties?**

In TypeScript, you can define a type that requires certain properties to be present but allows for additional properties by using an intersection type with a mapped type that uses the `Partial` utility type.

Here's an example of how to define a type that requires certain properties to be present but allows for additional properties:

```ts
interface Person {
  name: string;
  age: number;
}

type PersonWithOptionalProps = Person &
  Partial<{
    email: string;
    phone: string;
  }>;

const person1: PersonWithOptionalProps = {
  name: "John",
  age: 30,
};

const person2: PersonWithOptionalProps = {
  name: "Jane",
  age: 25,
  email: "jane@example.com",
};
```

In this example, we define an interface `Person` with two required properties: `name` and `age`. We then define a type `PersonWithOptionalProps` that is an intersection of `Person` and a mapped type that uses the `Partial` utility type on an object literal with optional properties `email` and `phone`.

We create two variables of type `PersonWithOptionalProps`: `person1` has only the required properties, while `person2` has the required properties as well as an optional `email` property.

By using the `Partial` utility type in a mapped type, we can create a type that requires certain properties to be present but allows for additional properties. This can be useful when working with data structures that have a fixed set of required properties but may have additional metadata or customization options. However, it is important to use this feature judiciously and ensure that the additional properties don't cause unexpected behavior or errors in our code.

## **25. How can you use namespaces and modules to organize your code in TypeScript?**

In TypeScript, namespaces and modules are used to organize code into logical units and avoid naming collisions. They allow you to group related code together and create a hierarchy of dependencies between different parts of your application.

Namespaces are used for organizing code that is loaded asynchronously using script tags. They provide a way to encapsulate code and avoid name collisions with other scripts on the same page. Here's an example of how to define a namespace:

```ts
namespace MyNamespace {
  export interface Person {
    name: string;
    age: number;
  }

  export function greet(person: Person): void {
    console.log(`Hello, ${person.name}!`);
  }
}

const john: MyNamespace.Person = { name: "John", age: 30 };
MyNamespace.greet(john);
```

In this example, we define a namespace `MyNamespace` that contains an interface `Person` and a function `greet`. We export these symbols using the `export` keyword so they can be accessed outside of the namespace.

We then create a variable `john` of type `MyNamespace.Person`, and call the `greet` function with `john` as a parameter.

Modules, on the other hand, are used for organizing code that is loaded as individual files in a module system like CommonJS or ES modules. They provide a way to share code between files without polluting the global namespace. Here's an example of how to define a module:

```ts
import { Person } from "./person";

export function greet(person: Person): void {
  console.log(`Hello, ${person.name}!`);
}
```

In this example, we define a module that exports a function `greet`. We import the `Person` interface from another module called `person`, which is defined in a separate file. We use the `export` keyword to make the `greet` function available to other modules.

By using namespaces and modules, we can organize our code into logical units and avoid naming collisions between different parts of our application. This makes our code more maintainable, reusable, and scalable over time.

## **26. What are the differences between declaration merging and module augmentation in TypeScript?**

In TypeScript, declaration merging and module augmentation are two different ways of extending or modifying existing types and APIs.

Declaration merging is a feature that allows you to combine the declarations of multiple interfaces, classes, or functions with the same name into a single definition. This can be useful for adding or overriding properties or methods in existing types. Here's an example:

```ts
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const john: Person = { name: "John", age: 30 };
```

In this example, we define two interfaces `Person` with different properties. Because the interfaces have the same name, they are merged into a single interface with both `name` and `age` properties. We can create a variable `john` of type `Person` that has both properties.

Module augmentation, on the other hand, is a feature that allows you to extend or modify existing modules or namespaces from external sources, such as third-party libraries or TypeScript declaration files. This can be useful for adding or overriding properties or methods in existing APIs. Here's an example:

```ts
// my-types.d.ts

declare namespace MyLibrary {
  interface Person {
    email: string;
  }
}

// my-app.ts

import { MyLibrary } from "my-library";

const john: MyLibrary.Person = {
  name: "John",
  age: 30,
  email: "john@example.com",
};
```

In this example, we define a TypeScript declaration file `my-types.d.ts` that declares a namespace `MyLibrary` with an extended `Person` interface that has an `email` property. We then import the `MyLibrary` namespace in our application code and use the extended `Person` interface to create a variable `john` with the additional `email` property.

The main difference between declaration merging and module augmentation is the scope of the modifications. Declaration merging only allows you to modify existing types within your own codebase, while module augmentation allows you to modify existing types and APIs from external sources. Additionally, module augmentation requires the use of declaration files to augment external modules or namespaces, whereas declaration merging is a built-in feature of TypeScript.

## **27. How can you define a recursive type in TypeScript?**

In TypeScript, you can define a recursive type using an interface that refers to itself as one of its own properties. This allows you to define types that contain nested or recursive data structures.

Here's an example of how to define a recursive type:

```ts
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: {
    value: 3,
    left: { value: 6 },
  },
};
```

In this example, we define an interface `TreeNode` that has three properties: `value`, `left`, and `right`. The `left` and `right` properties are optional and also have the `TreeNode` type, allowing us to create a nested or recursive data structure representing a binary tree.

We then create a variable `tree` of type `TreeNode`, which has a root node with a value of 1, and two child nodes representing the left and right subtrees of the tree.

By using recursive types, we can define complex data structures that contain arbitrary levels of nesting or recursion. This can be useful for representing hierarchical data such as trees, graphs, or nested objects, and can help make our code more expressive and maintainable. However, it is important to use recursive types judiciously and ensure that they don't lead to unbounded or inefficient data structures in our code.

## **28. How can you define a type that represents a function with specific argument and return types?**

In TypeScript, you can define a type that represents a function with specific argument and return types using the `type` keyword and function syntax.

Here's an example of how to define a type that represents a function with specific argument and return types:

```ts
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => {
  return a + b;
};

const result: number = add(2, 3); // Output: 5
```

In this example, we define a type `AddFunction` that represents a function with two arguments of type `number` and a return type of `number`. We then define a variable `add` of type `AddFunction` that implements the function signature defined by the type. The implementation simply adds the two arguments and returns the result.

We create a variable `result` of type `number` by calling the `add` function with two numbers as arguments. The result is assigned to `result`, which is `5`.

By using types to represent functions with specific argument and return types, we can ensure that our code is more robust and maintainable by catching errors at compile time rather than runtime. This can be especially useful when working with complex or dynamic systems where the structure of data is not well-defined in advance.

## **29. How can you use generic constraints to restrict the types that can be used with a generic type parameter?**

In TypeScript, you can use generic constraints to restrict the types that can be used with a generic type parameter. Generic constraints allow you to specify a set of properties or methods that a type must have in order to be used as a type argument for a generic type parameter.

Here's an example of how to use generic constraints to restrict the types that can be used with a generic type parameter:

```ts
interface Person {
  name: string;
  age: number;
}

function getName<T extends Person>(person: T): string {
  return person.name;
}

const john: Person = { name: "John", age: 30 };
const name: string = getName(john); // Output: "John"
```

In this example, we define an interface `Person` with two properties: `name` and `age`. We then define a function `getName` with a generic type parameter `T` that extends the `Person` interface using the `extends` keyword. This means that any type used as a type argument for `T` must have the same properties as `Person`.

We create a variable `john` of type `Person`, and pass it as an argument to the `getName` function. The function returns the `name` property of the `Person` object, which is `"John"`. We assign the result to a variable `name` of type `string`.

By using generic constraints, we can ensure that the types used with our generic functions or classes meet specific requirements, such as having certain properties or methods. This can help prevent runtime errors and improve the type safety and correctness of our code.

## **30. How can you use TypeScript's keyof operator to access object keys as type literals?**

In TypeScript, you can use the `keyof` operator to access object keys as type literals. The `keyof` operator returns a type that represents the keys of an object or interface as string literal types.

Here's an example of how to use the `keyof` operator to access object keys as type literals:

```ts
interface Person {
  name: string;
  age: number;
}

function getPropertyValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const john: Person = { name: "John", age: 30 };
const name: string = getPropertyValue(john, "name"); // Output: "John"
const age: number = getPropertyValue(john, "age"); // Output: 30
```

In this example, we define an interface `Person` with two properties: `name` and `age`. We then define a function `getPropertyValue` with two generic type parameters `T` and `K`. The `T` parameter represents the type of the object, while the `K` parameter is constrained to be one of the keys of the `T` object using the `keyof` operator.

The function takes two arguments: an object `obj` of type `T`, and a key `key` of type `K`. It returns the property value of the object corresponding to the specified key.

We create a variable `john` of type `Person`, and use the `getPropertyValue` function to access its `name` and `age` properties by passing in the `john` object and the corresponding key names as type literals. We assign the results to variables `name` and `age`.

By using the `keyof` operator to access object keys as type literals, we can enhance the type safety and correctness of our code by ensuring that only valid keys can be used to access object properties.

## **31. How can you create a type-safe Redux store in TypeScript?**

In TypeScript, you can create a type-safe Redux store by using the `createStore` function from the `redux` library and specifying the state and action types as generic type parameters.

Here's an example of how to create a type-safe Redux store in TypeScript:

```ts
import { createStore, Action } from "redux";

interface AppState {
  count: number;
}

interface IncrementAction extends Action {
  type: "INCREMENT";
  payload: {
    value: number;
  };
}

type AppAction = IncrementAction;

const initialState: AppState = {
  count: 0,
};

function reducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.payload.value };
    default:
      return state;
  }
}

const store = createStore<AppState, AppAction, {}, {}>(reducer);
```

In this example, we define an interface `AppState` that represents the shape of our application state, which consists of a `count` property of type `number`. We also define an interface `IncrementAction` that extends the `Action` interface from the `redux` library and adds a `payload` property with a `value` property of type `number`. We define a union type `AppAction` as a collection of all possible action types in our application.

We then define a `reducer` function that takes the current state and an action, and returns a new state based on the type of the action. In this case, if the action is an `INCREMENT` action, we increment the `count` property of the state by the `value` property of the action's payload.

Finally, we use the `createStore` function from the `redux` library to create a type-safe Redux store. We specify `AppState` as the type of the state, `AppAction` as the type of the actions, and empty objects `{}` for the type of the preloaded state and the middleware enhancers.

By using TypeScript's type system to ensure that only valid state and action types can be used with our Redux store, we can improve the correctness and robustness of our application.

## **32. How can you use intersection types and union types together in TypeScript?**

In TypeScript, you can use intersection types and union types together to create more complex type compositions that combine the properties of multiple types.

Intersection types are created using the `&` operator and represent a type that has all the properties of the types being intersected. Union types, on the other hand, are created using the `|` operator and represent a type that has one of several possible types.

Here's an example of how to use intersection types and union types together:

```ts
interface Animal {
  name: string;
  species: string;
}

interface Pet {
  owner: string;
  isFriendly: boolean;
}

type Dog = Animal & Pet;

type CatOrDog = Animal | Dog;

function printName(animal: CatOrDog): void {
  if ("owner" in animal) {
    console.log(`This is ${animal.name}, owned by ${animal.owner}.`);
  } else {
    console.log(`This is ${animal.name}.`);
  }
}

const dog: Dog = {
  name: "Buddy",
  species: "Canis lupus familiaris",
  owner: "John",
  isFriendly: true,
};
const cat: Animal = { name: "Fluffy", species: "Felis catus" };

printName(dog); // Output: "This is Buddy, owned by John."
printName(cat); // Output: "This is Fluffy."
```

In this example, we define an interface `Animal` with two properties: `name` and `species`, and an interface `Pet` with two properties: `owner` and `isFriendly`. We then define a type `Dog` that is an intersection of `Animal` and `Pet`, representing a dog that has both animal and pet properties.

We also define a union type `CatOrDog` as a collection of all possible animal types, including `Animal` and `Dog`.

We then define a function `printName` that takes an argument of type `CatOrDog` and prints a message containing the animal's name and owner (if it's a dog).

We create a variable `dog` of type `Dog` and a variable `cat` of type `Animal`, and pass them as arguments to the `printName` function. The function correctly identifies that `dog` is a dog with an owner, and prints the corresponding message. It also prints the name of the `cat` object.

By using intersection types and union types together, we can create more flexible and powerful type compositions that accurately reflect the structure of our application data.

## **33. How can you create a type-safe object-oriented API in TypeScript?**

In TypeScript, you can create a type-safe object-oriented API by using classes and interfaces to define the structure of your objects and methods, as well as using access modifiers to restrict the visibility and mutability of properties and methods.

Here's an example of how to create a type-safe object-oriented API in TypeScript:

```ts
interface Person {
  name: string;
  age: number;
}

class PersonClass implements Person {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }

  get birthYear() {
    return new Date().getFullYear() - this.age;
  }
}

const john = new PersonClass("John", 30);
john.greet(); // Output: "Hello, my name is John."
console.log(john.birthYear); // Output: 1991
```

In this example, we define a `Person` interface that represents the shape of a person object with a `name` property of type `string` and an `age` property of type `number`. We then define a `PersonClass` class that implements the `Person` interface and has a constructor that takes a `name` and `age` parameter.

We define a `greet` method that logs a greeting message including the person's name, and a `birthYear` getter that calculates and returns the person's birth year based on their age.

We create a variable `john` of type `PersonClass` by instantiating the class with a name of `"John"` and an age of `30`. We call the `greet` method on the `john` object, which logs a greeting message. We also log the birth year of `john` using the `birthYear` getter.

By using classes and interfaces to define our object-oriented API, we can ensure that our code is more robust and maintainable by catching errors at compile time rather than runtime. We can also use access modifiers such as `public`, `private`, and `protected` to restrict the visibility and mutability of properties and methods, further enhancing the safety and correctness of our code.

## **34. What are the differences between 'type' and 'interface' keywords in TypeScript?**

In TypeScript, both `type` and `interface` keywords are used to define custom types, but there are some differences between them.

The main difference between `type` and `interface` is that `type` can define union types, intersections, tuples, primitive types, and aliases for other types, while `interface` can only define object types.

Here are some examples of how `type` and `interface` differ:

```ts
// Type definition using 'type' keyword
type Person = {
  name: string;
  age: number;
};

// Interface definition
interface Animal {
  species: string;
  isPet: boolean;
}

// Union type using 'type' keyword
type Pet = Dog | Cat;

// Intersection type using 'type' keyword
type DogAndPerson = Dog & Person;

// Type alias using 'type' keyword
type UserID = string;

// Array tuple type using 'type' keyword
type Point = [number, number];

// Function type using 'type' keyword
type Greeting = (name: string) => string;

// Object literal type using 'interface' keyword
interface Color {
  red: number;
  green: number;
  blue: number;
}
```

As you can see from the above examples, `type` can be used to define a wide range of types, including primitive types, function types, and complex types such as unions and intersections. In contrast, `interface` is primarily used to define object types with named properties.

Another difference between `type` and `interface` is that `interface` supports extending other interfaces using the `extends` keyword, while `type` supports creating type aliases with the `=`, `&`, and `|` operators.

Generally, when defining object types in TypeScript, it's recommended to use `interface` due to its clarity and readability. However, when defining more complex or flexible types, such as those involving unions or intersections, `type` can be a better choice.

## **35. How can you use mapped types to make all properties optional or readonly?**

In TypeScript, you can use mapped types to transform an existing type into a new type with modified properties. Two common examples of mapped types are making all properties optional or readonly.

To make all properties optional, you can use the `Partial<T>` mapped type. Here's an example:

```ts
interface Person {
  name: string;
  age: number;
}

const john: Partial<Person> = { name: "John" };
```

In this example, we define an interface `Person` with two required properties: `name` and `age`. We then create a variable `john` of type `Partial<Person>` by using the `Partial<T>` mapped type. This makes all properties of `Person` optional. We assign a value to the `name` property, but not the `age` property.

To make all properties readonly, you can use the `Readonly<T>` mapped type. Here's an example:

```ts
interface Person {
  readonly name: string;
  readonly age: number;
}

const john: Readonly<Person> = { name: "John", age: 30 };
```

In this example, we define an interface `Person` with two readonly properties: `name` and `age`. We then create a variable `john` of type `Readonly<Person>` by using the `Readonly<T>` mapped type. This makes all properties of `Person` readonly, meaning they cannot be changed after they are initialized.

By using mapped types, we can define more flexible and powerful types that better reflect the structure of our application data, while still maintaining type safety and correctness.

## **36. How can you use TypeScript's Partial and Required utility types to modify object types?**

In TypeScript, you can use the `Partial` and `Required` utility types to modify object types by making their properties either optional or required.

The `Partial<T>` type is a built-in utility type that makes all properties of an object type `T` optional. You can use it like this:

```ts
interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;

const john: PartialPerson = { name: "John" };
```

In this example, we define an interface `Person` with two required properties: `name` and `age`. We then create a new type `PartialPerson` using the `Partial<T>` utility type, which makes both `name` and `age` optional. We then create a variable `john` of type `PartialPerson`, which only defines the `name` property.

The `Required<T>` type is another built-in utility type that makes all properties of an object type `T` required. You can use it like this:

```ts
interface Person {
  name?: string;
  age?: number;
}

type RequiredPerson = Required<Person>;

const john: RequiredPerson = { name: "John", age: 30 };
```

In this example, we define an interface `Person` with two optional properties: `name` and `age`. We then create a new type `RequiredPerson` using the `Required<T>` utility type, which makes both `name` and `age` required. We then create a variable `john` of type `RequiredPerson`, which defines both the `name` and `age` properties.

By using the `Partial` and `Required` utility types, we can easily modify object types to make their properties optional or required, depending on our needs. This can help us write more flexible and robust code that can adapt to changing requirements over time.

## **37. How can you use discriminant properties to implement algebraic data types in TypeScript?**

In TypeScript, you can use discriminant properties to implement algebraic data types. An algebraic data type is a type that is composed of multiple other types, and can be any one of those types at any given time.

Discriminant properties are properties that can be used to determine the specific variant of an algebraic data type that a value represents. You can use a common property in each variant of an algebraic data type to discriminate between them.

Here's an example:

```ts
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}
```

In this example, we define three interfaces: `Square`, `Rectangle`, and `Circle`, each with their own set of properties. We also define a discriminated union type `Shape`, which can be either a `Square`, `Rectangle`, or `Circle`.

We then define a function `area` that takes a `Shape` as its argument and returns the area of the shape. We use a `switch` statement with the `kind` property of the `Shape` to determine which variant of the algebraic data type we are dealing with, and perform a different calculation based on that variant.

By using a discriminant property like `kind`, we can implement algebraic data types in TypeScript that are type-safe and easy to work with. This approach makes it easier to reason about complex data structures and ensures that we catch errors at compile time rather than at runtime.

## **38. How can you use the in operator to narrow down types in TypeScript?**

In TypeScript, you can use the `in` operator to narrow down types of objects or variables. The `in` operator checks if a property exists in an object and returns a boolean value. When used in combination with conditional statements, it can help you narrow down the type of an object.

Here's an example:

```ts
interface Dog {
  name: string;
  breed: string;
}

interface Cat {
  name: string;
  color: string;
}

function printPet(pet: Dog | Cat) {
  if ("breed" in pet) {
    console.log(`${pet.name} is a ${pet.breed} dog.`);
  } else {
    console.log(`${pet.name} is a ${pet.color} cat.`);
  }
}
```

In this example, we define two interfaces: `Dog` and `Cat`, each representing a different kind of pet. We also define a function `printPet` that takes a parameter of type `Dog` or `Cat`.

Inside the function, we use the `in` operator to check if the `breed` property exists in the `pet` object. If it does, we know that `pet` is a `Dog` and we can safely access its `breed` property. If it doesn't, we know that `pet` is a `Cat` and we can safely access its `color` property.

By using the `in` operator to narrow down the type of `pet`, we ensure that our code is more robust and type-safe. We can catch errors at compile time rather than runtime, and make sure that we're only accessing properties that actually exist on the object.

## **39. How can you use string literal types to define constants in TypeScript?**

In TypeScript, you can use string literal types to define constants. A string literal type is a type that represents a specific string value and can only have that value.

Here's an example:

```ts
const red: "red" = "red";
const green: "green" = "green";
const blue: "blue" = "blue";

type Color = "red" | "green" | "blue";

function setColor(color: Color) {
  // ...
}
```

In this example, we define three constant variables `red`, `green`, and `blue` with string literal types. Each variable can only have the value of `"red"`, `"green"`, or `"blue"`, respectively.

We also define a type `Color` that is a union of these three string literal types. This allows us to define a function `setColor` that takes a parameter of type `Color`, which can only be one of the three color values.

By using string literal types to define constants, we can ensure that our code is more robust and type-safe. We can catch errors at compile time rather than runtime, and make sure that we're only working with valid values. Additionally, string literal types are often more readable and self-documenting than magic strings or constants defined as numbers.

## **40. How can you use TypeScript's ReadonlyArray type to enforce immutability?**

In TypeScript, you can use the `ReadonlyArray<T>` type to enforce immutability of arrays. The `ReadonlyArray<T>` type is a built-in utility type that represents an immutable array of `T` elements.

Here's an example:

```ts
const numbers: ReadonlyArray<number> = [1, 2, 3];
numbers.push(4); // Error: Property 'push' does not exist on type 'ReadonlyArray<number>'.
```

In this example, we define a constant variable `numbers` of type `ReadonlyArray<number>` with three elements. We then try to use the `push` method on the `numbers` array, which is not allowed because `ReadonlyArray<T>` prevents any modifications to the array after it is created.

If we want to modify the `numbers` array, we need to create a copy of it and modify the copy instead:

```ts
const numbers: readonly number[] = [1, 2, 3];
const newNumbers = [...numbers, 4]; // Create a new array with the same elements plus a new element.
```

In this modified example, we define a constant variable `numbers` of type `readonly number[]` with three elements. We then create a new variable `newNumbers` by using the spread operator (`...`) to copy all the elements of `numbers` into a new array, and add a new element (`4`) to the end of the new array.

By using the `ReadonlyArray<T>` type and creating copies of arrays when we need to modify them, we can enforce immutability in our code and prevent unexpected changes to our data structures. This can help us write more robust and maintainable code over time.

## **41. How can you use TypeScript's never type to represent unreachable code?**

In TypeScript, you can use the `never` type to represent unreachable code. The `never` type is a bottom type that represents a value that never occurs. It's often used for functions or expressions that should never return.

Here's an example:

```ts
function throwException(message: string): never {
  throw new Error(message);
}
```

In this example, we define a function `throwException` that takes a `message` parameter of type `string` and returns `never`. Inside the function, we use the `throw` statement to throw an error with the given message. Since the `throw` statement never returns, the function's return type is `never`.

We can also use the `never` type to narrow down other types in conditional statements or switches:

```ts
type Pet = Dog | Cat;

interface Dog {
  name: string;
  breed: string;
}

interface Cat {
  name: string;
  color: string;
}

function printPet(pet: Pet) {
  switch (pet.kind) {
    case "dog":
      console.log(`${pet.name} is a ${pet.breed} dog.`);
      break;
    case "cat":
      console.log(`${pet.name} is a ${pet.color} cat.`);
      break;
    default:
      const assertNever: never = pet; // This line will cause a compile-time error if there are any other variants of the Pet type.
  }
}
```

In this modified example, we define two interfaces `Dog` and `Cat` as before, but also a `Pet` type that is a union of these two interfaces. We define a function `printPet` that takes a parameter of type `Pet`.

Inside the function, we use a `switch` statement to determine which variant of the algebraic data type `Pet` we are dealing with. We handle the `Dog` and `Cat` cases separately, but we also add a `default` case where we assign the `pet` object to a variable of type `never`. This ensures that the `switch` statement covers all possible variants of the `Pet` type, and will cause a compile-time error if there are any other variants added later.

By using the `never` type to represent unreachable code, we can write more robust and maintainable code that is less prone to errors and bugs.

## **42. How can you use TypeScript's Exclude and Extract utility types to filter types?**

In TypeScript, you can use the `Exclude` and `Extract` utility types to filter types based on certain criteria.

The `Exclude<T, U>` type is a built-in utility type that excludes all types in `U` from `T`. Here's an example:

```ts
type Animal = "dog" | "cat" | "bird";
type DomesticAnimal = "dog" | "cat";

type WildAnimal = Exclude<Animal, DomesticAnimal>; // WildAnimal is "bird"
```

In this example, we define a type `Animal` that is a union of three string literal types. We also define a type `DomesticAnimal` that is a union of two of these types.

We then create a new type `WildAnimal` by using the `Exclude<T, U>` utility type to exclude all types in `DomesticAnimal` from `Animal`. The resulting type is a new union of the remaining types (`"bird"`).

The `Extract<T, U>` type is another built-in utility type that extracts all types in `U` from `T`. Here's an example:

```ts
interface Person {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  breed: string;
}

interface Cat {
  name: string;
  color: string;
}

type Pet = Dog | Cat;

type Nameable = Extract<Pet, { name: string }>; // Nameable is Dog | Cat
```

In this example, we define three interfaces `Person`, `Dog`, and `Cat`, each with their own set of properties. We also define a type `Pet` that is a union of `Dog` and `Cat`.

We then create a new type `Nameable` by using the `Extract<T, U>` utility type to extract all types in `Pet` that have a property named `name` of type `string`. The resulting type is a new union of the remaining types (`Dog` and `Cat`).

By using the `Exclude` and `Extract` utility types, we can write more expressive and concise code that filters types based on specific criteria. This can help us avoid code duplication and improve the readability of our code.

## **43. What are the differences between covariant and contravariant types in TypeScript?**

In TypeScript, covariant and contravariant types are related to the relationship between two types that have a hierarchical structure. Covariance and contravariance describe how subtyping (or hierarchy) of two types is related, and how they can be converted or derived from each other.

Covariant types preserve the ordering of types in subtype relationships. That is, if `A` is a subtype of `B`, then a function that returns `A` can be substituted for a function that returns `B`. This applies to return types of functions and read-only properties of an object type.

Contravariant types reverse the ordering of types in subtype relationships. That is, if `A` is a subtype of `B`, then a function that takes an argument of type `B` can be substituted for a function that takes an argument of type `A`. This applies to parameter types of functions and write-only properties of an object type.

Here's an example that illustrates the difference:

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

function printName(animal: Animal): void {
  console.log(animal.name);
}

function printBreed(dog: Dog): void {
  console.log(dog.breed);
}

printName({ name: "Fido", breed: "labrador" }); // OK, prints "Fido"
printBreed({ name: "Fido", breed: "labrador" }); // Error, Argument of type '{ name: string; breed: string; }' is not assignable to parameter of type 'Dog'.
```

In this example, we define two interfaces `Animal` and `Dog`, where `Dog` extends `Animal` by adding a `breed` property. We also define two functions `printName` and `printBreed` that take parameters of types `Animal` and `Dog`, respectively, and print out their respective properties.

We then try to call both functions with an object that has both a `name` and `breed` property. The call to `printName` succeeds, because `Animal` is a supertype of `Dog`, so a `Dog` object can be substituted for an `Animal` object. However, the call to `printBreed` fails, because `Dog` is a subtype of `Animal`, so an `Animal` object cannot be substituted for a `Dog` object.

By understanding the differences between covariance and contravariance, we can write more expressive and type-safe code that correctly handles subtyping relationships between different types.

## **44. How can you use TypeScript's keyof and lookup types to create type-safe APIs?**

In TypeScript, you can use the `keyof` operator and lookup types to create type-safe APIs. The `keyof` operator allows you to extract the keys of an object as a union of string literal types, while lookup types allow you to use these keys to access properties of objects with type safety.

Here's an example:

```ts
interface Person {
  name: string;
  age: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "John", age: 30 };
const name = getProperty(person, "name"); // Type is string
const age = getProperty(person, "age"); // Type is number
const invalid = getProperty(person, "invalid"); // Error, Argument of type '"invalid"' is not assignable to parameter of type '"name" | "age"'.
```

In this example, we define an interface `Person` with two properties: `name` of type `string` and `age` of type `number`. We also define a function `getProperty` that takes two parameters: an object `obj` of type `T`, and a `key` parameter of type `K` which is a union of string literal types representing the keys of `T`.

The `getProperty` function returns the value of the property of `obj` corresponding to the `key` parameter. By using the `keyof` operator and the generic `K` type parameter, we ensure that the `key` parameter is a valid key of `T`, and thus can be used to access the corresponding property of `obj` with type safety.

In the example above, we call the `getProperty` function twice with different keys (`"name"` and `"age"`) and get the expected results. We also try to call it with an invalid key (`"invalid"`) and get a compile-time error.

By using the `keyof` operator and lookup types, we can create type-safe APIs that provide better code completion, catch errors at compile time, and make our code more robust and maintainable.

## **45. How can you use conditional types to create more flexible type definitions in TypeScript?**

In TypeScript, you can use conditional types to create more flexible type definitions that depend on some runtime condition. Conditional types allow you to define a type based on a condition that is only known at runtime.

Here's an example:

```ts
type Person = { name: string; age: number };
type Pet = { name: string; breed: string };

type Name<T> = T extends Person ? string : T extends Pet ? string : never;

type PersonName = Name<Person>; // Type is string
type PetName = Name<Pet>; // Type is string
type InvalidName = Name<number>; // Type is never
```

In this example, we define two interfaces `Person` and `Pet`, each with their own set of properties. We also define a generic type `Name<T>` that takes a single type parameter `T`.

We then use the conditional type operator `extends` to check if `T` extends either `Person` or `Pet`. If it does, we return the type of the `name` property (`string`), otherwise we return `never`.

We create three new types by applying the `Name<T>` type to `Person`, `Pet`, and `number`. We get a `string` type for `Person` and `Pet`, but a `never` type for `number`.

By using conditional types, we can create more flexible type definitions that can handle different types based on runtime conditions. This can be particularly useful in cases where we need to write generic code that works with multiple types, but still needs to enforce certain constraints on those types.

## **46. What are the differences between synchronous and asynchronous type checking in TypeScript?**

In TypeScript, there are two modes of type checking: synchronous and asynchronous.

Synchronous type checking is the default mode in TypeScript. In synchronous mode, the compiler checks the types of your code as it is compiled, and any errors are reported immediately. Synchronous type checking can be fast, but if you have a large project with many files, type checking can take a long time and slow down your development workflow.

Asynchronous type checking is an optional feature that allows the TypeScript compiler to perform type checking in the background while you continue to work on your code. Asynchronous type checking can be much faster than synchronous type checking for large projects, because it allows you to continue working on other parts of your code while the type checker runs in the background. However, there may be a delay between when you make changes to your code and when type checking errors are reported.

To enable asynchronous type checking, you can use the `--incremental` flag when you compile your TypeScript code. This tells the compiler to keep track of which files have changed since the last compilation, and only re-type check those files. You can also use an IDE or text editor that supports asynchronous type checking, such as Visual Studio Code.

It's important to note that both synchronous and asynchronous type checking are still subject to limitations. The TypeScript compiler cannot catch all possible errors in your code, and some errors may only be caught at runtime. Additionally, certain JavaScript features, such as dynamic imports and some forms of type casting, may not be checked by the TypeScript compiler. It's always a good idea to write tests and perform thorough manual testing to ensure the correctness of your code, regardless of which type checking mode you use.

## **47. How can you use TypeScript's Object and Function utility types to manipulate object and function types?**

In TypeScript, there are two built-in utility types that can be used to manipulate object and function types: `Object` and `Function`.

The `Object` utility type is a built-in type in TypeScript that represents any non-primitive type. It can be used to create generic types that accept any object type, such as:

```ts
type AnyObject = Object;
type MyObject<T extends AnyObject> = {
  [K in keyof T]: string;
};
```

In this example, we define an interface `AnyObject` as the `Object` type. We then use the `MyObject` type to create a new generic object type that accepts any object type, and maps its keys to `string`.

The `Function` utility type is a built-in type in TypeScript that represents any JavaScript function. It can be used to create generic types that accept any function type, such as:

```ts
type AnyFunction = Function;
type MyFunction<T extends AnyFunction> = (
  arg: Parameters<T>[0]
) => ReturnType<T>;
```

In this example, we define an interface `AnyFunction` as the `Function` type. We then use the `MyFunction` type to create a new generic function type that accepts any function type, and returns its return type.

We also use the `Parameters` and `ReturnType` utility types to extract the parameter and return types of the input function type.

By using the `Object` and `Function` utility types in combination with other TypeScript features like generics and mapped types, we can write more expressive and flexible code that can handle a wider variety of object and function types.

## **48. How can you use TypeScript's ThisType marker to specify the context of a function?**

In TypeScript, the `ThisType` marker can be used to specify the context of a function. The `ThisType<T>` type is a built-in utility type that allows you to specify the type of `this` in a function.

Here's an example:

```ts
interface Person {
  name: string;
  age: number;
  greet(): void;
}

function logName(this: Person): void {
  console.log(this.name);
}

const person: Person = { name: "John", age: 30, greet: logName };
person.greet(); // Output: "John"
```

In this example, we define an interface `Person` with three properties: `name` of type `string`, `age` of type `number`, and `greet` which is a method that returns `void`. We also define a function `logName` that outputs the `name` property of its `this` parameter.

We then create an object `person` that implements the `Person` interface, and set its `greet` method to `logName`. When we call the `greet` method on the `person` object, it calls the `logName` function with `this` as the `person` object. Thus, the output is `"John"`, the value of the `name` property of the `person` object.

By using the `ThisType` marker, we can specify the context of a function to ensure that it is called with the correct `this` parameter. This can help prevent errors caused by incorrect use of `this`, and make our code more robust and maintainable.

## **49. How can you use TypeScript's keyof operator to iterate over an object's keys at compile time?**

In TypeScript, the `keyof` operator can be used to iterate over an object's keys at compile time. The `keyof` operator returns a union of string literal types representing the keys of an object.

Here's an example:

```ts
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // Type is "name" | "age"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "John", age: 30 };
for (const key in person) {
  const value = getProperty(person, key); // Type is string | number
}
```

In this example, we define an interface `Person` with two properties: `name` of type `string` and `age` of type `number`. We also define a generic function `getProperty` that takes two parameters: an object `obj` of type `T`, and a `key` parameter of type `K` which is a union of string literal types representing the keys of `T`.

We create a new type `PersonKeys` by applying the `keyof` operator to the `Person` interface. This gives us a union of string literal types representing the keys of the `Person` interface.

We then create an object `person` that implements the `Person` interface, and use a `for...in` loop to iterate over its keys. In each iteration, we call the `getProperty` function with the `person` object and the current key, and assign the resulting value to a variable `value`.

By using the `keyof` operator to iterate over an object's keys at compile time, we can write more type-safe and maintainable code that works with dynamic data structures. However, it's important to note that `for...in` loops do not guarantee any particular order of iteration over an object's keys.

## **50. How can you use TypeScript's ReturnType utility type to infer the return type of a function?**

In TypeScript, the `ReturnType` utility type can be used to infer the return type of a function. The `ReturnType<T>` type is a built-in utility type that returns the return type of a function `T`.

Here's an example:

```ts
function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>; // Type is number
```

In this example, we define a function `add` that takes two parameters of type `number`, and returns their sum as a value of type `number`.

We then create a new type `AddReturnType` by applying the `ReturnType` utility type to the `add` function. This gives us the return type of the `add` function, which in this case is `number`.

By using the `ReturnType` utility type, we can write more expressive and flexible code that can handle a wider variety of function types. This can be particularly useful in cases where we need to write generic code that works with multiple functions, but still needs to enforce certain constraints on their return types.
