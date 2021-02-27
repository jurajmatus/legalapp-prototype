import { Card, Col, Divider, Input, Row, Select } from "antd";
import { types } from "../constants/types";
import {
  makePartialFormAccessors,
  usePartialFormAccessors,
} from "../utils/formUtils";
import FormItem from "./form/FormItem";
import FormList from "./form/FormList";
import NextStepEditor from "./NextStepEditor";

const VARIABLES = [
  { value: "DATE", label: "Date" },
  { value: "NUM_EMPLOYEES", label: "Number of employees" },
];

const OPERANDS = [
  { value: "<", label: "<" },
  { value: "<=", label: "≤" },
  { value: "=", label: "=" },
  { value: ">=", label: "≥" },
  { value: ">", label: ">" },
];

export default function ConditionalEditor({ value, onChange, path, setPath }) {
  const { forPath } = usePartialFormAccessors({ value, onChange });

  return (
    <>
      <FormList
        label="Conditions"
        {...forPath("conditions")}
        defaultAddValue={{ type: types.CONDITION }}
      >
        {({ index, ...field }) => (
          <Card key={index}>
            <Row align="middle" gutter={10}>
              <Col>If</Col>
              <Col flex="1">
                <Select
                  options={VARIABLES}
                  style={{ width: "100%" }}
                  {...makePartialFormAccessors("variable", field)}
                />
              </Col>
              <Col>
                <Select
                  options={OPERANDS}
                  style={{ width: 50 }}
                  {...makePartialFormAccessors("operand", field)}
                />
              </Col>
              <Col flex="1">
                <Input {...makePartialFormAccessors("value", field)} />
              </Col>
            </Row>
            <Divider type="horizontal" />
            <NextStepEditor
              {...makePartialFormAccessors("body", field)}
              path={[...path, "conditions", index, "body"]}
              setPath={setPath}
            />
          </Card>
        )}
      </FormList>
      <FormItem label="Else">
        <NextStepEditor
          {...forPath("else")}
          path={[...path, "else"]}
          setPath={setPath}
        />
      </FormItem>
    </>
  );
}
