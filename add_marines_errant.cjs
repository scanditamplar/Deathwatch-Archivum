const fs = require('fs');
let constants = fs.readFileSync('constants.tsx', 'utf8');

// 1. Add to CHAPTERS
if (!constants.includes('"Marines Errant"')) {
    constants = constants.replace(
        /"Red Scorpions"\s*\];/,
        '"Red Scorpions", "Marines Errant"\n];'
    );
}

// 2. Add to CHAPTER_NAMES
if (!constants.includes('    "Marines Errant": {')) {
    const chapterNamesAddition = `  "Marines Errant": {
    first: ["Titus", "Severian", "Justiar", "Cador", "Aetius", "Decius", "Leontis", "Gaius", "Marcus", "Kail"],
    last: ["Vane", "Kael", "Thor", "Agemman", "Varrus", "Kastor", "Galeo", "Furio", "Castigon"]
  },`;
    constants = constants.replace(
        /export const CHAPTER_NAMES: Record<string, \{ first: string\[\], last: string\[\] \}> = \{/,
        "export const CHAPTER_NAMES: Record<string, { first: string[], last: string[] }> = {\n" + chapterNamesAddition
    );
}

// 3. Add to CHAPTER_DATA
if (!constants.includes('soloAbility: "Zero Tolerance",')) {
    const chapterDataAddition = `  "Marines Errant": {
    modifiers: { Ag: 5, S: 5 },
    talents: [],
    skills: ["Common Lore (Imperial Navy)"],
    soloAbility: "Zero Tolerance",
    restrictions: [],
    demeanorName: "Shepherd of Assets",
    demeanorSummary: "Adept at marshalling resources and preserving/restoring wargear.",
    demeanorDescription: "The Marines Errant are keenly aware of their scattered companies, that they cannot draw upon the same amount of resources or manpower at any one moment as other stronger Chapters can. In part, this is the result of the crusading nature of the Marines Errant and the toll that centuries of fighting far flung wars has wrought upon the military materiel available to each of its dispersed battle groups. As such, the Marines Errant have become highly adept at marshalling their own resources, preserving and restoring even the most heavily damaged wargear.",
    summary: "A scattered crusading chapter adept at resource management.",
    curseName: "Vigil of the Lost",
    curseLevels: {
      1: { name: "Distracted by the Void", summary: "Haunted by the distance of their brothers.", full: "The vast distances between the Chapter's assets weigh heavily on the Marine's mind." },
      2: { name: "Resource Paranoia", summary: "Reluctant to expend any irreplaceable wargear.", full: "The Marine develops an extreme aversion to using valuable resources or risking rare artifacts." },
      3: { name: "Isolationist Frenzy", summary: "Refuses help from outsiders.", full: "The Marine refuses to accept assistance from anyone outside the Chapter or Kill-Team." }
    }
  },`;
    constants = constants.replace(
        /export const CHAPTER_DATA: \{ \[key: string\]: ChapterDetails \} = \{/,
        "export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {\n" + chapterDataAddition
    );
}

fs.writeFileSync('constants.tsx', constants);
console.log('Done modifying constants.tsx');
