jest.mock("request-promise");

import remark from "remark";
import plugin from "../src/index";

const getNodeContent = node => node.children[0].children[0];

describe("gatsby-remark-embed-github-wiki", () => {
  it("generates html with username, repo and page", async () => {
    const markdownAST = remark.parse(
      "`gh-wiki:visitinc/visitinc.github.io/Index-Copy`"
    );

    const processed = await plugin({ markdownAST });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates html with default username and repo", async () => {
    const markdownAST = remark.parse("`gh-wiki:Index-Copy`");

    const processed = await plugin(
      { markdownAST },
      { username: "visitinc", repo: "visitinc.github.io" }
    );
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username and repo overrides configuration", async () => {
    const markdownAST = remark.parse(
      "`gh-wiki:visitinc/visitinc.github.io/Index-Copy`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("fails when no username or repo is provided", async () => {
    const markdownAST = remark.parse("`gh-wiki:Index-Copy`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Missing username or repo information")
    );
  });

  it("fails when no page is provided", async () => {
    const markdownAST = remark.parse("`gh-wiki:visitinc/visitinc.github.io`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Missing page information")
    );
  });

  it("ignores everything that is not inline code", async () => {
    const markdownAST = remark.parse("# Syntax");
    const originalMarkdownAST = markdownAST;

    const processed = await plugin({ markdownAST });
    expect(processed).toBeTruthy();

    expect(markdownAST).toBe(originalMarkdownAST);
  });
});
