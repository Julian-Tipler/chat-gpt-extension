import { useEffect } from "react";
import "./App.css";
import { FormContainer } from "./components/Form";
import { Prompts } from "./components/Prompts";
import { Title } from "./components/Title";
import { readPrompts } from "./services/readPrompts";
import { usePrompts } from "./contexts/PromptsContext";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

function App() {
  const { prompts, addPrompts } = usePrompts();
  useEffect(() => {
    readPrompts().then((prompts) => {
      console.log("justfetched", prompts);
      addPrompts(prompts);
    });
  }, []);

  return (
    <div className="main-container">
      <Title />
      <FormContainer />
      <Prompts prompts={prompts} />
    </div>
  );
}

export default App;
