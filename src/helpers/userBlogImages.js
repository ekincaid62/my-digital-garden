const fs = require("fs");
const path = require("path");

function getFirstBlogImage(post) {
  if (!post?.page?.inputPath) {
    return null;
  }

  try {
    const source = fs.readFileSync(post.page.inputPath, "utf8");

    // Look for the first Obsidian image embed:
    // ![[Vault/assets/example.jpg]]
    const match = source.match(
      /!\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/
    );

    if (!match) {
      return null;
    }

    const imagePath = match[1].trim();

    // Digital Garden publishes user images under /img/user/
    // Encode each path component while preserving the directory structure.
    const urlPath = imagePath
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");

    return `/img/user/${urlPath}`;
  } catch (error) {
    console.warn(
      `[blog image] Could not read ${post.page.inputPath}: ${error.message}`
    );
    return null;
  }
}

function userBlogImages(eleventyConfig) {
  eleventyConfig.addFilter("firstBlogImage", getFirstBlogImage);
}

module.exports = {
  userBlogImages,
};
