import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Task } from "../../../models/tasks/task.model";
import { TaskDifficulty } from "../../../models/tasks/task-difficulty.enum";
import { isObject } from "../../../utils/types/type-guards/is-object";
import { TaskFormValue } from "../../../models/payloads/tasks/forms/task-form-value";
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiSelectModule
} from "@taiga-ui/kit";
import { TuiButtonModule, TuiDropdownModule, TuiErrorModule } from "@taiga-ui/core";
import { PortalHostComponent } from "../../../utils/tui-utils/portals/portal-host/portal-host.component";
import { TuiPortalModule } from "@taiga-ui/cdk";
import { Values } from "../../../utils/types/utility-types/values";

@Component({
    selector: "app-task-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiButtonModule, TuiSelectModule, TuiDataListWrapperModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiInputDateTimeModule, PortalHostComponent, TuiDropdownModule, TuiPortalModule],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.less",
})
export class TaskFormComponent implements OnInit {
    @Input() task?: Task;

    @Output() submitForm: EventEmitter<TaskFormValue> = new EventEmitter<TaskFormValue>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    public readonly Difficulty: Values<typeof TaskDifficulty>[] = Object.values(TaskDifficulty);

    public taskForm = new FormGroup({
        title: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(256)],
        }),
        description: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required],
        }),
        dueDate: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required],
        }),
        difficulty: new FormControl<Values<typeof TaskDifficulty>>(TaskDifficulty.EASY),
    });

    public ngOnInit(): void {
        this.setTaskFormValue(this.task);
    }

    public onFormSubmit(): void {
        this.submitForm.emit({
            ...this.taskForm.getRawValue(),
            completed: false,
        });
    }

    private setTaskFormValue(task?: Task) {
        if (isObject(task)) {
            this.taskForm.setValue({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                difficulty: task.difficulty,
            });
        }
    }
}
