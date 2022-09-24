import "./App.css";
import { Graphviz } from "graphviz-react";

function App() {
  const graphics = document.querySelectorAll("svg");
  if (graphics.length) {
    console.log(graphics);
    graphics.array.forEach((element) => {
      console.log(element.width);
    });
  }

  return (
    <div className="App">
      <div>
        <div className="buttons">
          <button type="button">cargar</button>
        </div>
        <Graphviz
          dot={`digraph {
  "pep" [label="Nodo", fillcolor="lightblue", style="filled", shape="triangle"] 
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
          <button type="button">cargar</button>
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
      <div>
        <div className="buttons">
          <button type="button">unión</button>
          <button type="button">intersección</button>
          <button type="button">complemento uno</button>
          <button type="button">complemento dos</button>
          <button type="button">reverso</button>
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
