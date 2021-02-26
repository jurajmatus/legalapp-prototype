import { Form } from "antd";
import { useEffect } from "react";
import { types } from "../constants/types";
import QuestionEditor from "./QuestionEditor";
import { RadioGroup } from "./RadioGroup";

export default function NextStepEditor({ value, setValue, path, setPath }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  return (
    <Form
      component={false}
      onValuesChange={(ch, all) => setValue(all)}
      form={form}
      name={path}
    >
      <Form.Item name="nextStepType" label="Next step type">
        <RadioGroup
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
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(fm) => {
          const type = fm.getFieldValue("nextStepType");
          if (type === types.QUESTION) {
            return (
              <QuestionEditor
                key={path}
                value={value}
                setValue={setValue}
                path={path}
                setPath={setPath}
              />
            );
          }
          if (type === types.CONDITIONAL) {
            return "Conditional";
          }
          if (type === types.RESULT) {
            return "Result";
          }
        }}
      </Form.Item>
    </Form>
  );
}
