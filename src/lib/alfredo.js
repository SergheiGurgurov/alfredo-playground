/* --- Lib --- */

class Alfredo extends EventTarget {
  constructor() {
    super();
  }

  execute(code) {
    return executeAlfredo(code);
  }
}

export const alfredo = new Alfredo();

function initBrowser() {
  /* --- Wasm Integration --- */
  try {
    const go = new Go();
    WebAssembly.instantiateStreaming(fetch("assets/main.wasm"), go.importObject).then((result) => {
      go.run(result.instance);
    });
  } catch (err) {
    console.error(
      "Error loading wasm for the alfredo interpreter, make sure you included the wasm_exec.js file in your html and the file is in the same folder as the html file.",
    );
    console.error(err);
  }

  window.onAlfredoPrint = function (content) {
    alfredo.dispatchEvent(new CustomEvent("alfredo.print", { detail: content }));
  };
}

if (typeof window !== "undefined") {
  initBrowser();
}
