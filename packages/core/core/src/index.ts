import * as annotationUtils from './annotation';
import { PluginSystem } from './plugin';
import { Annotation } from './utils/annotation';

export type MantaStyleContext = {
  query: { [key: string]: unknown };
  plugins: PluginSystem;
};
export * from './plugin';
export { annotationUtils, Annotation };

export abstract class Type {
  abstract deriveLiteral(
    parentAnnotations: annotationUtils.MantaStyleAnnotation,
    context: MantaStyleContext,
  ): Promise<Type>;
  public mock(): any {
    throw new Error('Literal types should be derived before mock.');
  }
}
