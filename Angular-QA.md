# Design patterns commonly used in Angular

1.  Component-based architecture: Angular follows a component-based architecture, where each component represents a specific feature or behavior of an application. This pattern allows for better code organization, reusability, and flexibility.
2.  Dependency Injection: Angular extensively uses dependency injection (DI) to manage dependencies between components, services, and modules. DI is a pattern that allows for loose coupling between different parts of an application, making it easier to test and maintain.
3.  Observer pattern: Angular leverages the observer pattern through RxJS Observables to handle asynchronous data streams. Observables allow developers to subscribe to changes in data and update the UI accordingly.
4.  Singleton pattern: Angular uses singleton services to provide global access to shared functionality across the application. This pattern ensures that only one instance of a service is created and used throughout the application.
5.  Decorator pattern: Angular uses decorators extensively to add metadata to classes, fields, and methods. Decorators enhance the readability and maintainability of code by providing a way to modify behavior without changing the original implementation.
6.  Facade pattern: Angular's facade pattern provides a simplified interface to a complex subsystem of an application. This pattern makes it easier to use a set of related functionalities by encapsulating them behind a single API.

## Dependency injection (DI) in Angular

In Angular, dependency injection is a pattern used to manage dependencies between components, services, and modules. It allows for loose coupling between different parts of an application, making it easier to test and maintain.

When using DI in Angular, a class declares its dependencies in the constructor method. These dependencies are annotated with a decorator such as `@Injectable`, `@Inject`, or `@Optional` to specify how they should be injected. For example, consider the following code snippet:

```ts
import { Component } from "@angular/core";
import { MyService } from "./my-service";

@Component({
  selector: "app-root",
  template: "<h1>Hello, {{ message }}</h1>",
})
export class AppComponent {
  constructor(private myService: MyService) {}

  get message() {
    return this.myService.getMessage();
  }
}
```

In this example, the `AppComponent` depends on the `MyService` service. The `MyService` class has been marked with the `@Injectable` decorator to indicate that it can be injected into other classes. The `AppComponent`'s constructor takes an instance of `MyService` as an argument, which is then assigned to a private property of the same name.

Behind the scenes, Angular's DI system creates an instance of `MyService` and passes it to the constructor of `AppComponent`. The DI system is responsible for creating, managing, and injecting instances of services and other dependencies throughout the application.

The benefits of using DI in Angular include:

1.  Improved testability: By injecting dependencies into a class, they can easily be replaced with mock implementations during testing, allowing for more comprehensive unit tests.
2.  Modular design: DI promotes a modular architecture by separating concerns and making components and services highly reusable.
3.  Easier maintenance: By handling the creation and management of dependencies, DI reduces the amount of boilerplate code required and improves the readability and maintainability of the application.
4.  Loose coupling: By decoupling different parts of an application, DI makes it easier to replace or modify components without affecting the rest of the application.

## Singleton pattern in Angular

In Angular, the Singleton pattern is implemented through the use of services. A service is a class that can be injected into other components or services throughout an application, and Angular's DI system ensures that only a single instance of a service is created and shared.

To implement a service as a singleton in Angular, we need to add the `@Injectable` decorator to the service class. This tells Angular that this class can be injected into other classes, and that only one instance of the service should be created and shared throughout the application.

Here is an example of a simple service implemented as a singleton:

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MyService {
  private data: any[] = [];

  constructor() {}

  addData(data: any) {
    this.data.push(data);
  }

  getData(): any[] {
    return this.data;
  }
}
```

In this example, the `@Injectable` decorator is used to mark the `MyService` class as a singleton. The `providedIn` property is set to `'root'`, which means that the service is available throughout the entire application.

The `MyService` class has two methods, `addData()` and `getData()`, which allow other components or services to add or retrieve data to/from the `data` array.

When a component injects `MyService` using its constructor, Angular's DI system creates a single instance of `MyService` and shares it with all components that depend on it. For example:

```ts
import { Component } from "@angular/core";
import { MyService } from "./my-service";

@Component({
  selector: "app-root",
  template: `
    <button (click)="addData()">Add data</button>
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
  `,
})
export class AppComponent {
  data: any[];

  constructor(private myService: MyService) {
    this.data = myService.getData();
  }

  addData() {
    this.myService.addData({ name: "John", age: 25 });
  }
}
```

In this example, the `AppComponent` depends on `MyService`, and its constructor takes an instance of `MyService` as an argument. When the component is created, the `MyService` instance created by Angular's DI system is passed to the constructor and assigned to the `myService` property. The component then calls `myService.getData()` to retrieve the data and display it in the template.

By using the `@Injectable` decorator and relying on Angular's DI system, we can easily implement the Singleton pattern in Angular through the use of services.

## Facade pattern in Angular

The Facade pattern is a structural design pattern that provides a simplified interface to a complex subsystem of an application. It enables clients to use the subsystem more easily by hiding its complexity behind a unified API. In Angular, a common use case for the Facade pattern is to provide a simple interface that hides the details of complex or repetitive logic.

Here's an example of implementing the Facade pattern in Angular:

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public show(title: string, message: string): void {
    // Show notification using a third-party library or custom implementation
    console.log(`Notification shown: ${title} - ${message}`);
  }

  public hide(): void {
    // Hide notification using a third-party library or custom implementation
    console.log("Notification hidden");
  }
}

@Injectable({
  providedIn: "root",
})
export class NotificationFacade {
  constructor(private notificationService: NotificationService) {}

  public showSuccess(message: string): void {
    this.notificationService.show("Success", message);
  }

  public showError(message: string): void {
    this.notificationService.show("Error", message);
  }

  public hideNotification(): void {
    this.notificationService.hide();
  }
}
```

In this example, `NotificationService` represents a complex subsystem that handles the showing and hiding of notifications. The `NotificationFacade` class provides a simplified interface to this subsystem by encapsulating the complexity behind a single API.

The `showSuccess()`, `showError()`, and `hideNotification()` methods on the `NotificationFacade` class represent simplified versions of the methods provided by the `NotificationService`. These methods provide a unified interface for clients to show or hide notifications without having to know the details of the underlying implementation.

Clients can now use the `NotificationFacade` to show or hide notifications without having to worry about the complexities of the underlying subsystem. For example:

```ts
import { Component } from "@angular/core";
import { NotificationFacade } from "./notification-facade";

@Component({
  selector: "app-root",
  template: `
    <button (click)="showSuccess()">Show Success</button>
    <button (click)="showError()">Show Error</button>
    <button (click)="hideNotification()">Hide Notification</button>
  `,
})
export class AppComponent {
  constructor(private notificationFacade: NotificationFacade) {}

  showSuccess() {
    this.notificationFacade.showSuccess("This is a success message.");
  }

  showError() {
    this.notificationFacade.showError("This is an error message.");
  }

  hideNotification() {
    this.notificationFacade.hideNotification();
  }
}
```

In this example, the `AppComponent` injects the `NotificationFacade` service and calls its methods to show or hide notifications. By using the `NotificationFacade`, the client code becomes simpler, more readable, and easier to maintain.

By using the Facade pattern in Angular, we can simplify the usage of complex subsystems by providing a unified interface to their functionality. This can improve the readability, maintainability, and scalability of our applications.

# Most challenging questions in Angular

1.  How do you structure a large-scale Angular application for maintainability, scalability, and performance?
2.  How would you optimize the performance of an Angular application by reducing bundle size, lazy-loading modules, and using server-side rendering?
3.  Describe how you would create a custom form control component in Angular.
4.  Explain the differences between ngOnChanges, ngOnInit, ngDoCheck, and ngAfterViewInit lifecycle hooks in Angular.
5.  How would you implement internationalization (i18n) and localization (l10n) in an Angular application?
6.  Describe how you would handle authentication and authorization in an Angular application using JWT tokens or other similar mechanisms.
7.  How would you implement real-time data synchronization in an Angular application using web sockets or other similar technologies?
8.  What is AOT compilation in Angular, and how does it affect an application's performance?
9.  How would you implement server-side validation for forms in an Angular application?
10. How would you handle animations and transitions in an Angular application using Angular Animation API?
11. Describe how you would use observables to implement advanced features such as debouncing, throttling, and switchMap.
12. What is a resolver in Angular, and how would you use it to prefetch data for a route?
13. Explain how you would implement a reactive form using FormBuilder service in Angular.
14. How would you implement Error Handling in Angular and what are the best practices?
15. How would you implement Microfrontend Architecture in Angular?
