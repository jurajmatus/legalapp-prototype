import NextStepButton from "./NextStepButton";

export default function YesNoQuestionEditorFragment({
  value,
  onChange,
  path,
  setPath,
}) {
  return (
    <>
      <div>TODO: Documents</div>
      <NextStepButton
        value={value}
        onChange={onChange}
        path={path}
        setPath={setPath}
      />
    </>
  );
}
