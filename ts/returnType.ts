type MyReturnType<T> = T extends (...v: any) => infer P ? P : never;
