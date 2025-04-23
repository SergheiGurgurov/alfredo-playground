import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type editor } from 'monaco-editor';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { alfredo } from '../lib/alfredo';
import { ResizeablePanelDirective } from './components/resiziable-panel.directive';

@Component({
  selector: 'app-root',
  imports: [MonacoEditorModule, FormsModule, ResizeablePanelDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  editorOptions: editor.IStandaloneEditorConstructionOptions = {
    theme: 'vs-dark',
    automaticLayout: true,
    language: 'alfredo-lang',
  };

  code: string = [
    `/* crea una variabile */`,
    `var nome = "giorgio"`,
    ``,
    `/* stampa un valore */`,
    `stampa("ciao " + nome)`,
    ``,
    `/* se...altrimenti... */`,
    `se (nome == "giorgio") {`,
    `  stampa("sei giorgio")`,
    `} altrimenti {`,
    `  stampa("sei un altro")`,
    `}`,
    ``,
    `/* funzioni */`,
    `var saluta = fn(nome) {`,
    `  stampa("ciao " + nome)`,
    `}`,
    ``,
    `/*`,
    `Psst.. puoi usare la funzione "chiedi"`,
    `per ricevere input dall'utente:`,
    ``,
    `var nome = chiedi("come ti chiami?")`,
    `*/`,
  ].join('\n');
  codeOutput: string = '';
  codeExecutionStatus: ECodeExecutionStatus = ECodeExecutionStatus.NONE;
  ECodeExecutionStatus = ECodeExecutionStatus;

  constructor() {
    alfredo.addEventListener('alfredo.print', (e) => {
      const event = e as CustomEvent;
      this.codeOutput += event.detail + '\n';
    });
  }

  runCode() {
    this.codeExecutionStatus = ECodeExecutionStatus.RUNNING;
    this.codeOutput = '';
    console.log('execution result: ', alfredo.execute(this.code));
    this.codeExecutionStatus = ECodeExecutionStatus.DONE;
  }
}

enum ECodeExecutionStatus {
  NONE,
  RUNNING,
  DONE,
  ERROR,
}
