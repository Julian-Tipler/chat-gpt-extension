import { useEffect, useState } from "react";
import { usePrompts } from "../../contexts/PromptsContext";
import "./PromptModal.css";
import { Prompt as PromptType } from "./PromptsPage";

export type PromptFormState = {
  id?: string;
  name: string;
  text: string;
};

export const PromptModal = ({
  setShowForm,
  editedPrompt,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  editedPrompt: PromptType | null;
}) => {
  const [form, setForm] = useState({ name: "", text: "" });
  const { createPrompt, updatePrompt } = usePrompts();

  useEffect(() => {
    if (editedPrompt) {
      setForm({ name: editedPrompt.name, text: editedPrompt.text });
    }
  }, [editedPrompt]);

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
    editedPrompt ? updatePrompt(form, editedPrompt.id) : createPrompt(form);
    setForm({ name: "", text: "" });
    setShowForm(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowForm(false)}>
      <section
        className="modal-content"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          {editedPrompt ? "Edit Prompt" : "Create Prompt"}
        </header>
        <div className="modal-body">
          <form
            id="prompt-form"
            className="prompt-form"
            onSubmit={(e) => handleSubmit({ e, form, setForm })}
          >
            <div className="input-header">Name:</div>
            <input
              className="text-input"
              id="prompt-form-name"
              type="text"
              maxLength={30}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <br />
            <div className="input-header">Text:</div>
            <textarea
              className="text-area"
              id="prompt-form-text"
              required
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />
            <br />
            <input
              className="submit-button modal-submit-button"
              id="prompt-form-submit-button"
              type="submit"
              value={editedPrompt ? "Update Prompt" : "Edit Prompt"}
            />
          </form>
        </div>
      </section>
    </div>
  );
};
