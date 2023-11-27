export type TypeEqual<Target, Value> = (<T>() => T extends Target ? 1 : 2) extends <
    T,
>() => T extends Value ? 1 : 2
    ? true
    : false;
