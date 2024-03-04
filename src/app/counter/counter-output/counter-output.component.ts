import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getcounter } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  constructor(private store: Store<AppState>) { }
  counter!: number;

  ngOnInit(): void {
    this.store.select(getcounter).subscribe((counter)=>{
      this.counter=counter
    })
  }

}
