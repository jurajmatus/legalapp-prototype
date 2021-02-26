import { Button } from "antd";

export function RadioGroup({ value, onChange, options }) {
  return (
    <Button.Group>
      {options.map((opt) => (
        <Button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          type={value === opt.value ? "primary" : "default"}
        >
          {opt.label}
        </Button>
      ))}
    </Button.Group>
  );
}
