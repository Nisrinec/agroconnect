import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideApolloClient } from './app/graphql/apollo.config'; // adjust path if needed

bootstrapApplication(AppComponent, {
  providers: [provideApolloClient],
});
