type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };

// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends Function
//     ? T[K]
//     : T[K] extends { [k in string]: any }
//     ? DeepReadonly<T[K]>
//     : T[K];
// };
