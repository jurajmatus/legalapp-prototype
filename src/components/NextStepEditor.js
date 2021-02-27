import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { DEFAULT_VALUES_BY_TYPE } from "../constants/defaultValues";
import { types } from "../constants/types";
import { getType } from "../utils/treeUtils";
import ConditionalEditor from "./ConditionalEditor";
import FormItem from "./form/FormItem";
import QuestionEditor from "./QuestionEditor";
import { RadioGroup } from "./RadioGroup";
import ResultEditor from "./ResultEditor";

export default function NextStepEditor({ value, onChange, path, setPath }) {
  const [type, setType] = useState(types.RESULT);
  const onTypeChange = (val) => {
    setType(val);
    onChange(DEFAULT_VALUES_BY_TYPE[val]);
  };
  useEffect(() => {
    if (value) {
      const type = getType(value);
      if (type.mainType) {
        setType(type.mainType);
      }
    }
    if (!value || isEqual(value, {})) {
      onChange(DEFAULT_VALUES_BY_TYPE[type]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fragmentProps = { value, onChange, path, setPath };
  return (
    <>
      <FormItem label="Next step type">
        <RadioGroup
          value={type}
          onChange={onTypeChange}
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
      </FormItem>
      {type === types.QUESTION && <QuestionEditor {...fragmentProps} />}
      {type === types.CONDITIONAL && <ConditionalEditor {...fragmentProps} />}
      {type === types.RESULT && <ResultEditor {...fragmentProps} />}
    </>
  );
}
