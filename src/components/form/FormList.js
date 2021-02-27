import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { isNumber } from "lodash";

export default function FormList({
  label,
  value,
  onChange,
  defaultAddValue,
  children,
}) {
  const remove = (index) => {
    const copy = [...(value || [])];
    copy.splice(index, 1);
    onChange(copy);
  };
  const add = (afterIndex) => {
    if (!isNumber(afterIndex)) {
      onChange([...(value || []), defaultAddValue]);
    } else {
      const copy = [...(value || [])];
      copy.splice(afterIndex + 1, 0, defaultAddValue);
      onChange(copy);
    }
  };
  const onChangeItem = (index, val) => {
    const copy = [...(value || [])];
    copy[index] = val;
    onChange(copy);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div>
        <label>{label}</label>
      </div>
      {(value || []).map((val, index) => (
        <Row align="middle" gutter={10} key={index}>
          <Col offset={2} flex="1">
            {children({
              value: val,
              onChange: (val) => onChangeItem(index, val),
              index,
            })}
          </Col>
          <Col>
            <Button onClick={() => add(index)}>
              <PlusCircleOutlined />
            </Button>
          </Col>
          <Col>
            <Button danger onClick={() => remove(index)}>
              <CloseCircleOutlined />
            </Button>
          </Col>
        </Row>
      ))}
      {!(value?.length > 0) && (
        <div>
          <Button type="primary" onClick={() => add()}>
            <PlusCircleOutlined />
          </Button>
        </div>
      )}
    </div>
  );
}
