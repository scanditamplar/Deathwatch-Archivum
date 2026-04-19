import React, { useState } from 'react';

export const SPECIAL_RULES: { [key: string]: string } = {
  "Tearing": "These weapons roll one extra die for Damage, and the lowest result is discarded.",
  "Felling": "If the weapon hits, it ignores a number of levels of Unnatural Toughness possessed by the target equal to the number in parenthesis. For instance, a Felling (1) weapon ignores the benefits of Unnatural Toughness (x2) and would reduce the benefits of Unnatural Toughness (x3) by one multiplier.",
  "Balanced": "Balanced weapons grant a +10 bonus to Weapon Skill Tests made to Parry.",
  "Blast": "When working out the effects of a Blast weapon, anyone within the weapon’s blast radius in metres (the number in parenthesis) is also hit. Roll Hit Location and Damage individually for each person affected by the blast.",
  "Flame": "The wielder does not need to Test Ballistic Skill; he simply fires. The flame’s path is a cone-shaped area extending in a 30 degree arc from the firer out to the weapon’s Range. Any creatures caught in it must succeed on an Agility Test or be struck by the flames and take damage normally. If they take damage, they must succeed on a second Agility Test or catch on fire. Cover does not protect characters from attacks made by Flame weapons. Normally, when a weapon is fired without the appropriate Weapon Training Talent or a heavy weapon is fired without bracing, the wielder suffers a –20 or –30 penalty respectively to his Ballistic Skill Test. When a wielder who does not possess the appropriate Weapon Training Talent fires a weapon with the Flame Quality, anyone in the area of effect gains a +20 bonus to his Agility Test to avoid damage. This bonus rises to +30 if the weapon is heavy and the wielder is not braced.",
  "Reliable": "If a Reliable weapon Jams, roll 1d10 and only on a roll of 10 has it in fact Jammed. Otherwise, it just misses as normal.",
  "Unreliable": "Unreliable weapons jam on a roll of 91-100.",
  "Accurate": "They grant an additional bonus of +10 to the firer’s Ballistic Skill when used with an Aim Action in addition to the bonus Aiming grants. When firing a single shot from a single Accurate Basic Weapon, if such an attack also uses the Aim action, it gains an extra 1d10 of damage for every two degrees of success to a maximum of two extra d10.",
  "Storm": "This Quality doubles the number of hits inflicted on the target and the amount of ammunition expended. For example, when firing a weapon with the Storm Quality in fully automatic mode, each degree of success yields two additional hits (to a maximum of twice the weapon’s Full Automatic rate of fire).",
  "Toxic": "Anyone that takes Damage from a Toxic weapon after reduction for Armour and Toughness Bonus must make a Toughness Test with a –5 Penalty for every Point of Damage suffered. Success indicates no further effect from the weapon. Failure, however, deals an immediate 1d10 points of Impact Damage to the target with no reduction from Armour or Toughness Bonus.",
  "Razor Sharp": "When rolling to attack with this weapon, if the attack roll results in two or more Degrees of Success, double the weapon’s Penetration.",
  "Power Field": "When the wielder successfully uses this weapon to Parry an attack made with a weapon that lacks this Quality, he has a 75% chance of destroying his attacker’s weapon. Weapons with the Warp Weapon Trait and Natural Weapons are immune to this effect.",
  "Concussive": "When you strike an opponent with a Concussive weapon, he must make a Toughness Test at a Difficulty of –10 per degree of success by which the attack succeeded or be Stunned for 1 Round. Auditory protection confers a +10 bonus to this Test, but does not negate the kinetic energy of the blast. Additionally, any target taking Damage greater than his Strength Bonus from a Concussive weapon is automatically knocked down.",
  "Shocking": "Target that takes at least 1 point of Damage from a Shocking weapon after Armour and Toughness Bonus must make a Toughness Test. He receives a +10 bonus for every Armour Point on the location hit. If he fails, he is Stunned for a number of Rounds equal to half the Damage he suffered.",
  "Snare": "On a successful hit, the target must make an Agility Test or be immobilised. An immobilised target can attempt to burst the bonds (a Strength Test) or wriggle free (an Agility Test) on his Turn. The target is considered helpless until he escapes.",
  "Scatter": "If fired at a foe within Point Blank Range, every two degrees of success indicates another hit (use Table 8–2: Multiple Hits on page 239). However, at longer ranges this spread of small projectiles reduces its effectiveness. Double all Armour Points against hits from Scatter weapons at Long or Extreme Range.",
  "Twin-Linked": "A weapon with the Twin-linked Quality gains a +20 bonus to hit when fired and uses twice as much ammunition. In addition, the weapon may score one additional hit if the attack roll succeeds by two or more degrees of success. Lastly, the weapon’s reload time is doubled.",
  "Overheats": "A weapon with this Quality overheats on an attack roll of 91 or higher. When this happens, the wielder suffers energy damage equal to the weapon’s damage with a Penetration of 0 to an arm location (the arm holding the weapon if it was fired one-handed, or a random arm if it was fired with two hands). The wielder may choose to avoid taking damage by dropping the weapon. Dropping a weapon is a Free Action. A weapon that overheats must spend the round afterwards cooling down and may not be fired again until the second round after overheating. A weapon with this Quality does not Jam, and any effect that would cause a Jam (i.e., certain psychic powers) instead causes the weapon to overheat.",
  "Sanctified": "Damage inflicted by a Sanctified weapon counts as Holy Damage, which has certain effects on some Daemonic and warp creatures. All weapons with this special Quality must be either Exceptionally or Master-Crafted.",
  "Force": "Force weapons allow a Psyker to channel their power. On a successful hit, the Psyker can make a Focus Power Test (Opposed by Target's WP) to deal extra damage.",
  "Haywire": "Everything within the field’s radius, indicated by the number in parenthesis, is affected. Roll on Table 5–4: Haywire Field Effects (with any modifiers from the weapon) to determine the strength of the effect. As the field slowly dissipates, the strength lessens one step in severity each round until it becomes Insignificant.",
  "Proven": "Weapons with the Proven Quality have a minimum damage die result equal to the rating. Thus, a weapon with the Proven 3 Weapon Quality has a minimum result of 3 for all damage dice. These dice are not re-rolled; any result lower than the rating is considered to instead be equal to the rating.",
  "Recharge": "The weapon must spend the Round after firing building up a charge and cannot be fired—in effect you can only fire the weapon every other round.",
  "Flexible": "Flexible weapons cannot be Parried.",
  "Unbalanced": "Heavy and difficult to ready after an attack, Unbalanced weapons impose a –10 penalty when used to Parry.",
  "Primitive": "All Armour Points are doubled against hits from Primitive weapons unless the armour also has the Primitive Quality. Non-Primitive armour doubles its AP before being reduced by Penetration.",
  "Gyrostabilised": "A Gyro-Stabilised weapon never counts its target as being further than Long Range (normal maximum range still applies). Heavy weapons with this Quality reduce the penalty for firing without Bracing to –20.",
  "Gyro-Stabilised": "A Gyro-Stabilised weapon never counts its target as being further than Long Range (normal maximum range still applies). Heavy weapons with this Quality reduce the penalty for firing without Bracing to –20.",
  "Defensive": "Defensive weapons grant a +15 bonus to tests made when used to Parry, but take a –10 penalty when used to attack.",
  "Devastating": "If the weapon hits, it does one additional point of Cohesion Damage regardless of Damage to Wounds, in addition to secondary effects on Cohesion from the hit’s Damage and other results. If the target is a Horde, it reduces its magnitude by a number equal to the number in parenthesis every time it is hit by this weapon.",
  "Smoke": "When a hit is scored from a weapon with the Smoke Quality, it creates a smokescreen 3d10 metres in diameter from the point of impact. This screen lasts for 2d10 Rounds, or less in adverse weather conditions.",
  "Unwieldy": "Unwieldy weapons cannot be used to Parry.",
  "Volatile": "If a 10 is rolled for Damage on a weapon with the Volatile Quality, Righteous Fury occurs automatically, dealing another 1d10 points of Damage. If the second roll results in 10, further Damage is possible.",
  "Maximal": "The weapon has two settings. Maximal setting uses more ammo/energy but deals more damage/pen/blast.",
};

interface SpecialRuleTagProps {
  rule: string;
  onUpdateRule?: (oldRule: string, newRule: string) => void;
}

export const SpecialRuleTag: React.FC<SpecialRuleTagProps> = ({ rule, onUpdateRule }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Extract the base rule name (e.g., "Blast (3)" -> "Blast")
  const baseRuleMatch = rule.match(/^([A-Za-z\-]+)(?:\s*\(([^)]+)\))?/);
  const baseRule = baseRuleMatch ? baseRuleMatch[1].trim() : rule.trim();
  const currentValue = baseRuleMatch && baseRuleMatch[2] ? parseInt(baseRuleMatch[2], 10) : null;
  
  const description = SPECIAL_RULES[baseRule] || SPECIAL_RULES[rule.trim()];

  const isStackable = ["Proven", "Blast", "Devastating", "Felling"].includes(baseRule);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateRule && currentValue !== null && !isNaN(currentValue)) {
      onUpdateRule(rule, `${baseRule} (${currentValue + 1})`);
    } else if (onUpdateRule) {
      onUpdateRule(rule, `${baseRule} (1)`);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateRule && currentValue !== null && !isNaN(currentValue) && currentValue > 1) {
      onUpdateRule(rule, `${baseRule} (${currentValue - 1})`);
    } else if (onUpdateRule && currentValue === 1) {
      // Keep it at 1 or remove parenthesis? Let's keep minimum at 1.
    }
  };

  if (!description) {
    return <span className="text-gray-400">{rule}</span>;
  }

  return (
    <span 
      className="relative inline-flex items-center gap-1 cursor-help border-b border-dotted border-gray-500 hover:text-blue-300 hover:border-blue-300 transition-colors"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {rule}
      
      {isStackable && onUpdateRule && (
        <span className="flex items-center gap-0.5 ml-1 bg-[#111] rounded border border-[#333] px-0.5">
          <button 
            onClick={handleDecrement}
            className="w-3 h-3 flex items-center justify-center text-[8px] text-gray-400 hover:text-red-500 hover:bg-[#222] rounded"
          >
            -
          </button>
          <button 
            onClick={handleIncrement}
            className="w-3 h-3 flex items-center justify-center text-[8px] text-gray-400 hover:text-green-500 hover:bg-[#222] rounded"
          >
            +
          </button>
        </span>
      )}

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-blue-500/50 rounded shadow-xl text-xs text-gray-300 z-50 pointer-events-none">
          <div className="font-bold text-blue-400 mb-1">{baseRule}</div>
          {description}
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 border-r border-b border-blue-500/50 rotate-45"></div>
        </div>
      )}
    </span>
  );
};

interface SpecialRulesListProps {
  rules: string; // Comma separated string
  className?: string;
  onUpdateRules?: (newRules: string) => void;
}

export const SpecialRulesList: React.FC<SpecialRulesListProps> = ({ rules, className = "", onUpdateRules }) => {
  if (!rules) return null;
  
  const ruleList = rules.split(',').map(r => r.trim()).filter(r => r);

  const handleUpdateRule = (oldRule: string, newRule: string) => {
    if (!onUpdateRules) return;
    const newRuleList = ruleList.map(r => r === oldRule ? newRule : r);
    onUpdateRules(newRuleList.join(', '));
  };

  return (
    <span className={`space-x-1 ${className}`}>
      {ruleList.map((rule, index) => (
        <React.Fragment key={index}>
          <SpecialRuleTag rule={rule} onUpdateRule={onUpdateRules ? handleUpdateRule : undefined} />
          {index < ruleList.length - 1 && <span className="text-gray-600">, </span>}
        </React.Fragment>
      ))}
    </span>
  );
};
