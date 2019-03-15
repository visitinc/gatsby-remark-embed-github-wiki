import request from "request-promise";
import visit from "async-unist-util-visit";
import unified from "unified";
import markdown from "remark-parse";
import stringify from "rehype-stringify";
import remark2rehype from "remark-rehype";

// default base url
const BASE_URL = "https://raw.github.com/wiki";
const PREFIX = "gh-wiki:";

/**
 * Builds the github wiki url.
 * @param {string} value the value of the inlineCode block.
 * @param {PluginOptions} options the options of the plugin.
 */
function buildUrl(value, options) {
  const slugs = value.split("/");

  let username, repo, page;

  if (slugs.length === 3) {
    [username, repo, page] = slugs;
  }

  if (slugs.length === 1) {
    [page] = slugs;
    username = options.username;
    repo = options.repo;
  }

  // checks for a valid username
  if (
    !username ||
    username.trim().length === 0 ||
    !repo ||
    repo.trim().length === 0
  ) {
    throw new Error("Missing username or repo information");
  }

  // checks for a valid page
  if (!page == null || page.trim().length === 0) {
    throw new Error("Missing page information");
  }

  // builds the url and completes it with the file if any
  const url = `${BASE_URL}/${username}/${repo}/${page}.md`;

  return url;
}

/**
 * Handles the markdown AST.
 * @param {{ markdownAST }} markdownAST the markdown abstract syntax tree.
 * @param {PluginOptions} options the options of the plugin.
 * @returns {*} the markdown ast.
 */
export default async ({ markdownAST }, options = {}) => {
  // this returns a promise that will fulfill immediately for everything
  // that is not an inlineCode that starts with `gh-wiki:`
  return await visit(markdownAST, "inlineCode", async node => {
    // validate prerequisites.
    if (!node.value.startsWith(PREFIX)) return;

    // get the query string and build the url
    const url = buildUrl(node.value.substring(PREFIX.length), options);
    console.log(url);

    // get the markdown content and update the node type and value
    const body = await request(url);

    const html = await unified()
      .use(markdown)
      .use(remark2rehype)
      .use(stringify)
      .process(body);

    node.type = "html";
    node.value = html.contents.trim();

    return markdownAST;
  });
};
