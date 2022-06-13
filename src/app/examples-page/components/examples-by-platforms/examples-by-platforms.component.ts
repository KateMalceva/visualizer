/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples-by-platforms',
  templateUrl: './examples-by-platforms.component.html',
  styleUrls: ['./examples-by-platforms.component.scss']
})
export class ExamplesByPlatformsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/

import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
//import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

@Component({
  selector: 'app-examples-by-platforms',
  templateUrl: './examples-by-platforms.component.html',
  styleUrls: ['./examples-by-platforms.component.scss']
})

export class ExamplesByPlatformsComponent {
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

      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));
      
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll([
        { value: 0, category: "Windows Phone app" },
        { value: 6, category: "Mobile version" },
        { value: 0, category: "Application for Windows 10" },
        { value: 50, category: "Android app" },
        { value: 17, category: "Full version of the site" },
        { value: 0, category: "iPad app" },
        { value: 42, category: "iPhone app" }
      ]);
      
      
      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15
      }));
      
      legend.data.setAll(series.dataItems);
      
      
      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      series.appear(1000, 100);

      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        //dataSource: chart
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
