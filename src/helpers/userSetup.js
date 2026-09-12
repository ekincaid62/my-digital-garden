const { userBlogImages } = require("./userBlogImages");

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}

function userEleventySetup(eleventyConfig) {
  // The eleventyConfig parameter stands for the config instantiated in /.eleventy.js.
  // Feel free to add any plugin you want here instead of /.eleventy.js

  userBlogImages(eleventyConfig);
}

exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
