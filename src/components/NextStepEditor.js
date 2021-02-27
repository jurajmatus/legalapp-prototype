import { useState } from "react";
import { types } from "../constants/types";
import FormItem from "./form/FormItem";
import QuestionEditor from "./QuestionEditor";
import { RadioGroup } from "./RadioGroup";

export default function NextStepEditor({ value, onChange, path, setPath }) {
  const [type, setType] = useState(types.RESULT);
  const fragmentProps = { value, onChange, path, setPath };
  return (
    <>
      <FormItem label="Next step type">
        <RadioGroup
          value={type}
          onChange={setType}
          options={[
            {
              value: types.QUESTION,
              label: "Question",
            },
            {
              value: types.CONDITIONAL,
              label: "Conditional",
            },
            {
              value: types.RESULT,
              label: "Result",
            },
          ]}
        />
      </FormItem>
      {type === types.QUESTION && <QuestionEditor {...fragmentProps} />}
      {type === types.CONDITIONAL && "CONDITIONAL"}
      {type === types.RESULT && "RESULT"}
    </>
  );
}
