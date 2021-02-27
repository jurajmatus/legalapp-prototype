import { ArrowLeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Menu, Row } from "antd";
import { findClosest, getClickablePath, isEditable } from "../utils/treeUtils";

export default function QuestionTreeNavigation({
  path = [],
  setPath,
  rootValue,
}) {
  const items = getClickablePath(rootValue, path);
  return (
    <Row align="middle" gutter={20}>
      <Col>
        <Button
          onClick={() => {
            const par = findClosest(rootValue, path, isEditable);
            setPath(par?.subpath || []);
          }}
        >
          <ArrowLeftOutlined />
        </Button>
      </Col>
      <Col>
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
      </Col>
    </Row>
  );
}
