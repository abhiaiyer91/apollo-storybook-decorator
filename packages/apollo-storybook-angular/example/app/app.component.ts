import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  salutation: string;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query hello {
            helloWorld
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.loading = result.loading
        this.salutation = result.data && result.data.helloWorld;
      });
  }
}
