import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../../models/tasks/task.model";

@Component({
    selector: "app-tasks-item",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./tasks-item.component.html",
    styleUrl: "./tasks-item.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksItemComponent {
    @Input({ required: true }) task!: Task;

    @Output() updateTask: EventEmitter<void> = new EventEmitter<void>();
}
