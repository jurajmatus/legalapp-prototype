import { ArrowRightOutlined } from "@ant-design/icons";
import { Form } from "antd";

export default function YesNoQuestionEditorFragment({ path, setPath }) {
  return (
    <>
      <div>TODO: Documents</div>
      <Form.Item noStyle shouldUpdate>
        {(fm) => (
          <ArrowRightOutlined
            onClick={() => setPath([...path, fm.getFieldValue("text")])}
          />
        )}
      </Form.Item>
    </>
  );
}
