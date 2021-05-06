import { Component, OnInit } from '@angular/core';

import { Stock } from './chart';
import { StockService } from './chart.service';

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

  ngOnInit() {
    console.log('start stock');
    // this.getstock();
    // this.getstockhistory();
  }

  getstock(){
    console.log('test stock');
    this.stockService.getStock()
                .subscribe(res => {
                  var result = JSON.stringify(res)
                  console.log(result)
                  // this.stock$ = result
                });    
    console.log('done.');
  }

  getstockhistory(){
    console.log('test stock history');
    var stock = { stockid: '0050', sdate: '2021-03-01', edate: '2021-03-11' };
    this.stockService.getStockHistory(stock)
                .subscribe(res => {
                  var result = JSON.stringify(res)
                  console.log(result)
                  const obj = JSON.parse(result);
                  this.comment = result;
                  console.log(obj.content.StockID);
                  // console.log(obj.content.Result);
                  var results = obj.content.Result;
                  // results.forEach(element => {
                  //   console.log(element)
                  // });
                  // this.stockHistory$ = result
                });
    console.log('done.');
  }
}
