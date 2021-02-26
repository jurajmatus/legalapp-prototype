import { Form } from "antd";
import { types } from "../constants/types";
import QuestionEditor from "./QuestionEditor";
import { RadioGroup } from "./RadioGroup";

export default function NextStepEditor({ value, setValue, path, setPath }) {
  return (
    <Form
      component={false}
      onValuesChange={(ch, all) => setValue(all)}
      initialValues={value}
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
