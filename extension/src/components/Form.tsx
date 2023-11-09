import { useState } from "react";
import { usePrompts } from "../contexts/PromptsContext";

export const FormContainer = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button id="show-form-button" onClick={() => setShowForm(!showForm)}>
        +
      </button>
      {showForm && <Form />}
    </>
  );
};

export type PromptFormState = {
  name: string;
  text: string;
};

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    text: "",
  });

  const { createPrompt } = usePrompts();

  const handleSubmit = ({
    e,
    form,
    setForm,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    form: PromptFormState;
    setForm: React.Dispatch<React.SetStateAction<PromptFormState>>;
  }) => {
    e.preventDefault();
    createPrompt(form);
    setForm({ name: "", text: "" });
  };

  return (
    <form
      id="prompt-form"
      className="prompt-form"
      onSubmit={(e) => handleSubmit({ e, form, setForm })}
    >
      <div id="prompt-form-name-container">
        <label htmlFor="prompt-form-name">Name:</label>
        <input
          type="text"
          id="prompt-form-name"
          maxLength={30}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <br />
      <label htmlFor="prompt-form-text">Text:</label>
      <textarea
        id="prompt-form-text"
        required
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      ></textarea>
      <br />
      <input
        className="clickable-button"
        id="prompt-form-submit-button"
        type="submit"
        value="Add Prompt"
      />
    </form>
  );
};
