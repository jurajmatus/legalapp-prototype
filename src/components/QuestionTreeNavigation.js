import { Breadcrumb, Button } from "antd";
import {
  getClickablePath
} from "../utils/treeUtils";

export default function QuestionTreeNavigation({
  path = [],
  setPath,
  rootValue,
}) {
  const subpaths = getClickablePath(rootValue, path);
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Button type="link">Root</Button>
      </Breadcrumb.Item>
      {subpaths.map(({ text, path: subpath }) => (
        <Breadcrumb.Item key={subpath.join("/")}>
          <Button type="link" onClick={() => setPath(subpath)}>
            {text}
          </Button>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
