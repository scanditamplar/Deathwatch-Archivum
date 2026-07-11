const fs = require('fs');
let data = fs.readFileSync('constants.tsx', 'utf8');

const newRelic = `
  {
    name: "The Hand of Retribution",
    chapter: "Crimson Fists",
    type: "wargear",
    summary: "Power Fist (2d10+2 E, Pen 9, Power Field), lacks Unwieldy.",
    description: "This finely crafted power fist had a storied history within the Crimson Fists before being lost in a desperate boarding action aboard the space hulk Malignant Eternity. It was recovered with the aid of information revealed by the Omega Vault about the nature and location of the hulk. The grateful Chapter left the artefact in the care of those who had aided in recovering it. Rules: The Hand of Retribution is finely crafted, containing the full heft and power of the mightiest Astartes power fist in what appears to be merely an oversized gauntlet. It lacks the Unwieldy quality typical of power fists, and suffers only the normal penalty for power armour to tests involving fine manipulation.",
    stats: {
      weapon: {
        name: "The Hand of Retribution (Power Fist)",
        damage: "2d10+2 E",
        pen: 9,
        special: "Power Field"
      }
    },
    modifiers: {
      traits: ["The Hand of Retribution (Lacks Unwieldy)"]
    }
  },`;

data = data.replace(
  /export const RELIC_WARGEAR = \[/,
  "export const RELIC_WARGEAR = [" + newRelic
);

fs.writeFileSync('constants.tsx', data);
