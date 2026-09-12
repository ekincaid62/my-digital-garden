const fs = require("fs");
const path = require("path");

function getFirstBlogImage(post) {
  const inputPath =
    post?.inputPath ||
    post?.page?.inputPath ||
    post?.data?.page?.inputPath;

  if (!inputPath) {
    console.warn(
      `[blog image] No inputPath found on post "${post?.data?.title || post?.url || "unknown"}". Keys: ${Object.keys(post || {}).join(", ")}`
    );
    return null;
  }

  try {
    const source = fs.readFileSync(inputPath, "utf8");

    const match = source.match(
      /!\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/
    );

    if (!match) {
      console.warn(`[blog image] No image embed found in ${inputPath}`);
      return null;
    }

    const imagePath = match[1].trim();

    const urlPath = imagePath
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");

    return `/img/user/${urlPath}`;
  } catch (error) {
    console.warn(
      `[blog image] Could not read ${inputPath}: ${error.message}`
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

module.exports = {
  userBlogImages,
};
