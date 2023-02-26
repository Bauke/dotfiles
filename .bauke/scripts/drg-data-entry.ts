import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import * as prompt from "https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts";

import { stringifyJsonPretty } from "./utilities.ts";

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
    "Gold Mined (Gold)": number;
    "Gold Mined (Credits)": number;

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

  "Performance": {
    "Kill Count": number;
    "Mineral Count": number;
    "Revives": number;
    "Downs": number;
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
    console.log("## General Info");
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
      ],
    );

    console.log("## Collectables");
    const collectableResults = await prompt.prompt([
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
    ]);

    console.log("## Credits Breakdown");
    const creditResults = await prompt.prompt([
      {
        type: prompt.Number,
        name: "Credits:Primary Objective",
        message: "Credits: Primary Objective",
      },
      {
        type: prompt.Number,
        name: "Credits:Secondary Objective",
        message: "Credits: Secondary Objective",
      },
      {
        type: prompt.Number,
        name: "Credits:Survival Bonus",
        message: "Credits: Survival Bonus",
      },
      {
        type: prompt.Number,
        name: "Credits:Gold Mined (Gold)",
        message: "Credits: Gold Mined (Gold)",
      },
      {
        type: prompt.Number,
        name: "Credits:Gold Mined (Credits)",
        message: "Credits: Gold Mined (Credits)",
      },
      {
        type: prompt.Number,
        name: "Credits:Bittergem",
        message: "Credits: Bittergem",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Credits:Ebonite Mutation",
        message: "Credits: Ebonite Mutation",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Credits:Kursite Infection",
        message: "Credits: Kursite Infection",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Credits:OMEN Modular Exterminator",
        message: "Credits: OMEN Modular Exterminator",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Credits:Tritilyte Shard",
        message: "Credits: Tritilyte Shard",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Credits:Tyrant Shard",
        message: "Credits: Tyrant Shard",
        default: 0,
      },
    ]);

    console.log("## Experience Breakdown");
    const experienceResults = await prompt.prompt([
      {
        type: prompt.Number,
        name: "Experience:Primary Objective",
        message: "Experience: Primary Objective",
      },
      {
        type: prompt.Number,
        name: "Experience:Secondary Objective",
        message: "Experience: Secondary Objective",
      },
      {
        type: prompt.Number,
        name: "Experience:Minerals Mined",
        message: "Experience: Minerals Mined",
      },
      {
        type: prompt.Number,
        name: "Experience:Hostiles Killed",
        message: "Experience: Hostiles Killed",
      },
      {
        type: prompt.Number,
        name: "Experience:Double XP",
        message: "Experience: Double XP",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:Ebonite Mutation",
        message: "Experience: Ebonite Mutation",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:Kursite Infection",
        message: "Experience: Kursite Infection",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:OMEN Modular Exterminator",
        message: "Experience: OMEN Modular Exterminator",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:Plagueheart",
        message: "Experience: Plagueheart",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:Tritilyte Shard",
        message: "Experience: Tritilyte Shard",
        default: 0,
      },
      {
        type: prompt.Number,
        name: "Experience:Tyrant Shard",
        message: "Experience: Tyrant Shard",
        default: 0,
      },
    ]);

    console.log("## Performance");
    const performanceResults = await prompt.prompt([
      {
        type: prompt.Number,
        name: "Performance:Kill Count",
        message: "Performance: Kill Count",
      },
      {
        type: prompt.Number,
        name: "Performance:Mineral Count",
        message: "Performance: Mineral Count",
      },
      {
        type: prompt.Number,
        name: "Performance:Revives",
        message: "Performance: Revives",
      },
      {
        type: prompt.Number,
        name: "Performance:Downs",
        message: "Performance: Downs",
      },
    ]);

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
        "Barley Bulb": collectableResults["Collectable:Barley Bulb"]!,
        "Bismor": collectableResults["Collectable:Bismor"]!,
        "Croppa": collectableResults["Collectable:Croppa"]!,
        "Enor Pearl": collectableResults["Collectable:Enor Pearl"]!,
        "Jadiz": collectableResults["Collectable:Jadiz"]!,
        "Magnite": collectableResults["Collectable:Magnite"]!,
        "Malt Star": collectableResults["Collectable:Malt Star"]!,
        "Phazyonite": collectableResults["Collectable:Phazyonite"]!,
        "Plagueheart": collectableResults["Collectable:Plagueheart"]!,
        "Starch Nut": collectableResults["Collectable:Starch Nut"]!,
        "Umanite": collectableResults["Collectable:Umanite"]!,
        "Yeast Cone": collectableResults["Collectable:Yeast Cone"]!,
      },

      "Credit Breakdown": {
        "Primary Objective": creditResults["Credits:Primary Objective"]!,
        "Secondary Objective": creditResults["Credits:Secondary Objective"]!,
        "Survival Bonus": creditResults["Credits:Survival Bonus"]!,
        "Gold Mined (Gold)": creditResults["Credits:Gold Mined (Gold)"]!,
        "Gold Mined (Credits)": creditResults["Credits:Gold Mined (Credits)"]!,

        "Bittergem": creditResults["Credits:Bittergem"]!,
        "Ebonite Mutation": creditResults["Credits:Ebonite Mutation"]!,
        "Kursite Infection": creditResults["Credits:Kursite Infection"]!,
        "OMEN Modular Exterminator":
          creditResults["Credits:OMEN Modular Exterminator"]!,
        "Tritilyte Shard": creditResults["Credits:Tritilyte Shard"]!,
        "Tyrant Shard": creditResults["Credits:Tyrant Shard"]!,
      },

      "Experience Breakdown": {
        "Primary Objective": experienceResults["Experience:Primary Objective"]!,
        "Secondary Objective":
          experienceResults["Experience:Secondary Objective"]!,
        "Minerals Mined": experienceResults["Experience:Minerals Mined"]!,
        "Hostiles Killed": experienceResults["Experience:Hostiles Killed"]!,

        "Double XP": experienceResults["Experience:Double XP"]!,
        "Ebonite Mutation": experienceResults["Experience:Ebonite Mutation"]!,
        "Kursite Infection": experienceResults["Experience:Kursite Infection"]!,
        "OMEN Modular Exterminator":
          experienceResults["Experience:OMEN Modular Exterminator"]!,
        "Plagueheart": experienceResults["Experience:Plagueheart"]!,
        "Tritilyte Shard": experienceResults["Experience:Tritilyte Shard"]!,
        "Tyrant Shard": experienceResults["Experience:Tyrant Shard"]!,
      },

      "Performance": {
        "Kill Count": performanceResults["Performance:Kill Count"]!,
        "Mineral Count": performanceResults["Performance:Mineral Count"]!,
        "Revives": performanceResults["Performance:Revives"]!,
        "Downs": performanceResults["Performance:Downs"]!,
      },
    };

    if (options.testing) {
      console.log(stringifyJsonPretty(newMission));
      return;
    }

    dataMissions.push(newMission);
    await Deno.writeTextFile(
      options.dataFile,
      stringifyJsonPretty(dataMissions) + "\n",
    );
  }
}

if (import.meta.main) {
  void main();
}
