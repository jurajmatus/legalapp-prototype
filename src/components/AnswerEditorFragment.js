import { ArrowRightOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";

export default function AnswerEditorFragment({
  value,
  onChange,
  path,
  setPath,
  remove,
  index,
}) {
  return (
    <Form
      component={false}
      onValuesChange={(ch, all) => onChange({ type: "answer", ...all })}
      initialValues={value}
    >
      <Row justify="space-between">
        <Col span={20}>
          <Form.Item name="text">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <CloseCircleOutlined onClick={() => remove(index)} />
        </Col>
        <Col>
          <Form.Item noStyle shouldUpdate>
            {(fm) => (
              <ArrowRightOutlined
                onClick={() => setPath([...path, fm.getFieldValue("text")])}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
