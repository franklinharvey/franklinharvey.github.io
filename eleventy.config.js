import path from "node:path";
import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (Number.isNaN(d.getTime())) return String(dateObj);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(d);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    const inputPath = path.isAbsolute(src)
      ? src
      : path.resolve(path.dirname(this.page.inputPath), src);
    const altText = alt ?? "";
    const sizesAttr =
      sizes ?? "(min-width: 40em) 42rem, 100vw";

    // Do not set transformOnRequest: in serve mode eleventy-img skips real output and
    // returns a stats object instead of HTML, which surfaces as "[object Object]" in Nunjucks.
    return Image(inputPath, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "_site/img",
      urlPath: "/img/",
      returnType: "html",
      htmlOptions: {
        imgAttributes: {
          alt: altText,
          sizes: sizesAttr,
          loading: "lazy",
          decoding: "async",
        },
      },
    });
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
