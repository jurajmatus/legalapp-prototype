import { usePartialFormAccessors } from "../utils/formUtils";
import DocumentsFormItem from "./DocumentsFragment";

export default function ResultEditor({ value, onChange, path, setPath }) {
  const { forPath } = usePartialFormAccessors({ value, onChange });
  return <DocumentsFormItem {...forPath("documents")} />;
}
