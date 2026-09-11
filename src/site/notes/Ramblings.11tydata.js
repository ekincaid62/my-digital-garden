module.exports = {
  eleventyComputed: {
    blogPosts: (data) => {
      const posts = (data.collections?.note || []).filter(
        (post) =>
          post.data?.tags &&
          post.data.tags.includes("blog")
      );

      return posts.sort((a, b) => {
        const dateA = a.data?.["dg-note-properties"]?.date;
        const dateB = b.data?.["dg-note-properties"]?.date;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return new Date(dateB) - new Date(dateA);
      });
    },
  },
};
