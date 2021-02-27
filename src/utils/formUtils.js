import { get, merge, set } from "lodash";

export function makePartialFormAccessors(path, { value, onChange }) {
  return {
    value: path.length === 0 ? value : get(value, path),
    onChange: (eventOrValue) => {
      const val = eventOrValue?.target?.value || eventOrValue;

      if (path.length === 0) {
        return onChange(val);
      }
      const copy = merge({}, value);
      set(copy, path, val);
      onChange(copy);
    },
  };
}

export function usePartialFormAccessors({ value, onChange }) {
  return {
    forPath: (path) => makePartialFormAccessors(path, { value, onChange }),
  };
}
