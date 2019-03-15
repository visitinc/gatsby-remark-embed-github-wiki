import { readFileSync } from "fs";

export default url => {
  if (
    url ===
    "https://raw.github.com/wiki/visitinc/visitinc.github.io/Index-Copy.md"
  ) {
    return readFileSync(__dirname + "./Index-Copy.md", "utf-8");
  }
  return false;
};
