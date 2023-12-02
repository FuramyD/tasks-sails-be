import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiRootModule } from "@taiga-ui/core";
import { TasksListComponent } from "../tasks-list/tasks-list.component";

@Component({
  selector: 'app-tasks-list-wrapper',
  standalone: true,
    imports: [CommonModule, TuiRootModule, TasksListComponent],
  templateUrl: './tasks-list-wrapper.component.html',
  styleUrl: './tasks-list-wrapper.component.less'
})
export class TasksListWrapperComponent {

}
