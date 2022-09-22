import './App.css';
import { Graphviz } from 'graphviz-react';

function App() {
  return (
    <div className="App">
      <Graphviz dot={`digraph {
  a -> b[label="0.2",weight="0.2",color=red,penwidth=3.0];
  a -> c[label="0.4",weight="0.4"];
  c -> b[label="0.6",weight="0.6"];
  c -> e[label="0.6",weight="0.6"];
  e -> e[label="0.1",weight="0.1"];
  e -> b[label="0.7",weight="0.7"];
  b -> e;
}`} />
    </div>
  );
}

export default App;
