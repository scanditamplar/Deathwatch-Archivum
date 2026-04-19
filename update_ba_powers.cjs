const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const oldPower = `  {
    name: "Blood Boil",
    category: "Blood Angels powers",
    description: "Cause the blood of your enemies to boil and erupt."
  },`;

const newPowers = `  {
    name: "Blood Boil",
    category: "Blood Angels powers",
    action: "Half",
    opposed: "Yes",
    range: "10 metre x PR",
    sustained: "No",
    description: "With a blast of psychic power, the Librarian superheats the target’s blood, flash-boiling it and causing it to burst from their eyes, mouth, and ears. This power can only be used against a single target. The target of a Blood Boil will suffer 1d10 Energy damage plus 2 extra points of damage x PR (to a maximum of 1d10+20) which is not reduced by armour or Toughness. If the target is killed by this attack then he explodes in a crimson shower, spattering those nearby with scalding blood. All creatures within 5 metres of an exploding target take 2d10 Energy damage to their least armoured location.\\nManifesting Blood Boil is taxing for a Librarian, and inflicts 1 level of fatigue upon him, whether or not the target resists."
  },
  {
    name: "Blood Lance",
    category: "Blood Angels powers",
    action: "Half",
    opposed: "No",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian throws out his arm and hurls a blazing crimson lance that impales anything in its path. The Blood Lances traces a straight line from the Librarian out to the extent of the power’s range. Any creature (friend or foe) that the lance passes through suffers 1d10 x PR Rending damage that is not reduced by Toughness Bonus. Armour and cover protect as normal."
  },
  {
    name: "Fear the Darkness",
    category: "Blood Angels powers",
    action: "Half",
    opposed: "Yes",
    range: "25 metres x PR",
    sustained: "Yes",
    description: "Casting a psychic shadow across the battlefield, the Librarian fills his foes with intense dread and terror. This power affects a number of foes equal to the Librarian’s PR. Those affected by this power count all enemies as having the Fear 1 (Frightening) Trait. Enemies that already cause Fear have their Fear level increased by 1 (to a maximum of Fear 4) against those affected by this power. If this power is sustained, targets may make a Willpower Test with a penalty of –5 x PR at the start of each of their turns to shake off the effects."
  },
  {
    name: "Might of Heroes",
    category: "Blood Angels powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Focusing his will, the Blood Angels Librarian enhances his strength and summons up a deep well of rage. While this power is in effect, the Blood Angels Librarian adds +5 x PR to his Strength (to a maximum of 95), with any corresponding increase to his Strength Bonus."
  },
  {
    name: "Shackle Soul",
    category: "Blood Angels powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "Reaching into the soul of his foe, the Librarian binds it in powerful bands of psychic energy. This power affects a single creature chosen by the Librarian. The Blood Angel may choose to prevent those affected by the power from doing one of the following things on its next turn: moving, making a range attack, making a melee attack or using a Psychic Power. If this power is sustained then the Librarian must win an Opposed Willpower Test each turn to affect the target, though he may choose a different action to prohibit from Round to Round. If the target ever wins the Opposed Test then the power immediately ends."
  },
  {
    name: "Wings of Sanguinius",
    category: "Blood Angels powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian sprouts a pair of blood red wings of psychic energy from his back that can bear him aloft. While this power is in effect, the Librarian gains the Flyer Trait (see page 132) with a Movement equal to his PR."
  },`;

if (content.includes(oldPower)) {
    content = content.replace(oldPower, newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Blood Angels powers');
} else {
    console.log('Could not find old Blood Boil entry');
}
