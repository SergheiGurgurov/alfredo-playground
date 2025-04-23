import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { routes } from './app.routes';
import type * as Monaco from 'monaco-editor';

declare global {
  interface Window {
    monaco: typeof Monaco;
  }
}

let vsPath;
if (typeof window !== 'undefined') {
  vsPath = window.location.origin + '/alfredo-playground' + '/assets/monaco/min/vs';
} else {
  vsPath = '';
}

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
      onMonacoLoad: () => {
        const monaco = window.monaco;
        monaco.languages.register({ id: 'alfredo-lang' });

        // Add language configuration for comments
        monaco.languages.setLanguageConfiguration('alfredo-lang', {
          comments: {
            blockComment: ['/*', '*/'],
          },
        });

        monaco.languages.setMonarchTokensProvider('alfredo-lang', {
          keywords: ['var', 'se', 'altrimenti', 'torna'],
          tokenizer: {
            root: [
              [/\/\*/, 'comment', '@comment'],
              [
                /[a-zA-Z_]\w*/,
                {
                  cases: {
                    '@keywords': 'keyword',
                    'vero|falso': 'boolean',
                    '@default': 'identifier',
                  },
                },
              ],
              [/".*?"/, 'string'],
              [/'.*?'/, 'string'],
              [/[0-9]+(\.[0-9]+)?/, 'number'],
            ],
            comment: [
              [/[^/*]+/, 'comment'],
              [/\*\//, 'comment', '@pop'],
              [/[/*]/, 'comment'],
            ],
          },
        });

        // Add keyboard binding for block comment
        monaco.editor.addKeybindingRule({
          keybinding: monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyA,
          command: 'editor.action.blockComment',
          when: 'editorTextFocus',
        });
      },
      requireConfig: {
        paths: {
          vs: vsPath,
        },
      },
    }),
    provideClientHydration(withEventReplay()),
  ],
};
