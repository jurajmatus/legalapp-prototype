import { Divider } from "antd";
import { useState } from "react";
import { makePartialFormAccessors } from "../utils/formUtils";
import NextStepEditor from "./NextStepEditor";
import QuestionEditor from "./QuestionEditor";
import QuestionTreeNavigation from "./QuestionTreeNavigation";

export default function QuestionTreeBuilder() {
  const [path, setPath] = useState([]);
  const [value, setValue] = useState({ type: "question" });

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
      <EditorComponent path={path} setPath={setPath} {...accessors} />
    </div>
  );
}
