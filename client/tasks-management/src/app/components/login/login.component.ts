import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { catchError, EMPTY, take } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiErrorModule, TuiHintModule } from "@taiga-ui/core";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiHintModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiInputPasswordModule, TuiButtonModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef)


    public loading: boolean = false;

    public loginForm = new FormGroup({
        email: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        }),
    });

    public login(): void {
        if (this.loginForm.invalid) {
            return;
        }


        this.loading = true;
        this.authService.login({
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error("Error when  trying to login", error);
                    return EMPTY;
                }),
                take(1),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.router.navigate(["/"]));
    }

}
