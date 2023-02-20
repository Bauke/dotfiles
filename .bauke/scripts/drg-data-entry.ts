import { Command } from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";
import * as prompt from "https://deno.land/x/cliffy@v0.25.5/prompt/mod.ts";

const CaveComplexity = [1, 2, 3] as const;
const CaveLength = [1, 2, 3] as const;
const HazardLevel = [1, 2, 3, 4, 5] as const;

const MissionTypes = [
  "Egg Hunt",
  "Elimination",
  "Escort Duty",
  "Industrial Sabotage",
  "Mining Expedition",
  "On-site Refining",
  "Point Extraction",
  "Salvage Operation",
] as const;

const Collectables = [
  "Barley Bulb",
  "Bismor",
  "Croppa",
  "Enor Pearl",
  "Jadiz",
  "Magnite",
  "Malt Star",
  "Phazyonite",
  "Plagueheart",
  "Starch Nut",
  "Umanite",
  "Yeast Cone",
] as const;

type Mission = {
  "Date": string;
  "Index": number;

  "Class Level": number;
  "Profile Rank": number;
  "Solo": boolean;

  "Cave Complexity": typeof CaveComplexity[number];
  "Cave Length": typeof CaveLength[number];
  "Duration": number;
  "Hazard Level": typeof HazardLevel[number];
  "Mission Status": "Completed" | "Failed";
  "Mission Type": typeof MissionTypes[number];

  "Credits": number;
  "Experience": number;
  "Items Collected": Record<typeof Collectables[number], number>;

  "Credit Breakdown": {
    "Primary Objective": number;
    "Secondary Objective": number;
    "Survival Bonus": number;
    "Gold Mined": number;

    "Bittergem": number;
    "Ebonite Mutation": number;
    "Kursite Infection": number;
    "OMEN Modular Exterminator": number;
    "Tritilyte Shard": number;
    "Tyrant Shard": number;
  };

  "Experience Breakdown": {
    "Primary Objective": number;
    "Secondary Objective": number;
    "Minerals Mined": number;
    "Hostiles Killed": number;

    "Double XP": number;
    "Ebonite Mutation": number;
    "Kursite Infection": number;
    "OMEN Modular Exterminator": number;
    "Plagueheart": number;
    "Tritilyte Shard": number;
    "Tyrant Shard": number;
  };
};

async function main(): Promise<void> {
  const { options } = await new Command()
    .name("drg-data-entry")
    .description("Deep Rock Galactic data tracker")
    .option("--data-file <dataFile:file>", "The JSON file to store data in.", {
      default: new URL("../data/drg-data.json", import.meta.url).pathname,
    })
    .option("--add", "Add a new mission.")
    .option("--testing", "Don't write anything to file.")
    .parse(Deno.args);

  const dataMissions: Mission[] = JSON.parse(
    await Deno.readTextFile(options.dataFile),
  );
  dataMissions.sort((a, b) => b.Index - a.Index);

  if (options.add) {
    const promptResults = await prompt.prompt(
      [
        {
          type: prompt.Input,
          name: "Date",
          message: "Date",
          default: new Date().toISOString().slice(0, 10),
        },
        {
          type: prompt.Number,
          name: "Class Level",
          message: "Class Level",
        },
        {
          type: prompt.Number,
          name: "Profile Rank",
          message: "Profile Rank",
        },
        {
          type: prompt.Confirm,
          name: "Solo",
          message: "Solo",
          default: true,
        },
        {
          type: prompt.Select,
          name: "Cave Complexity",
          message: "Cave Complexity",
          options: CaveComplexity.map((value) => ({
            name: `Complexity ${value}`,
            value: value.toString(),
          })),
        },
        {
          type: prompt.Select,
          name: "Cave Length",
          message: "Cave Length",
          options: CaveLength.map((value) => ({
            name: `Length ${value}`,
            value: value.toString(),
          })),
        },
        {
          type: prompt.Number,
          name: "Duration",
          message: "Duration",
        },
        {
          type: prompt.Select,
          name: "Hazard Level",
          message: "Hazard Level",
          options: HazardLevel.map((value) => ({
            name: `Hazard ${value}`,
            value: value.toString(),
          })),
          default: "5",
        },
        {
          type: prompt.Select,
          name: "Mission Status",
          message: "Mission Status",
          options: ["Completed", "Failed"].map((value) => ({
            name: value,
            value,
          })),
        },
        {
          type: prompt.Select,
          name: "Mission Type",
          message: "Mission Type",
          options: MissionTypes.map((value) => ({
            name: value,
            value,
          })),
        },
        {
          type: prompt.Number,
          name: "Credits",
          message: "Credits",
        },
        {
          type: prompt.Number,
          name: "Experience",
          message: "Experience",
        },
        {
          type: prompt.Number,
          name: "Collectable:Barley Bulb",
          message: "Barley Bulb",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Bismor",
          message: "Bismor",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Croppa",
          message: "Croppa",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Enor Pearl",
          message: "Enor Pearl",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Jadiz",
          message: "Jadiz",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Magnite",
          message: "Magnite",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Malt Star",
          message: "Malt Star",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Phazyonite",
          message: "Phazyonite",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Plagueheart",
          message: "Plagueheart",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Starch Nut",
          message: "Starch Nut",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Umanite",
          message: "Umanite",
          default: 0,
        },
        {
          type: prompt.Number,
          name: "Collectable:Yeast Cone",
          message: "Yeast Cone",
          default: 0,
        },
      ],
    );

    const newMission: Mission = {
      "Date": promptResults["Date"]!,
      "Index": (dataMissions[0]?.Index ?? 0) + 1,

      "Class Level": promptResults["Class Level"]!,
      "Profile Rank": promptResults["Profile Rank"]!,
      "Solo": promptResults["Solo"]!,

      "Cave Complexity": Number(
        promptResults["Cave Complexity"],
      ) as Mission["Cave Complexity"],
      "Cave Length": Number(
        promptResults["Cave Length"],
      ) as Mission["Cave Length"],
      "Duration": promptResults["Duration"]!,
      "Hazard Level": Number(
        promptResults["Hazard Level"],
      ) as Mission["Hazard Level"],
      "Mission Status":
        promptResults["Mission Status"] as Mission["Mission Status"],
      "Mission Type": promptResults["Mission Type"] as Mission["Mission Type"],

      "Credits": promptResults["Credits"]!,
      "Experience": promptResults["Experience"]!,
      "Items Collected": {
        "Barley Bulb": promptResults["Collectable:Barley Bulb"]!,
        "Bismor": promptResults["Collectable:Bismor"]!,
        "Croppa": promptResults["Collectable:Croppa"]!,
        "Enor Pearl": promptResults["Collectable:Enor Pearl"]!,
        "Jadiz": promptResults["Collectable:Jadiz"]!,
        "Magnite": promptResults["Collectable:Magnite"]!,
        "Malt Star": promptResults["Collectable:Malt Star"]!,
        "Phazyonite": promptResults["Collectable:Phazyonite"]!,
        "Plagueheart": promptResults["Collectable:Plagueheart"]!,
        "Starch Nut": promptResults["Collectable:Starch Nut"]!,
        "Umanite": promptResults["Collectable:Umanite"]!,
        "Yeast Cone": promptResults["Collectable:Yeast Cone"]!,
      },
    };

    if (options.testing) {
      console.log(newMission);
      return;
    }

    dataMissions.push(newMission);
    await Deno.writeTextFile(
      options.dataFile,
      JSON.stringify(dataMissions, null, 2) + "\n",
    );
  }
}

if (import.meta.main) {
  void main();
}
