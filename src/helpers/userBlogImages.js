const fs = require("fs");

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

    // By publish time, Obsidian Digital Garden has already converted
    // ![[Vault/assets/...]] into standard markdown image syntax with the
    // final /img/user/... URL already resolved. Just grab that URL.
    const match = source.match(/!\[[^\]]*\]\(([^)]+)\)/);

    if (!match) {
      console.warn(`[blog image] No image found in ${inputPath}`);
      return null;
    }

    return match[1].trim();
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
