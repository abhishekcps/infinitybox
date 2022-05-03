import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import * as XLSX from 'xlsx';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexFill,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexPlotOptions
} from 'ng-apexcharts';

export type RevenueStatChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  fill: ApexFill;
};

type AOA = any[][];


@Component({
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public RevenueStatChartOptions!: Partial<RevenueStatChartOptions>;

    public config: PerfectScrollbarConfigInterface = {};

    subtitle: string;
    constructor() {
        this.subtitle = 'This is some text within a card block.';
        

    this.RevenueStatChartOptions = {
      series: [
          {
              name: 'Product A',
              data: [0, 2, 3, 0, 13, 1, 4, 1]
          },
          {
              name: 'Product B',
              data: [0, 4, 0, 4, 0, 4, 0, 4]
          }
      ],
      chart: {
          fontFamily: 'Nunito Sans,sans-serif',
          height: 370,
          type: 'area',
          toolbar: {
              show: false
          }
      },
      dataLabels: {
          enabled: false
      },
      markers: {
          size: 3,
          strokeColors: "transparent"
      },
      stroke: {
          curve: 'smooth',
          width: '1',
      },
      colors: ['#009efb', '#55ce63'],
      legend: {
          show: false,
      },
      grid: {
          show: true,
          strokeDashArray: 3,
          borderColor: 'rgba(0,0,0,0.1)',
          xaxis: {
              lines: {
                  show: true
              }
          },
          yaxis: {
              lines: {
                  show: true
              }
          }
      },
      fill: {
          type: 'gradient',
          gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.5,
              opacityTo: 0.3,
              stops: [0, 50, 100]
          },
      },
      xaxis: {
          type: 'category',
          categories: [
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep'
          ],
          labels: {
              style: {
                  colors: '#a1aab2'
              }
          }
      },
      yaxis: {
          labels: {
              style: {
                  colors: '#a1aab2'
              }
          }
      },
      tooltip: {
          theme: 'dark'
      }
  };

      
    }

    data: AOA = [[1, 2], [3, 4]];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
  
    onFileChange(evt: any) {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(this.data);
      };
      reader.readAsBinaryString(target.files[0]);
    }
  
  
    export(): void {
      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }

    ngAfterViewInit() {
    //   for(let i=0;i<this.data.length;i++){
    //     this.RevenueStatChartOptions = {
        
    //      series: [
    //          {
    //              name: 'Product '+i,
    //              data: this.data[i]
    //          },
    //      ],
    //      chart: {
    //          fontFamily: 'Nunito Sans,sans-serif',
    //          height: 370,
    //          type: 'area',
    //          toolbar: {
    //              show: false
    //          }
    //      },
    //      dataLabels: {
    //          enabled: false
    //      },
    //      markers: {
    //          size: 3,
    //          strokeColors: "transparent"
    //      },
    //      stroke: {
    //          curve: 'smooth',
    //          width: '1',
    //      },
    //      colors: ['#009efb', '#55ce63'],
    //      legend: {
    //          show: false,
    //      },
    //      grid: {
    //          show: true,
    //          strokeDashArray: 3,
    //          borderColor: 'rgba(0,0,0,0.1)',
    //          xaxis: {
    //              lines: {
    //                  show: true
    //              }
    //          },
    //          yaxis: {
    //              lines: {
    //                  show: true
    //              }
    //          }
    //      },
    //      fill: {
    //          type: 'gradient',
    //          gradient: {
    //              shade: 'light',
    //              type: "horizontal",
    //              shadeIntensity: 0.5,
    //              gradientToColors: undefined,
    //              inverseColors: true,
    //              opacityFrom: 0.5,
    //              opacityTo: 0.3,
    //              stops: [0, 50, 100]
    //          },
    //      },
    //      xaxis: {
    //          type: 'category',
    //          categories: [
    //              'Feb',
    //              'Mar',
    //              'Apr',
    //              'May',
    //              'Jun',
    //              'Jul',
    //              'Aug',
    //              'Sep'
    //          ],
    //          labels: {
    //              style: {
    //                  colors: '#a1aab2'
    //              }
    //          }
    //      },
    //      yaxis: {
    //          labels: {
    //              style: {
    //                  colors: '#a1aab2'
    //              }
    //          }
    //      },
    //      tooltip: {
    //          theme: 'dark'
    //      }
    //  };
    // }
     
     }
}
