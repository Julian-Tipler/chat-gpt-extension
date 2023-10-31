import { useState } from "react";

export const FormContainer = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <>
      <button id="show-form-button" onClick={() => setShowForm(!showForm)}>
        +
      </button>
      {showForm && <Form />}
    </>
  );
};

const Form = () => {
  return (
    <form id="prompt-form" className="prompt-form">
      <div id="prompt-form-name-container">
        <label htmlFor="prompt-form-name">Name:</label>
        <input type="text" id="prompt-form-name" maxLength={30} required />
      </div>
      <br />
      <label htmlFor="prompt-form-text">Text:</label>
      <textarea id="prompt-form-text" required></textarea>
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
