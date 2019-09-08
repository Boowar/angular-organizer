import { Component } from "@angular/core"
import { DateService } from "src/shared/date.services"

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"],
})
export class SelectorComponent {
  constructor(private dateService: DateService) {}

  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
}
