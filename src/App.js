import React, { useState, useEffect } from "react";
import { Graphviz } from "graphviz-react";
import { load, union } from "./api/automatonApi";

import "./App.css";
function App() {
  const [automatonOneFile, setAutomatonOneFile] = useState();
  const [automatonTwoFile, setAutomatonTwoFile] = useState();
  const [dotAutomatonOne, setDotAutomatonUne] = useState();
  const [dotAutomatonTwo, setDotAutomatonTwo] = useState(`
  initial [label="", shape="plaintext", style="dotted"]
  B [color=green]
  initial -> A
  A -> A [label="y"]
  A -> B [label="x"] 
  B -> B [label="x,y"]
  `);

  async function loadAutomaton(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("quintuple", file);

    const { message, automaton } = await load(formData);

    if (!automaton) {
      alert(message);
      return;
    }

    if (event.target.name === "loadOne") {
      setAutomatonOneFile(file);
      //setDotAutomatonUne(automaton);
    } else {
      setAutomatonTwoFile(file);
      //setDotAutomatonTwo(automaton);
    }
  }

  async function unionOperation() {
    const body = new FormData();
    if (!automatonOneFile || !automatonTwoFile) {
      alert("datos incompletos para hacer unión");
      return;
    }
    body.append("quintuple_one", automatonOneFile);
    body.append("quintuple_two", automatonTwoFile);

    const { message, automaton_union } = await union(body);

    if (!automaton_union) {
      alert(message);
    }

    console.log(automaton_union);
  }

  useEffect(() => {
    console.log(automatonOneFile, automatonTwoFile);
  }, [automatonOneFile, automatonTwoFile]);

  return (
    <div className="App">
      <div>
        <div className="buttons">
          <button type="button">
            <label>
              cargar
              <input name="loadOne" type="file" onChange={loadAutomaton} />
            </label>
          </button>
        </div>
        <Graphviz
          dot={`digraph {
  "pep" [label="Nodo", fillcolor="lightblue", style="filled", shape="triangle"] 
  "p" [label="w", fillcolor="white", style="filled", shape="circle"] 
  sldjfsjdl -> b[label="0.2",weight="0.2",color=red,penwidth=3.0];
  "pep" -> c[label="0.4",weight="0.4"];
  c -> b[label="0.6",weight="0.6"];
  c -> e[label="0.6",weight="0.6"];
  e -> e[label="0.1",weight="0.1"];
  e -> b[label="0.7",weight="0.7"];
  b -> e;
  gg -> pep
}`}
        />
      </div>
      <div>
        <div className="buttons">
          <button type="button">
            <label>
              cargar
              <input name="loadTwo" type="file" onChange={loadAutomaton} />
            </label>
          </button>
        </div>

        <Graphviz dot={`digraph {${dotAutomatonTwo}}`} />
      </div>
      <div>
        <div className="buttons">
          <button type="button" onClick={unionOperation}>
            unión
          </button>
          <button type="button">intersección</button>
          <button type="button">complemento uno</button>
          <button type="button">complemento dos</button>
          <button type="button">reverso uno</button>
          <button type="button">reverso dos</button>
        </div>

        <Graphviz
          dot={`digraph {
  sldjfsjdl -> b[label="0.2",weight="0.2",color=red,penwidth=3.0];
  a -> c[label="0.4",weight="0.4"];
  c -> b[label="0.6",weight="0.6"];
  c -> e[label="0.6",weight="0.6"];
  e -> e[label="0.1",weight="0.1"];
  e -> b[label="0.7",weight="0.7"];
  b -> e;
}`}
        />
      </div>
    </div>
  );
}

export default App;
