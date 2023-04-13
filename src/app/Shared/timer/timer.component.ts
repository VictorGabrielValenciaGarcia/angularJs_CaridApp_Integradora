import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  @Input() fechaFin = '';

  // Fechas a Comparar
  now: any;
  end: any;

  // Glosario de Terminos
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;

  // Valores a mostrar
  day: any;
  hours: any;
  minutes: any;
  clock: any;

  // Observador
  source = timer(0, 1000);

  constructor(){}

  ngOnInit(){

    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.fechaFin +' 00:00');
      this.showDate();
    });

  }
  
  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day) + 1;
    this.hours = Math.floor((distance % this._day) / this._hour) + 24;
    this.minutes = Math.floor((distance % this._hour) / this._minute) + 60;
  }

}
