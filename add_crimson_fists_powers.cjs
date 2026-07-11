const fs = require('fs');
let data = fs.readFileSync('constants.tsx', 'utf8');

const crimsonFistsPowers = `
  {
    name: "Bloody Fist",
    category: "Crimson Fists powers",
    xpCost: 1500,
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Crimson Fists Librarians have mastered powers which aid them in the destruction of xenos, especially those with tough hides and thick skins that might thwart a normal attack or rob it of its power. With the Bloody Fist power, the Librarian infuses his melee attack with extra force allowing him to inflict some Damage even if his blow does not breech the creatures armour or hide. While this power is active, any melee attack from the Librarian has a chance of causing a critical effect even if it does not penetrate his foe’s armour or Toughness. On a successful hit with a melee attack, in addition to any other effects, the target must make a Routine (+20) Toughness Test. This test is modified by a penalty of Psy Rating x –5. If it fails, it suffers a critical effect as if it has suffered 1d5 points of Critical Damage from the weapon. No actual Damage is inflicted, and the effects of criticals last only as long as the power is maintained.",
    requirements: "WP 45+"
  },
  {
    name: "Enduring Duty",
    category: "Crimson Fists powers",
    xpCost: 1000,
    action: "Free Action",
    opposed: "No",
    range: "5m x Psy Rating",
    sustained: "Yes",
    description: "Duty is paramount to a Crimson Fists Space Marine and even when the shadow of death falls upon him or his companions he will continue to fight on to the end. The Librarian steels his own spirit or that of one of his companions to fight on to the end, even when the body should have given up and all hope is gone. Either the Librarian or a single ally within range can be the target of enduring duty. While the power is maintained, the target can fight on for a number of turns equal to Psy Rating after he suffers a critical result which will kill him and ignores any levels of Fatigue gained as a result of Critical Damage. At the end of this time he dies as normal (though he may still burn a Fate Point to survive as normal). He still retains the effects of any Damage accrued from Critical Damage (such as missing limbs or lost eyes) and should he suffer further Critical Damage rolls a 1d10 on the appropriate critical effects table to see if he suffers further crippling injuries ignoring any result of death or levels of Fatigue. Even with the psychic will of the Librarian sustaining him, the Battle-Brother can still be destroyed (and killed) if he suffers twice his total starting number of wounds (after reduction for armour and Toughness Bonus) in a single hit. A Battle-Brother who is under the effects of this Power cannot regain lost Wounds or repair effects accrued as a result of Critical Damage. Any abilities or actions that would do so simply do not work on the Battle-Brother.",
    requirements: ""
  },
  {
    name: "Hammer of Man",
    category: "Crimson Fists powers",
    xpCost: 1500,
    action: "Full Action",
    opposed: "Yes",
    range: "10m x Psy Rating Radius",
    sustained: "Yes",
    description: "The Crimson Fists Librarian focuses his hatred of xenos into a tangible force which he projects out around him causing pain and anguish to any who are not human. While this power is active, all xenos in the radius must make an Opposed Willpower Test against the Librarian at the start of each of their turns. If they fail, they suffer Energy Damage equal to twice the Librarian’s Psy Rating (with no reduction for armour) and suffer a penalty of 3 x Psy Rating on all Tests. Any xenos affected by this power will be instantly aware of its source and may seek out the Librarian as a target to end their pain. This power only effects xenos and has no effect on creatures which are not truly alive (such as daemons or machines) or have even a small degree of human ancestry (such as most mutants, abhumans, and of course Space Marines).",
    requirements: "WP 35+"
  },`;

data = data.replace(
  /export const LIBRARIAN_PSYCHIC_POWERS = \[/,
  "export const LIBRARIAN_PSYCHIC_POWERS = [" + crimsonFistsPowers
);

fs.writeFileSync('constants.tsx', data);
