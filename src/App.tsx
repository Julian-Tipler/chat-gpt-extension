import { useEffect, useState } from "react";
import "./App.css";
import { FormContainer } from "./components/Form";
import { Prompts } from "./components/Prompts";
import { Title } from "./components/Title";
import { readPrompts } from "./services/readPrompts";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  useEffect(() => {
    readPrompts().then((prompts) => {
      setPrompts(prompts);
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
