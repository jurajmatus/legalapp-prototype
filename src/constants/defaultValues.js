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

export const EXAMPLE = {
  type: "question|choice",
  text: "What do you need?",
  answers: [
    {
      type: "answer",
      text: "End employment with someone",
      nextStep: {
        type: "question|yesNo",
        text: "Did employee have a car?",
        documentsIfYes: [{ url: "https://drive.google.com/some-hash-1" }],
        nextStep: {
          type: "result",
          documents: [{ url: "https://drive.google.com/some-hash-2" }],
        },
      },
    },
    {
      type: "answer",
      text: "Start new employment",
      nextStep: {
        type: "question|choice",
        id: "emptype",
        text: "Employment type",
        answers: [
          {
            type: "answer",
            text: "Full-time",
            nextStep: {
              type: "result",
              documents: [
                { url: "https://drive.google.com/some-hash-3" },
                {
                  url: "https://drive.google.com/some-hash-4",
                  description: "check if needed",
                },
              ],
            },
          },
          {
            type: "answer",
            text: "Contractor",
            nextStep: {
              type: "conditional",
              conditions: [
                {
                  variable: "DATE",
                  operand: ">=",
                  value: 2019,
                  body: {
                    type: "result",
                    documents: [
                      { url: "https://drive.google.com/some-hash-5" },
                      {
                        url: "https://drive.google.com/some-hash-6",
                        description: "GDPR",
                      },
                    ],
                  },
                },
              ],
              else: {
                type: "result",
                documents: [{ url: "https://drive.google.com/some-hash-7" }],
              },
            },
          },
        ],
      },
    },
  ],
};
