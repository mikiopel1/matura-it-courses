import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';  // Importuj AppModule

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
