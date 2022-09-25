import React, { useState, useEffect } from "react";
import { Graphviz } from "graphviz-react";
import { load, union } from "./api/automatonApi";

import "./App.css";
function App() {
  const [automatonOneFile, setAutomatonOneFile] = useState();
  const [automatonTwoFile, setAutomatonTwoFile] = useState();
  const [dotAutomatonOne, setDotAutomatonUne] = useState(`digraph {}`);
  const [dotAutomatonTwo, setDotAutomatonTwo] = useState(`digraph {}`);
  const [dotAutomatonOperation, setDotAutomatonOperation] =
    useState(`digraph {}`);

  function switch_to_notation(json) {
    const initial_state = json["initial_state"];
    let digraph = `digraph {
            initial[label = "", shape = "plaintext", style = "dotted"]
            initial -> ${initial_state}
            `;

    json["transitions"].forEach((element) => {
      const init_state = element["source"];
      const final_state = element["destiny"];
      const event_names = element["event"];

      if (json["acceptance_states"].indexOf(init_state) > -1) {
        digraph += `${init_state}[color ="red"]
            `;
      }
      if (json["acceptance_states"].indexOf(final_state) > -1) {
        digraph += `${final_state}[color ="red"]
            `;
      }
      digraph += `${init_state} -> ${final_state}[label="${event_names}"]
            `;
    });

    digraph += "}";

    return digraph;
  }

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
      setDotAutomatonUne(switch_to_notation(automaton));
    } else {
      setAutomatonTwoFile(file);
      setDotAutomatonTwo(switch_to_notation(automaton));
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
    setDotAutomatonOperation(switch_to_notation(automaton_union));
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
        <Graphviz dot={dotAutomatonOne} />
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

        <Graphviz dot={dotAutomatonTwo} />
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

        <Graphviz dot={dotAutomatonOperation} />
      </div>
    </div>
  );
}

export default App;
