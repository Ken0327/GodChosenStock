import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  providers: [StockService],
  // styleUrls: ['./stock.component.css']
})

export class StockComponent {
  comment: string;
  constructor(private stockService: StockService) {
    this.comment = "";
  }

  historydata = [[new Date, 0]];
  mychart = {
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

  ngOnInit() {
    console.log('start stock');
  }

  getstock() {
    console.log('test stock');
    this.stockService.getStock()
      .subscribe(res => {
        var result = JSON.stringify(res)
        console.log(result)
      });
    console.log('done.');
  }

  getstockhistory() {
    console.log('test stock history');
    var stock = { stockid: '0050', sdate: '2021-02-11', edate: '2021-03-11' };
    this.stockService.getStockHistory(stock)
      .subscribe(res => {
        var result = JSON.stringify(res)
        console.log(result)
        const obj = JSON.parse(result);
        this.comment = 'Result: ' + obj.result + ' Message: ' + obj.msg;
        var results = obj.content.Result;
        var chart = [[new Date, 0]];
        chart.pop();
        results.forEach(function (value: any) {
          var date = new Date(value.Date).toLocaleDateString("en-us")
          chart.push([date, value.ClosePrice]);
        });
        this.updateToDoChart(chart);
      });
    console.log('done.');
  }

  updateToDoChart(historyData: (number | Date)[][]){  
    this.mychart = {
      title: '0050 History Chart',
      type: ChartType.LineChart,
      data: historyData,
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
    // this.mychart.draw();
  }

  public chart = {
    title: '0050 History Chart',
    type: ChartType.LineChart,
    data: [
      [new Date(2010, 1), 0], [new Date(2010, 2), 1], [new Date(2010, 3), 2], [new Date(2010, 4), 4], [new Date(2010, 5), 7], [new Date(2010, 6), 3], [new Date(2010, 7), 2], [new Date(2010, 8), 5], [new Date(2010, 9), 6], [new Date(2010, 10), 10], [new Date(2010, 11), 23], [new Date(2010, 12), 17],
    ],
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
