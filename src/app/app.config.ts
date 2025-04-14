import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideMonacoEditor({
      defaultOptions: {
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        theme: 'vs-dark',
        padding: {
          top: 20,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      requireConfig: {
        paths: {
          vs: window.location.origin + '/alfredo-playground' + '/assets/monaco/min/vs',
        },
      },
    }),
  ],
};
