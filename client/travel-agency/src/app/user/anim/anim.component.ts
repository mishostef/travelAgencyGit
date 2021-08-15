import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';

@Component({
  selector: 'app-anim',
  templateUrl: './anim.component.html',
  styleUrls: ['./anim.component.scss'],
  animations: [

    trigger('focusPanel', [
      state('inactive', style({
        transform: 'translateX(-10px)'
      })),
      state('active', style({
        transform: 'translateX(+1300px)'
      })),
      transition('inactive => active', animate('5000ms ease-in')),
      transition('active => inactive', animate('5000ms ease-out'))
    ])
  ]
})
export class AnimComponent implements OnInit {
  state: string = 'inactive';
  constructor() { }


  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }
  ngOnInit() {
  }

}
