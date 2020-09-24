// type Combine<T> = {
//   [k in keyof T]: T[k];
// };

// type MyReadonly2<T, K extends keyof T = keyof T> = Combine<
//   T &
//     {
//       readonly [S in K]: T[S];
//     }
// >;

// type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [S in K]: T[S] } &
//   { [S in Exclude<keyof T, K>]: T[S] };

// type Flatten<T extends { [key: string]: any }> = { [key in keyof T]: T[key] };

// type MyReadonly2<
//   T extends { [key: string]: any },
//   K extends keyof T = keyof T
// > = Flatten<Readonly<Pick<T, K>> & Omit<T, K>>;
// export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
//   T
// >() => T extends Y ? 1 : 2
//   ? true
//   : false;

// type Expect<T extends true> = T;

// type xxx = {
//   readonly title?: string;
//   readonly description?: string;
// } & { completed?: boolean };
// type yyy = {
//   readonly title?: string;
//   readonly description?: string;
//   completed?: boolean;
// };
// type cases = [Expect<Equal<xxx, any>>];
