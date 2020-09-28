# ngrx-app
Sample app created with ngrx, can be used as boilerplate

@ngrx/store
Store is RxJS powered global state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular.

Key concepts
Actions describe unique events that are dispatched from components and services.
State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.
Selectors are pure functions used to select, derive and compose pieces of state.
State is accessed with the Store, an observable of state and an observer of actions.
Local state management
NgRx Store is mainly for managing global state across an entire application. In cases where you need to manage temporary or local component state, consider using NgRx ComponentStore.

Installation
Detailed installation instructions can be found on the Installation page.

Diagram
The following diagram represents the overall general flow of application state in NgRx.

NgRx State Management Lifecycle Diagram
Tutorial
The following tutorial shows you how to manage the state of a counter, and how to select and display it within an Angular component. Try the live example.

Generate a new project using StackBlitz live example.

Right click on the app folder in StackBlitz and create a new file named counter.actions.ts to describe the counter actions to increment, decrement, and reset its value.

src/app/counter.actions.ts
content_copy
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
Define a reducer function to handle changes in the counter value based on the provided actions.
src/app/counter.reducer.ts
content_copy
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
 
export const initialState = 0;
 
const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);
 
export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
Import the StoreModule from @ngrx/store and the counter.reducer file.
src/app/app.module.ts (imports)
content_copy
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
Add the StoreModule.forRoot function in the imports array of your AppModule with an object containing the count and the counterReducer that manages the state of the counter. The StoreModule.forRoot() method registers the global providers needed to access the Store throughout your application.
src/app/app.module.ts (StoreModule)
content_copy
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
 
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
 
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot({ count: counterReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
Create a new file called my-counter.component.ts in a folder named my-counter within the app folder that will define a new component called MyCounterComponent. This component will render buttons that allow the user to change the count state. Also, create the my-counter.component.html file within this same folder.
src/app/my-counter/my-counter.component.ts
content_copy
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
 
@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
})
export class MyCounterComponent {
  count$: Observable<number>
 
  constructor(private store: Store<{ count: number }>) {
    // TODO: This stream will connect to the current store `count` state
    this.count$ = store.select('count');
  }
 
  increment() {
    // TODO: Dispatch an increment action
  }
 
  decrement() {
    // TODO: Dispatch a decrement action
  }
 
  reset() {
    // TODO: Dispatch a reset action
  }
}
src/app/my-counter/my-counter.component.html
content_copy
<button (click)="increment()">Increment</button>

<div>Current Count: {{ count$ | async }}</div>

<button (click)="decrement()">Decrement</button>

<button (click)="reset()">Reset Counter</button>
Add the new component to your AppModule's declarations and declare it in the template:
src/app/app.component.html
content_copy
<app-my-counter></app-my-counter>
src/app/app.module.ts
content_copy
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
 
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
 
@NgModule({
  declarations: [AppComponent, MyCounterComponent],
  imports: [BrowserModule, StoreModule.forRoot({ count: counterReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
Inject the store into MyCounterComponent and connect the count$ stream to the store's count state. Implement the increment, decrement, and reset methods by dispatching actions to the store.
src/app/my-counter/my-counter.component.ts
content_copy
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
 
@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  count$: Observable<number>;
 
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
 
  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
}
And that's it! Click the increment, decrement, and reset buttons to change the state of the counter.

Let's cover what you did:

Defined actions to express events.
Defined a reducer function to manage the state of the counter.
Registered the global state container that is available throughout your application.
Injected the Store service to dispatch actions and select the current state of the counter.
