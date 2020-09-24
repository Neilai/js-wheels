type LengthOfTuple<T> = T extends { length: infer L } ? L : never;

type DropFirstInTuple<T extends any[]> = ((...args: T) => any) extends (
  arg: any,
  ...rest: infer U
) => any
  ? U
  : T;

type Last<T extends any[]> = T[LengthOfTuple<DropFirstInTuple<T>>];
