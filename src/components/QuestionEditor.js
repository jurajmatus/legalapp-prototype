import { Input } from "antd";
import { questionSubtypes, types } from "../constants/types";
import { usePartialFormAccessors } from "../utils/formUtils";
import { parseType } from "../utils/treeUtils";
import ChoiceQuestionEditorFragment from "./ChoiceQuestionEditorFragment";
import FormItem from "./form/FormItem";
import { RadioGroup } from "./RadioGroup";
import YesNoQuestionEditorFragment from "./YesNoQuestionEditorFragment";

export default function QuestionEditor({ value, onChange, path, setPath }) {
  const { forPath } = usePartialFormAccessors({ value, onChange });
  const type = value?.type && parseType(value.type);
  const fragmentProps = { value, onChange, path, setPath };

  return (
    <>
      <FormItem label="Type">
        <RadioGroup
          {...forPath("type")}
          options={[
            {
              value: `${types.QUESTION}|${questionSubtypes.CHOICE}`,
              label: "Choice",
            },
            {
              value: `${types.QUESTION}|${questionSubtypes.YESNO}`,
              label: "Yes/No",
            },
          ]}
        />
      </FormItem>
      <FormItem label="Question text">
        <Input {...forPath("text")} />
      </FormItem>
      {type?.subtype === questionSubtypes.CHOICE && (
        <ChoiceQuestionEditorFragment {...fragmentProps} />
      )}
      {type?.subtype === questionSubtypes.YESNO && (
        <YesNoQuestionEditorFragment {...fragmentProps} />
      )}
    </>
  );
}
