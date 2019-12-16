import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' },
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febreo', 'Marzo', 'Abril'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {

    this.getData();
    this.escucharSocket();
    // setInterval( () => {

    //   const newData = [
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 )
    //   ];

    //   this.lineChartData = [
    //     { data: newData, label: 'Ventas' }
    //   ];

    // }, 3000);

  }

  getData() {
    this.http.get('http://localhost:3000/grafica').subscribe( (data: any) => this.lineChartData = data );
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe( (data: any) => {
      // console.log('Socket', data);
      this.lineChartData = data;
    });
  }

}
