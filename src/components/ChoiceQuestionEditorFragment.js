import { PlusCircleFilled } from "@ant-design/icons";
import { Form } from "antd";
import AnswerEditorFragment from "./AnswerEditorFragment";

export default function ChoiceQuestionEditorFragment({ path, setPath }) {
  return (
    <>
      Answers:
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field, i) => (
              <Form.Item {...field}>
                <AnswerEditorFragment
                  path={path}
                  setPath={setPath}
                  remove={remove}
                  index={i}
                />
              </Form.Item>
            ))}
            <PlusCircleFilled onClick={() => add({})} />
          </div>
        )}
      </Form.List>
    </>
  );
}
