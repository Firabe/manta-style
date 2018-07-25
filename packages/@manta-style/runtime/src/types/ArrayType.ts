import { Type, Annotation } from "../utils/baseType";
import { getNumberFromAnnotationKey } from "../utils/annotation";

export default class ArrayType extends Type {
  private elementType: Type;
  constructor(elementType: Type) {
    super();
    this.elementType = elementType;
  }
  public mock(annotations?: Annotation[]) {
    const array = [];
    const lengthFromJSDoc = getNumberFromAnnotationKey({
      key: "length",
      precision: 0,
      annotations
    });
    const length =
      typeof lengthFromJSDoc !== "undefined"
        ? lengthFromJSDoc
        : Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < length; i++) {
      array.push(this.elementType.mock());
    }
    return array;
  }
}
