const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `  {
    name: "Vulkan’s Anvil",
    category: "Salamanders powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian draws upon the unyielding endurance that the Salamanders are legendary for, becoming an anvil against the attacks of his enemies. There is little that can strike a Librarian down when he manifests this power. The Librarian gains a Force Field with a protection rating equal to 5 x Psy Rating. This force field cannot overload."
  },`;

const newPowers = `  {
    name: "Heart of the Khan",
    category: "White Scars powers",
    action: "Full",
    opposed: "No",
    range: "1 metre x PR",
    sustained: "Yes",
    description: "The Stormseer reaches deep into the legacy of Jaghatai Khan, and brings forth the legendary swiftness and ferocity of the White Scars’ Primarch. While this power is in effect, the Librarian or a target of his choosing (who must be a White Scars Space Marine, or from a White Scars Successor Chapter) increases his WS and Ag by +5 x PR (to a maximum of 95), with any corresponding increase to his Agility Bonus."
  },
  {
    name: "Spirits of the Steppes",
    category: "White Scars powers",
    action: "Full",
    opposed: "No",
    range: "50 metres x PR",
    sustained: "Yes",
    description: "The Stormseer calls upon the spirits of the land, air, and the souls of long-dead warriors to bring some fragment of the harsh steppes of Chogoris to the battlefield he walks upon. It is said that so long as these forces of nature fight alongside them, the White Scars will always be victorious. The Librarian and all his allies within range gain a bonus to all tests equal to 2xPR, while all enemies within that range suffer the same value as a penalty. In addition, every turn the Librarian spends an action to sustain this power, he may summon a single bolt of lightning against any single enemy within range, dealing 2d10+PR damage with a Pen of 4 and the Shocking quality, though the target may attempt to dodge this attack."
  },
  {
    name: "Stormlance",
    category: "White Scars powers",
    action: "Half",
    opposed: "No",
    range: "Self or 10 metres x PR",
    sustained: "No",
    description: "The Stormseer calls upon the lightning that embodies his Chapter’s way of war, and brings it to bear against his enemies. If he is in melee when this power is used, he gains a bonus to damage equal to his Psy Rating, and adds the Shocking quality to a single melee weapon he is wielding, until the start of his next turn. Otherwise, he hurls a bolt of lightning in a straight line out to its maximum range, striking everything in its path. Any creature, friend or foe, that the lightning passes through, suffers 1d10 x PR Energy damage with a Pen of 5 and the Shocking quality."
  },
  {
    name: "The Howling Wind",
    category: "White Scars powers",
    action: "Free",
    opposed: "No",
    range: "5 metres x PR",
    sustained: "No",
    description: "The Stormseer gathers the powerful winds of the Chogorian steppes, driving them forwards to cast aside the enemy. This power generates a 30 degree cone out to its maximum range, and all creatures within that area must take a Strength Test, with a penalty equal to –5 x PR. Failure means that they are pushed back a number of metres equal to their Degrees of Failure and knocked prone."
  },`;

if (content.includes(target)) {
    content = content.replace(target, target + "\n" + newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated powers');
} else {
    console.log('Could not find anchor text');
}
