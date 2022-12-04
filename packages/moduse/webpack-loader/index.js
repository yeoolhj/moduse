module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const { include, abstractModule = "ModuleRoot" } = this.getOptions() || {};
  if (include && include.some((dir) => !!this.resourcePath.indexOf(dir))) {
    return content;
  }
  const moduseReg = new RegExp(`class \\w+ extends (${abstractModule})`);
  const importReg = new RegExp(`.+?(${abstractModule}).+?`);
  if (moduseReg.test(content)) {
    const imports = [];
    content = content.replace(
      /import (.+) from (['"]\.\/.+['"]);?/g,
      function (m, p1, p2) {
        if (importReg.test(p1)) return m;
        imports.push(
          `const ${p1} = require(${p2})` + (p1[0] === "{" ? ";" : ".default;")
        );
        return "";
      }
    );
    content += "\n" + imports.join("\n");
  }
  return content;
};
