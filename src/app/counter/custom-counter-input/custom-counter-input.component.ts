import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changechannelname, customCounter } from '../state/counter.action';
import { getChannelName} from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value: any;
  channelName!: string;
  constructor(private store: Store<AppState>) { }
  onadd() {
    this.store.dispatch(customCounter({ count: +this.value }))
  }
  ngOnInit(): void {
    this.store.select(getChannelName).subscribe((channelName) => {
      this.channelName = channelName;
    })
  }
  changechannelname() {
    this.store.dispatch(changechannelname())
  }
}
