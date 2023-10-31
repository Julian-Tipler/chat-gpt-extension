import "./App.css";
import { FormContainer } from "./components/Form";
import { Prompts } from "./components/Prompts";
import { Title } from "./components/Title";

const prompts = [
  {
    id: "123",
    name: "test prompt",
    text: "test text text text",
  },
  {
    id: "456",
    name: "test prompt 2",
    text: "test text text text 2",
  },
  {
    id: "789",
    name: "test prompt 3",
    text: "test text text text 3",
  },
];

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

function App() {
  return (
    <div className="main-container">
      <Title />
      <FormContainer />
      <Prompts prompts={prompts} />
    </div>
  );
}

export default App;
