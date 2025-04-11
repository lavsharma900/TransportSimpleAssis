import { Component } from '@angular/core';

interface TripSegment {
  start: string;
  end: string;
  level: number;
  continued: boolean;
  sameRoute: boolean;
  arrow: boolean;
  shortStart: string;
  shortEnd: string;
  color: string;
  d: string;
  stroke: string;
  mend: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  startPoint = '';
  endPoint = '';
  trips: TripSegment[] = [];

  addTrip() {
    const shortStart = this.startPoint.trim().substring(0, 3).toUpperCase();
    const shortEnd = this.endPoint.trim().substring(0, 3).toUpperCase();

    const newTrip: TripSegment = {
      start: this.startPoint.trim(),
      end: this.endPoint.trim(),
      level: 1,
      continued: false,
      sameRoute: false,
      arrow: false,
      shortStart,
      shortEnd,
      color: '#5c6bc0',
      d: "M0 0 C 0 0, 0 0, 0 0",
      stroke: '#ffb74d',
      mend: ""
    };

    const lastTrip = this.trips[this.trips.length - 1];
    const secondLastTrip = this.trips[this.trips.length - 2];

    if (lastTrip) {
      // Check if current trip continues from previous
      newTrip.continued = lastTrip.end === newTrip.start;
      
      // Check if consecutive same route
      newTrip.sameRoute = lastTrip.start === newTrip.start && 
                          lastTrip.end === newTrip.end;

      if (newTrip.sameRoute) {
        lastTrip.level = 2;
        lastTrip.stroke = '#595fab'
        // debugger
        // lastTrip.d = 'M0 0 C 50 15, 100 -80, 150 -55'
        lastTrip.d = 'M0 0 C 0 0, 0 0, 150 0'
        if(this.trips.length > 1) {
          lastTrip.level == secondLastTrip.level ? secondLastTrip.d = 'M0 0 C 0 0, 0 0, 150 0' : secondLastTrip.d = 'M0 0 C 50 15, 100 -80, 150 -55'
        }
        newTrip.level = 2;
        newTrip.color = '#a0a0a0';
      } else if (newTrip.continued) {
        lastTrip.level == 2 ? lastTrip.d = 'M0 0 C 50 -15, 100 80, 150 55' : lastTrip.d = 'M0 0 C 0 0, 0 0, 150 0'
        lastTrip.stroke = '#0283e5'
        newTrip.color = '#0283e5';
        // lastTrip.d = "M0 0 C 0 0, 0 0, 150 0"
      } else {
        lastTrip.stroke = '#2196f3'
        lastTrip.level == 2 ? lastTrip.d = 'M0 0 C 50 -15, 100 80, 150 55' : lastTrip.d = 'M0 0 C 0 0, 0 0, 150 0'
        lastTrip.mend = 'url(#arrow)'
        newTrip.color = '#fcce89';
        newTrip.arrow = false;
      }
    }

    this.trips.push(newTrip);
    this.startPoint = '';
    this.endPoint = '';

    console.log(this.trips)
  }
}