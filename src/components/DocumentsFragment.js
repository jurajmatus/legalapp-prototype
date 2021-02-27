import { Card, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { range } from "lodash";
import { types } from "../constants/types";
import { makePartialFormAccessors } from "../utils/formUtils";
import FormItem from "./form/FormItem";
import FormList from "./form/FormList";

const DOCUMENTS = range(0, 10).map((i) => ({
  value: "https://drive.google.com/some-hash-" + i,
  label: "Contract number " + i,
}));

export default function DocumentsFormItem({
  label = "Documents",
  value,
  onChange,
}) {
  return (
    <FormList
      label={label}
      value={value}
      onChange={onChange}
      defaultAddValue={{ type: types.DOCUMENT }}
    >
      {({ index, ...field }) => (
        <Card key={index}>
          <FormItem label="URL">
            <Select
              style={{ width: "100%" }}
              options={DOCUMENTS}
              {...makePartialFormAccessors("url", field)}
            />
          </FormItem>
          <FormItem label="Description">
            <TextArea {...makePartialFormAccessors("description", field)} />
          </FormItem>
        </Card>
      )}
    </FormList>
  );
}
