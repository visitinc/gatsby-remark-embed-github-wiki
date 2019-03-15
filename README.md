# gatsby-remark-embed-github-wiki

[![NPM badge](https://img.shields.io/npm/v/gatsby-remark-embed-gist.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-remark-embed-gist)
[![Travis badge](https://img.shields.io/travis/weirdpattern/gatsby-remark-embed-gist.svg?branch=master&style=flat-square)](https://travis-ci.org/weirdpattern/gatsby-remark-embed-gist)

This plugin allows content authors to embed public GitHub wiki markdown.

## Getting started

To embed a GitHub wiki page in your markdown/remark content, simply add an inline code 
block using the `gh-wiki:` protocol.

```md
`gh-wiki:[<username>/]<repo>[#<wiki_page>]`
```

Where:  
- **username**, represents the github user or org to be accessed.  
Can be defaulted via configuration.
- **repo**, is the name of the repo to be accessed.   
This is the hash value in the gist url, e.g. https://gist.github.com/<username\>/`ce54fdb1e5621b5966e146026995b974`).
- **wiki_page**, is the name of of the wiki page, as specified in the URL bar:
  ex: `Index-Copy` for [this page](https://github.com/visitinc/visitinc.github.io/wiki/Index-Copy)

## Installation

`yarn add gatsby-remark-embed-gist`

## Usage

```javascript
// In your gatsby-config.js
{
  resolve: "gatsby-transformer-remark",
  options: {
    plugins: [
      {
        resolve: "gatsby-remark-embed-github-wiki",
        options: {
          // Optional:
          username: 'visitinc',
          repo: 'visitinc.github.io'
        }
      }
    ]
  }
}
```

## Notes

The order of the plugins only matters when used in conjunction with 
`gatsby-remark-prismjs`, because this plugin transforms the inline code blocks, 
so add `gatsby-remark-embed-github-wiki` somewhere above this plugin.  

## License

MIT
