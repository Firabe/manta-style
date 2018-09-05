import Literal from './Literal';
import { annotationUtils, MantaStyleContext, Type } from '@manta-style/core';

const DEFAULT_STATIC_STRING =
  'This is a string message. Customize it with JSDoc tag @example';

export default class StringKeyword extends Type {
  public async deriveLiteral(
    annotations: annotationUtils.MantaStyleAnnotation,
    context: MantaStyleContext,
  ) {
    const { plugins } = context;

    const pluginValue = await plugins.getMockValueFromPlugin(
      'StringType',
      (plugin: any) => annotations.execute(plugin),
    );
    let stringValue =
      pluginValue !== null ? String(pluginValue) : DEFAULT_STATIC_STRING;
    return new Literal(stringValue);
  }
}
