import { useState } from "react";
import QuestionTreeNavigation from "./QuestionTreeNavigation";
import QuestionEditor from "./QuestionEditor";
import { getItem, getType } from "../utils/treeUtils";
import { Divider } from "antd";
import { types } from "../constants/types";

function PolymorphicEditor({ value, setValue, path, setPath }) {
  const type = getType(value);
  if (type === types.QUESTION) {
    return (
      <QuestionEditor
        value={value}
        setValue={setValue}
        path={path}
        setPath={setPath}
      />
    );
  }
}

export default function QuestionTreeBuilder() {
  const [path, setPath] = useState([]);
  const [value, setValue] = useState({ type: "question" });

  console.log(value);
  const item = getItem(value, path);
  console.log(`'${path.join("/")}' -> `, item);

  return (
    <div>
      <QuestionTreeNavigation path={path} setPath={setPath} rootValue={value} />
      <Divider type="horizontal" />
      <QuestionEditor
        value={value}
        setValue={setValue}
        path={path}
        setPath={setPath}
      />
    </div>
  );
}
