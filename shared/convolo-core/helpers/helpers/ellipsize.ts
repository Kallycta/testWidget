export const ellipsize = (str: string, limit: number) =>
    str.length > limit ? `${str.slice(0, limit)}...` : str;
