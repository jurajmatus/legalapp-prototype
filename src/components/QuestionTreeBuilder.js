import { Divider } from "antd";
import { useState } from "react";
import { copyItemWithChange, getParentItem } from '../utils/treeUtils';
import NextStepEditor from './NextStepEditor';
import QuestionEditor from "./QuestionEditor";
import QuestionTreeNavigation from "./QuestionTreeNavigation";

export default function QuestionTreeBuilder() {
  const [path, setPath] = useState([]);
  const [value, setValue] = useState({ type: "question" });

  console.log('ROOT VALUE', value);
  const item = path.length===0 ? value : getParentItem(value, path)?.nextStep;
  console.log(`ITEM ('${path.join("/")}'): `, item);

  const setItem = val => setValue(copyItemWithChange(value, path, val));

  return (
    <div>
      <QuestionTreeNavigation path={path} setPath={setPath} rootValue={value} />
      <Divider type="horizontal" />
      {path.length === 0 ? (
        <QuestionEditor
          value={item}
          setValue={setItem}
          path={path}
          setPath={setPath}
        />
      ) : (
        <NextStepEditor
          value={item}
          setValue={setItem}
          path={path}
          setPath={setPath}
        />
      )}
    </div>
  );
}
