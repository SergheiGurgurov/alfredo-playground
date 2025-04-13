declare global {
  function onAlfredoPrint(content: string): void;
  function executeAlfredo(input: string): string;
  class Go {
    run(instance: WebAssembly.Instance): void;
    importObject: WebAssembly.Imports;
  }
}

declare class Alfredo extends EventTarget {
  constructor() {
    super();
  }

  public execute(code:string): string;
}

declare const alfredo: Alfredo;

export { alfredo };

