import { Component, OnInit } from "@angular/core"
import { DateService } from "src/shared/date.services"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { TasksService, Task } from "src/shared/tasks.services"
import { switchMap } from "rxjs/operators"

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup
  tasks: Task[] = []

  constructor(
    private dateServices: DateService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.dateServices.date
      .pipe(switchMap(value => this.tasksService.load(value)))
      .subscribe(tasks => {
        this.tasks = tasks
      })

    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
    })
  }

  submit() {
    const { title } = this.form.value

    const task: Task = {
      title,
      date: this.dateServices.date.value.format("DD-MM-YYYY"),
    }

    this.tasksService.create(task).subscribe(
      task => {
        this.tasks.push(task)
        this.form.reset()
      },
      err => console.error(err)
    )
  }
  remove(task: Task) {
    this.tasksService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      },
      err => console.error(err)
    )
  }
}
