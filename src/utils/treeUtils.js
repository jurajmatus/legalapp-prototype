import { find, isArray, merge, property } from "lodash";
import { types, questionSubtypes } from "../constants/types";

export function getText(item) {
  return item.text;
}

export function getParentItem(rootValue, path) {
  let currentItem = rootValue;
  let remainingPath = path;

  while (remainingPath.length > 0) {
    currentItem = getChild(currentItem, remainingPath[0]);
    remainingPath = remainingPath.slice(1);
  }
  return currentItem;
}

export function getClickablePath(item, path, acc = [], pathAcc = []) {
  if (path.length === 0) {
    return acc;
  }
  const type = getType(item);
  if (type.mainType === types.QUESTION) {
    return type.subtype === questionSubtypes.CHOICE
      ? getClickablePath(
          getChild(item, path[0]),
          path,
          [...acc, { text: item.text, path: pathAcc }],
          [...pathAcc]
        )
      : getClickablePath(
          item.nextStep,
          path.slice(1),
          [...acc, { text: item.text, path: pathAcc }],
          [...pathAcc, path[0]]
        );
  }
  if (type.mainType === types.ANSWER) {
    return getClickablePath(
      item.nextStep,
      path.slice(1),
      [...acc, { text: item.text, path: pathAcc }],
      [...pathAcc, path[0]]
    );
  }
  return [];
}

export function copyItemWithChange(rootValue, path, value) {
  if (path.length === 0) {
    return value;
  }
  const copy = merge({}, rootValue);
  const parentItem = getParentItem(copy, path);
  parentItem.nextStep = value;
  return copy;
}

export function getChild(item, text) {
  const children = getChildren(item);
  return find(children, (ch) => ch.text === text);
}

export function getChildren(item) {
  if (isArray(item)) {
    return item;
  }
  const type = getType(item);
  if (type.mainType === types.QUESTION) {
    return type.subtype === questionSubtypes.CHOICE ? item.answers : [item];
  }
  if (type.mainType === types.CONDITIONAL) {
    return item.conditions.map(property("body"));
  }
  if (type.mainType === types.ANSWER) {
    return [item.nextStep];
  }
  return [];
}

export function getParentPath(path) {
  return path.slice(0, -1);
}

export function parseType(type) {
  const chunks = type.split(/\|/g);
  return { mainType: chunks[0], subtype: chunks[1] };
}

export function getType(item) {
  return parseType(item.type);
}
