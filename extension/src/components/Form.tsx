import { useState } from "react";
import { usePrompts } from "../contexts/PromptsContext";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Box } from "@chakra-ui/layout";
import { colors } from "../theme";

export const FormContainer = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowForm(!showForm);
        }}
        id={"show-form-button"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.brand.primary,
          color: colors.text.primary,
          border: "none",
          borderRadius: "50%",
          width: "1.5em",
          height: "1.5em",
          fontSize: "12px",
          lineHeight: 1,
          cursor: "pointer",
          textAlign: "center",
          outline: "none",
          alignContent: "center",
        }}
      >
        {showForm ? "-" : "+"}
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
      style={{
        borderRadius: "0.5em",
        backgroundColor: "#343541",
        padding: "1em",
      }}
    >
      <Box id="prompt-form-name-container">
        <FormLabel htmlFor="prompt-form-name">Name:</FormLabel>
        <Input
          size="sm"
          backgroundColor={"brand.background"}
          border="none"
          type="text"
          id="prompt-form-name"
          maxLength={30}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </Box>
      <br />
      <FormLabel htmlFor="prompt-form-text">Text:</FormLabel>
      <Textarea
        backgroundColor={"brand.background"}
        border="none"
        id="prompt-form-text"
        required
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <br />
      <Input
        className="clickable-button"
        id="prompt-form-submit-button"
        type="submit"
        value="Add Prompt"
        bgColor={"brand.primary"}
        border={"none"}
        _hover={{ backgroundColor: "brand.primaryHover", cursor: "pointer" }}
      />
    </form>
  );
};
