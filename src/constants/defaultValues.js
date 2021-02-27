import { questionSubtypes, types } from "./types";

export const DEFAULT_VALUES_BY_TYPE = {
  [types.QUESTION]: {
    type: `${types.QUESTION}|${questionSubtypes.CHOICE}`,
    answers: [{ type: types.ANSWER }],
  },
  [types.RESULT]: {
    type: types.RESULT,
  },
  [types.CONDITIONAL]: {
    type: types.CONDITIONAL,
    conditions: [
      {
        type: types.CONDITION,
      },
    ],
  },
};