import { Type, annotationUtils } from '@manta-style/core';

export const enum QuestionToken {
  None,
  QuestionToken,
  MinusToken,
}

export type Property = {
  name: string;
  type: Type;
  questionMark: boolean;
  annotations: annotationUtils.MantaStyleAnnotation;
};

export const enum ComputedPropertyOperator {
  INDEX_SIGNATURE = 0,
  IN_KEYWORD = 1,
}

export type ComputedProperty = Property & {
  keyType: Type;
  operator: ComputedPropertyOperator;
};

export type AnyObject = {
  [key: string]: any;
};

export type Literals = string | boolean | number;
