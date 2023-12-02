import { Routes } from "@angular/router";
import { TasksListComponent } from "./components/tasks/tasks-list/tasks-list.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { authorizedGuard } from "./guards/authorized.guard";
import { noAuthorizedGuard } from "./guards/no-authorized.guard";
import { TasksListWrapperComponent } from "./components/tasks/tasks-list-wrapper/tasks-list-wrapper.component";

export const routes: Routes = [
    {
        path: "registration",
        pathMatch: "full",
        component: RegistrationComponent,
        canActivate: [noAuthorizedGuard],
    },
    {
        path: "login",
        pathMatch: "full",
        component: LoginComponent,
        canActivate: [noAuthorizedGuard],
    },
    {
        path: "tasks",
        pathMatch: "full",
        component: TasksListWrapperComponent,
        canActivate: [authorizedGuard],
    },
    {
        path: "**",
        redirectTo: "/tasks",
    }
];
