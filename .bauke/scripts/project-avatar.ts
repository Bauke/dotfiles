import { Command, nodeFs } from "./dependencies.ts";

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

  if (nodeFs.existsSync(file)) {
    if (options.overwrite) {
      await Deno.remove(file);
    } else {
      console.log("File exists, use --overwrite to overwrite.");
      Deno.exit(1);
    }
  }

  await Deno.run({
    cmd: [
      "gegl",
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
  }).status();

  if (!nodeFs.existsSync(file)) {
    console.log("Something went wrong with GEGL.");
    Deno.exit(1);
  }

  await Deno.run({
    cmd: [
      "convert",
      file,
      "-background",
      "transparent",
      "-gravity",
      "center",
      "-extent",
      `${options.width}x${options.height}`,
      file,
    ],
  }).status();

  if (options.clean) {
    await Deno.run({ cmd: ["mat2", "--inplace", file] }).status();
  }
}

type GraphOptions = {
  fontSize: number;
  height: number;
  text: string;
  width: number;
};

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

  return graph.replace(/\s\s+/g, "\n").trim().split("\n");
}

if (import.meta.main) {
  void main();
}
