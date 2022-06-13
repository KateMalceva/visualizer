/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples-by-sex-and-age',
  templateUrl: './examples-by-sex-and-age.component.html',
  styleUrls: ['./examples-by-sex-and-age.component.scss']
})
export class ExamplesBySexAndAgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/

import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
//import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

@Component({
  selector: 'app-examples-by-sex-and-age',
  templateUrl: './examples-by-sex-and-age.component.html',
  styleUrls: ['./examples-by-sex-and-age.component.scss']
})

export class ExamplesBySexAndAgeComponent {
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId =[], private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          arrangeTooltips: false
        })
      );
      
      // Use only absolute numbers
      chart.getNumberFormatter().set("numberFormat", "#.#s");
      
      chart.get("colors")?.set("colors", [
        am5.color(0x8067dc),
        am5.color(0xdc67ce)
      ]);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
      
      // Data
      let data = [
        {
          age: "61+",
          male: -2,
          female: 6
        },
        {
          age: "51-60",
          male: -7,
          female: 8
        },
        {
          age: "41-50",
          male: -7,
          female: 16
        },
        {
          age: "31-40",
          male: -53,
          female: 52
        },
        {
          age: "21-30",
          male: -86,
          female: 90
        },
        {
          age: "11-20",
          male: -25,
          female: 22
        },
        {
          age: "<10",
          male: 0,
          female: 0
        }
      ];
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age",
          renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
          })
        } as any)
      );
      
      yAxis.data.setAll(data);
      
      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {})
        } as any)
      );
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function createSeries(field: any, labelCenterX: any, pointerOrientation: any, rangeValue: any) {
        let series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "age",
            sequencedInterpolation: true,
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: pointerOrientation,
              labelText: "{categoryY}: {valueX}"
            })
          })
        );
      
        series.columns.template.setAll({
          height: am5.p100,
          
        });
      
        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerY: am5.p50,
              text: "{valueX}",
              populateText: true,
              centerX: labelCenterX
            })
          });
        });
      
        series.data.setAll(data);
        series.appear();
      
        let rangeDataItem = xAxis.makeDataItem({
          value: rangeValue
        });
        
        xAxis.createAxisRange(rangeDataItem);
        rangeDataItem.get("grid")?.setAll({
          strokeOpacity: 1,
          stroke: series.get("stroke")
        });
      
        let label = rangeDataItem.get("label");
        label?.setAll({
          text: field.toUpperCase(),
          fontSize: "1.1em",
          fill: series.get("stroke"),
          paddingTop: 10,
          isMeasured: false,
          centerX: labelCenterX
        });
        label?.adapters.add("dy", function() {
          return -chart.plotContainer.height();
        });
      
        return series;
      }
      
      createSeries("male", am5.p100, "right", -50);
      createSeries("female", 0, "left", 50);
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
      }));
      cursor.lineY.set("forceHidden", true);
      cursor.lineX.set("forceHidden", true);
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        dataSource: chart
      });
      
      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}

