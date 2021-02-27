import { Col, Row } from "antd";

export default function FormItem({ label, children }) {
  return (
    <Row align="middle" style={{ marginBottom: 10 }}>
      <Col span={6}>
        <label>{label}</label>
      </Col>
      <Col span={18}>{children}</Col>
    </Row>
  );
}
