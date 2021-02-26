import { Form, Input } from "antd";
import { questionSubtypes, types } from "../constants/types";
import { parseType } from "../utils/treeUtils";
import ChoiceQuestionEditorFragment from "./ChoiceQuestionEditorFragment";
import { RadioGroup } from "./RadioGroup";
import YesNoQuestionEditorFragment from "./YesNoQuestionEditorFragment";

export default function QuestionEditor({ value, setValue, path, setPath }) {
  return (
    <Form
      component={false}
      onValuesChange={(ch, all) => setValue(all)}
      initialValues={value}
    >
      <Form.Item name="type" label="Type">
        <RadioGroup
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
      </Form.Item>
      <Form.Item name="text" label="Question text">
        <Input />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(fm) => {
          const type = fm.getFieldValue("type");
          if (!type) {
            return null;
          }
          return parseType(type).subtype === questionSubtypes.CHOICE ? (
            <ChoiceQuestionEditorFragment path={path} setPath={setPath} />
          ) : (
            <YesNoQuestionEditorFragment path={path} setPath={setPath} />
          );
        }}
      </Form.Item>
    </Form>
  );
}
