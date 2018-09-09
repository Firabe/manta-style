export type AnnotationLiteral = {
  type: 'literal';
  value: string | number | boolean | undefined | null;
};

export type AnnotationExpression = {
  type: 'expression';
  name: string;
  params: Annotation[];
  hash: { [name: string]: Annotation };
};

export type Annotation = AnnotationLiteral | AnnotationExpression;

export function findAnnotation(
  name: string,
  annotations: Annotation[],
): Annotation | undefined {
  return (
    annotations &&
    annotations.find(
      (item) => isAnnotationExpression(item) && item.name === name,
    )
  );
}

export function inheritAnnotations(parent: Annotation[], child: Annotation[]) {
  const childKeys = child
    .filter(isAnnotationExpression)
    .map((item) => item.name);
  const filteredParent = parent
    .filter(isAnnotationExpression)
    .filter((item) => !childKeys.includes(item.name));
  return [...filteredParent, ...child];
}

function isAnnotationExpression(
  annotation: Annotation,
): annotation is AnnotationExpression {
  return annotation.type === 'expression';
}
