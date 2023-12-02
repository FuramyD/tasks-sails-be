import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { BACKEND_URL } from "./tokens/backend-url.token";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { provideValidationErrorMessages } from "./providers/tui-providers/validation-error-messages.provider";
import { provideDateTimeValueTransformer } from "./providers/tui-providers/date/date-time-value-transformer.provider";
import { IsoStringDateTimeValueTransformer } from "./utils/tui-utils/transformers/iso-string-date-time-value.transformer";
import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiPortalModule } from "@taiga-ui/cdk";
import { TuiPushModule } from "@taiga-ui/kit";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            TuiRootModule,
            TuiDialogModule,
            TuiAlertModule,
            TuiPushModule,
        ),
        provideClientHydration(),
        provideAnimations(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        provideValidationErrorMessages({
            required: "This Field is required!",
            email: "Email is invalid!",
            minlength: "Should be at least 6 characters long!",
            maxlength: "Should be no more than 16 characters long!",
        }),
        provideDateTimeValueTransformer(IsoStringDateTimeValueTransformer),
        {
            provide: BACKEND_URL,
            useValue: "http://localhost:1337",
        },
    ]
};
