import { Breadcrumb, Button, Menu } from "antd";
import {
  getChildren,
  getClickablePath,
  getParentItem
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
      {subpaths.map(({ text, path: subpath, showMenu }) => {
        const item =
          subpath.length === 0
            ? rootValue
            : getParentItem(rootValue, subpath)?.nextStep;
        const children = getChildren(item);
        const menu = showMenu && (
          <Menu>
            {children.map((ch) => (
              <Menu.Item
                key={ch.text}
                onClick={() => setPath([...subpath, ch.text])}
              >
                {ch.text}
              </Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Breadcrumb.Item key={subpath.join("/")} overlay={menu}>
            <Button type="link" onClick={() => setPath(subpath)}>
              {text}
            </Button>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
