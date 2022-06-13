import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examples-page',
  templateUrl: './examples-page.component.html',
  styleUrls: ['./examples-page.component.scss']
})
export class ExamplesPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToExampleBySexAndAge() {
    this.router.navigate(["/examples", "examples-by-sex-and-age"]);
  }

  goToExampleByPlatforms() {
    this.router.navigate(["/examples", "examples-by-platforms"]);
  }
}
