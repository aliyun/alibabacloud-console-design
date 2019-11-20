import { existsSync } from "fs-extra";

export const resolveExt = (path: string) => {
  for (const ext of ['.js', '.jsx', '.ts', '.tsx']) {
    if (existsSync(`${path}${ext}`)) {
      return ext;
    }
  }
  return undefined;
};

export const existWithExt = (path: string) => {
  return resolveExt(path) !== undefined;
};

export const resolveWithExt = (path: string) => {
  const ext = resolveExt(path);
  if (ext) {
    return `${path}${ext}`;
  }
  return undefined;
};
