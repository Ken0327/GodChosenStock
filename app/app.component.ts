import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import data from '../../data/history_0050.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showConfig = true;
  showHeroes = true;
  showStock = true;

  toggleStock() { this.showStock = !this.showStock; };
  toggleConfig() { this.showConfig = !this.showConfig; };
  toggleHeroes() { this.showHeroes = !this.showHeroes; };
  
  title = 'angular-ignite';

  historydata = [[new Date, 0]]

  ngOnInit() {
    this.historydata.pop()
    for (var i of data) {
      var year = parseInt(i.date.substring(0, 5));
      var month = parseInt(i.date.substring(5, 8));
      var day = parseInt(i.date.substring(8, 11));
      this.historydata.push([new Date(year, month, day), i.closingPrice]);
    }
  }

  public chart = {
    title: '0050 History Chart',
    type: ChartType.LineChart,
    data: this.historydata,
    columnNames: ['Date', 'Closing Price'],
    width: 1300,
    height: 700,
    options: {
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Closing Price'
      }
    }
  };
}