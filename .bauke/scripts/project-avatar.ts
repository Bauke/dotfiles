import { Command } from "./dependencies.ts";
import { pathExists, runCommand } from "./utilities.ts";

async function main(): Promise<void> {
  const { args, options } = await new Command()
    .name("project-avatar")
    .description("Project Avatar Generator")
    .arguments("<file:file> <text:string>")
    .option("--width <width:number>", "The width of the image.", {
      default: 256,
    })
    .option("--height <height:number>", "The height of the image.", {
      default: 256,
    })
    .option("--font-size <font-size:number>", "Font size for the text.", {
      default: 150,
    })
    .option("--overwrite", "Overwrite an existing image.")
    .option("--clean", "Use MAT2 to clean the image.")
    .parse(Deno.args);

  const [file, text] = args;

  if (await pathExists(file)) {
    if (options.overwrite) {
      await Deno.remove(file);
    } else {
      console.log("File exists, use --overwrite to overwrite.");
      Deno.exit(1);
    }
  }

  await runCommand("gegl", {
    args: [
      "-o",
      file,
      "--",
      ...geglGraph({
        fontSize: options.fontSize,
        height: options.height,
        text,
        width: options.width,
      }),
    ],
  });

  if (!await pathExists(file)) {
    console.log("Something went wrong with GEGL.");
    Deno.exit(1);
  }

  await runCommand("convert", {
    args: [
      file,
      "-background",
      "transparent",
      "-gravity",
      "center",
      "-extent",
      `${options.width}x${options.height}`,
      file,
    ],
  });

  if (options.clean) {
    await runCommand("mat2", { args: ["--inplace", file] });
  }
}

/** Customizable options for the GEGL graph. */
type GraphOptions = {
  fontSize: number;
  height: number;
  text: string;
  width: number;
};

/** Create the GEGL graph for the project avatar image. */
function geglGraph({ fontSize, height, text, width }: GraphOptions): string[] {
  const graph = `
  gegl:text
    string=${text}
    width=${width}
    height=${height}
    color=white
    font=Inter Heavy
    size=${fontSize}
    alignment=1
    vertical-alignment=1
  gegl:dropshadow
    x=0
    y=0
    color=black
    opacity=1
    grow-radius=4
    radius=0
  gegl:long-shadow
    angle=90
    color=black
    length=20`;

  // Replace duplicate whitespace with newlines and then split by those newlines.
  return graph.replace(/\s\s+/g, "\n").trim().split("\n");
}

if (import.meta.main) {
  void main();
}
