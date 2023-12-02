import { ChangeDetectionStrategy, Component, Inject, inject, Injector, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksListComponentStore } from "./store/tasks-list.component-store";
import { debounceTime, distinctUntilChanged, filter, Observable } from "rxjs";
import { MIN_SEARCH_LENGTH } from "../../../tokens/min-search-length.token";
import { TasksItemComponent } from "../tasks-item/tasks-item.component";
import { Task } from "../../../models/tasks/task.model";
import { TuiButtonModule, TuiDialogContext, TuiDialogModule, TuiDialogService, TuiRootModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { TaskFormComponent } from "../task-form/task-form.component";
import { TaskFormValue } from "../../../models/payloads/tasks/forms/task-form-value";
import { TaskFormPopupComponent } from "../task-form-popup/task-form-popup.component";
import { Dialog } from "@angular/cdk/dialog";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";

@Component({
    selector: "app-tasks-list",
    standalone: true,
    imports: [CommonModule, TasksItemComponent, TuiButtonModule, TuiInputModule, ReactiveFormsModule, TaskFormPopupComponent, TaskFormComponent, TuiDialogModule],
    templateUrl: "./tasks-list.component.html",
    styleUrl: "./tasks-list.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TasksListComponentStore],
})
export class TasksListComponent implements OnInit {
    private readonly tasksListComponentStore: TasksListComponentStore = inject(TasksListComponentStore);
    private readonly minSearchValueLength: number = inject(MIN_SEARCH_LENGTH);
    private readonly authService: AuthService = inject(AuthService);
    private readonly dialog: Dialog = inject(Dialog);

    private currentUserId?: number;

    public readonly tasks$: Observable<Task[]> = this.tasksListComponentStore.tasks$;
    public readonly searchControl: FormControl<string> = new FormControl<string>("", { nonNullable: true });


    public ngOnInit(): void {
        this.currentUserId = this.authService.getCurrentUserInfo()!.id;
        this.tasksListComponentStore.loadTasks(this.searchControl.valueChanges.pipe(
            debounceTime(500),
            filter((searchValue: string) => searchValue.length > this.minSearchValueLength),
            distinctUntilChanged(),
        ));
    }

    public onCreateTask(task: TaskFormValue): void {
        this.tasksListComponentStore.createTask({
            userId: this.currentUserId!,
            ...task
        });
    }

    public onUpdateTask(taskId: Task["id"], task: TaskFormValue): void {
        this.tasksListComponentStore.updateTask({
            id: taskId,
            userId: this.currentUserId!,
            ...task
        });
    }

    public openTaskFormPopup(task?: Task) {
        const dialogRef = this.dialog.open<TaskFormValue>(TaskFormPopupComponent, {
            width: "500px",
            maxWidth: "95dvw",
            data: task
        });

        dialogRef.closed.subscribe((taskFormValue: TaskFormValue | undefined) => {
            console.log({ taskFormValue });
            if (taskFormValue) {
                task
                    ? this.onUpdateTask(task.id, taskFormValue)
                    : this.onCreateTask(taskFormValue);
            }
        });
    }

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
    ) {}

    showDialog(test: PolymorpheusContent<TuiDialogContext>): void {
        console.log('showDialog');
        this.dialogs.open(test, {
            size: 's',
            closeable: true,
            dismissible: true,
            label: 'Dialog',
            data: 'test',
        }).subscribe({
            next: data => {
                console.info(`Dialog emitted data = ${data}`);
            },
            complete: () => {
                console.info('Dialog closed');
            },
        });
    }
}
