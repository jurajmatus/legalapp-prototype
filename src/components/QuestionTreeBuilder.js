import { Divider } from "antd";
import { useState } from "react";
import { DEFAULT_VALUES_BY_TYPE } from "../constants/defaultValues";
import { types } from "../constants/types";
import { makePartialFormAccessors } from "../utils/formUtils";
import NextStepEditor from "./NextStepEditor";
import QuestionEditor from "./QuestionEditor";
import QuestionTreeNavigation from "./QuestionTreeNavigation";

export default function QuestionTreeBuilder() {
  const [path, setPath] = useState([]);
  const [value, setValue] = useState(DEFAULT_VALUES_BY_TYPE[types.QUESTION]);

  const accessors = makePartialFormAccessors(path, {
    value,
    onChange: setValue,
  });
  console.log({ rootValue: value, path, item: accessors.value });

  const EditorComponent = path.length === 0 ? QuestionEditor : NextStepEditor;

  return (
    <div>
      <QuestionTreeNavigation path={path} setPath={setPath} rootValue={value} />
      <Divider type="horizontal" />
      <EditorComponent
        key={path.join("/")}
        path={path}
        setPath={setPath}
        {...accessors}
      />
    </div>
  );
}
