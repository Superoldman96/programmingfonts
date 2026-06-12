const data = require("./fonts.json");
let ok = true;

for (const [alias, font] of Object.entries(data)) {
  if (!font.group) continue;

  // Self-reference is valid — this font is a parent
  if (font.group === alias) continue;

  // Group key must exist
  if (!data[font.group]) {
    console.error(
      `${alias}: group "${font.group}" does not match any font key`,
    );
    ok = false;
    continue;
  }

  // Target must be a parent (self-referencing), not another child — no two-level nesting
  if (data[font.group].group !== font.group) {
    console.error(
      `${alias}: group "${font.group}" is not a parent (a parent must have group equal to its own key)`,
    );
    ok = false;
  }
}

if (!ok) process.exit(1);
