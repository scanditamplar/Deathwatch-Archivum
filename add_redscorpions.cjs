const fs = require('fs');

const constantsPath = 'constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

// 1. CHAPTERS
constantsContent = constantsContent.replace(
  /"Blood Ravens"/g,
  '"Blood Ravens", "Red Scorpions"'
);

// 2. CHAPTER_NAMES
constantsContent = constantsContent.replace(
  /"Blood Ravens": {/g,
  `"Red Scorpions": {
    first: ["Severin", "Casan", "Haas", "Tarn", "Zell", "Ortis", "Bane", "Cull", "Gere", "Rurik", "Arcturus", "Kull", "Rauth", "Gilead"],
    last: ["Loth", "Sabius", "Culln", "Magister", "Aath", "Kurgis", "Sora", "Thar", "Varr", "Dragan", "Krell", "Bale"]
  },
  "Blood Ravens": {`
);

// 3. CHAPTER_DATA
constantsContent = constantsContent.replace(
  /"Space Wolves": {/g,
  `"Red Scorpions": {
    modifiers: { WP: 5 },
    talents: ["Resistance (Mutation)"],
    soloAbility: "Taint Sense",
    restrictions: [],
    demeanorName: "Path of the Pure",
    demeanorSummary: "Fanatical obsession with genetic purity and detecting corruption.",
    demeanorDescription: "The Red Scorpions Chapter prides itself on the purity of its Battle-Brothers and the sanctity of its gene-seed. In the eyes of the Chapter masters, few other members of the Adpetus Astartes can lay claim to such a lineage and a genetic link to the Emperor, while those outside the Adeptus Astartes are almost always tainted by corruption despite any protests of loyalty or claims about the strength of their humanity. Protecting and preserving their purity, and eliminating all signs of taint are therefore very important to the Red Scorpions and part of every Battle-Brother’s training and daily observances. While all Space Marines abhor mutants and aliens, the Red Scorpions reserve a special vehemence for them. The line Red Scorpions draw between those the Imperium considers human and those it does not is far higher than almost any other Chapter, usually making the distinction that unless a man can claim direct descent from the Emperor himself (like the Red Scorpions) he is a flawed being despite his intentions. This fanaticism for extreme genetic purity is most pronounced when in the presence of those tainted by the Ruinous Powers, or those suspected of such taint. All it takes is suspicion for the Red Scorpions to shift their stance with their allies, and once the hint of taint has attached itself to such allies they must work hard to lift it by proving their devotion to the Emperor beyond any shadow of a doubt.",
    summary: "Zealous purists obsessed with the sanctity of the human form.",
    curseName: "Divine Purity",
    curseLevels: {
      1: { name: "Only the Pure", summary: "-10 Fellowship with psykers/mutants.", full: "The Battle-Brother has come to question the purity of all the servants of the God-Emperor and cannot believe that they are somehow without fault or flaw. This is especially true of obviously tainted allies, despite any kind of sanctioning, such as psykers, abhumans, and navigators. When the Battle-Brother must deal with anyone with a psychic gift (not including Librarians of his own Chapter), or a mutation (no matter how benign or beneficial) he suffers a –10 to Fellowship Tests. Such a cold reception is almost always reciprocated and such individuals often feel intensely uncomfortable in the presence of the Battle-Brother, aware of the hulking warrior’s scorn, and worsen their Disposition by one step when in the Battle-Brothers presence." },
      2: { name: "True Sons of the Emperor", summary: "Disdain extends to other Chapters. -2 Squad Cohesion contribution (-1 if Red Scorpion is present).", full: "While it has always been held that the Adeptus Astartes stand above all other warriors of the God-Emperor, many of the Chapters consider themselves equals and there is usually a degree of respect afforded between Battle-Brothers no matter their origins. Red Scorpions can come to believe that this is a falsehood, and that no other Chapter can hope to match their loyalty, seeing other Space Marines are lesser copies of themselves and ultimately not as worthy of their position in the armies of the Emperor. The effects of Only the Pure (see above) now apply to Space Marines as well (with the exception of other Red Scorpions). In addition, if the Battle-Brother is squad leader he must reduce the amount of Cohesion he contributes to the Kill-team by 2, or 1 if there is at least one other Red Scorpion as part of the Kill-team." },
      3: { name: "None but Us", summary: "All Squad Mode abilities cost 1 additional Cohesion. Cannot benefit from Squad Mode abilities of other Chapters.", full: "In time, a Red Scorpions Battle-Brother can come to believe that only his Chapter alone can be trusted and those around him, despite their outward claims and displays of loyalty, are in fact unreliable; traitors waiting to turn their cloaks. Though the Battle-Brother would not move against such men without just cause, as such rash actions would shame his Chapter and go against the Codex Astartes which he holds in such high regard, he will be careful not to give them too much power over him or expose his back unless he has to. The Battle-Brother will not work well in a Kill-team with members of other Chapters. All Squad Mode abilities cost 1 additional Cohesion point if they include the Battle-Brother and the Battle-Brother cannot benefit at all from the Squad Mode abilities of other Chapters (though they may still be active and used by the other members of the Kill-team as normal)." }
    }
  },
  "Space Wolves": {`
);

// 4. CHAPTER_SOLO_MODE_ABILITIES
constantsContent = constantsContent.replace(
  /"A Taste for Blood": {/g,
  `"Taint Sense": {
    name: "Taint Sense",
    chapter: "Red Scorpions",
    requiredRank: 1,
    effects: "Red Scorpions are fanatical about the purity of their Chapter and their loyalty and devotion to the Emperor. This constant vigilance and unceasing suspicion of those less pure than themselves gives them the ability to gain a sense of corruption or disloyalty in their allies and enemies, hints that even the keenest eyed of Battle-Brothers might miss if they had not spent a lifetime seeking such signs. The Battle-Brother may make a Challenging (+0) Awareness Test when he meets an NPC for the first time to detect whether the NPC has more than 20 Corruption Points. The GM should secretly roll for the Battle-Brother so he does not know if the NPC does indeed hold taint or if he has simply failed to detect it. At the GM’s discretion he may grant the Battle-Brother a bonus of +10 to his Awareness Test if the NPC has more than 30 Corruption Points as the taint is easier to detect. In addition to detecting taint, the Battle-Brother is always vigilant for signs of betrayal and is rarely surprised when allies become enemies. If an ally (or NPC considered nonhostile) makes a surprise attack against the Battle-Brother, he can make a Challenging (+0) Awareness Test to not be surprised and act normally in the first round of combat.",
    improvement: "At Rank 4 the Battle-Brother becomes even more adept at detecting flaws in others and can detect corruption in NPCs with 10 or more Corruption Points. At Rank 7 the Battle-Brother can pre-empt the betrayal of an ally turning the tables on them; if he passes his Awareness Test he not only is not surprised but gains a surprise round against the ally."
  },
  "A Taste for Blood": {`
);

// 5. CHAPTER_ATTACK_PATTERNS
constantsContent = constantsContent.replace(
  /"Angel's Wrath": {/g,
  `"Codex Manoeuvres": {
    name: "Codex Manoeuvres",
    chapter: "Red Scorpions",
    action: "Full Action",
    cost: 4,
    sustained: true,
    effects: "The Red Scorpions revere the Codex Astartes as a religious text, sacred orders laid down by true servants of the God-Emperor and integral to the strength and effectiveness of the Chapter. In battle they can use the Codex to execute flawless attacks and provide an answering tactic to anything the enemy throws at them. The Battle-Brother’s Kill-team gains a number of re-rolls equal to the number of its members each turn (measured from the start of the squad leader’s turn to the start of his following turn) reflecting the greater efficiency which the squad works together while adhering to the Codex. These re-rolls form a pool which can be used by any Battle-Brother in support range of the squad leader and are replenished at the start of the next turn. Remember though that a dice roll can only ever be re-rolled once and the player must abide by the re-rolled result. This pool can be used to re-roll Weapon Skill, Ballistic Skill, Dodge, and Parry Tests.",
    improvement: "At Rank 4 activating this ability becomes a Half Action. At Rank 6 this ability costs 1 less point of Cohesion to activate."
  },
  "Angel's Wrath": {`
);

// 6. CHAPTER_DEFENSIVE_STANCES
constantsContent = constantsContent.replace(
  /"Angel's Grace": {/g,
  `"Corruption Resistance": {
    name: "Corruption Resistance",
    chapter: "Red Scorpions",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Red Scorpions are naturally resistant to corruption and daemonic influence, their purity protecting them to a greater degree than those more “flawed” warriors of the Adeptus Astartes. In addition to being able to detect the signs of taint, a Red Scorpions Battle-Brother can steel himself and those around him against it, through pure thought and an unyielding will. The Battle-Brother and those within Support Range gain a +10 to any Test to resist gaining Corruption Points and a +10 to any Opposed Test (such as resisting psychic powers) made against creatures with the Daemonic Trait. In addition, while a Battle-Brother is benefiting from this ability any Corruption Points he gains will be reduced by 1, or 2 if he is from the Red Scorpions Chapter.",
    improvement: "At Rank 4 the bonus to resist Corruption and Opposed Tests with daemonic creatures increases to +20, at Rank 7 Corruption Points are reduced by a further 1 point (meaning Battle-Brothers receive 2 less Corruption Points or 3 less Corruption Points if they are Red Scorpions)."
  },
  "Angel's Grace": {`
);

// 7. LIBRARIAN_PSYCHIC_POWERS
constantsContent = constantsContent.replace(
  /export const LIBRARIAN_PSYCHIC_POWERS = \[/,
  `export const LIBRARIAN_PSYCHIC_POWERS = [
  {
    name: "Bone Breaker",
    category: "Red Scorpions powers",
    xpCost: 1000,
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Red Scorpions Librarian focuses his might and will into the blows he rains down on his enemies, filling his arm with righteous vigour. Even blows which would otherwise cause no Damage send shockwaves through his enemy’s body, pulping flesh and breaking bones. While this power is active, the Librarian adds his Psy Rating to any Critical Damage he inflicts with melee weapons. If he fails to cause any Damage with a melee attack (i.e. his opponent’s armour and Toughness Bonus completely negate the Damage) he will still cause a single point of Impact Damage (not reduced by armour or Toughness) on his enemy as the concussive force of his blow is transferred through their armour.",
    requirements: "Str 45+"
  },
  {
    name: "Tormented Flesh",
    category: "Red Scorpions powers",
    xpCost: 1000,
    action: "Half Action",
    opposed: "Yes",
    range: "20m x Psy Rating",
    sustained: "No",
    description: "The Librarian focuses on his foe’s flawed physiology and corrupted spirit turning it against them. The enemy’s flesh will literally rebel against its owner as it twists, oozes, and bursts, fleeing the taint which saturates it. This power is only effective on foes which either have 1 or more Corruption Points, a mutation, or the Daemonic trait. If the Librarian’s target fails a Challenging (+0) Opposed Willpower Test, it will suffer Damage equal to 2 x the Librarian’s Psy Rating and an additional point of Damage per ten Corruption Points possessed by the target. In the case of those with mutations, the target suffers (2 x Psy Rating) +5 points of Damage per mutation. Targets with the Daemonic Trait suffer Damage equal to (2 x Psy Rating) +10. For targets with a combination of Corruption Points, mutations, and/or the Daemonic Trait use the one which would result in the most Damage being inflicted. Damage from this power ignores armour but is reduced by Toughness Bonus as normal.",
    requirements: "WP 40+"
  },
  {
    name: "Word of the Codex Astartes",
    category: "Red Scorpions powers",
    xpCost: 1500,
    action: "Full Action",
    opposed: "No",
    range: "10m x Psy Rating Radius",
    sustained: "No",
    description: "The Librarian calls to the common bond between Battle-Brothers as laid down by the Codex Astartes and reminds Space Marines of their sacred duty and powerful heritage. This power infuses nearby Battle-Brothers with new purpose and devotion, boosting their moral and banishing any doubt. The Librarian and any Battle-Brothers within range immediately recover from Stunning and reduce their levels of Fatigue by one (if they had suffered one). In addition, Space Marines targeted by Opposed psychic powers gain a bonus equal to the Librarian’s Psy Rating x 5 until the start of the Librarian’s next turn provided they remain within range of the power.",
    requirements: "Fel 40+"
  },`
);

// 8. CHAPTER_TRAPPINGS
constantsContent = constantsContent.replace(
  /export const CHAPTER_TRAPPINGS = \[/,
  `export const CHAPTER_TRAPPINGS = [
  {
    name: "Icon of the Scorpion",
    chapter: "Red Scorpions",
    description: "The Red Scorpions often adorn their wargear with an engraved image of their Chapter namesake. These small talisman-like icons remind the bearer of their Chapter’s heritage and their constant drive to purge corruption without as well as within. Bolstered by his conviction, a Red Scorpion Battle-Brother who possesses an Icon of the Scorpion gains a significant resistance to the taint of Chaos. Any time the Battle-Brother would gain a number of Corruption Points, he may make a Challenging (+0) Willpower Test. If this Test is successful, the number of Corruption Points gained is reduced by 1."
  },`
);

// 9. RELIC_WARGEAR
constantsContent = constantsContent.replace(
  /export const RELIC_WARGEAR = \[/,
  `export const RELIC_WARGEAR = [
  {
    name: "Correction of Flesh",
    description: "The Apothecaries of the Red Scorpions are zealous adherents to the sanctity of the human form and the need to keep it pure, and to this end, the most learned of their number created a set of advanced medical tools to treat the superhuman flesh of Space Marines. These tools, collectively known as the Correction of Flesh, surpass the efficacy of a standard narthecium, and can treat unenhanced humans or warriors of the Adeptus Astartes with but minor alterations to the dosage.",
    rules: "The Correction of Flesh replaces a standard narthecium when requisitioned, and grants +30 to Medicae Tests to treat Space Marines and humans alike. The user can re-roll failed Medicae Tests, and heals one additional Wound with each use of First Aid."
  },
  {
    name: "Tears of the Scorpion",
    description: "The Red Scorpions have vast armouries, compared to many Chapters, with copious examples of mastercrafted melee and ranged weapons carefully maintained and protected by the Chapter. Among all of these fine weapons none are as revered by the Red Scorpions as the relic blades known as the Tears of the Scorpion. Ancient weapons of immense spiritual value to the Chapter and of long lost eldritch design they are only ever gifted to the greatest of Red Scorpion Battle-Brothers, often reserved for its company commanders and Chapter Masters. In rare instances if a hero of the Chapter proves himself worthy he may be allowed to wield one of the blades in battle, but such is a rare and great honour.",
    rules: "The Tears of the Scorpion generate a power field of ancient and powerful design. Other weapons with the power field quality offer no protection from this vicious blade. When the wielder uses Tears of the Scorpion to Parry an attack, he has a 75% chance to destroy the attacker’s weapon, regardless of whether the attacker’s weapon has the Power Field Quality or not.",
    profiles: [
      {
        name: "Tears of the Scorpion",
        type: "Melee",
        damage: "1d10+7 E",
        pen: 8,
        special: "Balanced, Power Field"
      }
    ]
  },`
);

fs.writeFileSync(constantsPath, constantsContent, 'utf8');
