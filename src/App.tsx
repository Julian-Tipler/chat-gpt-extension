import "./App.css";
import { FormContainer } from "./components/Form";
import { Prompts } from "./components/Prompts";
import { Title } from "./components/Title";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

function App() {
  const unused = ""
  return (
    <div className="main-container">
      <Title />
      <FormContainer />
      <Prompts />
    </div>
  );
}

export default App;
