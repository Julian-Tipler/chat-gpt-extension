import { useState } from "react";
import { usePrompts } from "../../contexts/PromptsContext";
import { Box } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

export type PromptFormState = {
  name: string;
  text: string;
};

export const NewPromptModal = ({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    setShowForm(false);
  };

  return (
    <Modal isOpen={showForm} onClose={() => setShowForm(false)} size={"sm"}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"1em"}
        bgColor={"brand.cardBackground"}
        padding={"1em"}
      >
        <ModalHeader>New Prompt</ModalHeader>
        <ModalBody>
          <form
            id="prompt-form"
            className="prompt-form"
            onSubmit={(e) => handleSubmit({ e, form, setForm })}
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
              _hover={{
                backgroundColor: "brand.primaryHover",
                cursor: "pointer",
              }}
            />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
