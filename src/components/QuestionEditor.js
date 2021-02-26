import { Form, Input } from "antd";
import { useEffect } from "react";
import { questionSubtypes, types } from "../constants/types";
import { parseType } from "../utils/treeUtils";
import ChoiceQuestionEditorFragment from "./ChoiceQuestionEditorFragment";
import { RadioGroup } from "./RadioGroup";
import YesNoQuestionEditorFragment from "./YesNoQuestionEditorFragment";

export default function QuestionEditor({ value, setValue, path, setPath }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);
  
  return (
    <Form
      component={false}
      onValuesChange={(ch, all) => setValue(all)}
      initialValues={value}
      name={path}
      form={form}
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
          const parsedType = parseType(type);
          if (parsedType.subtype === questionSubtypes.CHOICE) {
            return (
              <ChoiceQuestionEditorFragment path={path} setPath={setPath} />
            );
          }
          if (parsedType.subtype === questionSubtypes.YESNO) {
            return (
              <YesNoQuestionEditorFragment path={path} setPath={setPath} />
            );
          }
        }}
      </Form.Item>
    </Form>
  );
}
