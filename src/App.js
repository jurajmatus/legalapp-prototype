import { Col, Row } from "antd";
import "./App.css";
import 'antd/dist/antd.css';
import QuestionTreeBuilder from "./components/QuestionTreeBuilder";

function App() {
  return (
    <Row style={{ width: 800, margin: 20 }}>
      <Col span={24}>
        <QuestionTreeBuilder />
      </Col>
    </Row>
  );
}

export default App;
