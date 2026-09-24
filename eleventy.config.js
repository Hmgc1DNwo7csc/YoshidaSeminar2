module.exports = function (eleventyConfig) {
  // 静的アセットはそのままコピー
  eleventyConfig.addPassthroughCopy("assets");

  // "posts" タグが付いたコンテンツを新着順（降順）に並べたコレクション
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date);
  });

  // 日付表示用フィルタ（例: 2026年6月15日）
  eleventyConfig.addFilter("dateJa", (dateObj) => {
    const d = new Date(dateObj);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
