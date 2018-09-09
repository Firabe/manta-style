export class AnnotationLiteral {
  private value: string | number | boolean | undefined | null;
  constructor(value: string | number | boolean | undefined | null) {
    this.value = value;
  }
  public getValue() {
    return this.value;
  }
}
export class AnnotationExpression {
  private name: string;
  private params: Annotation[];
  private hash: { [name: string]: Annotation };
  constructor(
    name: string,
    params: Annotation[],
    hash: { [name: string]: Annotation },
  ) {
    this.name = name;
    this.params = params;
    this.hash = hash;
  }
  public getName() {
    return this.name;
  }
  public getParams() {
    return this.params;
  }
  public getHash() {
    return this.hash;
  }
}

export type Annotation = AnnotationLiteral | AnnotationExpression;

export function findAnnotation(
  name: string,
  annotations: Annotation[],
): Annotation | undefined {
  return (
    annotations &&
    annotations.find(
      (item) => isAnnotationExpression(item) && item.getName() === name,
    )
  );
}

export function inheritAnnotations(parent: Annotation[], child: Annotation[]) {
  const childKeys = child
    .filter(isAnnotationExpression)
    .map((item) => item.getName());
  const filteredParent = parent
    .filter(isAnnotationExpression)
    .filter((item) => !childKeys.includes(item.getName()));
  return [...filteredParent, ...child];
}

function isAnnotationExpression(
  annotation: Annotation,
): annotation is AnnotationExpression {
  return annotation instanceof AnnotationExpression;
}
