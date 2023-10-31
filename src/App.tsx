import "./App.css";
import { FormContainer } from "./components/Form";
import { Prompts } from "./components/Prompts";
import { Title } from "./components/Title";
import { usePrompts } from "./contexts/PromptsContext";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

function App() {
  const { prompts } = usePrompts();

  return (
    <div className="main-container">
      <Title />
      <FormContainer />
      <Prompts prompts={prompts} />
    </div>
  );
}

export default App;
