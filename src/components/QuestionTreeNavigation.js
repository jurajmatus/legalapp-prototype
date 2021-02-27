import { Breadcrumb, Button, Menu } from "antd";
import { getClickablePath } from "../utils/treeUtils";

export default function QuestionTreeNavigation({
  path = [],
  setPath,
  rootValue,
}) {
  const items = getClickablePath(rootValue, path);
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Button type="link">
          <Button type="link" onClick={() => setPath([])}>
            Root
          </Button>
        </Button>
      </Breadcrumb.Item>
      {items.map(({ text, link, children }) => {
        const menu = children?.length > 0 && (
          <Menu>
            {children.map((ch) => (
              <Menu.Item key={ch.text} onClick={() => setPath(ch.link)}>
                {ch.text}
              </Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Breadcrumb.Item key={link.join("/")} overlay={menu}>
            <Button type="link" onClick={() => setPath(link)}>
              {text}
            </Button>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
