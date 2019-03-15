# gatsby-remark-embed-github-wiki

[![NPM badge](https://img.shields.io/npm/v/gatsby-remark-embed-github-wiki.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-remark-embed-github-wiki)
[![Travis badge](https://img.shields.io/travis/visitinc/gatsby-remark-embed-github-wiki.svg?branch=master&style=flat-square)](https://travis-ci.org/visitinc/gatsby-remark-embed-github-wiki)

This plugin allows content authors to embed public GitHub wiki into markdown
files.

## Getting started

To embed a GitHub wiki page in your markdown/remark content, simply add an inline code 
block using the `gh-wiki:` protocol.

```md
`gh-wiki:[<username>/repo/]<wiki_page>`
```

Where:  
- **username**, represents the github user or org to be accessed.  
Can be defaulted via configuration.
- **repo**, is the name of the repo to be accessed.   
- **wiki_page**, is the name of of the wiki page, as specified in the URL bar:
  ex: `Index-Copy` for [this page](https://github.com/visitinc/visitinc.github.io/wiki/Index-Copy)

## Installation

`npm i gatsby-remark-embed-github-wiki`

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
          // Optional: (both must be specified)
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

Any GitHub user can modify GitHub wikis, be careful when setting innerHTML based
on wiki sources to prevent cross site scripting attacks.

## License

MIT
