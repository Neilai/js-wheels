// type First<T extends any[]> = T[Extract<keyof T, "0">];
// type First<T extends any[]> = T[0];
// type Extract<T, U> = T extends U ? T : never;
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
