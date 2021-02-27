import { Col, Input, Row } from "antd";
import { types } from "../constants/types";
import {
  makePartialFormAccessors,
  usePartialFormAccessors,
} from "../utils/formUtils";
import FormItem from "./form/FormItem";
import FormList from "./form/FormList";
import NextStepButton from "./NextStepButton";

export default function ChoiceQuestionEditorFragment({
  value,
  onChange,
  path,
  setPath,
}) {
  const { forPath } = usePartialFormAccessors({ value, onChange });

  return (
    <>
      <FormList
        label="Answers"
        {...forPath("answers")}
        defaultAddValue={{ type: types.ANSWER }}
      >
        {({ index, ...field }) => (
          <Row align="middle" gutter={10} key={index}>
            <Col flex="1">
              <FormItem label="Text">
                <Input {...makePartialFormAccessors("text", field)} />
              </FormItem>
            </Col>
            <Col>
              <NextStepButton
                value={field.value}
                index={index}
                onChange={field.onChange}
                path={path}
                setPath={setPath}
              />
            </Col>
          </Row>
        )}
      </FormList>
    </>
  );
}
