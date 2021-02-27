import { usePartialFormAccessors } from "../utils/formUtils";
import DocumentsFormItem from "./DocumentsFragment";
import NextStepButton from "./NextStepButton";

export default function YesNoQuestionEditorFragment({
  value,
  onChange,
  path,
  setPath,
}) {
  const { forPath } = usePartialFormAccessors({ value, onChange });

  return (
    <>
      <DocumentsFormItem
        label="Documents (if yes)"
        {...forPath("documentsIfYes")}
      />
      <DocumentsFormItem
        label="Documents (if no)"
        {...forPath("documentsIfNo")}
      />
      <div style={{ height: 20 }} />
      <NextStepButton
        value={value}
        onChange={onChange}
        path={path}
        setPath={setPath}
      />
    </>
  );
}
