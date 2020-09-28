import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './store/counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss'],
})
export class MyCounterComponent implements OnInit {
  count$: Observable<number>;

  constructor(private _store: Store<{ counterReducer: number }>) {
    this.count$ = _store.select('counterReducer');
  }

  increment() {
    this._store.dispatch(increment());
  }

  decrement() {
    this._store.dispatch(decrement());
  }

  reset() {
    this._store.dispatch(reset());
  }

  ngOnInit(): void {}
}
