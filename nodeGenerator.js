import fs from "fs/promises";

async function generate(config) {
  try {
    const { name, type } = config;

    const template = await fs.readFile("./src/nodes/BaseNode.jsx", "utf8");
    const output = template
      .replace("NAME", name)
      .replace("CONFIG", JSON.stringify(config, null, 2));
    await fs.writeFile(`./src/nodes/${name}.jsx`, output);

    const toolbar = await fs.readFile("./src/toolbar.jsx", "utf-8");
    const newNode = `<DraggableNode type="${type}" label="${name}" />\n        <span />`;
    if (toolbar.includes(newNode)) {
      throw new Error(`Node '${name}' already exists in toolbar`);
    }
    const newToolBar = toolbar.replace("<span />", newNode);
    await fs.writeFile("./src/toolbar.jsx", newToolBar);

    let ui = await fs.readFile("./src/ui.jsx", "utf-8");
    const newNodeType = `  ${type}: ${name},\n`;
    if (ui.includes(newNodeType)) {
      throw new Error(`Node type '${type}' already exists in ui`);
    }
    ui = ui.replace(/(const nodeTypes = \{[^}]*)\n\};/, `$1\n${newNodeType}};`);

    const importStatement = `import { ${name} } from "./nodes/${name}.jsx";`;
    const nodeImportPattern = /import { \w+ } from "\.\/nodes\/\w+\.jsx";/;

    if (ui.match(nodeImportPattern)) {
      ui = ui.replace(
        nodeImportPattern,
        (match) => match + "\n" + importStatement
      );
    }

    await fs.writeFile("./src/ui.jsx", ui);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

const config = {
  name: "KnowledgeBase4",
  type: "knowledgeBase4",
  handles: {
    source: 2,
    target: 1,
  },
};

generate(config);
