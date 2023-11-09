//
import { Title } from "../components/Title";
import { FormContainer } from "../components/Form";
import { Prompts } from "../components/Prompts";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

export const Main = () => {
  return (
    <div className="main-container">
      <Title />
      <FormContainer />
      <Prompts />
    </div>
  );
};
