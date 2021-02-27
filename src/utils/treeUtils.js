import { findIndex, findLast, flatten, get, range } from "lodash";
import { questionSubtypes, types } from "../constants/types";

export function getNextStepLink(item, index) {
  const type = getType(item);
  if (type.mainType === types.ANSWER) {
    return ["answers", index, "nextStep"];
  }
  if (
    type.mainType === types.QUESTION &&
    type.subtype === questionSubtypes.YESNO
  ) {
    return ["nextStep"];
  }
  return undefined;
}

export function isEditable(item) {
  const type = getType(item);
  return (
    type === types.QUESTION ||
    type === types.RESULT ||
    type === types.CONDITIONAL
  );
}

export function iteratePath(rootValue, path) {
  return range(0, path.length)
    .map((subpathLength) => {
      const subpath = path.slice(0, subpathLength);
      return {
        subpath,
        item: subpath.length === 0 ? rootValue : get(rootValue, subpath),
      };
    })
    .filter(({ item }) => item?.type);
}

export function findClosest(rootValue, path, predicate) {
  return findLast(iteratePath(rootValue, path), ({ item }) => predicate(item));
}

export function getClickablePath(rootValue, path) {
  const linkableItems = iteratePath(rootValue, path);
  return flatten(
    linkableItems.map(({ subpath, item }) => {
      const type = getType(item);
      if (type.mainType === types.ANSWER) {
        const { item: parentQuestion, subpath: parentPath } = findClosest(
          rootValue,
          subpath,
          (par) => {
            const parType = getType(par);
            return (
              parType.mainType === types.QUESTION &&
              parType.subtype === questionSubtypes.CHOICE
            );
          }
        );
        return [
          {
            text: parentQuestion.text,
            link: parentPath,
            children: (parentQuestion.answers || []).map((ans, i) => ({
              text: ans.text,
              link: [...parentPath, ...getNextStepLink(ans, i)],
            })),
          },
          {
            text: item.text,
            link: [
              ...parentPath,
              ...getNextStepLink(item, findIndex(parentQuestion.answers, item)),
            ],
          },
        ];
      }
      if (
        type.mainType === types.QUESTION &&
        type.subtype === questionSubtypes.YESNO
      ) {
        return [{ text: item.text, link: subpath }];
      }
      return [];
    })
  );
}

export function parseType(type) {
  const chunks = (type || "").split(/\|/g);
  return { mainType: chunks[0], subtype: chunks[1] };
}

export function getType(item) {
  return parseType(item.type);
}
