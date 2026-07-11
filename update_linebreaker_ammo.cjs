const fs = require('fs');

let typesContent = fs.readFileSync('types.ts', 'utf8');

const newLinebreakerAmmo = `  { name: "Linebreaker Rounds", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Unique super-dense alloy rounds. Count ranges out to 10 metres as point-blank for Scatter.", modifiers: "10m point-blank for Scatter" },\n`;

// Insert after Slug Rounds
typesContent = typesContent.replace(
  '{ name: "Slug Rounds"',
  newLinebreakerAmmo + '  { name: "Slug Rounds"'
);

fs.writeFileSync('types.ts', typesContent);

let constantsContent = fs.readFileSync('constants.tsx', 'utf8');

constantsContent = constantsContent.replace(
  'ammoType: "Standard Shells",\n        ammoClass: "Shotgun",',
  'ammoType: "Linebreaker Rounds",\n        ammoClass: "Shotgun",'
);

fs.writeFileSync('constants.tsx', constantsContent);
console.log('Updated Linebreaker ammo.');
