import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { makePartialFormAccessors } from "../utils/formUtils";
import { getNextStepLink } from "../utils/treeUtils";

export default function NextStepButton({
  path,
  setPath,
  value,
  index,
  onChange,
}) {
  const { onChange: initNextStep } = makePartialFormAccessors("nextStep", {
    value,
    onChange,
  });
  return (
    <Button
      type="primary"
      onClick={() => {
        initNextStep({});
        setPath([...path, ...getNextStepLink(value, index)]);
      }}
    >
      Next Step <ArrowRightOutlined />
    </Button>
  );
}
