import { useState } from "react";

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

type FormState = {
  name: string;
  text: string;
};

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    text: "",
  });
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

const handleSubmit = ({
  e,
  form,
  setForm,
}: {
  e: React.FormEvent<HTMLFormElement>;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) => {
  e.preventDefault();
  chrome.storage.sync.get({ prompts: [] }, function(result) {
    const prompts = result.prompts;

    // Add the new prompt to the array
    prompts.push({ id: generateId(), name: form.name, text: form.text });

    // Save the updated prompts array to chrome.storage.sync
    chrome.storage.sync.set({ prompts }, function() {
      console.log("Prompt saved");
    });

    // Clear the form inputs
    setForm({ name: "", text: "" });
  });
};

const generateId = () => {
  const randomNum = Math.random()
    .toString(36)
    .substr(2, 9);
  return randomNum;
};
