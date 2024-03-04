import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {
  // @Output() Increment = new EventEmitter<void>();
  // @Output() Decrement = new EventEmitter<void>();
  // @Output() Reset = new EventEmitter<void>();
  constructor(private store: Store<AppState>) { }

  increment() {
    // this.Increment.emit();
    this.store.dispatch(increment());
  }
  decrement() {
    // this.Decrement.emit();
    this.store.dispatch(decrement());
  }
  reset() {
    // this.Reset.emit();
    this.store.dispatch(reset())
  }
}
