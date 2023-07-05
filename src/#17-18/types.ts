export interface ParserToken<T = unknown> {
  type?: string;
  value?: T;
}
export interface ParserValue<T = unknown> extends ParserToken<T> {
  min?: number;
  max?: number;
}

export type ParserResult<T = unknown> = [ParserValue, Iterable<string>];

export type GeneratorResult<T = unknown, R = unknown> = Generator<
  ParserToken<T>,
  ParserResult<R>,
  Iterable<string> | undefined
>;

export type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: ParserValue
) => GeneratorResult<T, R>;
