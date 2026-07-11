import React from 'react';
import { CharacterData, Characteristics, BattleTrauma, ArmorAbility, Cybernetic } from './types';

export const Icons = {
  Close: ({ className = "w-full h-full" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  ChevronDown: ({ className = "w-full h-full" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ChevronRight: ({ className = "w-full h-full" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Skull: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M9 12h.01M15 12h.01M12 15v2M10 20h4v2h-4z" />
      <path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20" />
    </svg>
  ),
  Sword: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" x2="19" y1="19" y2="13" />
      <line x1="16" x2="20" y1="16" y2="20" />
      <line x1="19" x2="21" y1="21" y2="19" />
    </svg>
  ),
  Wargear: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.83-2.83l-3.94 3.6z" />
      <path d="m10.29 3.86 3.98 3.98" />
      <path d="m9.1 9.1-2.8-2.8" />
      <path d="M5.8 12.2A4.99 4.99 0 1 0 11.8 18.2L21 9" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="1" />
    </svg>
  ),
  Scroll: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M15 2H6a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V11l-6-6z" />
      <path d="M15 2v4a3 3 0 0 0 3 3h4" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M10 9H8" />
    </svg>
  ),
  Eye: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
      <path d="M8 18h8" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
};


export const CUSTOM_CHAPTER_DEMEANORS: Record<string, { demeanorDescription: string }> = {
  "Brothers in Battle": {
    demeanorDescription: "All Space Marines within a given Chapter are bonded to one another by a common genetic inheritance and years of combat at each others’ side. While some Battle-Brothers serving in the Deathwatch have difficulty widening their sense of comradeship to include those outside of their Chapter, others have none at all, regarding all Space Marines, regardless of Chapter or Progenitor, as their Brothers. As such, there is nothing that the Battle-Brother would not do for a fellow Space Marine, up to and including dying so that his Brothers may live. The only downside of such a trait is that the Battle-Brother may come to look down upon those outside of the Adeptus Astartes, believing (often quite rightly) that none can match their own standards."
  },
  "Cleanse and Purify": {
    demeanorDescription: "Those Chapters who display this trait believe that no trace of an enemy should be left behind to stain the ground on which he was slain. Simply slaying the foe is rarely sufficient—the Battle-Brothers are driven to burn his corpse, destroy his works, burn down his cities and scour his worlds of life so that no trace of his existence remains. While some servants of the Ordo Xenos believe it wise to recover and study the weapons of their foes, these Battle-Brothers believe such a notion is foolhardy at best, and heretical at worse. They often favour weapons that immolate, incinerate, atomise or blast apart their foe, being particularly fond of flamers, meltaguns and plasma guns, all of which are ideal for eradicating the stain of the alien, the fiend and the heretic."
  },
  "No Mercy, No Respite": {
    demeanorDescription: "While all Space Marines are relentless in their prosecution of their objectives, some are wont to become so embroiled in their mission that all other concerns are secondary. These Battle-Brothers have no concept of the notion of defeat and would rather die than accept that once a battle is joined it will not be won. They are stubborn in the face of adversity and capable of the most awe-inspiring feats of courage. Yet on occasion such Battle-Brothers have been known to ignore what they regard as secondary concerns, sometimes to the detriment of the larger strategic situation. Some have even been known to ignore orders from higher up the chain of command when serving as part of composite force made of squads of several Chapters, or when serving individually as members of the Deathwatch."
  },
  "Purity Above All": {
    demeanorDescription: "The Battle-Brothers of this Chapter have no patience whatsoever for any hint of genetic deviation, in humanity at large or in other Space Marine Chapters. While all Space Marines abhor the mutant, these Battle-Brothers see corruption wherever they look, and are ever on the guard against genetic instability in their own gene-stock and in those of other Chapters. They regard even allied Abhumans as monsters and refuse to serve alongside them, and sometimes even extend this notion to those brother Chapters with unusual genetic traits, in particular the Space Wolves and Salamanders. When fighting against those they perceive as impure, these Battle-Brothers are utterly unstoppable, but it is often difficult to integrate them into Deathwatch Kill-teams that include brethren they regard as impure in some way."
  },
  "Scions of Mars": {
    demeanorDescription: "While all Space Marines utilise wargear that the vast bulk of Humanity regard as a work of technological marvel, some have access to the most arcane and revered of weapons, armour and other devices. Such Chapters invariably maintain close links with the Adeptus Mechanicus, perhaps having served side by side with the servants of the Omnissiah in a past campaign, establishing common connections that both groups value. Through their training and their access to such marvels, the Battle-Brothers have developed a certain expertise in the use of advanced wargear and know how to get the best from such items. These brethren eschew simple weapons in favour of more complex ones, and when serving in the Deathwatch are ideal when the Kill-team is issued with specialised equipment or unusual items, especially those rendered up from the mysterious depths of the Omega Vault at the heart of Watch Station Erioch."
  },
  "See, But Don’t Be Seen": {
    demeanorDescription: "The Battle-Brother understands well the value of maintaining a silent, unseen vigil on the foe, striking only when his target is at its weakest and most vulnerable. The Chapter stalks the night and the shadows, approaching the foe from unanticipated quarters before disappearing once more. Such Chapters foster patience and wily cunning in their Battle-Brothers, and regard as rash and unsubtle those who charge headlong into combat."
  },
  "Swift As The Wind": {
    demeanorDescription: "The Battle-Brothers of the Chapter may excel at rapid strikes and lightning raids, but the trait extends to every facet of their character. They are as quick to anger as they are to jest. They can be impatient, yet display great personal initiative. While not rash or foolhardy, such a Battle-Brother believes in the value of immediate action over protracted planning, and chafes at the bit to engage the foe."
  },
  "Suffer Not The Alien To Live": {
    demeanorDescription: "The Chapter has participated in countless xenos-wars, purging species after species that the enemies of the Emperor may be cast from the galaxy once and for all. Some such Chapters may have suffered at the hands (or claws or tentacles) of ravening alien beings, and harbour a special hatred for a particular xenos strain, or indeed all aliens. They often believe in the sanctity of the human form, regarding it as being cast in the image of the Emperor himself, and may therefore eschew the use of augmetics unless absolutely needed. While some Space Marine Chapters may tolerate the existence of species such as the Eldar and the Tau, these do not. They would sooner put a bolter round through the head of an alien emissary than trust a single word its speaks, even if doing so would bring about total war."
  },
  "Suffer Not The Works of Heretics": {
    demeanorDescription: "The teachings of the Chapter’s cult focus on the many crimes that have been committed against humanity by heretics and schismatics. This is probably because the Chapter fought a crusade against such an enemy, and developed a special hatred for those amongst humanity who would turn from the light of the Emperor and embrace other, less worthy gods. Battle-Brothers of this mindset are often intolerant of the more unusual expressions of the Imperial Cult, sometimes even going so far as to denounce such expressions as heretical. They may even see the subtle taint of heresy in the traditions of other Chapters, a trait that has brought them into conflict with their brother Adeptus Astartes more than once."
  },
  "Uphold The Honour of The Emperor": {
    demeanorDescription: "Nearly all Chapters revere the Emperor not as a god, as preached by the Ecclesiarchy, but as the honoured ancestor and father figure, the individual in whose image the Primarchs were made and whose blood therefore flows in their own veins. They trust above all things that the Emperor will guide their hands and protect them, and his praises are ever on their lips. Battle-Brothers drawn from such Chapters ever seek to prove themselves worthy in the eyes of the Emperor, performing great deeds to bring about his glory. Furthermore, these Battle-Brothers may prove bombastic and prideful, preferring to make bold, frontal assaults over stealthy approaches, so that the enemy may know that their doom is come, and tremble before the might of the favoured sons of the Emperor of Mankind."
  }
};

export const CHAPTERS = [
  "Ultramarines", "Blood Angels", "Dark Angels", "Space Wolves", "Imperial Fists", "Storm Wardens", "Iron Hands", "White Scars", "Salamanders", "Raven Guard", "Black Templars", "Flesh Tearers", "Blood Ravens", "Red Scorpions", "Marines Errant", "Crimson Fists", "Howling Griffons", "Novamarines", "Raptors", "Carcharodons"
];

export const CHAPTER_NAMES: Record<string, { first: string[], last: string[] }> = {
  "Carcharodons": {
    first: ["Tyberos", "Bail", "Akia", "Maha", "Koma", "Tama", "Kahu", "Rangi", "Hekoto", "Mako", "Tangaroa"],
    last: ["Sharr", "Kaha", "Tane", "Rua", "Atea", "Whio", "Vaku"]
  },
  "Raptors": {
    first: ["Lias", "Kypher", "Arjun", "Kael", "Syras", "Taer", "Vardus", "Raan", "Valerius"],
    last: ["Issodon", "Vane", "Stahl", "Corvo", "Galeo", "Castigon", "Varrus", "Kastor"]
  },
  "Novamarines": {
    first: ["Titus", "Cato", "Aeneas", "Severus", "Octavius", "Gaius", "Lucius", "Marius", "Galenus", "Maximus"],
    last: ["Agemman", "Ventris", "Sicarius", "Tigurius", "Cassius", "Invictus", "Helican", "Drudo", "Valerius"]
  },
  "Howling Griffons": {
    first: ["Orlando", "Armand", "Darius", "Pellas", "Garadon", "Lucian", "Titus", "Balthasar"],
    last: ["Furioso", "Kantor", "Vane", "Stahl", "Draco", "Marius", "Galeo", "Castigon"]
  },
  "Crimson Fists": {
    first: ["Pedro", "Alessio", "Cortez", "Kantor", "Jarl", "Demetrius", "Rafael", "Manoel", "Juan"],
    last: ["Dorn", "Kantor", "Cortez", "Alvez", "Gomez", "Perez", "Ruiz", "Galan"]
  },
  "Marines Errant": {
    first: ["Titus", "Severian", "Justiar", "Cador", "Aetius", "Decius", "Leontis", "Gaius", "Marcus", "Kail"],
    last: ["Vane", "Kael", "Thor", "Agemman", "Varrus", "Kastor", "Galeo", "Furio", "Castigon"]
  },
  "Blood Ravens": {
    first: ["Gabriel", "Davian", "Aramus", "Tarkus", "Cyrus", "Avitus", "Thaddeus", "Jonah", "Apollo", "Indrick", "Isador", "Akios", "Titus", "Seraphis", "Vidya"],
    last: ["Angelos", "Thule", "Orion", "Diomedes", "Boreale", "Arrius", "Merathis", "Severian", "Silon", "Scaevola", "Gallan"]
  },
  "Ultramarines": {
    first: ["Gaius", "Marcus", "Titus", "Severus", "Cassius", "Octavius", "Tiberius", "Lucius", "Quintus", "Decimus", "Julius", "Cael", "Agemman", "Maximinus", "Praxas", "Scyld", "Gallus", "Justian"],
    last: ["Agrian", "Celsus", "Drusus", "Fabian", "Galba", "Lucullus", "Nerva", "Otho", "Varrus", "Valerius", "Tarentus", "Invictus", "Scipio", "Aemilian", "Helian", "Flavian"]
  },
  "Blood Angels": {
    first: ["Raphiel", "Zael", "Donato", "Albinus", "Cleantes", "Coriolanus", "Erasmus", "Faust", "Gallio", "Iago", "Lorenzo", "Machiavi", "Morleo", "Nidon", "Rafen", "Sendini", "Zargo", "Leon", "Amare", "Lucien"],
    last: ["of Baal", "the Angelic", "Morpheo", "Sangreal", "Vane", "Rephael", "Galeo", "Furio", "Raphael", "Castigon", "Metatron", "Seraph", "of the Host", "Sanguin", "of the Blood"]
  },
  "Dark Angels": {
    first: ["Balthasar", "Zakeel", "Naman", "Zariah", "Bethor", "Rhamah", "Annael", "Sariel", "Zariel", "Bellerophon", "Nemiel", "Zahariel", "Astelan", "Sammael", "Ephrael", "Seraphicus", "Zephon"],
    last: ["of Caliban", "the Redeemed", "of the Rock", "Al-Hasan", "Zadkiel", "the Unforgiven", "Malkiel", "of the First", "Watcher", "Absolon", "the Penitent", "Raphael", "Zamael"]
  },
  "Red Scorpions": {
    first: ["Severin", "Casan", "Haas", "Tarn", "Zell", "Ortis", "Bane", "Cull", "Gere", "Rurik", "Arcturus", "Kull", "Rauth", "Gilead"],
    last: ["Loth", "Sabius", "Culln", "Magister", "Aath", "Kurgis", "Sora", "Thar", "Varr", "Dragan", "Krell", "Bale"]
  },
  "Space Wolves": {
    first: ["Torvald", "Hrothgar", "Sven", "Olaf", "Leif", "Kvasir", "Erik", "Halldor", "Gunnar", "Ulf", "Ivar", "Sigurd", "Rurik", "Haldor", "Valgard", "Berek", "Egil", "Krom", "Skallagrim"],
    last: ["Bloodhowl", "Ironpelt", "Frostbane", "Winterfang", "Iceblade", "Stormseeker", "Thunderbear", "Bearclaw", "Redmane", "Trollbane", "Wolfheart", "Blackmane", "Stormwolf", "Grimblood", "Wyrmslayer"]
  },
  "Imperial Fists": {
    first: ["Lexandro", "Vorn", "Hesperox", "Korphendo", "Franz", "Heinrich", "Leon", "Maximilian", "Demetrius", "Orion", "Taelos", "Alaric", "Bohemond", "Gideon", "Titus", "Vladimir", "Dietrich", "Jago"],
    last: ["D'Arquebus", "Hagen", "Vogel", "Eichel", "Stahler", "Eisen", "Valdemar", "Vane", "Koorland", "Stone", "Defiant", "of the Phalanx", "the Stalwart", "Gant", "Trask"]
  },
  "Storm Wardens": {
    first: ["Caelen", "Vane", "Rhyn", "Owin", "Bran", "Iain", "Alaric", "Culln", "Cador", "Myrdin", "Owain", "Gareth", "Baird", "Conall", "Ewan", "Taran", "Llywelyn", "Madoc", "Govan"],
    last: ["MacIntyre", "ap-Llyre", "of Sacris", "Craig", "Stormcaller", "MacLeod", "Wallace", "Bruce", "ap-Rhys", "MacNiven", "Farquhar", "the Highlander", "Stormborn", "of High Clell", "Gaelen"]
  },
  "Iron Hands": {
    first: ["Kardan", "Kaargul", "Vurgaan", "Gdolkin", "Bannus", "Paullian", "Sarlock", "Autek", "Morvox", "Lydri", "Xeriis", "Ares", "Bion", "Erasmus", "Galba", "Vaal", "Karaashi", "Lydron"],
    last: ["of Clan Raukaan", "of Clan Avernus", "of Clan Garrsak", "of Clan Vurgaan", "Iron-heart", "the Augmented", "Steel-forged", "of Clan Dorrvok", "of Clan Morragul", "of Medusa", "the Machine-touched"]
  },
  "White Scars": {
    first: ["Jubal", "Subotai", "Targutai", "Shiban", "Qin", "Khajutai", "Ogadai", "Temujin", "Ganzorig", "Batu", "Hasik", "Tsolmon", "Erden", "Naran", "Bataa", "Chagatai", "Dormu"],
    last: ["Noyan", "of the Steppe", "the Swift", "Mergen", "Arslan", "Chuluun", "Baatar", "Khan", "of Chogoris", "the Windrider", "Storm-born", "Falcon", "Hawk-eye"]
  },
  "Salamanders": {
    first: ["Tsu'gan", "Dak'ir", "Ba'ken", "N'keln", "Iagon", "Xaphan", "Ne'miel", "Pyriel", "Shen'kor", "Zartos", "Agatone", "Heka'tan", "Kadai", "Fugis", "N'bel", "K'gosi", "Ekra"],
    last: ["of Nocturne", "the Smith", "Drake-tamer", "Fire-walker", "Xereus", "Gargo", "the Forged", "Anvil-born", "Flame-bearer", "of Prometheus", "Earth-shaker", "the Resilient"]
  },
  "Raven Guard": {
    first: ["Nykona", "Aloni", "Kaedes", "Vaanes", "Solaro", "Branne", "Agapito", "Soukhounou", "Aethon", "Kyrin", "Stryder", "Arys", "Bale", "Kholka", "Nesta", "Shadowson"],
    last: ["Mor Deythan", "Sevastus", "Alvarex", "Qeld", "Nex", "Vykus", "Valerius", "Shae", "of Deliverance", "the Unseen", "Night-walker", "of Kiavahr", "Shadow-strike", "the Silent", "Grave-walker"]
  },
  "Black Templars": {
    first: ["Adalhelm", "Aleja", "Ansgar", "Beregond", "Burchard", "Cadoc", "Cai", "Caw", "Dagar", "Doderic", "Drust", "Eberhard", "Edern", "Gareth", "Geraint", "Goronwy", "Idris", "Isolda", "Jowan", "Lorin", "Mael", "Medraut", "Niall", "Peredur", "Tristan", "Vortigern", "Wulfstan", "Yvain", "Zenon"],
    last: ["Agilard", "Balin", "Bors", "Culhwch", "Cynan", "Edmyg", "Erec", "Galahad", "Geraint", "Gwalchmei", "Howel", "Kaye", "Lamorak", "Lancelot", "Mabon", "Morholt", "Palamedes", "Pelleas", "Percival", "Sagramore", "Tristan", "Uwain"]
  },
  "Flesh Tearers": {
    first: ["Abantes", "Acastus", "Aemilius", "Agamemnon", "Ajax", "Alkaios", "Amias", "Apolon", "Ares", "Attis", "Balthasar", "Cael", "Cassius", "Castor", "Corbulo", "Erasmus", "Faustian", "Gabriel", "Gaius", "Hektor", "Iago", "Jael", "Julio", "Kael", "Leonid", "Lucius", "Magan", "Nassir", "Otho", "Phaeto", "Pollux", "Raf", "Sanguon", "Scipio", "Sev", "Simeon", "Tycho", "Varon", "Zael"],
    last: ["Abantes", "Acastus", "Aemilius", "Agamemnon", "Ajax", "Alkaios", "Amias", "Apolon", "Ares", "Attis", "Balthasar", "Cael", "Cassius", "Castor", "Corbulo", "Erasmus", "Faustian", "Gabriel", "Gaius", "Hektor", "Iago", "Jael", "Julio", "Kael", "Leonid", "Lucius", "Magan", "Nassir", "Otho", "Phaeto", "Pollux", "Raf", "Sanguon", "Scipio", "Sev", "Simeon", "Tycho", "Varon", "Zael"]
  }
};

export const CUSTOM_CHAPTER_MODIFIERS = [
  {
    name: "Bolter Drills & Prayers",
    description: "The Chapter steadfastly practices daily Bolter drills combined with prayers to the God-Emperor. Space Marines of this Chapter gain +5 Ballistic Skill and +5 Willpower.",
    modifiers: { BS: 5, WP: 5 }
  },
  {
    name: "Stringent Hypno-conditioning",
    description: "Warriors of this Chapter undergo a more stringent hypno-conditioning than those of other Chapters. Space Marines of this Chapter gain +5 Willpower and +5 Intelligence.",
    modifiers: { WP: 5, Int: 5 }
  },
  {
    name: "Blade and Gun",
    description: "Equally famed for their skill with both blade and gun, Space Marines from this Chapter are highly sought after by the Deathwatch. Space Marines of this Chapter gain +5 Ballistic Skill and +5 Weapon Skill.",
    modifiers: { BS: 5, WS: 5 }
  },
  {
    name: "Strength and Cunning",
    description: "This Chapter’s gene-seed favours strength and cunning. Space Marines of this Chapter gain +5 Perception and +5 Strength.",
    modifiers: { Per: 5, S: 5 }
  },
  {
    name: "Rugged and Flexible",
    description: "Adeptus Astartes from this Chapter possess a rugged and flexible combat doctrine. Space Marines of this Chapter gain +2 Wounds and +5 to any one characteristic of the player’s choice.",
    modifiers: { woundsBonus: 2 },
    needsChoice: 1
  },
  {
    name: "Duty unto Death",
    description: "Duty unto death is a fitting motto for Space Marines from this Chapter. Often they will go on when others have perished. Space Marines of this Chapter gain +5 Toughness and +5 Willpower.",
    modifiers: { T: 5, WP: 5 }
  },
  {
    name: "Lightning Raids",
    description: "Lightning raids that inspire their fellows to greater deeds are the trademark of this Chapter. Space Marines of this Chapter gain +5 Agility and +5 Fellowship.",
    modifiers: { Ag: 5, Fel: 5 }
  },
  {
    name: "Warrior-Scholars",
    description: "The warrior-scholars from this Chapter have often noticed clues that their more zealous comrades have missed. Space Marines of this Chapter gain +5 Perception and +5 Intelligence.",
    modifiers: { Per: 5, Int: 5 }
  },
  {
    name: "Blade and Leadership",
    description: "Members of this Chapter are famed far and wide for both their skill with the blade as well as their leadership under fire. Space Marines of this Chapter gain +5 Weapon Skill and +5 Fellowship.",
    modifiers: { WS: 5, Fel: 5 }
  },
  {
    name: "Fluid Tactics / Pure Gene-Seed",
    description: "This Chapter favours fluid tactics or possesses a particularly pure gene-seed. Space Marines of this Chapter gain +5 to two characteristics of the player’s choice.",
    modifiers: {},
    needsChoice: 2
  }
];

export interface CurseLevel {
  name: string;
  summary: string;
  full: string;
}

export interface ChapterDetails {
  modifiers: { [key in keyof Characteristics]?: number };
  woundsBonus?: number;
  talents: string[];
  skills?: string[];
  soloAbility: string;
  restrictions: string[];
  implantsNote?: string;
  startingGear?: string[];
  demeanorName: string;
  demeanorSummary: string;
  demeanorDescription: string;
  summary: string;
  curseName: string;
  curseLevels: {
    1: CurseLevel;
    2: CurseLevel;
    3: CurseLevel;
  };
}

export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {
  "Carcharodons": {
    modifiers: { WS: 5, WP: 5 },
    talents: [],
    skills: ["Speak Language (High Gothic)"],
    soloAbility: "Carnage",
    restrictions: [],
    demeanorName: "Watchful for Weakness",
    demeanorSummary: "Transitions between watchful stillness and frenetic action, waiting for the perfect time to strike with unbridled fury.",
    demeanorDescription: "The Carcharodons exemplify patience of the grimmest and most foreboding sort. Perhaps because of the long periods of time spent adrift in the deep void, far from the lights of stars or planets, a Battle-Brother from this Chapter is well accustomed to waiting patiently. This patience can seem almost inhuman at times, with a Battle-Brother standing stock-still for hours, even days. They do not move or speak, sometimes they do not even appear to breathe. They simply wait, whether for orders, for tasks to perform, or for their foes to show some weakness.\n\nOne would be wise not to mistake this for sloth. A Carcharodon does not shirk from work that needs doing, and is often willing to shoulder more than his share of a task to ensure it is done and done well. However, the Carcharodons are unafraid to spend as long as it takes to analyse an enemy, to wait until he makes a critical error they can exploit. When that flaw emerges, they explode into furious action, tearing at their opponent with a savagery that seems completely at odds with their earlier seeming inactivity. This mix of taciturn cautiousness and extreme bloodlust is a hallmark of many Carcharodons.",
    summary: "+5 Weapon Skill, +5 Willpower, the Carnage Solo Mode Ability, Speak Language (High Gothic), and Scrimshaw Talismans.",
    curseName: "Chill of the Void",
    curseLevels: {
      1: { name: "Chill of the Void (Lvl 1) - Coldly Formal", summary: "-10 penalty to all Charm and Command Tests. Speaks almost entirely in High Gothic when addressing non-Carcharodons.", full: "The Battle-Brother withdraws even more from the company of his colleagues, taking refuge in a chill and formal demeanour. All Charm and Command Tests the Battle-Brother makes suffer a -10 penalty. In addition, the Battle-Brother tends to speak almost entirely in High Gothic when addressing a non-Carcharodon, although they can—grudgingly—speak in Low Gothic if need be." },
      2: { name: "Chill of the Void (Lvl 2) - Merciless", summary: "Grimly executes any opponent encountered. Must make a Difficult (-10) Willpower Test to resist, or be restrained.", full: "The Battle-Brother does not tolerate any enemy, whether xenos, heretic, or even fellow humans who may have been misled into rebellion against the Imperium's rightful rule. The Battle-Brother grimly executes any opponent he encounters, even if they have surrendered, possess valuable intelligence, or are not front-line combatants. To resist this, the Battle-Brother must make a Difficult (-10) Willpower Test, or another Battle-Brother can restrain him with an Opposed Challenging (+0) Charm, Intimidate, or Command Test versus a Difficult (-10) Willpower Test." },
      3: { name: "Chill of the Void (Lvl 3) - Silent as the Depths", summary: "Withdraws almost entirely from interacting with others. Cannot lead a Squad, always counts as being in Solo Mode. May not contribute Cohesion.", full: "The Battle-Brother withdraws almost entirely from interacting with others. He cannot lead a Squad, and always counts as being in Solo Mode. He also may not contribute Cohesion to his Squad by any means." }
    }
  },
  "Raptors": {
    modifiers: { Ag: 5, Per: 5 },
    talents: [],
    skills: [],
    soloAbility: "Marksman's Honour",
    restrictions: [],
    demeanorName: "A History of Pragmatism",
    demeanorSummary: "Fill them with stoic pragmatism to face everything that the universe can throw at them, to fulfil their duty until they eventually die.",
    demeanorDescription: "At various times during its history, the Raptors have almost faced extinction but has neither the less continued to function, rebuild and once more face their enemies. It is part of the Raptor mentality that the Chapter will endure no matter the cost and that the eventual destruction and rebuilding of all Chapters in the Adeptus Astartes is inevitable. As one Battle-Brother dies, another takes his place to continue the endless struggle where the gene-seed lives on but the warrior does not. Death is the only constant in the universe and regardless of victory or defeat the only reward a Battle-Brother can look forward to.\n\nQuite apart from casting a dark cloud over the Battle-Brothers of the Raptors Chapter, it fills them with stoic pragmatism to face everything that the universe can throw at them, to fulfil their duty until they eventually die and another takes their place. The galaxy and its many horrors hold no surprises for them and they know that somewhere out there among the inky black is the piece of ground where they will fall, having served their Emperor and held back the night at least for a brief time.\n\nOther Chapters can find these attitudes at odds with a strong devotion to the Emperor and the righteous plight of mankind, though the Raptors see the two as intertwined, and their Chapter has always done its duty and remains unquestionably loyal to the Imperium. For a Raptors Battle-Brother facing death is only a matter of time, and they carry the knowledge with them every day, alongside their duty to their brothers and their oath to the God-Emperor.",
    summary: "+5 to Agility, +5 to Perception, and the Marksman’s Honour Solo Mode ability.",
    curseName: "Grim Determination",
    curseLevels: {
      1: { name: "Grim Determination (Lvl 1) - The Shadow of Death", summary: "The Battle-Brother starts to see death in everything. He becomes distant and dismissive, suffering a –10 to his Fellowship when dealing with other soldiers or Adeptus Astartes.", full: "The Battle-Brother starts to see death in everything. He becomes distant and makes little effort to forge new alliances with new squad members, knowing they will soon be in the grave. He becomes more dismissive of death and the praising of the dead, seeing little glory in their sacrifice, only the inevitable end to their duty and another corpse to feed the gods of war. This attitude can grate on those around the Battle-Brother and he suffers a –10 to his Fellowship when dealing with other soldiers or members of the Adeptus Astartes." },
      2: { name: "Grim Determination (Lvl 2) - The Bad Beneath the Good", summary: "Reflects on the worst side of developments. Must choose an objective to cast doubt on; completing it requires 3d10 more Kill-markers.", full: "The Battle-Brother cannot help but reflect on the worst side of a new development and will endeavour to find the worst aspect of even the most favourable of circumstances. Quite apart from causing friction within his squad, the drawing of focus onto potential problems and unforeseen dangers (regardless of the actual likelihood they will impact on the squad’s mission) can cause compromises in command and less than direct tactical judgements. When the Battle-Brother’s squad embarks on a mission, he must choose one of the Secondary or Primary objectives to cast doubt on. This objective then requires 3d10 more Kill-markers than normal to complete." },
      3: { name: "Grim Determination (Lvl 3) - Game Over", summary: "Recklessly accepts inevitable death. Provides no Cohesion, and only gains half the normal armour points from cover.", full: "Death is inevitable and the Battle-Brother is already a walking corpse just waiting for the moment when an enemy’s blade or bullet ends him. Filled with visions of his own demise, the Battle-Brother begins to act recklessly, accepting that it is his time and there is nothing he can do to prevent it coming. This will not only place him in danger but can endanger his entire squad. The Battle-Brother does not contribute to the squad Cohesion as he fails to adequately aid them in battle. In addition, he only gains half the normal armour points from cover, as even when behind barricades and walls he exposes himself to fire with little mind to remaining concealed." }
    }
  },
  "Novamarines": {
    modifiers: {}, // Adjusted dynamically via user choice
    talents: [],
    skills: ["Forbidden Lore (Xenos)"],
    soloAbility: "Tales of the Void",
    restrictions: [],
    demeanorName: "Void Wanderers",
    demeanorSummary: "Adapts to new foes with knowledge gathered from their chapter's thousands of light years of void-crusading history.",
    demeanorDescription: "The scattered nature of the Chapter gives it a perspective different to those Chapters which have a homeworld or are tied to a specific region or segmentum by their history. While it is true of all Space Marine Chapters that they fight wherever the Emperor sends them, taking them to far flung worlds and against a variety of foes, for the Novamarines there is no planet or world to which they will return, or grand Chapter fortress monastery where their Chapter Masters reside. It is a small but significant fact that weights on the minds of every Novamarine.\n\nNovamarines are also often fonts of much knowledge about the galaxy, and especially the wilds of the Ultima Segmentum. While this may not be strict knowledge in the way an adept or scholar would see it, the odds are that the Novamarine Battle-Brother or one of the members of his Chapter have seen or visited a world or faced an alien foe that relates to the Kill-team’s current situation. While not a complete understanding or clinical view of the subject or planet the Novamarine will likely know something about it, usually in the form as a tale passed on to him by one of his brothers.",
    summary: "+5 to two Characteristics of the player’s choice, the Forbidden Lore (Xenos) Skill and the Tales of the Void Solo Mode ability.",
    curseName: "Revile the Xenos",
    curseLevels: {
      1: { name: "Revile the Xenos (Lvl 1) - Favoured Targets", summary: "Will always favour taking on alien enemies or making strikes against objectives which will harm xenos, even over more glorious targets, unless making a WP (+0) Test.", full: "The Novamarine goes out of his way to target the xenos, ensuring he never misses a chance to strike a blow against the dark cloud of alien aggression closing in on the Imperium. Given a choice, he will always favour taking on alien enemies or making strikes against objectives which will do the most harm to the xenos, even if there is more glory in an alternative cause of action. If there is a choice, the Battle-Brother must favour the xenos target, though if this would directly place his Kill-team in danger or threaten to cause his mission to fail he may make a Challenging (+0) Willpower Test to ignore the hated alien and take a different course." },
      2: { name: "Revile the Xenos (Lvl 2) - Almost Human", summary: "Extends hatred to anything showing xenos taint (mutants, benign aliens, collaborators) and deals with them as true xenos.", full: "There are countless kinds of xenos in the galaxy and not all are as obvious as the great hordes of Orks, the enigmatic Eldar, ravening Tyranids, or the insidious Tau. Some come in forms which are not too distant from humanity, or from cultures which are benign and of little or no threat. The Battle-Brother is not fooled by such pale representations of the xenos form, and sees the alien everywhere, even influencing human worlds where mutation can easily disguise alien corruption. The Battle-Brother extends his hatred of xenos to anyone or anything which shows even the slightest hint of xenos taint, whether from contact with aliens or alien blood. In his eyes, these tainted humans and benign aliens are no better than true xenos and should be dealt with as such." },
      3: { name: "Revile the Xenos (Lvl 3) - Foes Eternal", summary: "Will not ally with, truce with, or exchange with Xenos under any circumstance. Must pass a Very Hard (-30) WP test to even restrain violence in enforced diplomatic encounters.", full: "No alien can ever be an ally of the Battle-Brother, and under no circumstances will the xenos ever stop being the most hated of his foes. Even in situations where a temporary alliance with alien forces (such as to fight a greater foe) would be prudent, the Battle-Brother will not stomach it, considering his own kind as traitors should they follow it through. In situations where there is diplomacy between xenos and the Imperium, such as a ceasefire or exchange of prisoners, the Battle-Brother will refuse to take part, discontent with any kind of truce against a foe which only deserves death. In situations where the Battle-Brother is forced to deal peacefully with xenos (such as orders from his commanders or the will of his Kill-team), he must make a Very Hard (-30) Willpower Test to do so for a single encounter, even then remaining hostile, though restraining his violence." }
    }
  },
  "Howling Griffons": {
    modifiers: { WS: 5 },
    talents: ["Hatred (Word Bearers)"],
    skills: ["Forbidden Lore (the Traitor Legions)"],
    soloAbility: "Tactical Assessment",
    restrictions: [],
    demeanorName: "Glorious Tradition",
    demeanorSummary: "Strict adherents to the Codex Astartes who hone their skills and pride themselves on a spotless history, save their bitter hatred for the Word Bearers.",
    demeanorDescription: "That the Battle-Brothers of the Howling Griffons strive to live up to the reputation of their Chapter as exemplars of the Adeptus Astartes has earned them many honours among their brethren. The number of victories won by the Howling Griffons would be deemed great were they even a Chapter of the Second Founding; for a Chapter of the 33rd millenium, their record is vast indeed. Few among the Adeptus Astartes can claim to have embodied the ideals of the Codex Astartes more fully than the Battle-Brothers of the Proud Eyrie. Resting heavily on the shoulders of each Battle-Brother is his personal honour, as well as that of his predecessors. It is the duty of each individual to stand as an example to all, that they might inspire their comrades to even greater feats of heroism in the name of the Emperor of Man and his glorious Imperium. The honour of the Chapter, the Primarch, the Emperor, and the Imperium all demand that the Battle-Brothers of the Adeptus Astartes make war across the stars, and no treatise has better captured the Space Marines’ capacity in battle than the Codex Astartes. To embrace that weighty tome is to know victory.",
    summary: "Strict adherents to the Codex Astartes carrying a bitter hatred for the Word Bearers.",
    curseName: "Cursing the Word",
    curseLevels: {
      1: { name: "The Price of Treachery", summary: "Routine (+20) Willpower Test when meeting a suspected traitor to restrain violent response.", full: "The Battle-Brother has become increasing obsessed with the Word Bearers treachery and relives their fateful ambush in his mind over and over again. While this spurs him on to seek out the hated Word Bearers, it also leads him to see treachery in other places, comparing the great crime perpetrated against his Chapter with other events as they unfold. The merest hint of treachery is enough to prompt a strong and violent response from the Battle-Brother, one which he may not be able to control. If the Battle-Brother comes into contact with a suspected traitor (to the Imperium, the Deathwatch, or his Chapter) he must make a Routine (+20) Willpower Test. If he passes, he can restrain himself but will be very unpleasant to the known or suspected traitor, while if he fails he will see it as his place to punish them, perhaps even with summary execution if their crime is great enough." },
      2: { name: "Trail of the Traitors", summary: "Routine (+20) Willpower Test to not jeopardize squad or subvert missions to seek out traitors or forbidden texts.", full: "As the Battle-Brothers hatred of traitors grows and his obsession with finding and exterminating the Word Bearers heightens, he will be loath to give up any mission or lead which could lead to them. On a mission, this could mean going out of his way to seek out known or suspected traitors or even changing the mission objectives to include their capture or destruction. In other settings, it can mean an obsessive thirst for knowledge and seeing out dangerous or forbidden texts if it means gaining a clue to the location and crimes of a traitor. In both instances, if the subverting of a mission or the seeking of knowledge would place the Battle-Brother or his squad in extreme danger, the GM may allow a Routine (+20) Willpower Test to resist, unless the action pertains directly to the Word Bearers and then no Test should be allowed." },
      3: { name: "In the Eye of Terror and Beyond", summary: "Always seeks to fight and destroy Chaos Space Marines, ignoring other threats or logic.", full: "The Battle-Brothers hunger to eradicate the Word Bearers and repay them for their crimes against the Chapter culminates in doing whatever it takes to see them destroyed. The Battle-Brother will always seek out Chaos Space Marines in any combat situation or mission, and if it falls within their power they will see their squad face off against Chaos Space Marines as often as possible, trying to ensure their deployment to warzones and campaigns where they might come face to face with them. When these hated foes are encountered, the Battle-Brother will do everything in his power to destroy them and see they do not escape, even if it means leaving others behind to chase them down wherever they might run." }
    }
  },
  "Crimson Fists": {
    modifiers: { WP: 10 },
    talents: ["Hunter of Aliens"],
    soloAbility: "Ork Slayer",
    restrictions: [],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Favoured of the Deathwatch",
    demeanorSummary: "A great pride for their place in the Deathwatch and a great responsibility to live up to.",
    demeanorDescription: "For centuries the Crimson Fists have waged the Emperor’s wars against the alien, fighting in all corners of the galaxy against a vast myriad of xenos. However, none have suffered as much under the blades and bolts of the Chapter as the Orks... The result is that Crimson Fists have both a great pride for their place in the Deathwatch and a great responsibility to live up to. This can sometimes grate with their Kill-team as others consider them aloof and entitled, as if the right to wear the silvered should pad of the Deathwatch was always their due and not something to be earned only through glory and death.",
    summary: "Stubborn and valourous Ork slayers with a glorious history.",
    curseName: "Only Honour in Death",
    curseLevels: {
      1: { name: "No Retreat", summary: "Refuses to retreat (Challenging WP test to disengage).", full: "As the odds mount so does the Battle-Brother’s stubborn refusal to retreat... When the Battle-Brother wishes to retreat from a combat he must pass a Challenging (+0) Willpower Test to do so. If he fails he may not Test again until either he or one of his brothers is wounded." },
      2: { name: "Suffer not Defeat", summary: "Must attack most dangerous foe if takes >10 Dmg or ally falls.", full: "If the Battle-Brother suffers more than 10 points of Damage (after reduction for armour or Toughness) or if one of the members of his Kill-team is incapacitated or killed, he will renew the vigour of his attacks... In this circumstance he must attack, seeking out the most able or dangerous of his foes. In his following turn, he is allowed to make a Challenging (+0) Willpower Test to retreat or change his tactics." },
      3: { name: "Unto Death", summary: "Gladly accepts suicidal tasks and fights regardless of wounds.", full: "Once the Battle-Brother suffers Critical Damage, he gains a fatalistic desire to sell his life for the cause... He will fight on regardless of his wounds and continue to attack or place himself in the path of attacks... He will also gladly accept suicidal or near suicidal tasks without complaint." }
    }
  },
  "Marines Errant": {
    modifiers: { Ag: 5, S: 5 },
    talents: [],
    skills: ["Common Lore (Imperial Navy)"],
    soloAbility: "Zero Tolerance",
    restrictions: [],
    demeanorName: "Shepherd of Assets",
    demeanorSummary: "Adept at marshalling resources and preserving/restoring wargear.",
    demeanorDescription: "The Marines Errant are keenly aware of their scattered companies, that they cannot draw upon the same amount of resources or manpower at any one moment as other stronger Chapters can. In part, this is the result of the crusading nature of the Marines Errant and the toll that centuries of fighting far flung wars has wrought upon the military materiel available to each of its dispersed battle groups. As such, the Marines Errant have become highly adept at marshalling their own resources, preserving and restoring even the most heavily damaged wargear.",
    summary: "A scattered crusading chapter adept at resource management.",
    curseName: "Crusader's Call",
    curseLevels: {
      1: { name: "Unending Valour", summary: "Must pass a Challenging (+0) Willpower Test when facing a foe with a Fear Rating for the first time, or gain Frenzy and cannot use Squad Mode.", full: "The Battle-Brother has become filled with pride in the history of his Chapter’s bravery and devotion and sees his own existence as a vital part of continuing its traditions. When his Kill-team is required to do their duty he will make sure that it is carried out, squashing any doubt his fellow Battle-Brothers might have or any weakness they might show in the face of honour. When facing a foe with a Fear Rating for the first time (see page 277 of the DEATHWATCH Core Rulebook) the Battle-Brother must make a Challenging (+0) Willpower Test. If they fail, they gain the Frenzy Talent for the encounter and must strive to destroy the Fear causing foe. During this time they cannot initiate or benefit from any Squad Mode abilities." },
      2: { name: "Duty through Sacrifice", summary: "Must use Squad Mode abilities to take Damage/hits for companions or give them his Reaction if at all possible.", full: "True duty can only be proven in death or an equally potent sacrifice, a fact which is known to all true servants of the God-Emperor. The Battle-Brother knows that to prove himself he must be the one to stand in the way of the blade or shield his comrades from the blast, so that there can be no doubt about his devotion or his loyalty to the Emperor. When using Squad Mode abilities (see page 219 of the DEATHWATCH Core Rulebook) where the Battle-Brother has the option to take Damage or hits for his companions or give them his Reaction (such as the Soak Fire or Tactical Spacing abilities) he must do so if at all possible." },
      3: { name: "Lead the Charge", summary: "Must volunteer for dangerous duties, lead charges, and engage the most dangerous foes in combat.", full: "In boarding actions, the greatest honour goes to those first through the breech and first to face the foe. The Battle-Brother accepts that he must take this role as his honour demands it, and it is just another way to prove his courage and loyalty in the eyes of his peers. If there is a choice or a chance to lead a charge or be the first to face the enemy, the Battle-Brother must take it. Furthermore he will seek out such opportunities, volunteering for dangerous duties if they mean he will get to lead others into the fray. In combat, the Battle-Brother will also seek out the most dangerous or powerful looking foes, even at the cost of ignoring closer or more pressing enemies." }
    }
  },
  "Blood Ravens": {
    modifiers: { Int: 5 },
    talents: [],
    soloAbility: "Foreknowledge",
    restrictions: [],
    demeanorName: "Secrets of the Dark",
    demeanorSummary: "A thirst for uncovering the lost past and forbidden knowledge.",
    demeanorDescription: "The origins of the Blood Ravens are shrouded in mystery and the true nature and name of their Primarch is unknown to them. A Battle-Brother comes into the ranks of the Blood Ravens with a sense of curiosity to understand their ancestry, further fuelled by the principles of the Chapter and the value it places on knowledge and secrets. To a Blood Ravens Battle-Brother, the drive to gain knowledge can be too much, and where a more reluctant or cautious Imperial servant might leave a book unopened or a vault sealed, the Battle-Brother must learn of its contents.",
    summary: "Scholars of forbidden lore and seekers of truth.",
    curseName: "Deepening Mysteries",
    curseLevels: {
      1: { name: "Unhealthy Curiosity", summary: "Must pass a Challenging (+0) Willpower Test to not pursue a secret.", full: "The more answers about their past the Blood Ravens discover, the more questions arise to be answered, leading to an ever expanding circle of secrets and lies that can consume those without the restraint to know when to stop looking. The Battle-Brother’s quest for lore and knowledge has led him into dangerous places, and his continued survival given him a false sense of security and the drive to press on. Whenever the Battle-Brother is presented with the chance to learn a secret or uncover some knowledge either of importance to the Blood Ravens or pertaining to the Adeptus Astartes, he must make a Challenging (+0) Willpower Test to not pursue it. If there is excessive danger involved, the GM can grant the Player Character a +10 to +30 bonus to this Test depending on the level of the danger. If the Test is failed, the GM may also allow the Player Character to Test again to resist after at least one attempt has been made to get the secret or a certain amount of time has passed." },
      2: { name: "Knowledgeable Obsessions", summary: "Must pass a Challenging (+0) Willpower Test to not learn more about an obsessive knowledge, even in danger.", full: "As a Blood Raven learns more forbidden lore, they can become obsessed with a particular subject, an aspect of the whole which they come to believe is linked directly to the secrets of their Chapter or some other great and important part of the Imperium’s struggle against its enemies. When the Battle-Brother gains this level, the GM chooses one of his Lore Skills, favouring those with the highest level of mastery first (i.e. if the Battle-Brother had Scholastic Lore: Ministorum +10 and Forbidden Lore: Xenos, then Scholastic Lore: Ministorum would be the first choice). Whenever the Battle-Brother is presented with a chance to learn more about this obsessive knowledge he must do so. Only if it would put his own life or the lives of his squad in danger can he resist and even then only with a Challenging (+0) Willpower Test." },
      3: { name: "Unholy Enlightenment", summary: "Failing a Lore Skill Test twice costs one Round of action and 1 Insanity or Corruption Point.", full: "After a time a Blood Raven will learn many secrets from his Chapter and may even spend time in its Librariums coming into contact with great volumes of forbidden lore. All of these secrets can taint a man, burdening his mind and granting him both a great understanding of the universe but also a touch of madness as he tries to contain and understand it in his mind. Whenever the Battle-Brother fails a Lore Skill Test of any kind, he must immediately Test again against the same Skill, with all the same modifiers as the first roll. If he fails again, then nothing has happened and he has simply failed the Test. If he passes it counts as if he had passed the Test (with whatever benefits would have been gained should he have passed the test the first time), however, he is overwhelmed for a moment, costing him one Round of action and earning him either 1 Insanity Point or 1 Corruption point as chosen by the player. If the Blood Ravens Player Character is the squad leader and he suffers the effects of Unholy Enlightenment then every member of his squad also gains 1 Insanity Point or Corruption Point if they would benefit in any way from the knowledge as their leader shares what he has learned with them." }
    }
  },
  "Red Scorpions": {
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
  "Space Wolves": {
    modifiers: { Per: 5, Fel: 5 },
    talents: ["Heightened Senses (Smell)", "Counter Attack"],
    soloAbility: "Wolf Senses",
    restrictions: ["Apothecary"],
    demeanorName: "Sons of Russ",
    demeanorSummary: "Ferocious and aggressive warriors who value duty, honour, and feats of arms over prayer.",
    demeanorDescription: "The Battle-Brothers of the Space Wolves are ferocious and aggressive warriors. Though far from mindless berserkers, they are certainly possessed of a feral exuberance for battle. They have an overriding sense of duty and honour, and are driven ever onwards by a strong desire to right the many wrongs that have befallen the Imperium. Space Wolves exhibit a fierce sense of loyalty to their comrades in arms. Although as devoted to the Emperor as any other Space Marine Chapter, the Space Wolves express their faith not in prayer and piety, but in feats of arms. While the Battle-Brothers of other Chapters may spend the night before battle in solemn meditation, the Space Wolves are more likely to mark the eve of battle in bawdy celebration. In temperament, most Space Wolves are blunt and plain speaking, even to the point of giving offence to those not used to their ways. They abhor pretension and despise politicking.",
    summary: "Renowned for sharp senses and feral heroism.",
    curseName: "Curse of the Wulfen",
    curseLevels: {
      1: { name: "Shadow of the Wolf", summary: "Fellowship reduced by –10/–20 when dealing with others.", full: "The wolf lurks close to the surface in the Battle-Brother and he feels its call in his blood. This can be unsettling for others, especially those not of the Adeptus Astartes. The Battle-Brother’s Fellowship is reduced by –10 when dealing with Space Marines who are not part of his Kill-team, and –20 when dealing with everyone else." },
      2: { name: "Prey’s Scent", summary: "Must pass Perception Test when bloodying a foe or lose actions.", full: "The keen senses of a Space Wolf can be as much a curse as a boon. Sometimes they can overpower the Battle-Brother, temporarily robbing him of his senses. The first time a foe is bloodied by the Space Wolf in battle he must make an Easy (+20) Perception Test. If he passes the test, he may only take a Half Action on his next Turn." },
      3: { name: "Fight or Fight", summary: "Willpower Test required to retreat or give ground.", full: "The Battle-Brother finds it hard to back down from fights in the face of naked aggression. Whenever the Space Wolf would be required to give ground or make a tactical retreat from foe, he must make a Hard (–20) Willpower Test to do so." }
    }
  },
  "Ultramarines": {
    modifiers: { Fel: 5, WP: 5 },
    talents: [],
    soloAbility: "Favoured Son",
    restrictions: [],
    demeanorName: "Honour the Codex",
    demeanorSummary: "Analytical, thorough, and disciplined warriors who follow the Codex Astartes to the letter.",
    demeanorDescription: "In all of their duties, from battle to study, the Ultramarines are thorough, analytical, and attentive to every detail. They are slow to anger and rarely make a rash decision. By constant recourse to the articles of faith enshrined within the Codex Astartes, the Ultramarines are able to face any eventuality with well-practised battle drills and established doctrine. In their dealings with Battle-Brothers from other Chapters, Ultramarines often fulfil the role of facilitator and peacemaker. While the Battle-Brothers of some Chapters display extremes of character, the Ultramarines are balanced in their approach, and often able to broker agreements between wildly differing points of view. This is evidenced in the fact that a high proportion of Deathwatch leaders are drawn from the Ultramarines.",
    summary: "Tactical flexibility and strict adherence to the Codex.",
    curseName: "The Pride of Ultramar",
    curseLevels: {
      1: { name: "The Emperor’s Finest", summary: "Always volunteer for most dangerous mission roles.", full: "Ultramarines consider themselves the Emperor’s favoured sons and the pride of the Imperium. This can lead members of the Chapter to consider others incapable or unable to complete missions that should by rights fall to the Ultramarines. The Battle-Brother always volunteers his Kill-team for the most dangerous or challenging Missions whenever possible." },
      2: { name: "Sons of the Codex", summary: "Cannot benefit from Squad Mode Actions called by Space Wolves or Black Templars.", full: "The Battle-Brother has been trained to follow the Codex Astartes to the letter and interpret its teachings flawlessly. Understandably, he is distrustful of those Chapters that do not adhere to the Codex. The Battle-Brother cannot benefit from Squad Mode Actions called by Space Marines of the Space Wolves or Black Templars Chapters." },
      3: { name: "Leaders not Followers", summary: "-2 Cohesion unless leader is a fellow Ultramarine or self.", full: "Ultramarines are natural leaders and make excellent battlefield commanders at all levels of command. This pride and training, however, can lead to them scorning or disregarding the leadership of those from other Chapter or Imperial forces. Unless the Battle-Brother is currently the Kill-team squad leader or the leader is a fellow Ultramarine, his Kill-team’s Cohesion is reduced by 2." }
    }
  },
  "Blood Angels": {
    modifiers: { WS: 5, Ag: 5 },
    talents: [],
    soloAbility: "Blood Frenzy",
    restrictions: [],
    demeanorName: "The Red Thirst",
    demeanorSummary: "Adestructive battle-fury and blood hunger held in check by nobility and humility.",
    demeanorDescription: "The Red Thirst is a Demeanour unique to Space Marines from the Blood Angels Chapter. Deep within the psyche of every Blood Angel is a destructive yearning, a battle fury and blood hunger that must be held in abeyance in every waking moment. Few Battle-Brothers can hold the Red Thirst in check unceasingly—it is far from unknown for Blood Angels to temporarily succumb to its lure at the height of battle. The Red Thirst is the Blood Angels’ darkest secret and greatest curse, but it is also their greatest salvation—for it brings with it a humility and understanding of their own failings which make them truly the most noble of the Space Marines.",
    summary: "Artistic warriors harboring a hidden combat rage.",
    curseName: "The Black Rage",
    curseLevels: {
      1: { name: "Bloodlust", summary: "Willpower Test to avoid finishing off surrendering foes.", full: "The Battle-Brother cannot stand to leave an enemy alive or end a fight without even a single kill. If an enemy surrenders or a fight looks like it will end without a foe’s death, the Battle-Brother must make a Challenging (+0) Willpower Test to avoid finishing them off or hacking down at least one foe." },
      2: { name: "Close Quarters Killing", summary: "Must favor melee over ranged and charge whenever possible.", full: "Those in the grip of the Black Rage favour close melee combat, where the blood of their foes stains their armour red. Unless there is no possible way to close with a foe, the Battle-Brother will always favour melee combat over ranged combat and will charge into the fray." },
      3: { name: "Uncontrollable Thirst", summary: "Must make Hard Willpower Test post-battle or drink enemy blood.", full: "In extreme cases, the Red Thirst translates into a literal thirst for blood. Once a battle is over, a Battle-Brother with Uncontrollable Thirst must make a Hard (–20) Willpower Test or spend at least a few minutes drinking the blood of his foes." }
    }
  },
  "Dark Angels": {
    modifiers: { BS: 5, Int: 5 },
    talents: [],
    soloAbility: "Stoic Defence",
    restrictions: [],
    demeanorName: "Sons of The Lion",
    demeanorSummary: "Secretive and introverted; suspicious of outsiders and impatience with those who pry.",
    demeanorDescription: "Although only the upper echelons of the Chapter are aware of the awful truth of the Dark Angels’ past, even those newly recruited are possessed of a secretive, even introverted nature. Outsiders are not to be trusted is drilled into recruits from an early stage. Many find the Dark Angels aloof and uncommunicative. They are impatient and unforgiving with strangers who pry into their affairs. They are notoriously intolerant of non-humans and will often refuse to fight alongside armies that include abhuman warriors or alien races. Their taciturn nature and stubborn refusal to accept anything other than total victory has served the Deathwatch well.",
    summary: "Brooding tacticians with ancient secrets.",
    curseName: "The Secret",
    curseLevels: {
      1: { name: "Dark Dreams", summary: "Start of mission Toughness Test or begin with Fatigue.", full: "The Battle-Brother is beset with memories of past times and deep, hidden secrets that cast a shadow over periods of rest and meditation. At the start of any mission, the Battle-Brother must pass a Challenging (+0) Toughness Test or begin play with a level of Fatigue." },
      2: { name: "Scorn of Outsiders", summary: "Command Skill restricted to Kill-team or Dark Angels.", full: "The Dark Angel has grown to view those outside the Chapter as misguided or ignorant of the truth and cannot bring himself to deal with them any more than necessary. The Battle-Brother cannot use the Command Skill on anyone who is not either a member of his Kill-team or a fellow Dark Angel." },
      3: { name: "Deep Suspicions", summary: "-2 Cohesion unless the team is solely Dark Angels.", full: "Trained in an atmosphere of silence and secrets, the Dark Angel has become very distrustful of anyone outside his Chapter and cannot take the words or promises of others at face value. Unless the Battle-Brother’s Kill-team is solely comprised of Dark Angels, its Cohesion is reduced by 2." }
    }
  },
  "Imperial Fists": {
    modifiers: { WP: 10 },
    talents: [],
    soloAbility: "Siege Master",
    restrictions: [],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Sons of Dorn",
    demeanorSummary: "Driven and focused warriors who prefer death to the perceived dishonour of defeat.",
    demeanorDescription: "Imperial Fists are driven and focussed. They study the Codex Astartes with dedication, yet their nature makes tactical re-deployment hard to comprehend—they will fight on regardless of consequences. When not in battle, they immerse themselves in history and war-science to silence doubts of potential failure. In battle, they refuse to take a step backwards or admit a foe’s superiority. They are disciplined and focused, preferring death over the remotest possibility of admitting defeat. This can cause friction with Kill-team leaders who order tactical withdrawals.",
    summary: "Unyielding defenders of the Imperium.",
    curseName: "Death before dishonor",
    curseLevels: {
      1: { name: "Suffer Not Failure", summary: "Truculent and obstructive when ordered to redeploy.", full: "The Battle-Brother believes himself deficient in some manner, real or imagined, and becomes truculent and obstructive when ordered to redeploy in the face of a stronger foe. When acting as the leader, he makes unreasonable demands and views disagreement as outright disobedience." },
      2: { name: "Beware Hubris", summary: "Brooding on past deeds, seeking even the slightest flaw.", full: "The Battle-Brother spends his every waking moment brooding on past battles, seeking even the slightest flaw in his own deeds. He condemns his own actions as falling short of the example set by his Primarch and seeks redemption in the fires of battle." },
      3: { name: "None Are Flawless", summary: "Obsessively fault-finding; unwilling to issue or accept orders that don't result in battle.", full: "The Battle-Brother obsessively reviews every detail of every mission, finding fault with his own actions and those of his Kill-team. He becomes withdrawn, maudlin, and confrontational, and unwilling to accept or issue any order that does not result in imminent battle." }
    }
  },
  "Iron Hands": {
    modifiers: { BS: 5, T: 5 },
    talents: [],
    soloAbility: "Suffer No Weakness",
    restrictions: [],
    startingGear: ["Exceptional craftsmanship bionic hand"],
    demeanorName: "Iron and Hate",
    demeanorSummary: "Abhorrence of weakness expressed through cold, mechanical tones and augmetic replacements.",
    demeanorDescription: "Iron Hands appear coldly inanimate, expressions shorn and replaced with steel. They abhor any trace of weakness, express cold mechanical anger, and are blunt and uncaring of offence given in their criticisms of allies. In battle, they are coldly resolute, Identifying enemy vulnerabilities and exploiting them ruthlessly. They scourge their flesh, reminding themselves of biological weakness. Only when biological inheritance is gone are they truly free of pain.",
    summary: "Cybernetic warriors shunning biological frailty.",
    curseName: "Steel Over Flesh",
    curseLevels: {
      1: { name: "A Disdain for Flesh", summary: "–20 penalty to Interaction Tests (reduced by cybernetics).", full: "The Battle-Brother perceives his own flesh as a hindrance. The Battle-Brother suffers a –20 penalty to all Interaction Skill Tests. This penalty is reduced to –10 if the Battle-Brother has three or more cybernetic implants, and removed if he has five or more." },
      2: { name: "Cold Fury", summary: "Willpower Test when confronted by enemy or weakness.", full: "The ruthlessness of the Iron Hands manifests more strongly. The Battle-Brother must take a Challenging (+0) Willpower Test when confronted by an enemy or something he considers “weak;” failure likely causes a feud or open violence." },
      3: { name: "Zero Tolerance", summary: "Refuses to fight with weak allies; -1d5 Cohesion if any member fails a test.", full: "The Battle-Brother will seek to remove any perceived source of weakness, to the point of refusing to fight alongside allied forces. If any member of the Kill-team fails a Challenging (+0) or easier Test, he may not benefit from Squad Mode. If Leader, Cohesion reduces by 1d5." }
    }
  },
  "Raven Guard": {
    modifiers: { Ag: 5, Per: 5 },
    talents: [],
    soloAbility: "Master of the Shadows",
    restrictions: [],
    demeanorName: "Son of Night",
    demeanorSummary: "Dark and brooding predators who prefer patient observation to unnecessary conversation.",
    demeanorDescription: "Raven Guard are dark and brooding, often surly and recalcitrant. They are not given to unnecessary conversation, preferring to watch and listen, waiting for events to unfold to their advantage. They are extremely patient, never acting rashly, and appear motivated by an inner darkness. They often fight alongside others but may fail to share plans, leading to conflict. They are known for using allies as bait in elaborate traps.",
    summary: "Stealth specialists striking from darkness.",
    curseName: "Lure Of the Shadows",
    curseLevels: {
      1: { name: "Tactical Friction", summary: "Resistant or disobedient when ordered into direct attacks.", full: "The Battle-Brother finds the direct tactics used by other members of his Kill-team to be brutish and ineffective. When commanded into a direct attack that he finds foolhardy, the Battle-Brother is resistant, almost to the level of disobedience." },
      2: { name: "Brooding Presence", summary: "Does not benefit from non-Raven Guard Command or Charm skills.", full: "The Battle-Brother is quiet and brooding, only speaking when absolutely necessary. Team members feel uneasy around him. The Battle-Brother doesn’t benefit from the effects of non-Raven Guard characters using the Command or Charm (Inspire) Skills." },
      3: { name: "Shadow Superiority", summary: "Does not benefit from any non-Raven Guard Squad Mode Abilities.", full: "The Battle-Brother despises the tactics of his fellow Battle-Brothers, knowing that his more intelligent approach is the best way to victory. The Battle-Brother doesn’t benefit from the effects of non-Raven Guard Squad Mode Abilities." }
    }
  },
  "Salamanders": {
    modifiers: { T: 5, Int: 5 },
    talents: ["Resistance (Heat)"],
    soloAbility: "Fire-Born",
    restrictions: [],
    demeanorName: "Promethean Cult",
    demeanorSummary: "Level-headed and wise warriors who maintain family ties and value compassion for humans.",
    demeanorDescription: "The Salamanders embody self-reliance and the principle that a warrior must never give up, even to the point of obstinacy. They are stubborn in defence and relentless in attack, seeking excellence in all things. Level-headed and wise, they never make decisions rashly and rarely change them once made. They hold personal honour above all and show unusual compassion for ordinary humans.",
    summary: "Stubborn defenders and master craftsmen.",
    curseName: "Unyielding",
    curseLevels: {
      1: { name: "Unrelenting", summary: "Routine (+10) Willpower Test to change mind or reconsider a plan.", full: "The Battle-Brother cannot easily change his mind once he has decided upon something. When the Battle-Brother attempts to reconsider his situation or otherwise change his mind about something, he must pass a Routine (+10) Willpower Test or be forced to remain with his previous decision." },
      2: { name: "Intransigent", summary: "Refuses to compromise; Kill-team Cohesion reduced by 2.", full: "The Battle-Brother is unwilling to compromise and is difficult to reason with. His stubborn nature prevents him from regarding any alternatives. Unable to reconcile with the Kill-team, he chooses only to rely on himself, reducing Cohesion by 2." },
      3: { name: "Obstinate", summary: "Hard (-20) Willpower Test to change mind; shuns all Squad Mode instructions.", full: "The Battle-Brother is slow to decide and unlikely ever to change his views. The Level 1 Willpower Test is now Hard (–20). He cannot benefit from any Squad Mode abilities activated by any other character, as he will not listen to their instructions." }
    }
  },
  "Storm Wardens": {
    modifiers: { S: 5 },
    woundsBonus: 2,
    talents: [],
    soloAbility: "Thunder’s Call",
    restrictions: [],
    demeanorName: "Aspire to Glory",
    demeanorSummary: "Clannish and aloof knights who value personal honor and seek out enemy champions for duels.",
    demeanorDescription: "Storm Wardens are committed to the tenets of personal honour and obligation. Clannish and aloof, they prefer to remain distant from the Imperium at large. A Storm Warden is slow to make friends, but protects companions fiercely. Honor is paramount; word is bond. They enjoy debate and crafting points to support arguments. In battle, they fight with fervor, seeking out enemy champions to test skills against.",
    summary: "Chivalrous highland warriors seeking glory.",
    curseName: "Thirst for Glory",
    curseLevels: {
      1: { name: "No Challenge Unanswered", summary: "Willpower Test to avoid engaging enemies who challenge or taunt.", full: "The Storm Wardens pride does not let him refuse a challenge or the chance for glory. Whenever an enemy challenges or taunts the Battle-Brother, he must make a Challenging (+0) Willpower Test or engage it in combat, favouring melee attacks." },
      2: { name: "A Fair Fight", summary: "Must use weapons of equal measure when answering a challenge.", full: "Overwhelmed with a need to act honourably, the Battle-Brother uses only weapons of equal measure when answering a challenge. If the foe is armed with weapons far inferior, he will cast aside bolter and chainsword and settle the matter with his fists." },
      3: { name: "Honour and Blood", summary: "Hard Willpower Test to disengage from a challenge if wounded.", full: "Storm Wardens seldom back down once a challenge has been accepted. If the Battle-Brother suffers a Wound after accepting a challenge, he must make a Hard (–20) Willpower Test to disengage or stop fighting his foe until it is dead." }
    }
  },
  "White Scars": {
    modifiers: { Ag: 5, WP: 5 },
    talents: [],
    soloAbility: "As Swift as the Wind",
    restrictions: [],
    demeanorName: "Son of the Steppes",
    demeanorSummary: "A balance of wildness and discipline; patient honourable hunters who despise pretension.",
    demeanorDescription: "White Scars are complex individuals, a mix of tribal tradition and Astartes doctrine. They regard civilization trappings with suspicion. In character, they display a balanced mix of wildness and discipline. Often dour and severe, yet supremely honourable with a highly developed sense of justice. Each time they draw upon ferocity, they take a step closer to the precipice of bloodlust, requiring prodigious willpower to control.",
    summary: "Lightning-fast hunters of the steppes.",
    curseName: "Chogorian Savagry",
    curseLevels: {
      1: { name: "A Moment Unrestrained", summary: "Willpower Test (+10) when Charging or consume by reckless fury.", full: "The Battle-Brother’s discipline begins to slip, allowing untamed ferocity to emerge. When Charging an enemy, he must pass an Ordinary (+10) Willpower Test or become consumed by a reckless fury, taking unnecessary risks and pursuing the enemy until slain." },
      2: { name: "Suppressed Rage", summary: "–10 Fellowship; Willpower Test when challenged by an ally.", full: "Within the darkest reaches of the mind lurks the shadow of rage, seeking any opportunity to emerge. This imposes a –10 penalty on Fellowship tests and requires a Challenging (+0) Willpower Test when challenged by an ally to avoid Physical violence." },
      3: { name: "Uncontrolled Battle-lust", summary: "Seeks combat at every opportunity; resist tests suffer an additional –20 penalty.", full: "The Battle-Brother is incapable of suppressing that lust for combat. He will seek combat at every opportunity, and become restless and ill-tempered when there is no battle. The Willpower Tests to resist Levels 1 and 2 suffer an additional –20 penalty." }
    }
  },
  "Black Templars": {
    modifiers: { WS: 5, WP: 5 },
    talents: [],
    soloAbility: "Righteous Zeal",
    restrictions: ["Devastator Marine", "Librarian"],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Zealous",
    demeanorSummary: "Invariably preparing for battle through prayer or training; intolerant of psychic power and alien influence.",
    demeanorDescription: "When not engaged in battle, Black Templars are found preparing for it through prayer, meditation, or exacting training rituals. They forego all but bare necessities to purify themselves. For those seconded to the Deathwatch, fighting alongside a Librarian is a particular trial. They pass every hour not fighting in deep contemplation and prayer, often cloistering themselves away in a personal shrine to the Emperor.",
    summary: "Crusading zealots shunning the warp.",
    curseName: "Burn the Witch",
    curseLevels: {
      1: { name: "Burn the Witch (Lvl 1)", summary: "–20 penalty to Fellowship tests used on characters with psychic abilities.", full: "The Battle-Brother is uncomfortable around psykers and feels their dark powers crawling on his flesh and burrowing into his brain. All Fellowship based tests used on characters with psychic abilities suffer a –20 penalty, as the Battle-Brother’s disquiet shows through." },
      2: { name: "Burn the Witch (Lvl 2)", summary: "Kill-team Cohesion reduced by 1 if a psyker ally is present.", full: "The Battle-Brother can scarcely stand the presence of psykers and abhors their sight. If there is a psyker in the Battle-Brother’s Kill-team (such as a Librarian Player Character) or he must work with a psyker ally, his Kill-team’s Cohesion is reduced by 1 (until such time as the psyker leaves or is killed)." },
      3: { name: "Burn the Witch (Lvl 3)", summary: "Must prioritize killing enemy psykers over all other foes.", full: "The Battle-Brother cannot stand any psykers to live and flies into a rage when he sees them. When fighting enemy psykers, the Battle-Brother must seek them out (choosing the most obviously powerful first) and kill them to the exclusion of all other foes. This can be especially problematic for the Kill-team, should they need to take a psyker alive." }
    }
  },
  "Flesh Tearers": {
    modifiers: { WS: 5, Ag: 5, Fel: -15 },
    talents: ["Flesh Render"],
    soloAbility: "A Taste for Blood",
    restrictions: [],
    demeanorName: "Unquenchable Thirst",
    demeanorSummary: "The Flesh Tearers are barely able to contain the outward signs of their Primarch’s curse, the Black Rage clouding their judgement.",
    demeanorDescription: "The Flesh Tearers are barely able to contain the outward signs of their Primarch’s curse, the Black Rage clouding their judgement and the Red Thirst filling them with a lust for blood. Such is the extreme nature of their thirst for blood that it consumes them constantly and once blood is drawn, no matter the cause, the Battle-Brothers of the Chapter find it extremely difficult to resist the urge to spill more. In battle, this can make them into frenzied madmen hacking and tearing at their foes in a whirlwind of blades and teeth seeking to rip their enemies apart, while at other times they radiate a barely contained aura of rage and hunger which can make all those around them feel acutely uncomfortable. Some Flesh Tearers embrace this madness and live in a constant state of rage, simply directing their fury at one target or another, be it a foe in battle or an object which has had the misfortune to get in their way. These Battle-Brothers find it almost impossible to stay still for long or hold down lengthy dialog with others and must retire from social situations before long lest they destroy something. Others try and repress their rage and instead speak through gritted teeth and blazing eyes, making those who converse with them fear for their lives, or expect sudden and brutal violence at any moment. In both cases, the Battle-Brother carries with him a heavy cloud of repressed anger and fury wherever he goes which cannot be lifted or easily ignored by those around him.",
    summary: "Rage-filled berserkers struggling with the twin urges of the Red Thirst and Black Rage.",
    curseName: "Dark Rage",
    curseLevels: {
      1: { name: "Extreme Frenzy", summary: "Difficult (-10) Willpower Test when taking damage or stressed to avoid Frenzy.", full: "The Battle-Brother completely loses control when he frenzies and finds it almost impossible to claw his way back to reason as long as there are foes to fight and blades drawn. Even when foes are not near, the madness of Frenzy grips him and he rages endlessly for battle and blood, howling out his anger and striking the ground with his blade. If the Battle-Brother has the Frenzy Talent, then he could lose control at any moment. Any time the Battle-Brother takes damage, is confronted with a clear threat, or is put in a position of great stress (as determined by the GM), the Battle-Brother must make a Difficult (–10) Willpower Test as a Free Action to avoid becoming Frenzied. If he passes, he is able to contain his fury for the duration of the encounter or until he is forced to make another test. If the he fails the Test, he immediately becomes Frenzied." },
      2: { name: "Blood Madness", summary: "Must engage in close combat. Hard (-20) Willpower Test to avoid hacking downs foes' corpses.", full: "The Flesh Tearers thirst for the blood of their foes when in the grips of the Red Thirst and long to see it spilled across the ground in great arcs and gouts. They also crave the feeling of hot blood on their skin and splattering across their armour staining the dark red a darker shade still. The Battle-Brother must engage foes in close combat if possible, either making melee attacks against them or shooting point black with pistols so that their blood spills at his feet. When he downs a foe, he must make a Hard (–20) Willpower Test to resist the urge to spend his next turn hacking or blasting the foe’s corpse apart. If the Battle-Brother is hit by an attack (though not if he is attacked and missed) while hacking at a foe, he will turn his attention to his new attacker instead." },
      3: { name: "Animal Within", summary: "-30 all non-combat tests. Hard (-20) WP to choose random target, otherwise attacks nearest.", full: "Near the end, a Flesh Tearer is little more than an animal filled with fury and madness striking out at all those around him. While he may still have lucid moments where he remembers the warrior he once was, these are fleeting and quickly gone to be replaced with only the thought of killing and the thirst for blood. The Battle-Brother suffers a –30 to any Characteristic or Skill Test when not in combat. The Battle-Brother may not use any Skill which is based on Intelligence, Willpower or Fellowship. In combat, he must make a Hard (–20) Willpower Test to choose his target, otherwise he will attack the nearest target (friend or foe) determined randomly if there is more than one to choose from." }
    }
  }
};

export const ARMOR_ABILITIES: { [key: string]: ArmorAbility } = {
  "Enhanced Strength": {
    name: "Enhanced Strength",
    description: "Increase the Battle-Brother’s Strength by +20. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+15)": {
    name: "Enhanced Strength (+15)",
    description: "Increase the Battle-Brother’s Strength by +15. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+25)": {
    name: "Enhanced Strength (+25)",
    description: "Increase the Battle-Brother’s Strength by +25. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+30)": {
    name: "Enhanced Strength (+30)",
    description: "Increase the Battle-Brother’s Strength by +30. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Auto-Senses": {
    name: "Auto-Senses",
    description: "Dark Sight, Heightened Senses (+10 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Auto-Senses (+5)": {
    name: "Auto-Senses (+5)",
    description: "Dark Sight, Heightened Senses (+5 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Auto-Senses (+15)": {
    name: "Auto-Senses (+15)",
    description: "Dark Sight, Heightened Senses (+15 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Bio-monitor and Injectors": {
    name: "Bio-monitor and Injectors",
    description: "+10 to resist Toxic, 6 doses of pain suppressors (ignore Critical Effects for 1d10 rounds), Stun negated after 1 round."
  },
  "Recoil Suppression": {
    name: "Recoil Suppression",
    description: "Fire Basic weapons 1-Handed. Basic weapons still may not be used in Close Combat."
  },
  "Giant Among Men": {
    name: "Giant Among Men",
    description: "A Space Marine in power armour is Hulking. This increases his Base Movement by 1; however, the grace afforded by his Black Carapace negates the modifier enemies would otherwise have to attack him. He still suffers the usual penalties to Concealment and Silent Move for being heavily armoured."
  },
  "Poor Manual Dexterity": {
    name: "Poor Manual Dexterity",
    description: "-10 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Poor Manual Dexterity (-15)": {
    name: "Poor Manual Dexterity (-15)",
    description: "-15 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Poor Manual Dexterity (-20)": {
    name: "Poor Manual Dexterity (-20)",
    description: "-20 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Osmotic Gill Life Sustainer": {
    name: "Osmotic Gill Life Sustainer",
    description: "Environmentally sealed with adequate oxygen supply as long as power is maintained."
  },
  "Frag Assault Launchers": {
    name: "Frag Assault Launchers",
    description: "Ironclad Dreadnoughts are armed with Frag Assault Launchers, single-shot scatter grenades employed to cover the Dreadnought’s final assault (Facing Front, Range 10m, 2d10 X, Pen 0, Clip 1). Frag Launchers may be fired as a Free Action, and fire in a 45 degree cone from the Dreadnought, hitting everything within range. When they fire, they force automatic Pinning Tests from all eligible targets within range."
  },
  "Walker": {
    name: "Walker",
    description: "Walkers are able to ignore penalties for moving through difficult terrain, and negotiate obstacles such as rock slides, tank traps, fallen trees, and shattered buildings without penalty."
  },
  "Reinforced Hull": {
    name: "Reinforced Hull",
    description: "When a vehicle with a Reinforced Hull receives a Critical Hit, halve the results, rounding up. This does not affect rolls on the Critical Hit chart generated by Righteous Fury."
  },
  "Combat Walker": {
    name: "Combat Walker",
    description: "Dreadnoughts always have a Basic Melee Attack (representing their ability to charge, batter, and smash targets): (Melee, 1d10+14 I, Pen 0, Unwieldy)"
  },
  "Living Relic": {
    name: "Living Relic",
    description: "A Furioso Dreadnought is an ancient and venerated engine of destruction, a reminder of the millennia of ignominious defeats and glorious victories. A Furioso Dreadnought grants all loyal Space Marines within 50m a +10 bonus on all Tests to resist Fear, Pinning and Cohesion Damage."
  },
  "Vox Link": {
    name: "Vox Link",
    description: "Standard vox and data transmission. View squadmate vitals."
  },
  "Nutrient Recycling": {
    name: "Nutrient Recycling",
    description: "2 weeks without food: Test Toughness or suffer Fatigue. Difficulty increases every 2 weeks."
  },
  "Magnetized Boot Soles": {
    name: "Magnetized Boot Soles",
    description: "Activated to provide Magboots."
  },
  "Force Field (PR 30, Overload 01-05)": {
    name: "Force Field (PR 30, Overload 01-05)",
    description: "The Armour of Faith includes a Force Field with a Protection Rating of 30 and an Overload Roll of 1-5."
  },
  "The price of eternal service": {
    name: "The price of eternal service",
    description: "The concentration necessary to wield the powers of the warp that the Dreadnought suffers a –20 penalty on all Focus Power Tests, due to the difficulty Dreadnoughts have attempting to focus upon the world. But such is the Dreadnought’s disconnect between the world of the living and his current state of being that all advances purchased from that advance scheme cost twice the normal amount of xp."
  },
  "Noisier": {
    name: "Noisier",
    description: "–10 penalty to Concealment and Silent Move Tests."
  },
  "Not built for stealth": {
    name: "Not built for stealth",
    description: "–10 penalty to Concealment and Silent Move."
  },
  "Legacy of the Great Crusade (+10)": {
    name: "Legacy of the Great Crusade (+10)",
    description: "Squad Leader adds +10 to prevent Cohesion Damage. +20 Fellowship with Space Marines."
  },
  "Legacy of the Great Crusade (+5)": {
    name: "Legacy of the Great Crusade (+5)",
    description: "Squad Leader adds +5 to prevent Cohesion Damage. +20 Fellowship with Space Marines."
  },
  "Clanks and grinds": {
    name: "Clanks and grinds",
    description: "–20 penalty to Concealment and Silent Move."
  },
  "Armored for assault": {
    name: "Armored for assault",
    description: "Rear AP is 6 for all parts."
  },
  "Echoes of brotherhood": {
    name: "Echoes of brotherhood",
    description: "+15 Fellowship with Space Marines."
  },
  "Marked from the heresy": {
    name: "Marked from the heresy",
    description: "+10 Fellowship with Space Marines, –10 penalty with Inquisitors."
  },
  "Lightest variant": {
    name: "Lightest variant",
    description: "+10 bonus to Agility."
  },
  "High collar": {
    name: "High collar",
    description: "Attack on head (8-10 on d10) hits body instead."
  },
  "Mark of command": {
    name: "Mark of command",
    description: "+5 to Command Tests."
  },
  "Terminator Actuators": {
    name: "Terminator Actuators",
    description: "Heavy/Mounted weapons fired one-handed. Auto-Stabilised Trait."
  },
  "Terminator Squad Link": {
    name: "Terminator Squad Link",
    description: "Squad Rank +1 if 2+ Terminators in squad."
  },
  "Sensorium": {
    name: "Sensorium",
    description: "Provides the same capabilities as an auspex."
  },
  "Body Glove": {
    name: "Body Glove",
    description: "+10 to any toughness tests to resist contact poisons, radiation, acids, or chemicals."
  },
  "Anointment of Obfuscation": {
    name: "Anointment of Obfuscation",
    description: "–10 to any Tech-use or Scrutiny tests for anyone trying to detect the wearer."
  },
  "Scout Vox": {
    name: "Scout Vox",
    description: "Long-range (35km), encrypted, multi-band vox system."
  },
  "Interlocutor Beacon": {
    name: "Interlocutor Beacon",
    description: "Identifies wearer as ally; acts as emergency distress beacon."
  },
  "Auto-injector Cuff": {
    name: "Auto-injector Cuff",
    description: "+5 to resist Toxic. 2 doses of pain suppressors (ignore Critical Effects for 1d10 rounds). Negate stun after 1d5 rounds."
  },
  "Slow and steady": {
    name: "Slow and steady",
    description: "A Terminator cannot Run, and the wearer suffers –20 to Agility, and cannot Dodge (but may still Parry)."
  }
};

export interface ArmorPattern {
  name: string;
  head: number;
  torso: number;
  rightArm: number;
  leftArm: number;
  rightLeg: number;
  leftLeg: number;
  abilities: string[];
  historySlots: number;
  strengthBonus?: number;
  agilityBonus?: number;
  autoSensesBonus?: number;
  manualDexterityPenalty?: number;
  imageUrl?: string;
}

export const ARMOR_PATTERNS: { [key: string]: ArmorPattern } = {
  "MK I Thunder": {
    name: "MK I Thunder",
    head: 6, torso: 8, rightArm: 6, leftArm: 6, rightLeg: 4, leftLeg: 4,
    abilities: ["Giant Among Men", "Enhanced Strength (+15)", "Vox Link", "Magnetized Boot Soles", "Nutrient Recycling", "Noisier", "Poor Manual Dexterity (-15)"],
    historySlots: 1,
    strengthBonus: 15,
    manualDexterityPenalty: -15,
    imageUrl: "https://i.ibb.co/hxgHyNqL/MKI.png"
  },
  "MK II Crusade": {
    name: "MK II Crusade",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Giant Among Men", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Not built for stealth", "Legacy of the Great Crusade (+10)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20,
    imageUrl: "https://i.ibb.co/DPq41rP2/MK-II.png"
  },
  "MK III Iron": {
    name: "MK III Iron",
    head: 9, torso: 10, rightArm: 9, leftArm: 9, rightLeg: 9, leftLeg: 9,
    abilities: ["Giant Among Men", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Clanks and grinds", "Armored for assault", "Legacy of the Great Crusade (+5)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20,
    imageUrl: "https://i.ibb.co/0j5pWZgF/MK-III.png"
  },
  "MK IV Maximus": {
    name: "MK IV Maximus",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Echoes of brotherhood", "Poor Manual Dexterity"],
    historySlots: 3,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/mj4zRQ8/MK-IV.png"
  },
  "MK V Heresy": {
    name: "MK V Heresy",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Marked from the heresy", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 5,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/ZpQtMM9N/MK-V.png"
  },
  "MK VI Corvus": {
    name: "MK VI Corvus",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses (+15)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Lightest variant", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 15,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/YFGPZN0y/MK-VI.png"
  },
  "MK VII Aquilla": {
    name: "MK VII Aquilla",
    head: 8, torso: 10, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/gZqNJXL2/MK-VII.png"
  },
  "MK VIII Errant": {
    name: "MK VIII Errant",
    head: 8, torso: 11, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "High collar", "Mark of command", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/Y73xXJCD/MK-VIII.png"
  },
  "Terminator": {
    name: "Terminator",
    head: 14, torso: 14, rightArm: 14, leftArm: 14, rightLeg: 14, leftLeg: 14,
    abilities: ["Giant Among Men", "Enhanced Strength (+30)", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Terminator Actuators", "Terminator Squad Link", "Sensorium", "Poor Manual Dexterity", "Slow and steady"],
    historySlots: 2,
    strengthBonus: 30,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/V8NY8YC/Terminator.png"
  },
  "Artificer": {
    name: "Artificer",
    head: 12, torso: 12, rightArm: 12, leftArm: 12, rightLeg: 12, leftLeg: 12,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/Z6k49QdF/Artificer.png"
  },
  "Armour of Faith": {
    name: "Armour of Faith",
    head: 12, torso: 12, rightArm: 12, leftArm: 12, rightLeg: 12, leftLeg: 12,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity", "Force Field (PR 30, Overload 01-05)"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/8gWchLMY/Emperor-s-Champion.webp"
  },
  "Astartes Scout Armour": {
    name: "Astartes Scout Armour",
    head: 0, torso: 7, rightArm: 7, leftArm: 7, rightLeg: 5, leftLeg: 5,
    abilities: ["Vox Link", "Body Glove", "Anointment of Obfuscation", "Scout Vox", "Interlocutor Beacon", "Auto-injector Cuff"],
    historySlots: 1,
    strengthBonus: 0,
    autoSensesBonus: 0,
    manualDexterityPenalty: 0,
    imageUrl: "https://i.ibb.co/yc17K2dT/Scout.png"
  },
  "Astartes Dreadnought": {
    name: "Astartes Dreadnought",
    head: 0, torso: 30, rightArm: 0, leftArm: 0, rightLeg: 0, leftLeg: 0,
    abilities: ["Walker", "Giant Among Men", "Auto-Senses (+20)", "Reinforced Hull", "Combat Walker"],
    historySlots: 0,
    strengthBonus: 0,
    agilityBonus: +20,
    imageUrl: "https://i.ibb.co/ymCMvqZr/Deathwatch-Venerable-Dreadnought00.webp"
  },
  "Ironclad Dreadnought": {
    name: "Ironclad Dreadnought",
    head: 0, torso: 30, rightArm: 0, leftArm: 0, rightLeg: 0, leftLeg: 0,
    abilities: ["Walker", "Giant Among Men", "Auto-Senses (+20)", "Extra Armor", "Reinforced Hull", "Combat Walker", "Frag Assault Launchers"],
    historySlots: 0,
    strengthBonus: 0,
    agilityBonus: +10,
    imageUrl: "https://i.ibb.co/ymrvCRWS/Ironclad-Dreadnought001.webp"
  },
  "Furioso Dreadnought": {
    name: "Furioso Dreadnought",
    head: 0, torso: 43, rightArm: 0, leftArm: 0, rightLeg: 0, leftLeg: 0,
    abilities: ["Walker", "Giant Among Men", "Auto-Senses (+20)", "Reinforced Hull", "Combat Walker", "Living Relic"],
    historySlots: 0,
    strengthBonus: 0,
    agilityBonus: 0,
    imageUrl: "https://i.ibb.co/rG8kRGx7/Furioso-Dreadnought02.webp"
  },
  "Librarian Dreadnought": {
    name: "Librarian Dreadnought",
    head: 0, torso: 43, rightArm: 0, leftArm: 0, rightLeg: 0, leftLeg: 0,
    abilities: ["Walker", "Giant Among Men", "Auto-Senses (+20)", "Reinforced Hull", "Combat Walker", "Living Relic"],
    historySlots: 0,
    strengthBonus: 0,
    agilityBonus: 0,
    imageUrl: "https://i.ibb.co/BVMnLDvg/image.png"
  }
};

export const ARMOR_HISTORIES: { [key: string]: ArmorAbility } = {
  "None": {
    name: "None",
    description: "No specific history recorded for this suit."
  },
  "Cower Not Before the Enemy": {
    name: "Cower Not Before the Enemy",
    description: "–20 to all Silent Move and Concealment Tests. +10 bonus to Command Tests."
  },
  "None shall escape the Emperor’s Wrath": {
    name: "None shall escape the Emperor’s Wrath",
    description: "+5 bonus to BS. –10 penalty to Dodge in melee."
  },
  "Thine arm be the scourge of the impure": {
    name: "Thine arm be the scourge of the impure",
    description: "+5 WS. When wearing the suit’s helmet, BS tests suffer a –5 penalty."
  },
  "Death is Joy": {
    name: "Death is Joy",
    description: "Add +2 Damage to Critical Damage attacks. Increase damage to a Horde’s Magnitude by 1."
  },
  "A Fury like lightning": {
    name: "A Fury like lightning",
    description: "+5 bonus to Agility, and +1 to Initiative rolls."
  },
  "Thy strength be legend": {
    name: "Thy strength be legend",
    description: "+10 bonus to Strength (added after Unnatural Strength modifications)."
  },
  "Terror be thy friend": {
    name: "Terror be thy friend",
    description: "Wearer gains the Fear (1) Trait against any foe engaged in melee (or increases Fear Rating by 1)."
  },
  "Lead from the front": {
    name: "Lead from the front",
    description: "Add +1 Cohesion to your Squad’s total."
  },
  "Bring Death from Afar": {
    name: "Bring Death from Afar",
    description: "No penalties for moving and firing with pistol/basic weapons on semi/full auto. Heavy weapons count as basic for moving/firing semi/full auto."
  },
  "To forget is to forgive. Forget nothing": {
    name: "To forget is to forgive. Forget nothing",
    description: "Gain the Hatred (Choose one) Talent."
  }
};

export const BATTLE_TRAUMAS: BattleTrauma[] = [
  {
    name: "Battle Rage",
    summary: "Singles out enemies for fury; fixated on destruction after Righteous Fury.",
    description: "The Battle-Brother singles out particular enemies for the Emperor’s fury and becomes fixated on killing them. This most often occurs when facing powerful foes such as enemy commanders or war machines. The Battle-Brother is driven to destroy them without regard for lesser foes or anything less than vital Mission Objectives. Whenever the Battle-Brother scores Righteous Fury on a foe, he becomes fixated on its destruction and must kill it. The Space Marine must then direct his attacks against this target to the exclusion of all else until it is slain. When Battle Rage is triggered, the Battle-Brother may make a Challenging (+0) Willpower Test to avoid its effects. The GM may also allow a similar Willpower Test if the Battle-Brother or his Kill-team are clearly in danger from a more powerful source."
  },
  {
    name: "Ear of the Emperor",
    summary: "Potential secret Tertiary Objectives assigned by the Emperor per mission.",
    description: "All Battle-Brothers pray to the Emperor to guide their hand in battle and help them to do their righteous duty. Some, however, hear his voice and even converse with him through their dreams and mediations. For the most part this has no effect on the Battle-Brother’s daily existence, and even his fellow brothers will see little unusual in his constant prayer and religious muttering. Sometimes the Emperor can demand unusual service from the Battle-Brother, which may be at odds with the goals of his Kill-team. At the start of a Mission, the GM rolls a dice. If the result is odd, then the Emperor has chosen the PC for a special Objective which the GM tells him about in secret. This should be a Tertiary Objective and can be literally anything, even something that is completely at odds with the Mission’s primary goal."
  },
  {
    name: "Ancestral spirits",
    summary: "Ancestor personality surfaces for 1d5 hours upon specific trigger events.",
    description: "All Space Marine revere their ancestors, tracing the line of heroes and commanders back to their primarch and the founding of their Chapter. Some experience this connection far more vividly than others and can find themselves having memories of things they didn’t do or places they have not visited. This is known as ancestral spirits, the mind of a long-dead Battle-Brother passed down through the blood—a mind that in times of stress can even push its way to the surface. The GM secretly chooses a trigger for the Battle-Brother based on an event or encounter related to his ancestral spirit. When the trigger event occurs, the Battle-Brother makes a Challenging (+0) Willpower Test or his ancestor surfaces for 1d5 hours. During this time he still has control of himself but his personality may change, he will choose actions that might be out of character, and he may muse wistfully about his role in battles centuries past."
  },
  {
    name: "Righteous contempt",
    summary: "–20 Fellowship when dealing with humans; refusal to seek human assistance.",
    description: "While Space Marines begin their life as men, the implantation of their Chapter’s gene-seed shapes their flesh and mind into something far greater and in the end no longer entirely human. All Battle-Brothers accept this superiority as part of reaching their pinnacle as a warrior and serving the Emperor, but for some it can make them scornful or dismissive of “lesser” beings. The Battle-Brother has no time for those not of the Adeptus Astartes and has, to a degree, lost touch with his humanity. When dealing with humans the character’s Fellowship is lowered by –20. In addition, he never willingly seeks the help of humans, who he views as weak and untrustworthy."
  },
  {
    name: "Endless Redemption",
    summary: "Driven to complete all mission objectives regardless of personal cost or danger.",
    description: "Some Battle-Brothers feel the weight of the Imperium on their shoulders and consider themselves solely responsible for the preservation and protection of the Emperor’s domain. This is where the lines of duty and fanaticism can become blurred, and the reality of battle becomes mired in the individual’s personal zeal. This is known as the endless redemption, a sin of duty carried by the Battle-Brother that can never be repaid regardless of the amount of glory or blood laid at its feet. The Battle-Brother is driven by duty and must not fail at all costs. When undertaking a Mission, he must attempt to complete all Objectives regardless of cost and danger. In extreme circumstances the GM may allow the character a Challenging (+0) Willpower Test to resist this duty and retreat if attempting an Objective would mean almost certain death."
  }
];

export const RELIC_WARGEAR = [
  {
    name: "Diomedes' Grace",
    chapter: "Raptors",
    type: "wargear",
    summary: "Max -20 penalty to Pilot (Personal) from terrain/space constraints. +10 Pilot (Personal) in jungle/forest.",
    description: "Captain Diomedes of the Raptors had the finest artificers of his Chapter adapt the jump pack he favoured with an advanced suspensor rig and dispersion jets to assist his manoeuvrability in the jungle warfare he had mastered. The jump pack eventually made its way to the Deathwatch, where it has served without equal in all manner of areas normally inaccessible by such means. Rules: Diomedes’ Grace follows all the normal rules for Astartes jump packs, but the user can never suffer a total penalty of greater than –20 to his Pilot (Personal) Tests from terrain or space constraints in any area large enough to admit him. Its workmanship shows most thoroughly in jungle or forest settings, granting a +10 to Pilot (Personal) Tests in the environments for which it was made."
  },
  {
    name: "Libris Anomalus",
    chapter: "Novamarines",
    type: "wargear",
    summary: "+1d5 DoS to successful Forbidden Lore (Xenos) Tests, min -10 penalty for obscure species.",
    description: "The warriors of the Novamarines have accumulated a great deal of alien-hunting lore and combat technique in their vigil over the Halo Stars, which has led to strong ties between the Chapter and the like-minded Deathwatch. One of the Codiciers of the Novamarines brought a valuable datalibram to Watch-Fortress Erioch, containing millennia of the Chapter’s collected knowledge. Partial copies have been disseminated to other Watch-Fortresses, but the value of the libram is such that it spends more time in use than available to scribes—notwithstanding the centuries it would take to fully reproduce such a vast archive. Rules: The Libris Anomalus is not easy to search, but can greatly reward a knowledgeable reader, adding 1d5 Degrees of Success to any successful Forbidden Lore (Xenos) Test. In addition, no test concerning a species previously encountered by the Imperium can ever suffer more than a –10 penalty due to its obscurity."
  },
  {
    name: "The Lost Halo",
    chapter: "Howling Griffons",
    type: "wargear",
    summary: "Force Field (Rating 55, Overload 01), weapons not stopped have Pen halved.",
    description: "This advanced Iron Halo had a long and glorious history in the Angevin Crusade, defending the mightiest heroes of the Howling Griffons from the foul xenos that claimed the Calyx Expanse. It disappeared from Chapter records after the crusade’s conclusion, and was not heard of again for centuries. Shortly before the Jericho Warp Gate was discovered, the Omega Vault yielded up the Lost Halo for unknown reasons—and without any clue as to how it had arrived there. Rule: The Lost Halo is a Force Field with a Protection Rating of 55 and an Overload Roll of 01. Weapons that are not stopped by the Field have their Penetration reduced by half."
  },
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
  },
  {
    name: "Linebreaker",
    chapter: "Marines Errant",
    type: "weapon",
    description: "The Astartes shotgun is commonly thought of as a weapon for the Scout Companies, but the death toll wrought on enemy forces by the veterans who have wielded Linebreaker speak to its effectiveness in other hands. The weapon’s specially crafted, short barrel is reinforced to withstand a unique shot made of super-dense alloys. Even a grain of this ammunition impacts with it the force of a slug from a lesser weapon, allowing for a devastating spread of fire.",
    rules: "Linebreaker is an Astartes shotgun with the Felling (1) Quality. Its unique ammo allows it to count ranges out to 10 metres as if they were point-blank for the purposes of extra hits from Scatter. The requisition cost for Linebreaker includes 3 spare clips, and any further clips must be acquired at a cost of 10 Requisition each.\nProfile: Basic 30m S/2/– 1d10+12 I Pen 6 Clip 18 Rld 2 Full Special: Felling (1), Scatter",
    stats: {
      weapon: {
        name: "Linebreaker",
        class: "Basic",
        range: "30m",
        rof: "S/2/–",
        damage: "1d10+12 I",
        pen: 6,
        clip: { current: 18, max: 18 },
        reload: "2 Full",
        special: "Felling (1), Scatter",
        ammoType: "Linebreaker Rounds",
        ammoClass: "Shotgun",
        ammoCategory: "Shells"
      }
    }
  },
  {
    name: "Naval Boltgun",
    chapter: "Marines Errant",
    type: "weapon",
    description: "Marines Errant are used to fighting in the close confines of ships and in brutal toe-to-toe boarding actions. Some Battle-Brothers use cut down naval boltguns for such engagements where a full sized weapon would be too large or unwieldy.",
    rules: "A Marines Errant Battle-Brother may exchange his starting Astartes boltgun for a Naval boltgun. If he does so, he reduces its Clip by 8, but halves its weight and can use it both onehanded and in close combat without penalty.\nProfile: the same as the standard bolter but with an 8 round smaller magazine and can be fired in close combat and one handed as a special rule",
    stats: {
      weapon: {
        name: "Naval Boltgun",
        class: "Basic",
        range: "100m",
        rof: "S/2/4",
        damage: "1d10+9 X",
        pen: 4,
        clip: { current: 20, max: 20 },
        reload: "Full",
        special: "Tearing (can be fired in close combat, one handed)"
      }
    }
  },
  {
    name: "Correction of Flesh",
    chapter: "Red Scorpions",
    type: "wargear",
    description: "The Apothecaries of the Red Scorpions are zealous adherents to the sanctity of the human form and the need to keep it pure, and to this end, the most learned of their number created a set of advanced medical tools to treat the superhuman flesh of Space Marines. These tools, collectively known as the Correction of Flesh, surpass the efficacy of a standard narthecium, and can treat unenhanced humans or warriors of the Adeptus Astartes with but minor alterations to the dosage.",
    rules: "The Correction of Flesh replaces a standard narthecium when requisitioned, and grants +30 to Medicae Tests to treat Space Marines and humans alike. The user can re-roll failed Medicae Tests, and heals one additional Wound with each use of First Aid."
  },
  {
    name: "Tears of the Scorpion",
    chapter: "Red Scorpions",
    type: "weapon",
    description: "The Red Scorpions have vast armouries, compared to many Chapters, with copious examples of mastercrafted melee and ranged weapons carefully maintained and protected by the Chapter. Among all of these fine weapons none are as revered by the Red Scorpions as the relic blades known as the Tears of the Scorpion. Ancient weapons of immense spiritual value to the Chapter and of long lost eldritch design they are only ever gifted to the greatest of Red Scorpion Battle-Brothers, often reserved for its company commanders and Chapter Masters. In rare instances if a hero of the Chapter proves himself worthy he may be allowed to wield one of the blades in battle, but such is a rare and great honour.",
    rules: "The Tears of the Scorpion generate a power field of ancient and powerful design. Other weapons with the power field quality offer no protection from this vicious blade. When the wielder uses Tears of the Scorpion to Parry an attack, he has a 75% chance to destroy the attacker’s weapon, regardless of whether the attacker’s weapon has the Power Field Quality or not.",
    stats: {
      weapons: [
        {
          name: "Tears of the Scorpion",
          class: "Melee",
          damage: "1d10+7 E",
          pen: 8,
          special: "Balanced, Power Field"
        }
      ]
    }
  },
  {
    name: "Lucian's Rod",
    chapter: "Blood Ravens",
    type: "weapon",
    summary: "+20 Focus Power with Force Quality, needs PR 5+.",
    description: "Lucian was a legendary hero of the Blood Ravens, who some claim could not channel his prodigious psychic powers through any normal force weapon. He had a special force staff crafted for his use, a weapon which amplified his talents tenfold. Rules: Lucian’s Rod is an Astartes force staff that grants a +20 to the Focus Power Test to channel power through the weapon with its Force Quality. However, it requires great power behind the blow to function, and the Force Quality cannot be used with an effective Psy Rating of less than 5 (after being modified by Power Level).",
    stats: {
      weapon: {
        name: "Lucian's Rod",
        class: "Melee",
        damage: "1d10+3 I",
        pen: 0,
        special: "Balanced, Force",
        weight: "5 kg",
        req: 0
      }
    }
  },
  {
    name: "Memor Nihilis",
    chapter: "Flesh Tearers",
    type: "weapon",
    summary: "+10 WP Tests (or +20 if failure causes IP).",
    description: "This massive eviscerator chainsword is intricately worked, with each tooth of the roaring blade inscribed to a level of detail few artisans could manage. This ornate work was done by the hand of a Sanguinary Priest, to commemorate the loss of the Chapter’s warriors claimed by the Black Rage. Barely visible script details the history and heraldry of dozens of warriors along the length of the blade, ever reminding its wielder of the peril of losing control. Rules: Memor Nihilis is a two-handed variant of the Astartes chainsword, more commonly known as an eviscerator. Its grim reminders grant a +10 to Willpower Tests made by the wielder, increasing to +20 if failure of the Tests would result in gaining Insanity Points.",
    stats: {
      weapon: {
        name: "Memor Nihilis",
        damage: "2d10+5 R",
        pen: 5,
        range: "-",
        rof: "-",
        clip: "-",
        reload: "-",
        special: "Tearing, Unwieldy"
      }
    }
  },
  {
    name: "Fury Unrelenting",
    chapter: "Storm Wardens",
    type: "wargear",
    summary: "12 AP to both arms. +3 Pen to gauntlet melee weapons. Unarmed attacks gain 5 Pen.",
    description: "These vambraces were salvaged from the ruined armour of a Battle-Brother of the Storm Wardens during an engagement by the Chapter against a Tau battlegroup. He survived the barrage brought to bear against his squad by Broadside battlesuits and charged the position held by the heavy guns alone. In vengeful rage, his Sacris Claymore shattered by the barrage, he assaulted his foes with just his armoured fists, but his furious blows were enough to bring down the two suits in the fire team before he was slain in a hail of plasma. The instruments of his fury were miraculously undamaged after his assault, and they were repaired and gifted to the Deathwatch so that their fury against the alien might serve a wider theatre. Rules: Fury Unrelenting can be fitted onto a suit of Astartes power armour or artificer armour. It grants 12 AP to both arms (replacing the normal value) and increases the Penetration of any melee weapon wielded in their gauntlets by 3. The wearer’s unarmed attacks gain a Penetration of 5, instead."
  },
  {
    name: "Levin Shield",
    chapter: "Storm Wardens",
    type: "wargear",
    summary: "Force Field (PR 55, Overload 1). 1d10+4 E dmg to melee foes. Stun on parry.",
    description: "The Storm Wardens Chapter Master, Lorgath Maclir, once wielded the Levin Shield. It is said he passed it to the Deathwatch in payment of an honour debt to Watch Captain Mordigael. This storm shield adjusts to the bearer’s bio-electric signature and uses his body as part of the circuit to generate its powerful energy field. The crackling nimbus protects the wielder while electrifying his foes. The Shield’s kinetic repercussion plating also unleashes thunderous fury when struck. Rules: This Force Field has a Protection Rating of 55 and an Overload number of 1, and causes 1d10+4 Energy Damage each Round to all creatures in melee with the wielder, ignoring armour. If the Storm Warden successfully Parries with the Levin Shield, the attacker must immediately make a Toughness Test at –10 per degree of success by which the Parry succeeded, or be Stunned for 1 Round. As a storm shield, it also provides +4 AP to the Body and the Arm carrying it and reduces the time necessary for a Guarded Attack to a Half Action."
  },
  {
    name: "Augury Malifica",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "+30 Awareness (Daemons), +5 Awareness (Others). Detects malignant auras.",
    description: "The Augury Malifica was crafted by the techno-seers of the Grey Knights Chapter. A heavily modified Auspex scanner, it is barely recognisable as the original device. Strange attachments have been added, subtle alterations have been made, and seven rituals of detection were performed to consecrate the Augury. The result is a piece of equipment that can, with a reasonable degree of accuracy, detect the malignant auras of daemons in the vicinity, and even, on rare occasions, predict an imminent warp breach. However, the Augury’s presence in the Deathwatch Vaults is not with the blessing of the Grey Knights, for they are entirely unaware that the Deathwatch have it in their possession. Rather, they believe it lost to the foul hands of the Word Bearers Chaos Space Marines, and have been actively seeking its recovery for many years. It would be most detrimental to Chapter relations should the item’s real location be revealed. Rules: The Augury Malifica follows the same rules as an Auspex, but its user gains +30 to Awareness Tests to detect Daemons and only +5 for other adversaries. At the GM’s discretion, the device may also provide clues and hints of impending Daemonic activity, though this will always be vague and cryptic."
  },
  {
    name: "The Corroded Falchion",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Balanced, Devastating (1), Toxic. Roll d10 on hit: on 1, weapon is destroyed.",
    description: "This ornate, curving blade is a revered relic that has seen countless centuries of service with the Deathwatch. However, roughly fifty years ago it was used against the encroaching swarms of Hive Fleet Dagon, and plunged into the toxic flesh of a Venomthrope. After the battle, it was discovered that bio-acid blood of the Tyranid organism was eating into the blade, weakening its structure. All attempts to cleanse the Falchion and halt the corrosion failed, for the acid had penetrated at the molecular level. So the Chapter artificers constructed a sheath that keeps the blade in stasis as long as it remains inside, undrawn. On rare occasions since, the Falchion has been used in battle and the ingrained bio-acid has caused swift and horrific damage to its victims. However, even a few minutes out of the stasis-sheath brings the inevitable collapse of the blade closer to fruition. Rules: This once-elegant blade has the following qualities: Balanced, Devastating (1), Toxic. Every time the weapon makes a successful hit, roll a d10. If the result is a 1, the Falchion collapses into useless shards. This obviously means the Relic has been lost with no possibility of recovery.",
    stats: {
      weapon: {
        name: "The Corroded Falchion",
        damage: "1d10+5 R",
        pen: 3,
        special: "Balanced, Devastating (1), Toxic"
      }
    }
  },
  {
    name: "Fist of Dragos",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Power Fist with Overheats. 2d10+4 E, Pen 9. Doubles Strength Bonus.",
    description: "Brother Dragos battled with great success against Orks, Eldar, and even Space Marine Renegades, always seeking out the most heavily-armoured targets to destroy personally with his combi-meltagun and his mighty powerfist. Battlewagons, grav-tanks and even Dreadnoughts were added to his tally. However, Dragos was never satisfied, with the performance of his wargear. After every engagement, he would return to the Chapter forges and beseech the Techmarines to make adjustments and modifications. The Techmarines protested that such tinkering would offend the Machine Spirits, but given Dragos’ victories in the field, his wishes were usually granted. His obsession was finally ended when his overcharged meltagun exploded in his hand as he attacked an Ork Dreadnought. His powerfist was recovered intact along with his mangled body. Rules: The Fist of Dragos is an up-charged powerfist (and follows the normal rules for doubling the Strength bonus), but it is prone to violent overloads. It has the Overheats Quality, though there is no possibility of dropping the weapon as there is with a gun.",
    stats: {
      weapon: {
        name: "Fist of Dragos",
        damage: "2d10+4 E",
        pen: 9,
        special: "Power Field, Unwieldy, Overheats"
      }
    }
  },
  {
    name: "The Krixian Chainglaive",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Two-handed chain weapon. 1d10+8 R, Pen 4, Tearing.",
    description: "The Krixian Chainglaive combines the power of a long, curved, two-handed blade with the rending teeth of a chain weapon on its cutting edge. The design was produced secretly during the Keflan IX Techno-schism, by an unsanctioned forge-complex in the Krixis system. The templates were subsequently declared unsound, and removed to Adeptus Mechanicus stasis-vaults. This is thought to be the last actual example surviving. Rules: It requires two hands to wield.",
    stats: {
      weapon: {
        name: "The Krixian Chainglaive",
        damage: "1d10+8 R",
        pen: 4,
        special: "Tearing, Two-handed"
      }
    }
  },
  {
    name: "Plasma Gun 438",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "-20 Fel (Space Marines), -1 Cohesion. 1d10+12 E, Pen 9, Volatile.",
    description: "The weapon denoted 438 in the Deathwatch armoury vaults is a plasma gun of ancient, pre-Heresy design. It has noticeably different muzzle casing than that of later patterns and exposed cooling ducts. While the gun is undeniably a powerful weapon, its provenance is entirely unknown. As such, many of the Deathwatch refuse to contemplate its use, for fear it has been in the hands of traitors, tainted with the blood of brethren. Rules: Plasma Gun 438’s bearer suffers a –20 penalty to Fellowship when dealing with other Space Marines, and imposes a –1 penalty on base Squad Cohesion.",
    stats: {
      weapon: {
        name: "Plasma Gun 438",
        class: "Basic",
        range: "120m",
        rof: "S/2/-",
        damage: "1d10+12 E",
        pen: 9,
        clip: { current: 40, max: 40 },
        reload: "4 Full",
        special: "Volatile",
        ammoType: "Plasma"
      }
    }
  },
  {
    name: "The Pleician Tome",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Techmarines only. +10 Forbidden Lore (AdMech). Tech-Use +2d10.",
    description: "The Pleician Tome was created by a senior Tech-priest of the Adeptus Mechanicus, as a portable font of certain archives, templates and pieces of ancient lore. Even to a trained eye, the information is a seemingly random collection, with no easy means of navigation, and so it takes much study to glean anything relevant to a particular task. Indeed, only those with a wide knowledge of Machine Spirits and engine lore have any hope of understanding the information contained within. However, those with patience and the appropriate skills can find secrets of great use within the datacore. Rules: The Pleician Tome may only be requisitioned by Techmarines. The Techmarine gains an additional +10 bonus to Lore: Forbidden (Adeptus Mechanicus), and Tech Use +2d10 (roll each time)."
  },
  {
    name: "Redemption of St. Sulech",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Heavy Bolter. Bearer cannot be Leader. Leader suffers -10 Cohesion tests.",
    description: "A Deathwatch Kill-team posted to the isolated colony of St Sulech was caught up in the fighting when an Ork raiding force attacked. Delaying their extraction and the completion of their mission, the Space Marines chose to join the defence. Brother Frosius, a Devastator from the Imperial Fists Chapter, deployed in the highest tower of the Imperial shrine with his favoured heavy bolter, while the others remained below. Thanks to the devastating bursts of accurate fire from the tower, the Orks were defeated, but not without the loss of the rest of the Kill-team. Upon his return to Erioch, Frosius was severely censured for the decision to stay and fight. To this day, his heavy bolter remains a symbol of honour, but also a disregard for orders. Rules: The bearer of Redemption of St. Sulech may not be the Squad Leader. Whoever is the leader suffers a –10 penalty when testing to prevent Cohesion Damage.",
    stats: {
      weapon: {
        name: "Redemption of St. Sulech",
        class: "Heavy",
        range: "160m",
        rof: "-/-/12",
        damage: "2d10+12 X",
        pen: 6,
        clip: { current: 60, max: 60 },
        reload: "Full",
        special: "Tearing",
        ammoType: "Bolt"
      }
    }
  },
  {
    name: "Remembrance Shield",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Combat Shield (PR 30, Overload 01-10). -30 Fel vs Eldar. Eldar +10 WS vs bearer.",
    description: "Roughly four hundred years ago, the Deathwatch was engaged in operations against the Eldar of Craftworld Ulthwé. The xenos had been launching sudden raids in the Slinnar Drift Star Cluster, then disappearing before a military force could be mobilised. However, when a Kill-team secured information about a forthcoming attack, the Chapter was able to lay a trap. The next Eldar raid met not disorganised Guardsmen, but a large force of black-armoured Space Marines. The majority of the raiders were cut down, and the few survivors vanished back into their webway portals. To commemorate this crushing victory, a combat shield was fashioned, incorporating a number of large, deeply coloured jewels, taken as trophies from the fallen xenos. The shield must offend the Ulthwé Eldar greatly, for there have been numerous attacks over the intervening years apparently designed to seize the shield and kill the one who bears it. So far, all have failed. Rules: The Remembrance Shield is a Combat Shield with Protection Rating 30 and Overload Roll 01–10. All members of the Kill-team suffer –30 to Fellowship when dealing with Craftworld Eldar as long as the shield is present (even if it is not visible—they just seem to know!). Eldar of all types receive +10 Weapon Skill when targeting the bearer of the shield, and will do everything they can to take it."
  },
  {
    name: "Salvation of Correus",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Combat Blade with Devastating (2). 1d10+3 R, Pen 2.",
    description: "Deathwatch Brother Correus was seeking information about a high-ranking Dark Eldar known as “Lady Malys,” when he was captured, his mission compromised by a false lead. After many weeks of horrific torture in the dungeon of a Master Haemonculus, his tormentor bound Correus onboard a grav-craft, and forced him to watch a hideously devastating surprise attack on a Space Marine force. When another Battle-brother was dragged, unconscious, onto the craft, Correus broke his bonds and grabbed the new victim’s combat knife. He plunged the blade deep into the heart of the Haemonculus, before leaping to the ground. He was found hours later by Space Marine Scouts, still clutching the weapon, and eventually returned to Erioch. The combat blade meanwhile was tainted with whatever vile concoction passed for blood in the Dark Eldar’s veins. The slightest scratch from it now causes nightmarish visions and agonising pain. Rules: The Salvation of Correus is an Astartes Combat Blade with the Devastating (2) quality.",
    stats: {
      weapon: {
        name: "Salvation of Correus",
        damage: "1d10+3 R",
        pen: 2,
        special: "Devastating (2)"
      }
    }
  },
  {
    name: "Skull of Brantor",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Servo Skull (WS 30, T 30). +20 Awareness/Concealment/Silent Move. Auspex & Signum.",
    description: "This Servo Skull is unusual in that it is built around the cranium of a Space Marine, three service studs clearly embedded into the brow. Brother Brantor was a highly skilled tracker and marksman, and his current position allows him to continue his service to the Deathwatch. The skull is fitted with a low-noise anti-grav unit and various scopes and tactical sensors. As such, it has proved extremely useful for covert reconnaissance, and is regularly requisitioned for field missions. Rules: The Skull of Brantor follows the rules for Servo Skulls given on page 376 of the DEATHWATCH Rulebook, with the following exceptions: it has Weapon Skill and Toughness of 30, and its Awareness, Concealment and Silent Move skills all provide a +20 bonus instead of +10. It is equipped with an Auspex and the requisitioning Space Marine counts as being equipped with an Astartes Signum."
  },
  {
    name: "Triflame Vambrace",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Basic Flamer. 3 Modes: Concentrated (-20 Ag to avoid fire), Wide (60 deg arc, +1d5 Mag dmg), Burst (No Flame, +0 Ag or catch fire).",
    description: "This gauntlet was forged and first worn by a Techmarine serving in what is now the Orpheus Salient. The Deathwatch has long utilised shot selectors to deal with the unending diversity of aliens’ deviant designs. This forearm-mounted flamer embodies the same idea: a variable feed of dihydropromethium to a trifurcated ignition chamber allows versatility in how the rare fuel is expended. Rules: The Triflame Vambrace has three modes of fire: Concentrated, Wide, and Burst. In Concentrated mode, the incandescent blast ignites nearly anything with an inextinguishable flame. Agility Tests to avoid catching on fire, and to put out flames from the weapon, suffer a –20 penalty. Wide mode doubles the arc of the weapon to 60 degrees, doing an additional 1d5 Magnitude Damage to Hordes. In Burst mode, the weapon loses the Flame Quality, but inflicts massive damage while still forcing any target struck to take a Challenging (+0) Agility Test or catch fire as though caught in the blast of a Dragonfire Round.",
    stats: {
      weapon: {
        name: "Triflame Vambrace",
        class: "Basic",
        range: "30m",
        rof: "S/-/-",
        damage: "2d10+4 E",
        pen: 5,
        clip: { current: 12, max: 12 },
        reload: "3 Full",
        special: "Flame",
        ammoType: "Promethium"
      }
    }
  },
  {
    name: "Armour of the Remorseless Crusader",
    chapter: "Black Templars",
    type: "armor",
    summary: "Artificer Armour with Hexagrammic Wards and Master-Crafted Sanctified Sword.",
    description: "In addition to the normal benefits of artificer armour, hexagrammic wards provide +20 to Tests made to resist psychic effects, and double the suit’s armour points against psychic or warp attacks that deal damage. It retains full armour value against attacks with the Warp Weapon effect. The Armour of the Remorseless Crusader also incorporates a Master-Crafted, Sanctified sword that can extend from the forearm. This artificer armour is one of a trinity crafted by the Black Templars. Each suit is gilded with detestations of the warp and said to have the blood of saints layered into the thousandfolded adamantite of its construction. The Armour of the Pitiless Crusader and the Fearless Crusader remain with the Chapter, but one unit was tithed to the Deathwatch.",
    stats: {
      armor: {
        name: "Armour of the Remorseless Crusader",
        pattern: "Artificer Armour",
        abilities: ["Hexagrammic Wards", "Master-Crafted Sanctified Sword"],
        head: 12,
        torso: 13,
        rightArm: 12,
        leftArm: 12,
        rightLeg: 12,
        leftLeg: 12
      },
      weapon: {
        name: "Armour of the Remorseless Crusader (Sword)",
        damage: "1d10+8 R",
        pen: 6,
        special: "Sanctified, Master-Crafted"
      }
    }
  },
  {
    name: "Chalice of Vision",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Grant +10 to all WS, BS, and Skill Tests, and Unnatural Perception Trait for 1 hour.",
    description: "The shrouded motives of the Omega Vault revealed this ornate gold chalice the day Watch Captain Mordigael assumed his role as Master of the Vigil. Unknown hands engraved it with the image of Sanguinius’ final battle and set a reservoir of a ritual compounds in its base that releases when the cup is filled. The resulting draught can be used in the Rite of Vision, said to grant a Blood Angel the same almost prescient clarity their Primarch possessed. Bearers of the Chalice typically carry a flask of scarlet sacramental wine to use with the relic. Rules: Those who imbibe from the Chalice gain +10 to all WS, BS, and Skill Tests, and the Unnatural Perception Trait for 1 hour. Dire consequences exist for those who violate the strictures against performing the Rite of the Vision too often. At the GM’s discretion, those who drink from the Chalice may experience strange oracular visions that my reveal hints about the future.",
    modifiers: {
      traits: ["Unnatural Perception (Temporary)"]
    }
  },
  {
    name: "Deathroar",
    chapter: "Dark Angels",
    type: "weapon",
    summary: "Plasma Pistol. Maximal setting does not cause Overheats.",
    description: "This venerated Plasma Pistol was recently left to the Deathwatch by Captain Raziel of the Dark Angels, who gave his life to hold a fortress on the edge of the Cellebos Warzone against Chaos sieges until reinforcements arrived. Deathroar contains the power of a heavy weapon in its small casing. The super-heated air around the muzzle as the weapon discharges produces a unique sound reminiscent of predatory felines from which Deathroar derives its name. Rules: Firing Deathroar on Maximal setting does not cause the Overheats Quality.",
    stats: {
      weapon: {
        name: "Deathroar",
        class: "Pistol",
        damage: "2d10+13 E",
        pen: 10,
        special: "Blast(1), Felling (1), Volatile",
        range: "40m",
        rof: "S/-/-",
        clip: { current: 10, max: 10 },
        reload: "3 Full",
        ammoType: "Plasma Flask"
      }
    }
  },
  {
    name: "Frost Blade",
    chapter: "Space Wolves",
    type: "weapon",
    summary: "Master-crafted chain/power weapon. +3 Damage on Critical Hits.",
    description: "Frost blades are master works from the Space Wolves’ Iron Priests—each incredibly rare and prestigious. The teeth of these icy chain weapons are always cut from nigh-unbreakable substances such as Kraken fangs or tempered diamond. The unique power fields enveloping frost blades have a distinct blue cast. Rules: A frost blade combines the best of a chain weapon and a power weapon, and adds +3 Damage when an attack from the weapon causes Critical Damage.",
    stats: {
      weapon: {
        name: "Frost Blade",
        damage: "1d10+11 E",
        pen: 9,
        special: "Balanced, Power Field, Tearing"
      }
    }
  },
  {
    name: "Helm of Varthion",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "+10 to Attack rolls, +3 Weapon Pen, +1 Effective Rank for Cohesion/Solo Mode.",
    description: "Sergeant Varthion is a legend on Watch Fortress Erioch. Long before Warmaster Achilus ever dreamed of conquest through the Warp Gate, the Deathwatch kept vigil over it. In the fourth century of M41, Varthion and his squad destroyed a xenos warhost hundreds of times their number in defence of the Gate. Records conflict as to which side of the Gate originated the enemy assault, but accounts of the aftermath in the control structure are identical. They describe alien corpses of an aspect uncatalogued before or since, “in such volumes that Varthion’s squad stood atop them like Titans astride a demolished hive.” Rules: The Ultramarine Sergeant’s ancient helm contains the pinnacle of augury sensors and prophesier readouts. It grants +10 to all Attack rolls, and unerringly divines the enemy’s weakest point, granting a +3 bonus to the Penetration of any weapon wielded by the helm’s wearer. A dedicated cogitator bank also provides tactical recommendations based on thousands of years of compiled Ultramarines combat theory. This increases the wearer’s effective Rank by 1 for purposes of calculating Cohesion or for Ultramarines Chapter abilities in Solo Mode.",
    modifiers: {
      traits: ["Helm of Varthion (+10 Atk, +3 Pen, +1 Eff. Rank)"]
    }
  },
  {
    name: "Adamantine Mantle",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Negates 2 AP from incoming attacks. +10 to Feint. Foes suffer -10 WS when in Defensive Stance.",
    description: "These intricately worked cloaks take their name from the most common variation: small adamantine scales worked into a protective yet flexible defensive covering. Similar, personalised designs exist, all using unbreakable materials to form an impressive cloak. Each one is the labour of decades by master artificers, who temper each individual scale and thread for maximum resilience. Their work is then blessed by Chaplains before finally being laid upon the shoulders of its first bearer. The mantle protects him not just through its physical strength, but also by making his movements more difficult to predict as the opaque cloak whirls about him in combat. Rules: An adamantine mantle negates 2 points of Armour Penetration from any incoming attack. The wearer gains a +10 to his Opposed Weapon Skill Test to Feint, and if he takes the Defensive Stance Action, foes suffer an additional –10 on Weapon Skill Tests to attack him.",
    modifiers: {
      traits: ["Adamantine Mantle (Negates 2 AP, +10 Feint, -10 Enemy WS in Defensive Stance)"]
    }
  },
  {
    name: "Deathwatch Relic Blade",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Two-handed power weapon. Destroys non-power field weapons on Parry. 25% chance to destroy Power Field weapons.",
    description: "A standard power sword is no better than a flimsy metal spike in the humbling aura of a relic blade. Remembrancer works from the Horus Heresy depict these magnificent power weapons in the hands of its heroes, and accounts can be found through the ages of how their wielders turned the tides of key battles. Few enough have survived the millennia, and only a precious handful of those are reserved for the Deathwatch. Rules: Relic blades take various forms, but are always a great weapon of some fashion. They require two hands for even a Space Marine to wield. A relic blade that successfully Parries a weapon without the Power Field Quality automatically destroys the attacker’s weapon. It has the same effect on weapons used to Parry it, shearing through such inferior defences and striking as though opposition was never rendered. A relic blade has a 25% chance to destroy a weapon normally immune to Power Fields (including one with a Power Field) that is not also a Relic.",
    stats: {
      weapon: {
        name: "Deathwatch Relic Blade",
        damage: "2d10+7 E",
        pen: 9,
        special: "Power Field, Two-handed. Destroys non-Power Field weapons on Parry. 25% chance to destroy Power Field weapons."
      }
    }
  },
  {
    name: "Scapulan Bolter",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Master-crafted bolter with Fire Selector, Targeter, and Melee Attachment. Never Jams. Re-roll 96-100.",
    description: "The Deathwatch of the Jericho Reach is strangely silent about the history of Watch Station Skapula, and how this lethal bolter remains from the abandoned station. Techmarines fortunate enough to examine the advanced weapon frequently debate the number and nature of machine spirits necessary to achieve its flawless performance, but the most widely accepted theories place a union of over one hundred machine spirits within the casing of tenebrous alloys. Rules: In addition to accuracy and power unrivalled in other bolters of its size, the Skapulan Bolter integrates a Fire Selector, a Targeter, and a melee attachment equivalent to a Master-Crafted combat knife. The gun never Jams, and any Attack roll of 96–100 may be re-rolled as the machine spirits —however many they may be— strive for perfection.",
    stats: {
      weapons: [
        {
          name: "Skapulan Bolter",
          class: "Basic",
          range: "120m",
          rof: "S/2/4",
          damage: "2d10+9 X",
          pen: 7,
          clip: { current: 28, max: 28 },
          reload: "Full",
          special: "Accurate, Tearing, Never Jams, Re-roll 96-100",
          ammoType: "Standard Bolt Rounds"
        },
        {
          name: "Skapulan Bolter (Melee)",
          damage: "1d10+2 R",
          pen: 2,
          special: "Master-Crafted"
        }
      ]
    }
  },
  {
    name: "Angelus Bolter",
    chapter: "Blood Angels",
    type: "weapon",
    summary: "Wrist-mounted bolter. Hands-free usage. Special Bloodshard rounds.",
    description: "A bolter variant used exclusively by the Blood Angels and their successor Chapters, the Angelus Bolter is a wrist mounted, drum feed weapon. This allows the Battle-Brother to keep both hands free while laying down a withering hail of close range fire. Angelus Bolters also make use of unique Bloodshard bolt rounds, crafted with monofilament tips, which can cut through armour with ease to deliver the round’s explosive payload. Rules: The Angelus Bolter does not require a Battle-Brother to use either of his hands, though in any Turn in which it is fired, he cannot use the hand or arm mounting the weapon to make other attacks.",
    stats: {
      weapon: {
        name: "Angelus Bolter",
        class: "Basic",
        range: "50m",
        rof: "S/3/-",
        damage: "1d10+9 X",
        pen: 6,
        clip: { current: 36, max: 36 },
        reload: "2 Full",
        special: "Tearing, Wrist-Mounted (Hands-free)",
        ammoType: "Bloodshard Rounds"
      }
    }
  },
  {
    name: "Gilded Boltgun",
    chapter: "Ultramarines",
    type: "weapon",
    summary: "Master-crafted. +10 Fellowship Tests. Reduces Cohesion cost for Ultramarine Squad Mode abilities.",
    description: "Among the oldest and most stable of all the Chapters, the vaults of the Ultramarines are well stocked with some of the finest examples of Imperial weaponry known to exist. One example is the Gilded Boltgun, a master-crafted artificer weapon of unsurpassed beauty and artistry; a weapon fit for a Sector Lord, or a Space Marine Captain. No record remains of how this weapon made its way to the Jericho Reach, but it has been used by some of the most heralded Ultramarines to serve in the Reach. Rules: The Gilded Boltgun is a master craftsmanship weapon. It is also an impressive status symbol, its dazzling radiance plain for all to see, and adds +10 to all Fellowship Tests and Skills Tests based on Fellowship when carried. Ultramarines especially respect a Battle-Brother honoured to carry such a weapon and, while the Battle-Brother wielding the Gilded Boltgun is Squad Leader, all Ultramarine Squad Mode abilities reduce their cohesion cost by 1 (to a minimum of 1).",
    stats: {
      weapon: {
        name: "Gilded Boltgun",
        class: "Basic",
        range: "100m",
        rof: "S/2/4",
        damage: "1d10+9 X",
        pen: 4,
        clip: { current: 30, max: 30 },
        reload: "Full",
        special: "Tearing, Master-Crafted",
        ammoType: "Standard Bolt Rounds"
      }
    },
    modifiers: {
      traits: ["Gilded Boltgun (+10 Fel Tests, -1 Cohesion Cost for Squad Leader)"]
    }
  },
  {
    name: "Hellfire Flamer",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Ignores Natural Armour. Righteous Fury on 9 or 10.",
    description: "Modification of the tech that created Hellfire Bolt Rounds, the Hellfire Flamer was recovered from the Omega Vault shortly after the first reports of Hive Fleet Dagon reached the Watch Fortress. Mixing potent mutagenic acids into the refined promethium mix, the fire from a Hellfire Flamer eats away at chitin and bone with alarming speed, making it an ideal weapon for facing Tyranids. Rules: Hits from a Hellfire Flamer ignore Natural Armour and will inflict Righteous Fury on a die result of 9 or 0.",
    stats: {
      weapon: {
        name: "Hellfire Flamer",
        class: "Basic",
        range: "20m",
        rof: "S/-/-",
        damage: "1d10+9 E",
        pen: 5,
        clip: { current: 6, max: 6 },
        reload: "2 Full",
        special: "Flame, Tearing, Ignores Natural Armour, Righteous Fury on 9 or 10.",
        ammoType: "Hellfire Promethium"
      }
    }
  },
  {
    name: "Raven Pattern Shotgun",
    chapter: "Raven Guard",
    type: "weapon",
    summary: "-30 to Awareness tests to hear shots.",
    description: "Raven Guard scouts are among the best recon the Astartes has to offer, forging ahead of the Chapter, identifying targets for quick strikes and disrupting enemy logistics. For this reason, Raven Guard serving in the Jericho Reach Deathwatch are commonly deployed to strike missions in the Canis Salient, using their stealth to operate behind enemy lines and strike high value Tau targets. During a recent strike mission, shotgun fire gave away a scout’s position and compromised the entire mission. In response, Harl Greyweaver used an ancient technique incorporating flash and sound suppressors into the scout’s muzzle (a long black cylinder attached to the weapon’s barrel) making it completely silent when fired, without reducing damage or the ability to make use of variant forms of ammo. This modification was met with such great success that Greyweaver is willing to provide his time and skill to any Raven Guard who has proven himself worthy of the upgrade. Rules: The weapon as -30 to awareness tests to hear shots made with Raven pattern shotgun. And can be fired within normal range.",
    stats: {
      weapon: {
        name: "Raven Pattern Shotgun",
        class: "Basic",
        range: "30m",
        rof: "S/-/-",
        damage: "1d10+6 I",
        pen: 0,
        clip: { current: 18, max: 18 },
        reload: "Full",
        special: "Reliable, Scatter, -30 to Awareness tests to hear shots.",
        ammoType: "Standard Shells",
        ammoClass: "Shotgun",
        ammoCategory: "Shells"
      }
    }
  },
  {
    name: "Surturs Breath",
    chapter: "Salamanders",
    type: "weapon",
    summary: "Heavy Flamer. Target must make Hard (-20) WP Test or roll on Shock Table.",
    description: "Just as the Salamanders know well how to protect themselves from flame, so too are they adept at its use. Many Salamanders alter their flamer with unique modifications and upgrades they have learned over a long career. One such modified flamer has a reputation with the members of the Deathwatch operating in the Reach. Legend says it once belonged to a particularly vicious Salamander by the name of Surtur who used a unique propellant that made the Flamer shoot at an extended range with terrifying ultraviolet fire. Rules: When a target is hit by the Surtur’s Breath, in addition to its normal effects (i.e. dealing damage and potentially setting the target on fire) they must make a Hard (-20) Willpower Test. If they fail they must roll on the Shock Table (see the Deathwatch rulebook page 277) just as if they had failed a Fear Test. The additional equipment required to store and inject the propellant significantly adds to the bulk of the flamer, making it heavier and more unwieldy than normal.",
    stats: {
      weapon: {
        name: "Surturs Breath",
        class: "Heavy",
        range: "40m",
        rof: "S/-/-",
        damage: "1d10+12 E",
        pen: 5,
        clip: { current: 8, max: 8 },
        reload: "2 Full",
        special: "Flame, Target must make Hard (-20) WP Test or roll on Shock Table.",
        ammoType: "Ultraviolet Promethium"
      }
    }
  },
  {
    name: "Artificer Omnissian Axe",
    chapter: "Deathwatch",
    type: "weapon",
    requiredSpecialization: "Techmarine",
    summary: "Master-crafted. +10 Fel Tests (Machine Cult). Counts as Combi-Tool.",
    description: "Among the cog-toothed power axes of the Tech-Marines there also exist rare and ancient examples of artificer tech. These potent weapons combine all the brutal power of the Astartes Pattern Omnissian Axe with forgotten forgings and flawless craftsmanship. Rules: In addition to its improved profile, an Artificer Omnissian Axe is also always a master-crafted melee weapon and adds +10 to Fellowship Tests when dealing with members of the Machine Cult. Like an Astartes Pattern Omnissian Axe it also counts as a Combi-Tool.",
    stats: {
      weapon: {
        name: "Artificer Omnissian Axe",
        damage: "1d10+9 E",
        pen: 7,
        special: "Power Field, Unbalanced, Master-Crafted, Combi-Tool, +10 Fel (Machine Cult)"
      }
    },
    modifiers: {
      traits: ["Artificer Omnissian Axe (+10 Fel vs Machine Cult)"]
    }
  },
  {
    name: "Chogoris Lightning Blade",
    chapter: "White Scars",
    type: "weapon",
    summary: "Ancient silver power sword. Light as a feather when activated.",
    description: "An ancient White Scars relic, the Chogoris Lightning Blade is a dazzling silver power sword with a jagged blade crafted in the shape of a lightning bolt. Seemingly heavy and unbalanced upon first inspection, the sword appears more a ceremonial piece than the true weapon of war. When its power field is activated it springs to life, blue radiance arcing from its edge and intricate, hidden suspensors in its hilt making it as light as a feather. The Chogoris Lightning Blade was passed to the Deathwatch by the White Scars Battle-Brother Kubilei upon his death fighting near the Hadex Anomaly.",
    stats: {
      weapon: {
        name: "Chogoris Lightning Blade",
        damage: "1d10+7 E",
        pen: 10,
        special: "Balanced, Power Field"
      }
    }
  },
  {
    name: "Cruciform of the Crusade",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Counts as Thunder Hammer (Pen 0, No Power Field). Squad Mode abilities cost -1 Cohesion (min 1).",
    description: "In the early days of the Achilus Crusade there were many bloody battles to establish the Imperium’s foothold within the Jericho Reach. In one such battle a squad of Battle-Brothers was dispatched to deal with the emergence of a Chaos Cult during the Argoth uprisings. In the course of the battle the Battle-Brothers were forced to make a stand in an Imperial Chapel, where they held their ground for several days. At one point in the fighting a heretic missile knocked the Aquila down from the chapel’s spire. Enraged by the affront to the God-Emperor one of the Battle-Brothers dropped his weapons and hefted the eight foot stone cross and eagle on his shoulder, charging the heretic lines, instantly followed by his brothers and ending the battle in less than an hour of bloody carnage. Since then, the Aquila, known as the Cruciform of the Crusade, has been a relic for the Deathwatch of the Jericho Reach. Rules: The cross may be carried into battle by a Battle-Brother or by one of their followers. The cross takes two hands to hold so a character who carries it can carry no other weapons, though it counts as an Astartes Thunder Hammer, with a Pen of 0 and no Power Field (see Deathwatch page 155) when wielded in melee. In addition, when in the presence of the cross, all Squad Mode abilities cost one less Cohesion point to activate (to a minimum of 1).",
    stats: {
      weapon: {
        name: "Cruciform of the Crusade",
        damage: "2d10+5 I",
        pen: 0,
        special: "Concussive, Unwieldy, Two-handed. -1 Cohesion Cost for Squad Mode abilities."
      }
    },
    modifiers: {
      traits: ["Cruciform of the Crusade (-1 Cohesion Cost)"]
    }
  },
  {
    name: "Duelling Tulwar",
    chapter: "White Scars",
    type: "weapon",
    summary: "Free Standard Attack when using Defensive Stance.",
    description: "Reputed to have its origins from the mountain tribes of Chogoris, the Duelling Tulwar is a White Scars ritual weapon. Its short, curved blade makes it ideal for quick, short cuts, allowing the wielder greater speed in combat, switching between defensive and offensive stances with a flick of his wrist. Rules: The Duelling Tulwar allows a Battle-Brother to make a single Standard Attack as a Free Action with the weapon when he uses the Defensive Stance Action.",
    stats: {
      weapon: {
        name: "Duelling Tulwar",
        damage: "1d10+2 R",
        pen: 0,
        special: "Balanced, Primitive, Free Attack on Defensive Stance."
      }
    }
  },
  {
    name: "Glaive Encarmine",
    chapter: "Blood Angels",
    type: "weapon",
    summary: "Two-handed power weapon. Balanced.",
    description: "The Glaives Encarmine are broad two-handed blades wielded by the Sanguinary Guard. Crafted long ago by using forgotten methods and techniques, few weapons in the Blood Angels armouries approach the elegance and mastery of manufacture embodied in the Glaive Encarmine. In battle, a skilled Battle-Brother can wield such a weapon as easily as he might a combat knife, sweeping it back and forth in swift, graceful arcs of death and taking life with each effortless blow. Rules: A Glaive Encarmine requires two hands to use.",
    stats: {
      weapon: {
        name: "Glaive Encarmine",
        damage: "2d10+2 E",
        pen: 6,
        special: "Balanced, Power Field, Two-handed"
      }
    }
  },
  {
    name: "Honour Blades",
    chapter: "Ultramarines",
    type: "weapon",
    summary: "Broadsword & Poniard set. Grants Wall of Steel and +20 Parry.",
    description: "Presented to champions of the Chapter, Honour Blades are a matching Broadsword and Poniard power blade set. Wielded together, the blades are perfectly matched and provide the champion with an expert defence and attack. Rules: When used together, Honour Blades grant the wielder the Wall of Steel Talent unless he already has it, and also grant a further +20 to Parry Tests (in addition to the +10 for the Balanced Special Quality).",
    stats: {
      weapon: {
        name: "Honour Blades",
        damage: "1d10+5 E",
        pen: 6,
        special: "Balanced, Power Field, Grants Wall of Steel, +20 to Parry Tests."
      }
    },
    modifiers: {
      talents: ["Wall of Steel"],
      traits: ["Honour Blades (+20 Parry)"]
    }
  },
  {
    name: "Needle of Truth",
    chapter: "Dark Angels",
    type: "weapon",
    summary: "Power sword. Daemons/Heretics suffer -20 WP Tests if they see it.",
    description: "It is the task of the Dark Angel Interrogator-Chaplains to extract truth from those captured by the Chapter, as well as protect its secrets and maintain its spiritual well being. The Needle of Truth is an ancient blade which was taken by the Chapter to the Jericho Reach to uncover the secrets this new sector harboured, especially rumours of the Fallen. Rules: In addition to being a finely crafted power sword, the Needle of Truth has a terrible power over heretics and while its blade is bared any daemon or follower of the Dark Gods suffers a –20 penalty to all Willpower Tests provided they can draw line of sight to it.",
    stats: {
      weapon: {
        name: "Needle of Truth",
        damage: "1d10+7 E",
        pen: 6,
        special: "Balanced, Power Field, -20 WP to Daemons/Heretics in LoS."
      }
    },
    modifiers: {
      traits: ["Needle of Truth (-20 WP to Daemons/Heretics)"]
    }
  },
  {
    name: "Power Lance",
    chapter: "White Scars",
    type: "weapon",
    summary: "Reach (2m). Charge from vehicle/beast adds SB to damage.",
    description: "A signature weapon of the White Scars, the Power Lance mounts a power blade on the end of a long shaft. This makes the weapon ideal for charging from the back of vehicles or striking at foes while beyond the reach of their weapons. Rules: When making a Charge Action with a Power Lance from the back of a beast or vehicle, the Battle-Brother adds additional damage equal to his Strength Bonus. The Battle-Brother can strike foes with a Power Lance up to 2m away from himself and does not count as being engaged in melee combat with them unless they also have a similar reach with their weapons.",
    stats: {
      weapon: {
        name: "Power Lance",
        damage: "1d10+6 E",
        pen: 7,
        special: "Power Field, Reach (2m), Charge from vehicle/beast adds SB damage."
      }
    }
  },
  {
    name: "The Righteous Fist",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Power Fist. +8 Damage vs Hulking or larger targets.",
    description: "A weapon from the first battles against Hive Fleet Dagon, the Righteous Fist is a massive pitted and scarred powerfist reputed to have crushed the skull of a Carnifex with a single blow. Repaired by the Tech Marines of Watch Fortress Erioch, the Fist excels at taking on large targets, where its oversized grip is perfect for massive necks and limbs. Rules: When attacking a target of Hulking size or larger (see Deathwatch page 134) the Battle-Brother adds +8 to any damage he deals with the Righteous Fist.",
    stats: {
      weapon: {
        name: "The Righteous Fist",
        damage: "2d10+SBx2 E",
        pen: 9,
        special: "Power Field, Unwieldy, +8 Damage vs Hulking+ targets."
      }
    }
  },
  {
    name: "Rune Staff",
    chapter: "Space Wolves",
    type: "weapon",
    requiredSpecialization: "Librarian",
    summary: "Force Staff. Channel psychic powers on hit instead of extra damage.",
    description: "Rune Staff is as much a symbol of power as it is a weapon. Rune Staffs are used to enhance a Rune Priest’s powers, helping him to channel his gift into powerful blows, much like the method used to turn a force weapon into a lethal instrument of death. Rules: Rune Staff counts as a Force Staff (see Deathwatch page 155). When he strikes a foe he can channel his power as normal (making a Focus Test opposed by his target’s Willpower), but instead of inflicting additional damage, he can trigger one of his psychic powers as a Free Action, with a Psy Rating of 1 for each degree of success he scores over his target. Only powers with a specified target can be used in this way and must be targeted at the creature being struck with the Rune Staff. This trigger ignores the restrictions on using multiple psychic powers in a turn. Only a Rune Priest (Space Wolves Librarian) can use a Rune Staff.",
    stats: {
      weapon: {
        name: "Rune Staff",
        damage: "1d10+1 I",
        pen: 0,
        special: "Balanced, Force. Channel psychic power on hit."
      }
    }
  },
  {
    name: "The Shadow in the Sky",
    chapter: "Raven Guard",
    type: "weapon",
    summary: "Power Sword. Grants Precise Blow Talent and +10 Parry.",
    description: "An ancient weapon of the Chapter, the Shadow in the Sky is a long, curved power sword like the talon of a bird. Perfectly balanced and with a razor’s edge, it seems to move with a mind of its own when in the hands of a Raven Guard Battle-Brother. Rules: A Battle-Brother that wields the Shadow in the Sky gains the Precise Blow Talent unless he already has it, and a +10 on all Parry Tests (in addition to the +10 for the weapon’s Balanced special quality).",
    stats: {
      weapon: {
        name: "The Shadow in the Sky",
        damage: "1d10+5 E",
        pen: 6,
        special: "Balanced, Power Field, Grants Precise Blow, +10 Parry."
      }
    },
    modifiers: {
      talents: ["Precise Blow"],
      traits: ["The Shadow in the Sky (+10 Parry)"]
    }
  },
  {
    name: "Shard of Bekrin",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Broken Power Sword. +10 Fel (Astartes). Felling (2) vs Tyranids.",
    description: "Among those defending the Shrine World of Bekrin from the invasion of Hive Fleet Dagon was Tarvos, a Blood Angel Battle-Brother in the service of the Deathwatch. During the evacuation of the world’s clergy, Tarvos gave his life defeating a Hive Tyrant in a glorious display of heroism. Though his body was not recovered, his broken power sword was returned to the armoury of Watch Fortress Erioch. Remarkably, the weapon still hums with power though half its length is gone, and those that look upon its stained blade at once feel the power of the brother who once wielded it. The blade has since become a relic of the Deathwatch in the Jericho Reach and has found use both as an icon of valour and a weapon, especially against the Tyranid Swarms. Rules: The Shard of Bekrin grants those carrying it +10 Fellowship when dealing with Adeptus Astartes. In addition, when used against Tyranids it gains the Felling (2) Special Quality.",
    stats: {
      weapon: {
        name: "Shard of Bekrin",
        damage: "1d10+4 E",
        pen: 5,
        special: "Power Field, Unwieldy, +10 Fel (Astartes), Felling (2) vs Tyranids."
      }
    },
    modifiers: {
      traits: ["Shard of Bekrin (+10 Fel vs Astartes)"]
    }
  },
  {
    name: "Great Wolf Pelt",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "Counts as Wolf Pelt. +10 Fel (Space Marines). +20 Loyalty to Fenrisian Wolf Followers.",
    description: "Among the wargear of the Space Wolves are wolf pelts from some of the greatest Fenrisian Wolves to serve the Chapter. Some of these pelts are large even for a Space Marine, trailing behind them and hanging over their armour like a tide of fur. A Battle-Brother wearing such a pelt honours the memory of the wolf by carrying it once more into battle. Rules: A Great Wolf Pelt counts as a Wolf Pelt (see Deathwatch page 170) and adds +10 to all Fellowship Tests when dealing with Space Marines. A Great Wolf Pelt never truly loses its smell and, while wearing it, the Loyalty of any Fenrisian Wolf Followers the Battle-Brother has is increased by +20.",
    modifiers: {
      traits: ["Great Wolf Pelt (+10 Fel vs Space Marines, +20 Wolf Loyalty)"]
    }
  },
  {
    name: "Salamanders' Mantle",
    chapter: "Salamanders",
    type: "wargear",
    summary: "Counts as Adamantine Mantle. Immune to Fire.",
    description: "Crafted from the skins of the lava salamanders native to Nocturne, the Salamanders’ Mantle is a scaled cloak worn by heroes of the Chapter. As well as the status symbol of wearing such a mantle, the scales of the Nocturne salamanders also provide unrivalled protection against fire. Rules: The Salamanders’ Mantle counts as an Adamantine Mantle (Deathwatch page 168), and while a Battle-Brother is wearing it he cannot be set on fire and need never take an Agility Test to see if he is set on fire when hit by weapons with the Flame Special Quality.",
    modifiers: {
      traits: ["Salamanders' Mantle (Immune to Fire)"]
    }
  },
  {
    name: "Mantle of the Fallen Wolf",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "Counts as Wolf Pelt. Squad Leader: +2d10 Req, -10 Renown req for gear.",
    description: "Wolf Priests are the spiritual leaders and councillors of the Chapter and well–respected by all Battle-Brothers. The mantles of the Wolf Priests are usually crafted from the furs of the great wolves of Fenris and are adorned with tokens and fetishes of the Chapter. The Mantle of the Fallen Wolf is one such item, passed to the Jericho Reach Deathwatch by its previous owner who fell defeating a greater daemon in the Hadex Anomaly. To wear such a cloak is a great honour and marks out a Battle-Brother as a trusted member of his Chapter and a respected member of the Adeptus Astartes. Rules: The Mantle of the Fallen Wolf counts as a Wolf Pelt (see Deathwatch page 170). In addition, if the Battle-Brother is Squad Leader, once the mantle is acquired (using Renown and Requisition), it adds an additional 2d10 Requisition points to the Kill-team’s Requisition pool and reduces the Renown restriction of all weapons, armour, and gear (though not relics or Chapter specific items) by 10.",
    modifiers: {
      traits: ["Mantle of the Fallen Wolf (Squad Leader bonuses)"]
    }
  },
  {
    name: "Artificer Bionics",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Upgrades Exceptional Cybernetics. Increases bonus by +10.",
    description: "The Iron Hands are masters of bionics and often replace undamaged limbs with cybernetics to enhance themselves with greater strength, speed, or endurance. Artificer Bionics represents the height of this craft and the greatest examples of cybernetics available to the Imperium. Rules: Artificer Bionics is an upgrade for any kind of Exceptional Cybernetics (see Deathwatch page 176), increasing the bonus the bionic component provides by +10. Thus an Exceptional Bionic arm would provide +20 to Tech-Use and Strength Tests while a Cybernetic Sense would add +30 to rolls to resist attacks on that sense. In the case of Cybernetics which don’t provide bonuses, the Battle-Brother gains a +10 to Characteristic Tests when they directly relate to the use of the Cybernetic.",
    modifiers: {
      traits: ["Artificer Bionics (+10 to Cybernetic bonuses)"]
    }
  },
  {
    name: "Omni-Tool",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Improved Combi-Tool. +20 Tech-Use. Repair servitors (1d5 dmg).",
    description: "Through the Millennia the Forge Masters of Watch Fortress Erioch work to master and perfect the technology of the Deathwatch, often creating devices far superior to those used in the Imperium at large. This is the case with the Omni-Tool, an improved version of the ubiquitous Combi-Tool. Rules: For all intents and purposes, the Omni-Tool functions as a Combi-Tool, though it adds +20 to Tech-Use Skill Tests rather than +10. The Omni-Tool is also specifically designed to repair bionics and servitors and, as a Full Action, a Battle-Brother may remove 1d5 Damage from a servitor provided it has at least 1 Wound remaining.",
    modifiers: {
      traits: ["Omni-Tool (+20 Tech-Use, Repair Servitors)"]
    }
  },
  {
    name: "Blood Chalice",
    chapter: "Blood Angels",
    type: "wargear",
    requiredSpecialization: "Sanguinary Priest",
    summary: "Full Action to restore full Wounds, remove Fatigue/Damage/Crit. Costs 1 Fate Point.",
    description: "Blood Chalices were said to have contained the very essence of Sanguinius himself. Lost through war and catastrophe over the centuries, only a handful of Blood Chalices now remain; they are only entrusted to the most faithful and deserving members of the Chapter. Rules: A Battle-Brother may drink from the Blood Chalice (as a Full Action) and restore himself to his full complement of wounds, removing any Fatigue, Damage, or Critical Damage he has taken (though not restoring lost limbs or other permanent injuries). Drinking of the Chalice is not without its cost, however, and every time a Battle-Brother does so he must spend a Fate Point. Only Sanguinary Priests are ever entrusted with a Blood Chalice.",
    modifiers: {
      traits: ["Blood Chalice (Heal Full Wounds for 1 Fate Point)"]
    }
  },
  {
    name: "Fury Unrelenting",
    chapter: "Storm Wardens",
    type: "wargear",
    summary: "Replaces arm AP with 12. Increases Penetration of Unarmed/Melee.",
    description: "These vambraces were salvaged from the ruined armour of a Battle-Brother of the Storm Wardens during an engagement by the Chapter against a Tau battlegroup. He survived the barrage brought to bear against his squad by Broadside battlesuits and charged the position held by the heavy guns alone. In vengeful rage, his Sacris Claymore shattered by the barrage, he assaulted his foes with just his armoured fists... The instruments of his fury were miraculously undamaged after his assault, and they were repaired and gifted to the Deathwatch.\nRules: Fury Unrelenting can be fitted onto a suit of Astartes power armour or artificer armour. It grants 12 AP to both arms (replacing the normal value) and increases the Penetration of any unarmed attacks or melee weapons wielded by the character by +2.",
    modifiers: {
      traits: ["Fury Unrelenting (12 AP Arms, +2 Pen for Melee/Unarmed)"]
    }
  },
  {
    name: "Blood of Heroes",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "+1d5 Cohesion. Enter Squad Mode as Free Action once per mission.",
    description: "It was during the first battles of the Greyhell front against the accursed Tau that the Blood of Heroes was created. The Chapter records that a single Blood Angel, outnumbered and alone, stood against an entire cadre of alien warriors, blessed by a single drop of blood from each of his fallen brothers gathered in a vial and held close to his chest. The Battle-Brother claimed his brothers spoke to him through their blood and strengthened his will to survive against his foes. After testing the truth of the Battle-Brother’s tale, the Chapter’s Chaplains declared the gathered blood a relic of the Reach and a reminder of the duty all Blood Angels owe to the Crusade. If a Battle-Brother carries the Blood of Heroes into battle, he will feel the presence of the essence of the fallen warriors it holds. Rules: The Battle-Brother adds 1d5 Cohesion to the group, whether he is the leader or not, and once during the Mission may enter Squad Mode as a Free Action without the need to make a test.",
    modifiers: {
      traits: ["Blood of Heroes (+1d5 Cohesion, Free Squad Mode 1/mission)"]
    }
  },
  {
    name: "Chain of Zeal",
    chapter: "Black Templars",
    type: "wargear",
    summary: "+10 Fear/Pinning Tests. +1 Solo Mode Rank. Must attach to weapon (Req <= 20).",
    description: "Most Black Templars use Devotion Chains to bind their weapons in their fists on the eve of battle, removing them only once victory is achieved. The Chain of Zeal, however, is no such fleeting token. It is secured to weapon and armour with a permanent weld that lasts as long as the Space Marine serves. Furthermore, because taking off a gauntlet with the chain still attached is a shameful act that entails great dishonour, the wearer of the Chain of Zeal must keep his armoured glove donned and weapon in hand every minute for the rest of his days. Rules: The bearer receives +10 to Fear Tests and Pinning Tests, and adds 1 to his effective Rank for determining the Black Templars Solo Mode ability effectiveness. The Chain of Zeal must be attached to a weapon of Requisition value 20 or less. Both weapon and chain must be requisitioned for every subsequent mission the character undertakes. Should the chain and weapon be forcibly removed, this counts as losing a Relic (see below) until both can be reaffixed with due ceremony by a Black Templars Chaplain.",
    modifiers: {
      traits: ["Chain of Zeal (+10 Fear/Pinning, +1 Solo Mode Rank)"]
    }
  },
  {
    name: "Death Mask",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Fear Rating 1 (Cumulative).",
    description: "Fashioned from the likenesses of the fallen, Blood Angel heroes wear Death Masks both to honour the dead and strike terror into their foes. There can be no denying their power when one sees the coruscating golden energy arching across the mask’s surface and the baleful light shining from its eyes. Rules: A Battle-Brother wearing a Death Mask gains a Fear Rating of 1. This Fear Rating is cumulative with the Fear Rating gained for other sources such as psychic powers or wargear (i.e. Winged Jump Pack). A Death Mask is worn over a Battle-Brother power armour helmet and provides no additional protection.",
    modifiers: {
      traits: ["Death Mask (Fear 1, Cumulative)"]
    }
  },
  {
    name: "Digital Housing",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Bionic Arm Upgrade. Incorporate Digital Flamer, Laser, or Melta.",
    description: "Unlike limbs of flesh and blood, bionic attachments can often be modified, changed, or altered prior to battle simply by removing a few bolts. Originally used by Forge Master Greyweaver when he waded into combat, Digital Housing is an upgrade for a bionic arm which allows the user to incorporate an Astartes Digital Weapon into his cybernetic limb. Those Iron Hands that make a name for themselves at Watch Fortress Erioch have a chance to acquire one of the few Digital Housings that have been crafted by the Forge Master in his time in service to the Deathwatch. Rules: Before each mission, the Battle-Brother with the Digital Housing can then choose to have his arm fitted with either a Digital Flamer, Digital Laser, or Digital Melta weapon (see Deathwatch page 153). The weapon follows all the normal rules for firing ranged weapons (though as it is part of the bionic arm it cannot be dropped) and the Battle-Brother cannot use his arm for any other task when firing it.",
    modifiers: {
      traits: ["Digital Housing (Digital Weapon in Bionic Arm)"]
    }
  },
  {
    name: "Exsanguinator",
    chapter: "Blood Angels",
    type: "wargear",
    requiredSpecialization: "Apothecary",
    summary: "Counts as Narthecium and Combat Knife. +5 Renown for harvesting Blood Angel gene-seed.",
    description: "Used by Sanguinary Priests to harvest the gene-seed of fallen comrades, the Exsanguinator is both a sophisticated medical device and close quarters weapon. When a Battle-Brother falls in combat, it is the duty of the Sanguinary Priests to either restore him or safeguard his genetic heritage for future Battle-Brothers, storing it away in the Exsanguinator. Rules: An Exsanguinator counts as a Narthecium (see Deathwatch page 173) in all respects. Additionally, in any Mission in which it is used to harvest the gene-seed of a fallen Blood Angel, the Battle-Brother receives bonus +5 Renown. Exsanguinators also count as Astartes combat knives in combat.",
    stats: {
      weapon: {
        name: "Exsanguinator (Combat Knife)",
        damage: "1d10 R",
        pen: 2,
        special: "Counts as Narthecium. +5 Renown (Blood Angel gene-seed)."
      }
    },
    modifiers: {
      traits: ["Exsanguinator (Narthecium, +5 Renown on harvest)"]
    }
  },
  {
    name: "First Company Relic",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "Fearless Talent. +20 Opposed Tests vs Tyranids. Squad Leader shares benefits with Ultramarines.",
    description: "When the Ultramarines lost their First Company during the defence of Macragge against Hive Fleet Behemoth, it was a terrible blow to the Chapter and it took them many years to fully recover. Watch Captain Prascus of the Jericho Reach is known for carrying around a small, rent piece of armour from their last stand. He claims that the memory of his Battle-Brothers’ sacrifice emboldens him in combat. Inspired by Prascus’ devotion, many Ultramarines serving in the Jericho Reach have begun carrying such tokens. Rules: A Battle-Brother bearing a First Company Relic gains the Fearless Talent. Such relics also steel the Battle-Brother’s will against the influence of Tyranids, as they remember the price paid by their brothers and struggle harder to resist. The Battle-Brother gains a +20 bonus on any Opposed Tests made against Tyranids. If the Battle-Brother is Squad Leader, then all the benefits of the relic are also passed on to any Ultramarines in his squad.",
    modifiers: {
      talents: ["Fearless"],
      traits: ["First Company Relic (+20 Opposed vs Tyranids, Share with Ultramarines)"]
    }
  },
  {
    name: "The Glorious Standard",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Allies in LoS: Free Squad Mode, +10 WP.",
    description: "The Adeptus Astartes have a history of many proud and glorious victories; they stand for the might of the Emperor and His triumph over His foes. The Glorious Standard recounts this legacy in a complex pattern of images and heraldry, from the carnage and fire of the Horus Heresy through the first clashes with the Tyranids to their current exploits, such as supporting the Achilus Crusade. Rules: A Battle-Brother that carries the Glorious Standard becomes a rally point for the Astartes, infusing them with the righteousness of the Emperor. While it is held aloft, any Battle-Brother which can draw line of sight to the Glorious Standard may enter Squad Mode as a Free Action without a test. Furthermore they gain a +10 on all Willpower Tests.",
    modifiers: {
      traits: ["The Glorious Standard (Allies in LoS: Free Squad Mode, +10 WP)"]
    }
  },
  {
    name: "The Heart of Iron",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Regeneration (5) Trait. Immune to Fatigue. Drains Toughness over time.",
    description: "A relic of the Dark Age of Technology, the Heart of Iron is a bionic of a kind unknown outside the vaults of the Iron Hands. Worn under armour, it looks not unlike a mechanical spider wrapped around a Battle-Brother’s chest, where it links to his organs via monofilament tendrils and maintains his life (keeping his twin hearts beating) despite even the most terrible of injuries. Rules: A Battle-Brother that bonds with the Heart of Iron gains the Regeneration (5) Trait and becomes immune to the effects of Fatigue. The heart comes at a cost however; if it is worn for lengthy periods it slowly drains a Battle-Brother’s vitality even as it strives to keep his organs functioning. If the heart is worn for more than a single mission, the Battle-Brother suffers 1d10+5 temporary damage to his Toughness, with each further mission inflicting another 1d10+5 temporary Toughness damage. If it is not removed and the Battle-Brother’s Toughness is reduced to 0 or less he will die.",
    modifiers: {
      traits: ["Regeneration (5)", "The Heart of Iron (Immune to Fatigue, Toughness Drain)"]
    }
  },
  {
    name: "Pain Glove",
    chapter: "Imperial Fists",
    type: "wargear",
    summary: "Used post-mission. Bonus Insanity/Corruption removal when spending XP.",
    description: "A tool of both torture and penitence, the Pain Glove is a cage of ancient technology and cunning design that the Imperial Fists have used for centuries to test their strength, punish the unworthy, and cleanse themselves. Rules: Unlike other kinds of wargear, the Pain Glove can only be used after a mission is over (in the downtime between missions), though it must still be acquired using the requisition for the mission. After a mission, the Battle-Brother can enter the Pain Glove to cleanse himself and reaffirm his faith in the Emperor and the Chapter. When the player spends experience points to buy off Insanity or Corruption (see Deathwatch page 282) he will lose an additional 1d5 Insanity Points and 1 Corruption Point with the aid of the Pain Glove.",
    modifiers: {
      traits: ["Pain Glove (Bonus Insanity/Corruption removal)"]
    }
  },
  {
    name: "Promethean's Blessing",
    chapter: "Salamanders",
    type: "wargear",
    summary: "Weapon Upgrade (Chain/Power). Adds Flame Quality.",
    description: "Chain and power weapons are often deadly enough, especially in the hands of the Astartes, but Chapters sometimes modify these weapons to enhance their already impressive effects. One such modified device is known as Promethean’s Blessing. Gifted to the armoury of Watch Fortress Erioch in a forgotten age, this device is an inverse heat sink, which uses the excess power generated by the motor of a chain blade or the charge core of a power weapon to project flame along its edge. Rules: This has little extra effect on the weapon’s damage (a few flames are only a distraction when adamantine teeth are tearing open your flesh), but does have a chance of setting the target on fire, just as if the weapon had the Flame Special Quality. Promethean’s Blessing is a weapon upgrade which can be applied to any chain or power melee weapon.",
    modifiers: {
      traits: ["Promethean's Blessing (Adds Flame Quality to Chain/Power Weapon)"]
    }
  },
  {
    name: "Recoil Baffling",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Weapon Upgrade (Semi/Full Auto). Move up to AB meters without penalty when firing.",
    description: "Iron Father Erastus is among the Iron Hands accompanying the Achilus Crusade in its assault of the Jericho Reach. The Iron Father is well known for the ancient upgrades and modification techniques he has learned throughout his long life. Among these is Recoil Baffling, a combination of compensation servos and suspensor cushions to make rapid fire weapons easier to control and easier to fire on the move. After seeing the looming threat Hive Fleet Dagon poses, Erastus decided to share this technology with the Deathwatch in the Jericho Reach, believing that only they could truly stand in the way of the Great Devourer. Rules: Recoil Baffling is a weapon upgrade which can be used on any weapon with a semi-auto or full auto rate of fire. A Battle-Brother can fire a weapon with Recoil Baffling on semi auto or full auto and move up to his Agility Bonus in metres without penalty.",
    modifiers: {
      traits: ["Recoil Baffling (Move up to AB meters without penalty on Semi/Full Auto)"]
    }
  },
  {
    name: "The Magnir Runes",
    chapter: "Space Wolves",
    type: "wargear",
    requiredSpecialization: "Librarian",
    summary: "Choose 1 of 3 mission benefits: +3d10 Kill Markers, Restore Fate Points for ally, or Restore 1d10+3 Cohesion.",
    description: "Battle-Brother Magnir was a Space Wolf Rune Priest that served in the Jericho Reach Deathwatch in centuries past. To this day stories of his accomplishments are told amongst the Battle-Brothers of the Reach. These legends speak of his ability to peer into the future, using his knowledge to guide his Kill-team to victory. The only thing that remains of Magnir are small stones inscribed with the signature runes of a Space Wolf Rune Priest. To most Battle-Brothers these are no more than a few rocks, but when in the hands of a Rune Priest they are a potent tool. Rules: Only a Rune Priest (Space Wolves Librarian) can use The Magnir Runes, and he must use them just before embarking on a mission during the mission preparation period. The Rune Priest can then choose one of three benefits from reading the stones which will apply for the mission: 1) Choose one of the mission objectives and add 3d10 Kill Markers to its completion. 2) Choose one of the members of the Kill-team (not including the Rune Priest); once during the course of the mission that Battle-Brother may recover all expended Fate Points (though not Fate Points which have been burnt). 3) Once during the course of the mission, the Kill-team may restore 1d10+3 Cohesion Points.",
    modifiers: {
      traits: ["The Magnir Runes (Choose Mission Benefit)"]
    }
  },
  {
    name: "Standard of Fortitude",
    chapter: "Dark Angels",
    type: "wargear",
    summary: "Allies in LoS: Immune to Fear, Immune to Fatigue.",
    description: "The Dark Angels, like many of the Space Marine Chapters, have sacred standards which they carry into battle in times of need to bolster the fighting strength of their men. The Standard of Fortitude is one such banner—emblazoned with the icons of the Chapter and stained with the blood of heroes, it has a profound effect on all who view it. Rules: In combat, any Battle-Brother who can draw line of sight to the Standard of Fortitude becomes completely immune to the effects of Fear. The standard also boosts their endurance and, while in its presence, Battle-Brothers do not suffer the effects of Fatigue and ignore any Fatigue gain they might suffer.",
    modifiers: {
      traits: ["Standard of Fortitude (Allies in LoS: Immune to Fear/Fatigue)"]
    }
  },
  {
    name: "Suppression Stabiliser",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Weapon Upgrade (Boltgun/Heavy Bolter). Choose to hit location twice on semi/full auto.",
    description: "Developed by Forge Master Greyweaver and used by the Deathwatch in the Jericho Reach, the Suppression Stabiliser is used on rapid fire bolt weapons to reduce muzzle climb and make tighter shot groupings. Rules: A Suppression Stabiliser is a weapon upgrade that can be used with Boltguns and Heavy Bolters. When determining hit locations for semi and full auto bursts using Table 8-2: Multiple Hits (see Deathwatch page 239) the Battle-Brother may choose to have a location struck twice before moving on to the next location.",
    modifiers: {
      traits: ["Suppression Stabiliser (Hit Location Choice on Auto Fire)"]
    }
  },
  {
    name: "Totem of Subetai",
    chapter: "White Scars",
    type: "wargear",
    requiredSpecialization: "Librarian",
    summary: "Adjust Perils of the Warp roll by +/- 10.",
    description: "The Stormseers are the Librarians of the White Scars – powerful figures within the Chapter which advise its commanders and keep its lore. Across the Jericho Reach, many Stormseers are held in veneration for their heroic acts and the vaults of Watch Fortress Erioch are filled with artefacts from countless Stormseers that have served the Deathwatch in aeons past. One such artefact is the Totem of Subetai—a long staff adorned with a beast skull and a knot of course hair. No records still remain of Subetai or his accomplishments, but his staff has served other Stormseers through the millennia. The staff helps Stormseers in focusing their powers, channelling ancient spirits and casting their auguries for the great khans. Rules: A Stormseer carrying the Totem of Subetai gains a small measure of foresight and, whenever he suffers Perils of the Warp, he may adjust the roll by up to 10 (either up or down) after the dice have been rolled. A Stormseer Totem can only be used by a White Scars Librarian.",
    modifiers: {
      traits: ["Totem of Subetai (Adjust Perils roll by +/- 10)"]
    }
  },
  {
    name: "Weapon Charm",
    chapter: "Dark Angels",
    type: "wargear",
    summary: "Weapon Upgrade. Jams only on unmodified 00. Gains Accurate Quality.",
    description: "Among the Deathwing, Battle-Brothers sometimes adorn their weapons with fetishes, bird feathers and charms, in respect for their ancient ancestors and the roots of their brotherhood. These fetishes seem to appease the machine spirits of their weapons and connect them to the Battle-Brother, making them as reliable and unrelenting as the Deathwing themselves. Rules: A Weapon Fetish is a weapon upgrade which can be applied to any weapon. A weapon with this upgrade will only ever jam on an unmodified roll of 00 and gains the Accurate Quality.",
    modifiers: {
      traits: ["Weapon Charm (Jams on 00, Accurate Quality)"]
    }
  },
  {
    name: "Winged Jump Pack",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Counts as Jump Pack. Fear Rating 1 (cumulative). +10 Command Tests.",
    description: "Used almost exclusively by the Sanguinary Guard, the Winged Jump Packs of the Blood Angels are an inspiring sight to behold. Leaping down from above, it is as if the Battle-Brothers have taken flight on broad angelic wings like the avenging angels of legend, striking fear into their foes and bringing hope to their allies. Rules: Winged Jump Packs are treated as Astartes Jump Packs in all respects (see Deathwatch page 171). In addition, a Battle-Brother gains a Fear Rating of 1 when wearing a Winged Jump Pack. This Fear Rating is cumulative with the Fear Rating gained for other sources such as psychic powers or wargear (i.e. Death Mask). In addition, the inspiring effect of the sight of a Space Marine wearing a Winged Jump Pack grants the Battle-Brother a +10 to Command Skill Tests.",
    modifiers: {
      skills: { "Command": 10 },
      traits: ["Winged Jump Pack (Fear Rating 1, +10 Command)"]
    }
  },
  {
    name: "Wings of the Raven",
    chapter: "Raven Guard",
    type: "wargear",
    summary: "Counts as Jump Pack. Triples base move on short jumps. Flyer (18) on full power.",
    description: "The jump pack is an integral part of the Raven Guard doctrine and image. Over the centuries, the Chapter’s Techmarines have recovered and restored many variant and forgotten examples of the jump pack, among these is the relic known as the Wings of the Raven. With long, curved air intakes and oversized thrusters, this jet-black artefact is significantly more powerful than a standard jump pack. This relic has seen heavy use by several Raven Guard in the Canis Salient, its powerful thrust helping close the distance to the Tau’s deadly Fire Warriors. Rules: The relic counts as an Astartes Jump Pack (see Deathwatch page 171) with the exception that it triples base move when making short jumps and grants the Flyer (18) Trait when used on full power. It can also be used on full power for up to 10 minutes at a time before needing an equal amount of time to cool down.",
    modifiers: {
      traits: ["Wings of the Raven (Triple Move Short Jumps, Flyer (18) Full Power)"]
    }
  },
  {
    name: "Witchbane",
    chapter: "Black Templars",
    type: "wargear",
    summary: "Chainsword (1d10+5 R, Pen 4, Balanced, Tearing). +5 WP vs Psychic.",
    description: "Black Templars Brother-Sergeant Navrell bore this chainsword into battle against Eldar pirates on the world of Scoth in the Ixaniad Sector. What started as a small skirmish escalated when a webway portal opened on a ridge above the fighting. Through it stepped a black-robed Farseer, and behind him, a stream of Eldar reinforcements. Navrell led three squads to eliminate the new threat. Crackling balefire and slicing shurikens decimated his men, but Navrell fought through to cut down the Farseer. The portal snapped shut, and Navrell’s chainsword slew many more Eldar that day. It was this deed that led to Navrell’s secondment to the Deathwatch, bringing his weapon, now named Witchbane, with him. Rules: Witchbane has an improved profile (see Table 3–14), and in addition, grants the bearer a +5 to any Willpower tests to resist the effects of psychic powers.",
    stats: {
      weapon: {
        name: "Witchbane (Chainsword)",
        damage: "1d10+5 R",
        pen: 4,
        special: "Balanced, Tearing, +5 WP vs Psychic."
      }
    },
    modifiers: {
      traits: ["Witchbane (+5 WP vs Psychic)"]
    }
  },
  {
    name: "Octavio's Burden",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Boltgun. Kill <12hr: +10 WP vs Curse, +15 BS if Thirst. No Kill: -10 WP vs Curse, -5 Fel, +10 WS/-10 BS if Thirst.",
    description: "Brother Octavio was deeply troubled by the Red Thirst that afflicts many Blood Angels, until one of the Chapter Chaplains inscribed the Canticle of Unceasing Service upon his boltgun. Octavio was deployed immediately, and henceforth, as long as he used the weapon to smite down an enemy of the Emperor each day, his mind was clear and untroubled. It is recorded that from then on, he fought a battle every day of his life. Rules: Firing this bolter helps to calm the thoughts of its Blood Angels bearer, focussing his rage into cold and deadly skill. If the weapon has contributed to the death of an enemy within the last 12 hours, the firer gains +10 to the Willpower test for the Bloodlust Primarch’s Curse. In addition, should the bearer’s Red Thirst demeanour be triggered, he also receives +15 bonus to Ballistic Skill for the duration of the current encounter. However, if the weapon has not killed in the previous 12 hours, the bearer suffers –10 to the Willpower test for the Bloodlust Primarch’s Curse, –5 to all Fellowship tests, and if his Red Thirst is triggered he receives +10 to Weapon Skill and –10 to Ballistic Skill.",
    stats: {
      weapon: {
        name: "Octavio's Burden (Boltgun)",
        damage: "2d10+5 X",
        pen: 5,
        range: "100m",
        rof: "S/2/4",
        clip: 28,
        rld: "Full",
        special: "Tearing, See description for Red Thirst interactions."
      }
    },
    modifiers: {
      traits: ["Octavio's Burden (Red Thirst Modifiers)"]
    }
  },
  {
    name: "Wings of Saronath",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Counts as Jump Pack (Triple Move). +20 Command, +20 Fel (Blood Angels).",
    description: "Sanguinary Guard Saronath was a legendary figure within the Blood Angels, but he was laid low by unknown alien attackers on Baraspine, in the Adrantis Nebula. When he was found, his body was a dry husk, his golden armour shattered into thousands of fragments. Only his winged jump pack was salvageable, and was reverently repaired by the Chapter’s Techmarines and Articifers. The wings were gifted to the Deathwatch in exchange for a pledge to hunt down and exact vengeance upon Saronath’s killers. Rules: The Wings of Saronath follow the normal rules for Astartes Jump Packs, except that they triple normal movement instead of doubling it. In addition, they grant +20 to Command Tests and a +20 Fellowship bonus in any dealings with other Blood Angels Space Marines. Note that should the character discover a body in similar condition to that of Saronath’s, he will be duty bound to investigate to the best of his ability.",
    modifiers: {
      skills: { "Command": 20 },
      traits: ["Wings of Saronath (Triple Move Jump Pack, +20 Command, +20 Fel w/ Blood Angels)"]
    }
  },
  {
    name: "Furious Vengeance",
    chapter: "Dark Angels",
    type: "wargear",
    summary: "Boltgun (2d10+5 X, Pen 8, Tearing, Felling (1)).",
    description: "This ancient boltgun was created by master-artificers on the Rock, only a few centuries after the Horus Heresy, and although it bears no inscription, it was consecrated with terrible oaths of vengeance and retribution against traitors. Over the millennia it has cut down many hundreds of accursed Space Marines who betrayed their Emperor and their brothers, selling their souls to Chaos. Among its victims are a number of Fallen Dark Angels, although this fact is only known by the inner circle of the Chapter. Rules: Furious Vengeance has the Felling (1) Quality, as well as an improved Penetration of 8.",
    stats: {
      weapon: {
        name: "Furious Vengeance (Boltgun)",
        damage: "2d10+5 X",
        pen: 8,
        range: "100m",
        rof: "S/2/4",
        clip: 28,
        rld: "Full",
        special: "Tearing, Felling (1)"
      }
    },
    modifiers: {
      traits: ["Furious Vengeance (Pen 8, Felling (1))"]
    }
  },
  {
    name: "Duty's End",
    chapter: "Imperial Fists",
    type: "wargear",
    summary: "Storm Shield (Protection Rating 60, Overload 01-05).",
    description: "Brother Sergeant Artor and his squad were posted on the world of Deepcut IX, guarding a mine colony, when Ork raiders attacked. Despite assurances of assistance from the hundred or so miners, their chief foreman convinced them to flee and hide deep in the tunnels. The ten Space Marines were left to defend the mine head unaided against a horde of nearly a thousand Orks. The mine entrance was an excellent place to defend, but inevitably the Ork numbers overwhelmed the Imperial Fists. Artor was last to fall, countless slugga shells impacting on his great storm shield as he hacked down greenskin after greenskin. Rules: Duty’s End is an Astartes Storm Shield with a Protection Rating of 60, and Overload Roll of 01–05.",
    stats: {
      weapon: {
        name: "Duty's End (Storm Shield)",
        damage: "1d10 I",
        pen: 0,
        special: "Defensive, Shocking, Protection Rating 60, Overload 01-05"
      }
    },
    modifiers: {
      traits: ["Duty's End (Protection Rating 60, Overload 01-05)"]
    }
  },
  {
    name: "Strikers of Allerox",
    chapter: "Imperial Fists",
    type: "wargear",
    summary: "Gauntlets. +5 Strength. +15 Strength when unarmed/grappling.",
    description: "These heavy gauntlets were worn by Captain Allerox in the purging of Hive Greyreach. The hive was infested by daemons who had slaughtered nearly half of the workforce populace. Allerox himself strangled the Herald of Khorne who had led the bloody rampage. Rules: The Strikers of Allerox grant the wearer +5 Strength. When fighting unarmed, or grappling, they grant +15 Strength.",
    modifiers: {
      characteristics: { "Strength": 5 },
      traits: ["Strikers of Allerox (+15 Strength unarmed/grappling)"]
    }
  },
  {
    name: "Teeth of the Blizzard",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "Frost Blade (1d10+12 E, Pen 9, Balanced, Power Field, Tearing). +10 WS, +5 Crit Dmg.",
    description: "During a Space Wolves deployment to drive back splinter elements of Hive Fleet Behemoth, the leading pack, led by none other than Great Wolf Logan Grimnar, became surrounded when hundreds of voracious bio-organisms burst from the ground behind them. The pack fought ferociously to defend their Lord, and one Wolf Guard named Ralaff leapt on the back of a monstrous Trygon to slice its throat with his Frost Blade. Ralaff died from his injuries, but his actions allowed reinforcements to reach the Great Wolf in time. Rules: Teeth of the Blizzard is a Frost Blade (see page 168 of the DEATHWATCH Rulebook) that grants the bearer +10 Weapon Skill and adds +5 instead of the normal +3 to Critical Damage.",
    stats: {
      weapon: {
        name: "Teeth of the Blizzard (Frost Blade)",
        damage: "1d10+12 E",
        pen: 9,
        special: "Balanced, Power Field, Tearing, +5 Crit Dmg."
      }
    },
    modifiers: {
      characteristics: { "Weapon Skill": 10 },
      traits: ["Teeth of the Blizzard (+5 Critical Damage)"]
    }
  },
  {
    name: "Blacksnow Charm",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "+5 Strength when fighting Orks.",
    description: "When an Ork Waaagh ravaged the heavily colonised ice world of Geot, it was the Space Wolves that turned the tide. It is said that the snow itself was turned black by the ash and filthy smoke of thousands of burning Ork vehicles. The Blacksnow Charm contains a few crystals of the blackened ice, kept at permanently frozen temperatures, as a reminder of that great victory. Rules: The Blacksnow Charm gives the wearer +5 Strength when fighting Orks.",
    modifiers: {
      traits: ["Blacksnow Charm (+5 Strength vs Orks)"]
    }
  },
  {
    name: "Urion's Doom",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "Storm Bolter (2d10+5 X, Pen 5, Storm, Tearing). +15 BS vs Tyranids.",
    description: "Urion was an honoured member of the Ultramarines 1st Company, at the time of the invasion of Ultramar by Hive Fleet Behemoth. He was stationed at the Northern Polar Fortress during the defence of Macragge. He fought on the outer wall until it was overrun, his storm bolter reaping a heavy toll among the Tyranid horde. He defended the silo doors until they were breached, mowing down countless more bio-organisms. He battled in the catacombs as the surviving defenders fell back deeper and deeper. He fired burst after burst, each one finding its mark, until at last his ammunition was spent, when he charged into hand-to-hand combat and was overcome. Rules: Urion’s storm bolter was gifted to the Deathwatch, as a secret mark of respect and pledge of assistance. It grants the firer +15 Ballistic Skill when shooting at Tyranids.",
    stats: {
      weapon: {
        name: "Urion's Doom (Storm Bolter)",
        damage: "2d10+5 X",
        pen: 5,
        range: "120m",
        rof: "S/2/4",
        clip: 60,
        rld: "2 Full",
        special: "Storm, Tearing, +15 BS vs Tyranids."
      }
    },
    modifiers: {
      traits: ["Urion's Doom (+15 BS vs Tyranids)"]
    }
  },
  {
    name: "Jaw of Bloodcharn",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "Chainsword (1d10+3 R, Pen 4, Balanced, Tearing). +15 Command, +10 Cohesion Dmg Resist.",
    description: "The Jaw of Bloodcharn is the chainsword wielded by Tactical Squad Sergeant Kuriel during the war for a vital agri-world in the Ango sub-sector. Sudden attacks by dark-armoured Chaos Space Marines assassinated Kuriel’s Captain and the Sergeant stepped into his place to take command of the strike force. As the conflict escalated, Kuriel coordinated his efforts with allies from the Red Wolves and Sons of Orar Chapters, showing outstanding leadership ability. He was subsequently elevated to the 1st Company and his promotion to Captain was only prevented when he volunteered to join the Deathwatch. His weapon is the mark of a great commander. Rules: The Jaw of Bloodcharn adds +15 to Command Tests, and +10 when testing to prevent Cohesion Damage.",
    stats: {
      weapon: {
        name: "Jaw of Bloodcharn (Chainsword)",
        damage: "1d10+3 R",
        pen: 4,
        special: "Balanced, Tearing, +15 Command, +10 Cohesion Resist."
      }
    },
    modifiers: {
      skills: { "Command": 15 },
      traits: ["Jaw of Bloodcharn (+10 Cohesion Damage Resist)"]
    }
  },
  {
    name: "Armour of Faith",
    chapter: "Black Templars",
    type: "wargear",
    summary: "Artificer Armour (AP 12 All). Force Field (PR 30, Overload 01-05).",
    description: "Armour of Faith is the traditional name given to the armour gifted to the Emperor’s Champion. Chosen from the finest artificer armour available to the Chapter and then inscribed with sacred wards and catechisms of hatred, the armour offers greater protection than any ordinary suit of power armour could, allowing the Emperor’s Champion to complete his holy duty. Rules: Armour of Faith counts as a suit of artificer power armour (see the DEATHWATCH Core Rulebook page 163). In addition, such is the protections of its wards that some blows and rounds are simply turned aside or flash to nothing in a blaze of divine power. The Armour of Faith includes a Force Field with a Protection Rating of 30 and an Overload Roll of 1-5.",
    modifiers: {
      traits: ["Armour of Faith (Artificer Armour, Force Field PR 30)"]
    }
  },
  {
    name: "The Black Sword",
    chapter: "Black Templars",
    type: "wargear",
    summary: "Power Sword. 1H: 1d10+6 E. 2H: 2d10+6 E. Pen 6, Balanced, Power Field.",
    description: "Paired with the Armour of Faith, the traditional weapon of the Emperor’s Champion is the Black Sword. A massive two handed power sword, blessed by the Chapter Chaplains, it becomes a deadly weapon in the hands of the chosen of the Black Templars. Rules: Such is the skill with which this weapon has been crafted that the Emperor’s Champion can either wield it two-handed or one-handed as a normal Astartes power sword—both profiles are detailed on Table 3–2: Relic Melee Weapons.",
    stats: {
      weapon: {
        name: "The Black Sword",
        damage: "1d10+6 E (1H) / 2d10+6 E (2H)",
        pen: 6,
        special: "Balanced, Power Field, Can be used 1H or 2H."
      }
    },
    modifiers: {
      traits: ["The Black Sword (1H: 1d10+6 E / 2H: 2d10+6 E, Pen 6)"]
    }
  }
];

export const CHAPTER_TRAPPINGS = [
  {
    name: "Scrimshaw Talismans",
    chapter: "Carcharodons",
    description: "These bone talismans are covered with intricately detailed line-work carvings, to the point where the original shape of the bone is lost and the entire surface is a maze of ink-work. These talismans come in a variety of shapes, though they often are worked into stylized death's heads, sea-going predators similar to the Carcharodons' Chapter heraldry, teeth, gaping maws, and other disturbing iconography. It is likely these are worked into the Chapter's primitivist traditions. At least some of the Battle-Brothers are known to carve their own to celebrate accomplishments, frighten foes, and ward off the malefic.",
    rule: "The Battle-Brother may choose to have his Talisman grant him +5 to all Intimidate Tests or a +5 to all Tests to resist Psychic Powers. (Once selected, this bonus cannot be changed later).",
    options: [
      { name: "Frighten Foes (+5 Intimidate)", rule: "Grants +5 to all Intimidate Tests." },
      { name: "Ward Malefic (+5 Resist Psychic)", rule: "Grants +5 to all Tests to resist Psychic Powers." }
    ]
  },
  {
    name: "Combat Sight",
    chapter: "Raptors",
    description: "When a Battle-Brother selects a Combat Sight, he chooses two effects. These effects cannot be changed later, and even if the sight is replaced by the Chapter will remain the same. Combat sights can only be attached to pistol and basic weapons, and a weapon may only ever have one sight at any one time.",
    rule: "Provides an upgrade for basic and pistol weapons. Choose two effects from: Laser Tracer (+10 to hit single shots), Long Range Imaging (+10m pistol/+20m basic range), Focal Targeter (Penetration + Perception Bonus), Shadow Light (ignores lighting/cloaking penalties), and Audible Trigger (fire at concealed targets at Difficulty -10)."
  },
  {
    name: "Laurels of Ultramar",
    chapter: "Novamarines",
    description: "Part of the close ties between the Novamarines and the Ultramarines includes a desire by the Chapter’s Battle-Brothers to pay homage to the tomb of their Primarch on Ultramar. Many Battle-Brothers make this pilgrimage at least once during their lives and use it to strengthen their resolve as well as their connections with the Ultramarines Chapter.",
    rule: "If a Novamarine Battle-Brother with the Laurels of Ultramar is squad leader, then he counts any Ultramarines in his squad as if they were Novamarines (and vice-versa) for the purposes of Skill, Talents, and Squad Mode abilities."
  },
  {
    name: "Night World Battle Livery",
    chapter: "Howling Griffons",
    description: "In certain circumstances, a Chapter may be permitted to make use of variant livery on their armour, painting it with different designs specific to an individual campaign or engagement. During several of its engagements, the Howling Griffons have been sanctioned to use such livery, giving up the bold quarters red and yellow they normally employ. Among these official Codex patterns and colours is the Night World Battle Livery. A Howling Griffons Battle-Brother may choose to paint his armour in Night World Camouflage before a mission if it will involve stealth or reconnaissance elements. While his armour is painted in this way, he gains a +10 to silent move Skill Tests.",
    rule: "If painted before a mission involving stealth/recon elements, grants a +10 to silent move Skill Tests." // Added a short summary rule to match the structure
  },

  {
    name: "Ork Bone Talismans",
    chapter: "Crimson Fists",
    description: "Ork teeth and skulls are a common sight among the trophy rooms for the Crimson Fists Chapter and some Battle-Brothers carry these talismans into battle as a reminder of their prowess over the alien.",
    rule: "A Crimson Fists Space Marine may choose to carry an Ork Bone Talisman if he has the Hatred (Orks) Talent. The talisman allows the Battle-Brother to use the +10 bonus to attacks from his Hatred (Orks) Talent to be used for both Weapon Skill and Ballistic Skill. Orks fighting the Battle-Brother are incensed by such tokens and gain the Hatred Talent against him."
  },
  {
    name: "Crusader Medallions",
    chapter: "Marines Errant",
    description: "A Marines Errant Battle-Brother can choose to have Crusader Medallions as part of his starting gear, reflecting his time before he joined the Deathwatch. If he does he can choose to use them to improve the Disposition of those he meets that might have participated in the crusade or heard of its deeds. If he does so, then the GM should roll a d10: on a 1-3 the NPC has not heard of the crusade, on a 4-8 the NPC was part of the same crusade or has high regard for those that were and improves his Disposition to the Battle-Brother by one step, on a 9-10 the crusade has a dark meaning for the NPC (he lost too many brothers during it or it reminds him of a shameful incident) and his Disposition is reduced by one step toward the Battle-Brother."
  },
  {
    name: "Icon of the Scorpion",
    chapter: "Red Scorpions",
    description: "The Red Scorpions often adorn their wargear with an engraved image of their Chapter namesake. These small talisman-like icons remind the bearer of their Chapter’s heritage and their constant drive to purge corruption without as well as within. Bolstered by his conviction, a Red Scorpion Battle-Brother who possesses an Icon of the Scorpion gains a significant resistance to the taint of Chaos. Any time the Battle-Brother would gain a number of Corruption Points, he may make a Challenging (+0) Willpower Test. If this Test is successful, the number of Corruption Points gained is reduced by 1."
  },
  {
    name: "Librarium Texts",
    chapter: "Blood Ravens",
    description: "Blood Ravens Battle-Brothers have access to vast amounts of knowledge from the vaults of their Chapter. A Battle-Brother carrying Librarium texts must choose a single Lore Skill (which can be either Common, Scholastic, or Forbidden) as his area of focus. When using the Lore Skill on a subject his texts cover, he gains a +3 bonus to the Test.",
    rule: "When using the chosen Lore Skill on a subject the texts cover, gain a +3 bonus."
  },
  {
    name: "Grisly Trophies",
    chapter: "Flesh Tearers",
    description: "Such trophies inevitably decay over time and the GM may require the PC to collect new ones for his Battle-Brother from time to time.",
    rule: "While wearing or carrying grisly trophies, the Flesh Tearer gains a +10 to any Willpower Tests to resist the effects of either the Black Rage or the Red Thirst. However, their presence makes those around him more aware of the savage nature of his Chapter, and the Disposition of any NPC Space Marines he must interact with are automatically reduced by two steps. Other kinds of warriors (such as Imperial commanders or civilian populations) will always react with fear or revulsion toward the Battle-Brothers unless they are equally barbaric."
  },
  {
    name: "Devotion Chain",
    chapter: "Black Templars",
    description: "A chain binding the weapon to the warrior's arm.",
    rule: "Add +3 to any Willpower Test to resist Fear effects and Cohesion Damage."
  },
  {
    name: "Tabard",
    chapter: "Black Templars",
    description: "A ceremonial tabard displaying the heraldry of the crusade.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Ornamental", rule: "Add +2 to Fellowship Tests." },
      { name: "Deathwatch / Squad heraldry", rule: "The Kill-team restores 1 bonus Cohesion for every Primary Objective achieved." },
      { name: "Chapter heraldry", rule: "Add 1 to the character’s effective Rank for determining Black Templar Solo Ability effectiveness, but subtract 1 from Squad Base Cohesion." }
    ]
  },
  {
    name: "Golden Icons",
    chapter: "Blood Angels",
    description: "Ornate golden icons adorning the armour.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Icon of Inspiration", rule: "Add +3 to Command Tests." },
      { name: "Wings of Wrath", rule: "Add +1 to Damage if the character hits with his attack during the Charge action." },
      { name: "Purity Focus", rule: "Whenever the Battle-Brother gains Corruption Points, reduce the total by 1." }
    ]
  },
  {
    name: "Blood Drop Pendant",
    chapter: "Blood Angels",
    description: "A pendant shaped like a drop of blood.",
    rule: "Whenever the character spends a Fate Point to gain a bonus on a Test, he may add +13 instead of the usual +10."
  },
  {
    name: "Ceremonial Sword",
    chapter: "Dark Angels",
    description: "A finely crafted blade used for ritual and combat.",
    rule: "Adds a Ceremonial Sword to your inventory.",
    associatedWeapon: {
      name: "Ceremonial Sword",
      damage: "1d10+3 R",
      pen: 2,
      special: "Balanced"
    }
  },
  {
    name: "Robe",
    chapter: "Dark Angels",
    description: "A robe worn over the power armour, signifying rank or role.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Scholar’s Robe", rule: "Choose one Scholastic Lore and add +3 to all Tests on it." },
      { name: "Robe of Secrets", rule: "Choose one Forbidden Lore and add +3 to all Tests on it." },
      { name: "Seeker’s Robe", rule: "Add +3 to Scrutiny Tests." }
    ]
  },
  {
    name: "Wolf Pelt",
    chapter: "Space Wolves",
    description: "The pelt of a Fenrisian wolf, worn as a trophy and symbol of prowess.",
    rule: "Add +2 to Intimidate Tests."
  },
  {
    name: "Runic Totem",
    chapter: "Space Wolves",
    description: "A totem inscribed with ancient Fenrisian runes.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Totem of the Bloodied Hunter", rule: "Add +1 to any damage inflicted by Righteous Fury." },
      { name: "Totem of the Sea Wolf", rule: "Choose one Drive or Pilot Skill and add +3 to all Tests on it." },
      { name: "Totem of the Sun Wolf", rule: "Add +3 to Awareness Tests." }
    ]
  },
  {
    name: "Cingulum",
    chapter: "Ultramarines",
    description: "A belt of leather straps adorned with metal plates and decorations.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Adamantine Inlays", rule: "The detailed plates are strong enough to deflect weak blows. Add +3 to Parry Tests." },
      { name: "Honour Bells", rule: "The clinking scales and bells hung at the end of each strap herald the bearer’s approach. Gain +3 WS on your first Attack roll in a combat." },
      { name: "Marks of Leadership", rule: "Add +3 to any tests made to regain Cohesion or prevent Cohesion Damage." }
    ]
  },
  {
    name: "Heraldry Scroll",
    chapter: "Ultramarines",
    description: "A scroll displaying the heraldry of the chapter or company.",
    rule: "Add +10 Kill Markers to any Assault Mission where the scroll was displayed in at least one battle."
  },
  {
    name: "Chieftain Trophy Rack",
    chapter: "White Scars",
    description: "A rack displaying the skulls or helmets of defeated enemies.",
    rule: "A Chieftain Trophy Rack counts as a Back Banner. Before each mission, the Battle-Brother can choose a single type of enemy to be displayed on the rack. This could be a specific race, organisation, or foe. When fighting members of this race, organisation, or foe, the Battle-Brother counts as having a Fear Rating of 1."
  },
  {
    name: "Icon of the Iron Cage",
    chapter: "Imperial Fists",
    description: "A symbol commemorating the Iron Cage incident.",
    rule: "An Imperial Fist Battle-Brother who bears the Icon of the Iron Cage can, once per game session, increase his Strength, Toughness, and Willpower by 10 for a single turn."
  },
  {
    name: "Wolf Tooth Necklace",
    chapter: "Space Wolves",
    description: "A necklace made of wolf teeth.",
    rule: "Wolf Tooth Necklace grants the wearer the Frenzy Talent.",
    associatedTalent: "Frenzy"
  },
  {
    name: "Bionic Hand",
    chapter: "Iron Hands",
    description: "A mechanical replacement for a lost hand.",
    rule: "Select a craftsmanship from the options below.",
    options: [
      { name: "Common Craftsmanship", rule: "Functions identically to the replaced appendage." },
      { name: "Exceptional Craftsmanship", rule: "Provides +10 bonus to fine manipulation tests (Tech-Use, Sleight of Hand, etc.), but not the Strength bonus of a bionic arm." }
    ]
  },
  {
    name: "Sable Heraldry",
    chapter: "Raven Guard",
    description: "Heraldry displaying the symbols of the Raven Guard.",
    rule: "Select a rule from the options below.",
    options: [
      { 
        name: "The Ravenclaw", 
        rule: "Add +3 to Perception.",
        associatedCharacteristicModifier: { characteristic: "Per", value: 3 }
      },
      { 
        name: "Raven Calvaria", 
        rule: "Add +2 to Agility.",
        associatedCharacteristicModifier: { characteristic: "Ag", value: 2 }
      }
    ]
  },
  {
    name: "Helmet Picter",
    chapter: "Raven Guard",
    description: "A high-quality pict-recorder mounted on the helmet.",
    rule: "At the end of each mission, the Battle-Brother may take a Challenging (+0) Tactics Test. Every member of the Kill-team gains an additional 50 experience points per degree of success."
  },
  {
    name: "Promethean Sigils",
    chapter: "Salamanders",
    description: "Sigils representing the Promethean Cult.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "The Flame", rule: "Add +2 to Initiative rolls." },
      { name: "Tools of the Forge", rule: "Add +3 to Tech-Use Tests." },
      { 
        name: "Wyrm-hide", 
        rule: "Add +2 to Strength.",
        associatedCharacteristicModifier: { characteristic: "S", value: 2 }
      }
    ]
  },
  {
    name: "Drake-Clasps",
    chapter: "Salamanders",
    description: "Clasps fashioned in the shape of firedrakes.",
    rule: "At the end of any successful mission, roll a d10 for every point of Renown earned during that mission; for each roll of a 10, the Battle-Brother gains an additional point of Renown."
  },
  {
    name: "Honour Gift",
    chapter: "White Scars",
    description: "A gift of honour bestowed upon the Battle-Brother.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Torandor Pelt", rule: "A Torandor Pelt grants the owner a +2 bonus to all Toughness Tests." },
      { name: "Fragment of Foes Defeated", rule: "The memory of that war allows the bearer to choose one Tactics Skill and gain a +3 bonus to all Tests on it." },
      { name: "Savage Totem", rule: "The bearer gains an additional +2 bonus to WS when charging." }
    ]
  },
  {
    name: "Duelling Tulwar",
    chapter: "White Scars",
    description: "A finely crafted curved sword, a traditional weapon of Chogoris.",
    rule: "This trapping grants the Battle-Brother a Duelling Tulwar.",
    associatedWeapon: {
      name: "Duelling Tulwar",
      damage: "1d10+2 R",
      pen: 0,
      special: "Balanced, Primitive"
    }
  },
  {
    name: "Sacris Claymore",
    chapter: "Storm Wardens",
    description: "A heavy, two-handed broadsword traditionally wielded by the Storm Wardens.",
    rule: "This trapping grants the Battle-Brother a Sacris Claymore.",
    associatedWeapon: {
      name: "Sacris Claymore",
      damage: "2d10+2 R",
      pen: 2,
      special: "Unbalanced"
    }
  },
  {
    name: "Tempest Amulet",
    chapter: "Storm Wardens",
    description: "A ceremonial item denoting a Battle-Brother's deeds and oaths.",
    rule: "Select a rule from the options below.",
    options: [
      { name: "Amulet of Might", rule: "Add +2 to Strength (after all other modifiers)." },
      { name: "Victory Scripture", rule: "Gain +2 WS when fighting an enemy in single melee combat." },
      { name: "Guardian Amulet", rule: "The enveloped scripts venerate the Storm Warden’s lost 1st Company, so that they will send aid to the bearer in times of greatest peril. The amulet counts as a Charm." }
    ]
  }
];

export const FORCE_WEAPON_RULE = `For every point of Psy Rating the wielder has, the weapon’s Damage and Penetration increase by +1. In addition to normal Damage, whenever a psyker damages an opponent, he may, as a Free Action, channel psychic force into the blade. This requires a Focus Power Test using Opposed Willpower. For every degree of success, the force weapon’s wielder deals an additional 1d10 Damage, ignoring the victim’s Armour and Toughness Bonus. Force weapons cannot be destroyed by a power weapon’s field.`;

export const SPECIAL_WARGEAR = [
  { 
    name: "Auspex", 
    summary: "+20 Awareness Tests. Tech-Use Test to detect invisible gases, bio-signs, or radiation (50m range).",
    description: "These devices are used to detect energy emissions, motion, and biological life signs. A character using an auspex gains a +20 bonus to Awareness Tests and may make a Tech-Use Test to spot things not normally detectable to human senses alone, such as invisible gases, nearby bio-signs, or ambient radiation. The standard range for an auspex is 50m, though walls more than 50cm thick and certain shielding materials can block the scanner." 
  },
  { 
    name: "AUTO-SENSE GOGGLES", 
    summary: "Vision enhancements (photo-visor, preysense +20). Laser range finder grants +20 to allied artillery/aerospace BS.",
    description: "These bulky goggles (most often worn by Space Marine Scout snipers) provide the wearer with a number of vision enhancements. There are many models and variants of these goggles. Many of them combine the effects of photo-visors (no penalties due to darkness) and preysense (+20 to vision based Perception Tests at night or in the dark) sights, can detect and see a broad range of radioactivity frequencies, can record pict-captures, have a 5x optical enhancement, 5x micromagnification, and a number of coloured filters that can be flipped in and out of the view ports. These goggles also have an integral laser range finder that allows the wearer to act as a forward observer or fire controller for artillery and aerospace units by pinpointing targets, calculating firing solutions, and broadcasting the data to waiting units. When using the laser range finder to guide artillery or aerospace fire, the forward observer grants +20 to the allied unit’s Ballistic Skill Test." 
  },
  { 
    name: "Back banner", 
    summary: "Leader restores 1 bonus Cohesion point when spending a Fate Point for Cohesion.",
    description: "Back banners fly on ornate poles wrought with the Deathwatch symbol and icons of Imperial faith, mounted on a backpack power unit or rising from between the shoulder blades. These elaborate banners often tower as tall again as the Battle-Brother’s height itself, heralding the valour of the Emperor’s avenging angels to brother and foe alike. When the Kill-team’s leader spends a Fate Point to restore a point of Cohesion, he restores one bonus point of lost Cohesion if he is wearing a back banner." 
  },
  { 
    name: "CAMELEOLINE TARPAULIN", 
    summary: "+30 to all Concealment Tests for vehicles and emplacements.",
    description: "These thin, resilient tarpaulins are made of sheets of photosensitive, colour-shifting fabric that can take on the appearance of their surroundings. Issued in five metre by five metre sheets, cameleoline tarps can be hooked together to hide anything from a land speeder to a rhino to an entire encampment. Use of cameleoline tarps to hide vehicles and emplacements grants the user a +30 to all Concealment Tests." 
  },
  { 
    name: "Camo-cloak", 
    summary: "+20 Concealment Tests. When stationary, wearer counts as one range bracket farther away.",
    description: "A sharpshooter wearing a camo-cloak gains a +20 bonus to all Concealment Tests. When stationary, the wearer counts as being one range bracket farther away when targeted by ranged weapons." 
  },
  { 
    name: "Cartograph", 
    summary: "+10 Navigation (Surface) Tests. Tracks coordinates, provides bearing to locations, and stores maps.",
    description: "This specialised data-slate accepts geographical and navigational information on a planet, either from existing data-banks or gathered by a ship’s Augur Arrays in orbit. Its geo-locator tracks the user’s planetary coordinates, enabling it to provide distance and bearing to any known location. This provides a +10 to all Navigation (Surface) Tests. It is also capable of storing detailed maps and schematics, which can be useful for objective approach planning. Many cartographs are also equipped with a small holo-projector that displays three-dimensional maps of its contents." 
  },
  { 
    name: "Charm", 
    summary: "Keepsake or holy relic. (Player: add details below).",
    description: "A charm is a keepsake, holy relic, or good luck token that is intended to draw the benevolent eye of the Emperor, a Primarch, or other patron to the bearer. They take myriad forms including such things as fragments of blessed bolter casings, water from holy seas, and pelts of sacred animals." 
  },
  { 
    name: "Chrono", 
    summary: "Dependable timepiece.",
    description: "Chronos are timepieces, which are dependable and simple to use. General models are usually hand-held or worn on the wrist, while Space Marines typically rely on the ones built into their armour." 
  },
  { 
    name: "CLAVIS", 
    summary: "Bypasses Imperial locks/defences. +30 Security Test. +10 Medicae on wearer.",
    description: "A clavis is a special silvered vambrace, a piece of armour granted to Space Marines upon becoming a Deathwatch Keeper. Created during the Dark Age of Technology, the workings of the clavis are not fully understood by the Adeptus Mechanicus, but it is known that it interfaces with the Space Marine’s nervous system and monitors his vital signs. The clavis acts as a unique and complex key that contains a myriad of Inquisitional override codes and other, more arcane systems that allow it to bypass nearly any technological seal. The clavis communicates with light, vibration, and other, less-known means to unseal magnetic locks and shield barriers at the Keeper’s command. Servitors and other autodefences register the Keeper as a friend and stand down in his presence. The clavis is what allows a Keeper to walk his vigil undisturbed and reach nearly any secure zone. Effect: The clavis bypasses nearly any Imperial lock, seal, or automated defence system. If a roll is required, the clavis allows its wearer full use of the Security Skill even if he does not possess it, and in addition adds a +30 bonus to any Security Test. In addition, Medicae Tests used on the wearer of a clavis gain a +10 bonus due to the device’s ability to monitor its wearer’s vital information." 
  },
  { 
    name: "Codex Astartes", 
    summary: "Sacred text of Roboute Guilliman. Guiding doctrine for most Chapters.",
    description: "The entirety of the Codex Astartes fills immense librariums, but many Space Marines carry the heart of this sacred text into battle. Of course, interpretations of what passages form the core of the codex vary even more than the forms it has been transcribed into over the millennia since the Second Founding. From hand-copied tomes bound in etched leather to crystal-circuited datacrypts, the collected wisdom of Roboute Guilliman, the Primarch of the Ultramarines—and arguably the most celebrated war tactician the Imperium has ever seen—endures in forms uncounted. It is also the guiding doctrine for how most Chapters operate today. Many Battle-Brothers, particularly the descendants of Guilliman, never pass a day without studying from this text." 
  },
  { 
    name: "COMBAT WEBBING", 
    summary: "Belt and suspenders with various pouches (Clip, Medicae, Vox, Grenade, etc.).",
    description: "Astartes combat webbing consists of a sturdy web belt and detachable load-bearing suspenders. The belt and load-bearing suspenders are five centimetres wide and adjustable to fit nearly every body size, as well as over standard Astartes Scout armour. The webbing is designed to carry hard and soft-sided pouches for equipment and ammunition that a scout needs readily at hand. These pouches come in a variety of sizes, and range in use from magazine pouches to medikits to holsters and drop pouches. The pouches connect to the belt and suspenders with a series of semi-permanent clips that can be undone with any flat-bladed tool. Common pouches include: Clip Pouch, Medicae Pouch (+20 Medicae), Vox Pouch, Grenade Pouch, Knife Sheath, Shotgun Pouch, Sidearm Holster, Drop Pouch." 
  },
  { 
    name: "Combi tool", 
    summary: "+10 bonus to Tech-Use Tests.",
    description: "Commonly found in the hands of Techmarines, combi-tools are versatile, if somewhat bizarre, mechanical devices. They are spindled with small implements that interface, cut, solder, and anoint, granting a +10 bonus to Tech-Use Tests." 
  },
  { 
    name: "data-slate", 
    summary: "Stores and reads text, schematics, video, and audio.",
    description: "Data-slates are commonplace in the Imperium—the primary means of storing and reading printed text, schematics, and other media such as video (pict) or audio (vox) recordings. Models range from cheap, single purpose devices built to play only a certain recording, to sophisticated models that can rerecord new information and transmit and receive data from other devices." 
  },
  { 
    name: "Deadlock (Toxin)", 
    summary: "Difficult (-10) T Test or suffer 1d10 Str Damage. Paralysis at 0 Str.",
    description: "This paralytic chemical causes the target’s muscles to seize, immobilising him for easy elimination or capture without rendering him unconscious. This toxin is most commonly found in the form of needler rounds. If the victim fails a Difficult (–10) Toughness Test, he suffers 1d10 temporary Strength Damage, plus a further 1d10 per degree of Failure. If he reaches “0” Strength, he is completely paralysed and unable to act. This paralysis and Strength Damage wears off in 2d5 minutes, minus the victim’s Toughness Bonus (minimum 1 minute).",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Delay Agent (Toxin)", 
    summary: "Causes drugs/toxins to take effect 1d5 hours later.",
    description: "Not a toxin in and of itself, a delay agent encapsulates the molecules of drugs and poisons with a slowly decaying non-reactive microshell that allows the payload to take effect substantially after delivery. Any drug or toxin may be cut with a delay agent, causing it to take effect 1d5 hours after it is administered.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "De-tox", 
    summary: "Negates effects of gases/toxins. Immune for 1d10 Rounds.",
    description: "A more powerful form of the anti-toxins found in Astartes power armour, this drug can negate the effects of most dangerous gases and toxins if administered quickly enough. A dose of de-tox immediately ends the ongoing effects, both positive and negative, of any drugs, toxins, or gases affecting the character (unless the effect states that de-tox is not effective against them) and renders him immune for another 1d10 Rounds. Given that natural Space Marine resilience protects him against many of the common chemicals that pose a threat to other beings, de-tox is manually administered to avoid unintended interruption of injector system effects.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "DIAGNOSTICATOR", 
    summary: "+20 bonus to Tech-use Tests when diagnosing or repairing equipment.",
    description: "This small, hand-held device contains a number of technological diagnostic tools and a small cogitator array that allows a Deathwatch Techmarine to diagnose what ails a machine’s spirit. It has a number of common plugs and adaptors that allow it to be plugged into nearly every machine of human manufacture, as well as sensors and scanners that can see through hulls and casings, detect microscopic cracks and material fatigue, and generally help the Techmarine in his daily obligations to the Omnissiah. A Techmarine using a machine-spirit Diagnostor gains a +20 bonus to all Tech-use Tests when diagnosing or repairing malfunctioning equipment." 
  },
  { 
    name: "Dilation field", 
    summary: "Grants Unnatural Agility/Speed. 1d10 Rounds use. -10 WS/BS on activation/deactivation turns.",
    description: "A dilation field grants the owner the Unnatural Agility and Unnatural Speed Traits. Activating the field is a Ready Action with all effects (including any change to the character’s place in the Initiative Order) beginning at the start of the next Round. Dilation fields consume huge amounts of power, and once activated remain on for only 1d10 Rounds before requiring 1 hour to recharge. Furthermore, the character is at –10 WS and BS on the first Turn the field goes into effect, and the first Turn after the field’s effects end, as he adjusts his timing. The interactions between dilation fields and force fields can have disastrous consequences, and only one type of field should be activated at a time on a character." 
  },
  { 
    name: "Elucidator", 
    summary: "Analyzes and translates speech/text. Logic Test (-20) for alien languages.",
    description: "The Jericho Reach is rife with planets out of contact with the Imperium for thousands of years, pockets of humanity lost during the Age of Shadow or even before. During that time, their language may have diverged radically from Low Gothic. An elucidator is a hand-held device that can analyse speech or text, and translate it into a standard language and dialect (and vice versa). It is most useful in dealing with cultures whose languages have a basis in Low Gothic, requiring no Test to perform this function. However, a character with the Logic Skill may make a Difficult (–20) Test to use an elucidator to decipher basic meanings from truly alien languages. An elucidator’s output can display on its screen, project from its vox, or transmit through a vox channel." 
  },
  { 
    name: "Genophage (Toxin)", 
    summary: "Custom made. Hard (-20) T Test or take 1d10+5 impact damage per round.",
    description: "Lethally effective, every dose of genophage is tailored to attack the weaknesses in the molecular structure of a particular individual. As such, it may never be simply Requisitioned, and must always be custom made. Victims of genophage stand little chance of resisting the quick-acting enzymes that immediately shut down circulatory and respiratory functions. Genophage is so deadly that it only needs to make contact with its intended target to be effective. If used in weapon form, this means the attack must deal at least 1 point of Damage after AP, but does not need to overcome TB. If contact is made, the target must pass a Hard (–20) Toughness Test. Failure indicates he takes 1d10+5 impact Damage with no reduction for armour or Toughness. This continues every Round until the victim either passes the Test or dies. If genophage is used upon a creature other than the individual it was made for, it simply has the standard Toxic effect.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Grapnel", 
    summary: "Fires 100m wire. Manual/powered winch. Weapon: 1d10+2 R, Pen 2.",
    description: "Sometimes used by Space Marine Scout Squads in the field, a grapnel fires a hooked or magnetic grapnel from a bolt pistol, connected to the launcher with a thin but strong 100m wire. Once the grapnel attaches to the desired rock outcropping, gargoyle edifice or other anchor, the user can manually climb the line or activate a powered winch. In a pinch, a grapnel can also be used as a crude—and messy—projectile weapon, doing 1d10+2 R Damage with a Penetration of 2." 
  },
  { 
    name: "GRAV CHUTE", 
    summary: "Safe fall from any height using suspensor fields.",
    description: "On occasion, Space Marine Scout Squads must deploy stealthily, unable to utilise more common methods like teleportation or drop pods. Under those unusual circumstances, the Scouts utilise an Astartes grav chute. Grav chutes rely on suspensor fields to counter gravity and slow descent. Unlike a jump pack, which allows the user to leap into the air, a grav chute’s lower power output only allows for a safe, guided fall such as a combat drop from a transport. It allows for a safe fall from any height." 
  },
  { 
    name: "GRAV-FLARES", 
    summary: "Illuminates 10km area for 2d10 minutes.",
    description: "Fired from integral tube launchers, Grav-flares are used to light large swaths of terrain. With a small rocket motor to get it to altitude and a low-power grav-system similar to a grav plate to keep it there, these extremely high-intensity chemical flares can illuminate an area roughly ten kilometres across and lasts for 2d10 minutes. They come in red, white, green, gold, and blue.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Harness", 
    summary: "+30 Climb Tests. Prevents falling on failure.",
    description: "Offering more safety than a grapnel but less noise and bulk than a jump pack, this Battle-Brother-sized harness can be used to aid in safely descending from terrain or buildings. The simple harness fits over a character’s power amour. A hook-shaped magnetic clip can then be anchored to a wide variety of surfaces as the coiled safety line slowly unspools. The Battle-Brother gains a +30 bonus to Climb Tests, and will not fall if he fails." 
  },
  { 
    name: "INFILTRIOL ENAMEL", 
    summary: "Masks bio-signature from Hive Fleet Dagon Tyranids. Lasts 1d10+10 hours.",
    description: "Treats power armour to mask bio-signature from Hive Fleet Dagon. Tyranid organisms do not recognise wearer as an enemy unless they approach closer than 2 x Perception Bonus meters. Discovering or attacking reveals the character. Lasts 1d10+10 hours. Psy-active Tyranids gain +20 to Awareness Tests to see through it.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Injector", 
    summary: "Full Action to administer 1 dose of drug/toxin. Melee rules for unwilling targets.",
    description: "Injectors carried by the Adeptus Astartes are usually hyposprays that require helmets to be removed so that skin contact can be made. An injector can hold a single dose of any drug (or toxin), which a character may administer as a Full Action. An injector may be used on an unwilling target through standard melee combat rules as though it were a weapon, but the injector itself deals no Damage and cannot penetrate armour.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Jump Pack", 
    summary: "Allows safe falls, short jumps (double Base Movement), or maximal thrust (Flyer 12 for 1 min).",
    description: "A Jump Pack requires the Pilot (Personal) skill to operate effectively. An Astartes Jump Pack allows for a safe, guided fall from any height, and any number of short jumps. Such jumps allow the Battle-Brother to double his Base Movement and travel in any direction without regard for obstacles. For all other purposes, he counts as having taken the appropriate Movement action. He must land by the end of his Turn. Alternatively, the pack can use maximal thrust to duplicate the Flyer (12) trait for up to a minute before the turbines require a minute to cool." 
  },
  { 
    name: "lamp/ glow-globe", 
    summary: "Illuminates area a dozen metres in diameter. Lasts 1d5 hours.",
    description: "These common devices can illuminate an area a dozen or more metres in diameter. A typical lamp lasts 1d5 hours before it needs to be recharged." 
  },
  { 
    name: "Locus Seeker", 
    summary: "Pair of devices (caller/seeker) for tracking over sectors. Navigation Test to plot course.",
    description: "A locus seeker is actually a pair of devices. The smaller component, the locus caller, is a dull metal sphere only millimetres in diameter. The larger component is a small, translucent globe with a needle of identical metal suspended mysteriously inside. The needle, called the locus seeker, is usually carved in the shape of a grasping talon and reaches unerringly towards the caller, with no observed limits on its distance. Plotting a course towards the caller using the globe requires the appropriate Navigation Test with a Difficulty based on how much distance lies between the two." 
  },
  { 
    name: "LUMINATOR SIGNAL FLARE CAPSULES", 
    summary: "Steady (5m light, 1d10h) or Stroboscopic (distress, 1d5h) modes. One-use.",
    description: "Roughly half the size of a standard bolt round, these high intensity beacons have two operating modes, steady and stroboscopic. In steady mode they are used for marking and illuminating, and can light an area five metres in diameter. In stroboscopic mode the Luminator Flare flashes on and off hundreds of times per minute and is typically used as a distress beacon. Unlike lamp packs or glow globes, Luminator Flares are one-use only—simply discarded when they run out of power. Luminators last 1d10 hours in steady mode, and 1d5 hours in stroboscopic mode.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Magboots", 
    summary: "Adhere to metallic surfaces. Halves Agility Bonus (recalculate Movement) when active.",
    description: "Astartes power armour can be upgraded to contain strong electromagnets built into the boot soles, allowing the wearer to adhere to metallic surfaces such as exterior hull plating. These magnets may be activated or de-activated at the beginning of the wearer’s Turn. Magboots reduce Agility Bonus (recalculate Movement accordingly) by half when used, but otherwise allow normal movement in low- or zero- gravity areas provided there is a suitable surface to walk upon. Standalone versions of Magboots can be found outside the Adeptus Astartes." 
  },
  { 
    name: "Magnoculars", 
    summary: "Powerful vision aids. Advanced models give range, heat detection, and pict-captures.",
    description: "These are powerful vision aids that magnify distant objects. More advanced, high-quality magnoculars can also give range read-outs, detect heat sources, calculate target location positioning, and take pict-captures of a view for later analysis." 
  },
  { 
    name: "Multikey", 
    summary: "+30 to Security Tests when opening locks.",
    description: "As it can open most standard Imperial locks, a multikey is reason for suspicion in the hands of a common citizen. For organisations like the Deathwatch they are indispensable, as it is considerably faster and quieter to infiltrate the enemy’s fortifications than to blast through them. A character with a multikey gains a +30 bonus to any Security Test when trying to open locks." 
  },
  { 
    name: "Narthecium", 
    summary: "+20 Medicae Tests on Astartes. Raises Lightly Damaged threshold to 3x TB. Doubles healing.",
    description: "A narthecium grants a +20 Bonus to Medicae Tests made on a Space Marine patient. It also raises the Threshold at which the patient is considered Lightly Damaged to 3 times his Toughness Bonus, and doubles the amount of damage healed by first aid. A narthecium also holds ten doses of any one drug. The drug must be acquired separately." 
  },
  { 
    name: "Pain Suppressant", 
    summary: "Ignore Critical Effects for 1d10 Rounds.",
    description: "The same chemical is found in most Astartes power armour injectors and allows a character to ignore Critical Effects for 1d10 Rounds. Additional doses are often carried in nartheciums, and may also be used in the Sacraments of Renewal to refill power armour injectors with a Routine (+10) Tech-Use Test.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "pict recorder", 
    summary: "Records and plays back live media. Some have holographic capabilities.",
    description: "Pict recorders (or simply picters) are relatively simple live-media recording devices, and some have holographic capabilities. Most also allow for playback as well as recording, and some are even built into dedicated pict-servitors so they can capture important battles, weapon tests, alien interrogations, and other dangerous events." 
  },
  { 
    name: "Psychic Hood", 
    summary: "Reaction to nullify psychic techniques within WP range. +5 Focus Power Tests.",
    description: "A character equipped with a psychic hood may spend his Reaction to attempt to nullify a psychic power being used by another psyker within a number of metres equal to the character’s Willpower. This attempt should be declared before the enemy psyker makes his Focus Power roll. The psychic hood’s wearer first makes a Focus Power (Willpower) Test. Every degree of success imposes a –10 penalty on the enemy’s Focus Power Test. Alternatively, the wearer may attempt to nullify the effects of a Psychic Power on himself only, regardless of Range. To do this, the character takes a Focus Power (Willpower) Test. If he succeeds, he is unaffected by the Psychic Power, but any other targets or areas are affected normally. A nullification Test may trigger psychic phenomena based on Psychic Strength as normal. Additionally, the psychic hood grants the wearer a +5 bonus to all Focus Power Tests, including nullification attempts." 
  },
  { 
    name: "psy-focus", 
    summary: "+10 bonus to Invocation Skill Tests.",
    description: "Psykers and Librarians often use these items to help them focus their powers. A psy-focus could be a book of meditations, a blessed icon, or a carved witch stave from the Battle-Brother’s homeworld. When a psyker with a Psy-focus makes an Invocation Skill Test he gains a +10 bonus." 
  },
  { 
    name: "Reductor", 
    summary: "Progenoid removal 1 Round/gland. Melee weapon: 1d10+2 R, Pen 10 (no SB).",
    description: "A reductor reduces the time to remove the Progenoid glands to 1 Round per gland (2 for a full recovery). Although generally regarded as disrespectful to the machine’s sombre purpose, it can also be used as a melee weapon that does 1d10+2 R with a Penetration of 10. If used as a weapon, a reductor does not add the Battle-Brother’s SB to Damage; its design emphasises control and precision, but does not provide adequate leverage to take advantage of the wielder’s strength." 
  },
  { 
    name: "Repair Cement", 
    summary: "Seals power armour breaches instantly. Takes one Round, no Test required.",
    description: "Repair Cement is a spray-gel composed of dual tubes of polyplas allomers that bond instantly with each other to seal power armour damage. It is typically used for quick field repair of breaches until the armour can be attended properly by a follower of the Omnissiah. A Space Marine learns how to use repair cement as soon as he is issued power armour; its application takes one Round but requires no Test.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Restraints", 
    summary: "Strong enough to hold an Ork. Sized for human-shaped bodies.",
    description: "Despite their designation, Kill-teams’ Mission objectives are far more varied than simple target elimination. Live capture may be the means to an end or the goal itself. Simple but effective, Deathwatch restraints size to most roughly human-shaped bodies and are strong enough to hold even a thrashing Ork." 
  },
  { 
    name: "ResusCitex", 
    summary: "Revives unconscious characters. Reverts Fatigue to TB if in excess.",
    description: "This stimm is intended to revive an unconscious comrade. It immediately wakes an unconscious character. If the character has taken Fatigue levels in excess of his Toughness Bonus, it reverts the level of Fatigue to a number equal to his TB. It has no effect on conscious characters suffering Fatigue levels equal to or less than their TB.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Sacred Unguents", 
    summary: "Immune to Jamming for one clip size or unjams weapon.",
    description: "Sacred unguents blessed by the Omnissiah are much sought after for their mystical properties when applied to machines. If applied to a weapon (a Full Action) it becomes immune to Jamming for a number of shots equal to its clip size. If the weapon is Jammed and the unguent is then applied, it immediately unjams, but there is no further effect.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "SIEGE AUSPEX", 
    summary: "Powerful scanner (20m range) to find stress fractures and hidden passages.",
    description: "The siege auspex is a powerful scanner that can see through the densest materials to find their weak points. These items are used for finding stress fractures, reinforced or up-armoured areas, hidden passages, power conduits, and the numerous other items of interest to a siege engineer. The machine-spirits of a siege auspex, while canny, can only see so far through solid objects and have a fixed range of about 20 metres." 
  },
  { 
    name: "signum", 
    summary: "+5 Ballistic Skill to Squad Mode members. Full Action + Tech-Use for +10 until end of next Round.",
    description: "A signum is a sensorium and transmitter array that can be mounted on a Battle-Brother’s armour. It broadcasts enhanced tactical readings to all members of a Squad, allowing them to benefit from the targeting data. While a character equipped with a signum is in Squad Mode, all characters in Squad Mode receive a +5 bonus to Ballistic Skill Tests. If the equipped character spends a Full Action and succeeds on a Tech-Use Test, this bonus increases to +10 until the end of the next Round. The effects of multiple signums are not cumulative." 
  },
  { 
    name: "signum link", 
    summary: "Web of interconnected autosenses. Benefit from ganging up rules for melee/ranged attacks in Squad Mode.",
    description: "A signum is a useful tool alone, but by equipping the targeting systems of one or more squad members with a signum link, they can make optimal use of the signum’s readings to achieve unparalleled acts of teamwork by forming a web of their interconnected autosenses. This allows all participating members to make a concerted attack on the same foe, striking with a coordinated precision that makes their assault all but inescapable. To form a signum web, at least one member of a Squad must be equipped with a signum. One or more other characters in the squad then equip their armour with signum links. All characters in Squad Mode on the web (via the signum or a link) may benefit from the rules for ganging up on an opponent, regardless of whether they are engaged in melee or using ranged attacks." 
  },
  { 
    name: "STALKER FLARES", 
    summary: "Invisible chemical markers detectable only through photo/preysense sights.",
    description: "Invisible to the naked eye, these small chemical markers can only be detected through photo or preysense sights or by those using auto-sense goggles. They allow Space Marines to mark trails and landing zones in ways difficult or impossible to detect by enemy forces.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Stummer", 
    summary: "+30 Silent Move Tests. Countermeasure against surveillance. 20 mins power.",
    description: "The reverse of a screamer, stummers generate sound waves to cancel out ambient sounds and noises made by moving personnel in a small area. A character carrying an active stummer gains a +30 to Silent Move Tests. The device may also be used as a countermeasure against vox-bugs and other surveillance attempts. A stummer typically has enough power for 20 minutes of continuous use before needing to be recharged, a process that takes about 1 hour." 
  },
  { 
    name: "targeter", 
    summary: "Combines Red-Dot and Telescopic sights. Dodge ranged attacks from user suffer -10 penalty.",
    description: "The Space Marine version of a Targeter encompasses several sights connected to a guidance cogitator array that improves overall accuracy. Rather than being hard-wired to a specific weapon, the array fixes at the shoulder or backpack unit and links into the power armour’s general targeting systems, providing its benefits to all ranged weapons the user wields regardless of their Class. A Targeter combines the effects of a Red-Dot Laser Sight and Telescopic Sight. In addition, its sophisticated target-lock system makes evading a shot from a weapon guided by it extremely difficult. Attempts to Dodge ranged attacks from a character equipped with a Targeter suffer a –10 penalty." 
  },
  { 
    name: "Teleport Homer", 
    summary: "Signal transmitter for teleportation targeting or retrieval.",
    description: "These powerful signal transmitters allow ships equipped with a Teleportarium or similar technology to zero in on a person, object, or area. Teleport homers may be used to target points for squad deployment or to locate a moving individual who needs to be retrieved." 
  },
  { 
    name: "VIVISECTION GAGE", 
    summary: "+10 Medicae (research) or +10 Interrogation/Intimidation. Weapon: 1d5+5 R, Tearing, Toxic.",
    description: "Primarily a tool used by Deathwatch Techmarines and Apothecaries, especially those affiliated with the Magos Biologis, this wicked looking device is used mainly to maintain the ranks of Deathwatch servitors. The hand itself contains augmentation similar to that of a cybernetic hand, and the fingers contain a number of laser cutters, bio-solvents, auto-injectors, shears and flensing instruments. When used by a Techmarine or Apothecary for the purposes of research or maintaining servitors, the vivsection gage grants the user a +10 bonus to all Medicae Tests. When pressed into service as an interrogation device, it grants the wearer +10 to Interrogation and Intimidation Tests, deals 1d5+5 R damage, and possesses the Tearing and Toxic Qualities." 
  }
];

export const PROTECTIVE_WARGEAR = [
  {
    name: "Combat Shield",
    summary: "Protection Rating 25. Overload 01-05. One arm must be free.",
    description: "A lighter version of the storm shield, the combat shield is attached to the arm, leaving the hand free to hold a weapon. It provides a Protection Rating of 25 and overloads on a roll of 01-05.",
    type: "Shield",
    weaponStats: {
      damage: "1d5+1 I",
      pen: 0,
      special: "Balanced, Protection Rating 25, Overload 01-05"
    }
  },
  {
    name: "Storm Shield",
    summary: "Protection Rating 55. Overload 01-10. Requires one hand. +4 AP to Arm/Body.",
    description: "A large, power-field generator built into a heavy shield. It provides a Protection Rating of 55 and overloads on a roll of 01-10. It requires one hand to use. Rules: A storm shield provides +4 Armour Points to the Arm wielding the shield and to the Body location. Storm Shields also have the Defensive Quality. It also reduces the time necessary for a Guarded Attack to a Half Action. Profile: 1d10 Impact pen special suffers a –20 penalty to the attack roll.",
    type: "Shield",
    weaponStats: {
      damage: "1d10 I",
      pen: 0,
      special: "Defensive, -20 to Hit, Protection Rating 55, Overload 01-10, +4 AP Arm and Body, Half Action Guarded Attack"
    }
  },
  {
    name: "Boarding Shield",
    summary: "Protection Rating 20. Overload 01-05. +8 AP to Arm. Lock basic weapon to shield.",
    description: "Boarding shields are heavy breaching bulwarks used by the adeptus astartes void assaults—turning corridors into killing zones as warriors advance through fire, unyielding and unstoppable. The warrior can with the shield lay down fire with their main armament as they advance. Rules: The astartes equipped with this shield have 8 extra AP on the arm that wields the shield. The astartes can lock a basic type weapon to the shield to fire while using the shield as a cover, he can then only be hit in the head while the shield is locked. he can then make a half move and fire single or semi-auto fire. He can also use the shield for a bash attack doing 1d10 impact damage. The shield has a force field with a protection rating of 20 and overload between 01-05.",
    type: "Shield",
    weaponStats: {
      damage: "1d10 I",
      pen: 0,
      special: "Defensive, Protection Rating 20, Overload 01-05, +8 AP Arm, Lock Basic Weapon to Shield"
    }
  },
  {
    name: "Iron Halo",
    summary: "Protection Rating 50. Overload 01.",
    description: "A prestigious honor granted to Space Marine commanders. It provides a Protection Rating of 50 and overloads on a roll of 01.",
    type: "Force Field"
  },
  {
    name: "Rosarius",
    summary: "Protection Rating 50. Overload 01-10. Chaplain only.",
    description: "A badge of office for Chaplains, containing a powerful conversion field. It provides a Protection Rating of 50 and overloads on a roll of 01-10.",
    type: "Force Field"
  }
];

export const SPECIALIZATIONS = [
  "Tactical Marine", "Assault Marine", "Devastator Marine", "Librarian", "Apothecary", "Techmarine"
];

export const LIBRARIAN_PSYCHIC_POWERS = [
  {
    name: "From the Depths",
    category: "Carcharodons powers",
    xpCost: 750,
    action: "Half Action",
    opposed: "Yes",
    range: "5m x Psy Rating Radius",
    sustained: "No",
    description: "Prerequisites: Concealment +10, Silent Move +10.\n\nThe Carcharodon Librarian clouds the minds of his adversaries with a choking mental darkness, amplifying their fear and surprise so that it paralyses them. Their minds writhe with images of watery depths of numbing cold and writhing pelagic shapes, leaving them vulnerable to assault. The Librarian makes a Focus Power Test, opposed by all Surprised enemies within range (enemies not suffering from Surprise are unaffected). If they fail, they are Surprised for one additional Round. Once an enemy has been affected by this power, he is immune to it for 24 hours."
  },
  {
    name: "Rending Maw",
    category: "Carcharodons powers",
    xpCost: 1000,
    action: "Full Action",
    opposed: "No",
    range: "10m x Psy Rating",
    sustained: "No",
    description: "Prerequisite: WP 50+.\n\nThe Librarian calls forth the avatar of a great oceanic predator whose maw erupts from the very ground beneath the enemy. The very stones and earth reform into the shape of jaws and teeth that snap shut, consuming all within in a shower of gore. The Librarian makes a Focus Power Test. If he is successful, he centres a blast with a radius equal to his Psy Rating anywhere within the power’s range. All within the area of effect must make a Challenging (+0) Agility Test to scramble clear. Anyone who does not clear the area of effect takes PRd10 Rending Damage with no Penetration. In the following Round, any survivors may make an Ordinary (+10) Agility Test on their turn to again scramble clear of the area of effect. If they fail, they take the same Damage result in Impact Damage as they are dragged below with the retreating maw (if they survive, they can spend a Full Action clawing their way back to the surface in subsequent turns)."
  },
  {
    name: "Librarian's Farsight",
    category: "Raptors powers",
    xpCost: 1000,
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian calls upon his psychic gifts to enhance his vision and grant himself a hunter’s gaze which can use to sweep across the battlefield to find targets. This keen sight not only allows the Librarian to pick out targets at extreme ranges but also thwart their attempts to hide, differentiating shapes from within shadow to see those that are trying to hide from him.\n\nWhile this power is active, the Librarian gains a bonus to all Perception Tests and Perception-based Skill Tests equal to three times his Psy Rating. He can also re-roll any failed attempts when making Opposed Tests against foes using Concealment to hide from him. In addition, his sight allows him to see things much closer than they would normally appear and reduces the range to a target when using a ranged weapon by 10m times his Psy Rating for determining any penalties or bonuses to hit. This ability can also be used to see fine detail from the same distance which normal sight might not be able to see. This power only works when the Librarian is using his own vision and does not function in conjunction with scopes or lenses which would enhance ranged vision."
  },
  {
    name: "Raptor's Wings",
    category: "Raptors powers",
    xpCost: 2000,
    action: "Full Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Prerequisite: WP 40+.\n\nRaptors have an affinity for striking from the sky, making extensive use of jump packs and land speeders to descend on their foes from unexpected angles. The Librarian can manifest great wings of psychic power with which to bear him aloft. The Librarian can use this power to grant himself the Flyer (X) trait where X represents twice his Psy Rating. He does not need to make a Skill or Characteristic Test to use the psychic wings and can use this flying movement just as if he would use his own movement.\n\nWhile active, the others will be able to see the Librarian’s wings as crackling green nimbuses of energy arch up over his shoulders and can make it very difficult for him to hide. Also, when he moves if the wings brush against any surface they will crackle and burn with contained Warp energy (though the surfaces or objects they touch suffer no harm). As a result of these factors, the Librarian suffers a –20 to both his Concealment and Silent Move Skill Tests while this power remains active."
  },
  {
    name: "Screaming Eagles",
    category: "Raptors powers",
    xpCost: 1500,
    action: "Half Action",
    opposed: "Yes",
    range: "1m x Psy Rating Radius",
    sustained: "No",
    description: "Prerequisite: WP 35+.\n\nThe Raptors Librarian can summon forth a swarm of shadowy birds of prey from the Warp which rise up from the ground screaming for the blood of his enemies. When the Librarian manifests this power, all enemies within its radius must make an Opposed Challenging (+0) Willpower Test against the Librarian. Those that pass will be partially deafened for their following Turn and suffer a penalty of any Perception or Fellowship tests equal to the Librarian’s Psy Rating. Those that fail will become Stunned for a number of Rounds equal to the Librarian’s Psy Rating, though may make a Challenging (+0) Willpower Test to recover at the start of each of their turns until they either pass the test or the effects wear off.\n\nThe effects of this power also have the effect of creating a brief cloud of darkness when the ethereal birds spring from the ground, and, though not complete darkness, this does foul vision and cast a shadow over the area of effect as thousands of black beating wings arch skyward. Anyone within the radius of the power when it is activated, including the Librarian and any of his allies, suffers a –10 penalty to vision and vision based Tests (including ranged attacks) unless they can see normally in the dark or have a light source. This effect lasts from the end of the Librarian’s turn until the start of his following turn when the birds are sufficiently dispersed."
  },
  {
    name: "Blood Oath",
    category: "Howling Griffons powers",
    xpCost: 500,
    action: "Full Action",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "Librarians of the Howling Griffons Chapter take their oaths as seriously as any of their brothers and can bind them psychically with blood to make them more potent and enduring. The Librarian calls upon his eldritch powers when taking an oath at the start of a mission, committing not just his word but his spirit to the binding and seeding it with a few drops of his own blood. This power can be used only at the start of a mission during the Mission Preparation phase. Any other members of the Kill-team may choose to participate in the Oath-taking with the Librarian. Blood Oath can only be used Fettered and thus has no chance of incurring Perils of the Warp. If the Librarian fails to activate it, then there are no further effects and he may not use the power again until the start of his next mission.\n\nIf the Librarian successfully uses this power, he and the other members of the Kill-team gain access to a pool of temporary Fate Points equal to the Librarian’s Psy Rating. This pool lasts until the end of the Mission. Spent temporary Fate Points in this pool do not replenish at the beginning of successive gaming sessions. These Fate Points may not be burnt but can otherwise be used as normal by any Battle-Brother who took part in the Oath-taking. This benefit comes with a risk, however. Should the Kill-team fail to accomplish over half—rounded up—of their Mission’s Primary Objectives, then the Battle-Brothers who took part in Oath-taking burns one Fate Point from their personal pool, permanently reducing his Fate Points by one."
  },
  {
    name: "Griffon's Howl",
    category: "Howling Griffons powers",
    xpCost: 1500,
    action: "Half Action",
    opposed: "No",
    range: "10m x Psy Rating Radius",
    sustained: "No",
    description: "The Librarian calls to the Warp and draws forth a mighty cry like a diving bird of prey to cow his foes with fear and shatter their resolve. This cry is also a potent weapon against Warp spawn and can shake the ties which bind them to the material plane sending them back from whence they came. When this power is manifested, a number of targets up to the Librarian’s Psy Rating within its range count the Librarian as having the Fear (2) Trait for this turn and must make a Fear Test if they can draw line of sight to him or hear his cry (unless they would otherwise be immune to the effects of Fear). In addition, any creatures with the Warp Instability Trait must make an Instability Test with a penalty to their Willpower equal to 2 x Psy Rating. If there is a choice of targets within range and some have the Daemonic Trait, the Librarian must choose these targets first before those without the trait."
  },
  {
    name: "Periclitor's Bane",
    category: "Howling Griffons powers",
    xpCost: 1500,
    action: "Half Action",
    opposed: "Yes",
    range: "20m x Psy Rating",
    sustained: "Yes",
    requirement: "WP 40+",
    description: "The Howling Griffon’s intense hatred of the Word Bearers and their lord Periclitor has been translated by the Chapter’s Librarian’s into a number of abilities targeted at the traitor legionnaires. When the Librarian summons up this power, he is creating an agonising resonation targeted at one of the traitor legions. The Librarian picks a single target within range and makes a Challenging (+0) Opposed Willpower Test with them. For every degree which they fail they suffer a –10 to all their Tests and can only take a Half Action on their following turn. If the Librarian beats them by more than four degrees of success, then they also take 2 x Psy Rating Impact Damage which is not reduced by armour."
  },
  {
    name: "Ancestral Strength",
    category: "Novamarines powers",
    xpCost: 1500,
    action: "Full Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    requirement: "WP 40+",
    description: "Drawing on his pure heritage of the Ultramarines, the Novamarines Librarian boosts his abilities for a time, making him more formidable in battle. Such a boost is not without its dangers, and even increasing the raw potential of the Librarian for a short time can have negative effects, draining what was strengthened after the power wears off. When this power is manifested, the Librarian gains a pool of points equal to four times his Psy Rating. He can then use these points to increase any of his Characteristics (with the exception of Weapon Skill and Ballistic Skill) on a one for one basis (i.e. if four times his Psy Rating was 24 points, he could distribute up to 24 points among his Characteristics). While this power is being sustained, the Librarian counts as having the increased Characteristic for all intents and purposes, including increasing his Characteristic Bonuses if applicable.\n\nWhen the power ends, there is a draining effect on the Librarian and any Characteristic which was increased suffers a penalty equal to the amount it was increased by for one hour (i.e. if the Librarian increased his Strength by 10 his Strength is reduced by 10 for an hour after the power ends). During this time, the Librarian may not use this power."
  },
  {
    name: "Sky-Sight",
    category: "Novamarines powers",
    xpCost: 1000,
    action: "Half Action",
    opposed: "No",
    range: "200m x Psy Rating Radius",
    sustained: "Yes",
    description: "The Novamarine Librarian lifts in consciousness and gazes down upon a battlefield from on high picking out details on the ground that even the most sophisticated of sensors might miss. However, while he is gazing at the battlefield, his mind is elsewhere and he is vulnerable to attack and unable to adequately defend himself. While this power is active, the Librarian may use a Full Action to shift his perspective to a vantage point up to 100m times his Psy Rating above or below his current position anywhere within range. For the purpose of all his senses (sight, sounds, smell, etc.) he is considered to be standing in the new location though his body does not move. His senses are also enhanced by this power and while using Sky-Sight to transfer his consciousness to a new location hegains a +30 on all Perception and Perception based Skill Tests.\n\nWhile using Sky-Sight, the Librarian enters a trance-like state he is unaware of what is transpiring around his body and cannot defend himself or react to danger until the start of his next turn. At the start of each of his turns while the power is active, the Librarian can choose to use Sky-Sight or not, or change the location of his senses from one place within range to another."
  },
  {
    name: "Vulnerability",
    category: "Novamarines powers",
    xpCost: 1500,
    action: "Half Action",
    opposed: "Yes",
    range: "10m x Psy Rating",
    sustained: "Yes",
    requirement: "WP 40+",
    description: "The Novamarines Librarian can exploit a vulnerability in his foe, making it more susceptible to a certain attack or form of Damage. This can be especially useful against powerful foes which would normally be very resistant to injury giving the Librarian’s squad a chance to deal Damage and defeat it. When the Librarian activates this power, he picks a target within range and makes an Challenging (+0) Opposed Willpower Test with it. If he is successful, then the target becomes subject to vulnerability. The Librarian chooses one type of Damage for the foe to become vulnerable to: either Impact, Energy, Rending, or Explosive. While the power is sustained, any Damage of this type gains a bonus against the creature equal to the Librarian’s Psy Rating (i.e. if a Librarian with a Psy Rating of 6 makes a foe vulnerable to Explosive Damage, and it is struck by a boltgun which inflicts 2d10+5 Damage, it would now suffer 2d10+11 Damage)."
  },
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
  },
  {
    name: "Darkness Gate",
    category: "Marines Errant powers",
    xpCost: 1500,
    action: "3 Full Actions",
    opposed: "No",
    range: "Psy Rating x 500km",
    sustained: "No",
    description: "Summoning up the potent energies of the Warp, the Librarian folds space between points within the void and brings them closer together for an instant allowing Space Marines to pass between them. Darkness Gate has effects similar to a teleportarium, allowing objects from one point to be transferred to another in a rapid instance via the conduit of the Warp. It only works for a small group of individuals and only across an airless space like the void, but it can be effective for staging hit and run attacks. The Librarian and a number of individuals equal to his Psy Rating can be affected by this power. The Librarian picks a point in space which he can observe, such as a distant ship. Provided there are no obstacles or atmosphere between the point he can see and the point he is standing, a momentary gate will open allowing him and his companions to step through. The range between the points can be up to Psy Rating x 500km.\nPerils of the Warp can be particularly dangerous when using this power. If the Librarian triggers Perils of the Warp, roll 1d10 x 500km to determine distance rather than using his Psy Rating. If he was Pushing then distance is 3d10 x 500km.",
    requirements: "Per 40+"
  },
  {
    name: "Shadows in the Stars",
    category: "Marines Errant powers",
    xpCost: 1000,
    action: "Half Action",
    opposed: "No",
    range: "1000kms x Psy Rating",
    sustained: "Yes",
    description: "The Librarian can look out into the inky black of the void and see things mere sensors cannot, reading the ebb and flow of the darkness and the Warp which lies beneath it. The Librarian can make a Challenging (+0) Awareness Test to perceive any objects in space within range of this power, including celestial phenomena and vessels or ordnance. Depending on the size and density of such objects, the GM may give the Librarian a +10 to +30 bonus on this Test. Even if the Test fails, the GM should give the Librarian a general idea of hazards though not their exact location. If this power is used in conjunction with a vessel’s bridge crew it will grant them a +30 bonus to all Tests involving their ships sensors and Pilot Tests to avoid hazards and ordinance."
  },
  {
    name: "Void Hammer",
    category: "Marines Errant powers",
    xpCost: 2000,
    action: "Half Action",
    opposed: "No",
    range: "10m x Psy Rating",
    sustained: "No",
    description: "Summoning up a brutal burst of energy, the Librarian smashes objects and batters structures with raw psychic power. Against individuals, this power can knock them down and break their bones, but against inanimate objects it can rend apart walls and buckle bulkheads. The Librarian picks a point within range and line of sight as the impact point of the Void Hammer. Any individuals within 3m of this point will be hit by the concussive blast unless they can successfully make a Dodge Test to leap out of the way. Those hit suffer Impact Damage equal to the Librarian’s Psy Rating x 3 and must pass a Challenging (+0) Agility Test or be knocked prone. Objects such as walls, supports, and doors are far more badly affected suffering Impact Damage equal to 1d10 x Psy Rating ignoring Armour Points. This can be used to punch holes in objects (such as bulkheads) if it does enough Damage to destroy them (creating a breech 3m in diameter), or bring down buildings by destroying supports. This ability can also be used effectively against vehicles, damaging them just as it would a bulkhead or blast door.",
    requirements: "WP 40+"
  },
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
  },
  {
    name: "Battle Sight",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "10m x Psy Rating Radius",
    sustained: "No",
    description: "Blood Ravens Librarians can pierce the fog of war with a thought, casting their mind far and wide across practically any distance. A Librarian may use this psychic power in two different ways. The first use reveals the position of all enemies within range that have hostile intentions toward the Librarian (i.e. intend to do the Librarian harm), and allows the Librarian to ignore penalties for Concealment when making attacks against enemies revealed by Battle Sight until the start of his next Turn.\n\nThe second use is to gain a broad strategic overview. As part of preparation for a mission a Librarian who is acting as Squad Leader can choose to use Battle Sight rather than selecting an Oath. The Librarian can then choose one of the Mission Objectives and add 1d5 Kill Markers x Psy Rating toward its completion. Used in this way, Battle Sight does not require a Focus Power test and cannot incur Perils of the Warp.",
    xpCost: 1500,
    prerequisite: "Int 40+"
  },
  {
    name: "Truth Seeker",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Blood Ravens Librarians spend much of their lives seeking knowledge and looking into the origins of their Chapter. Truth Seeker allows a Librarian to find details and clues that he might have otherwise missed. While this power is active, the Librarian is more aware of minor details, and gains a +15 to all Intelligence Tests and Skill Tests based on Intelligence, as well as Scrutiny Tests. In addition, if he is unsure of which direction to proceed in an investigation he can make an unmodified Intelligence to gain a clue from the GM. The nature of the clue and its exact worth are up to the GM (usually once per game session).",
    xpCost: 1000
  },
  {
    name: "Warp Whispers",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "The Librarian can listen to the babblings of the Warp and perceive the secrets of its denizens. When the Librarian activates this power, he learns a number of “secrets” equal to his Psy Rating. He can then use these “secrets” to gain insight into his immediate future and may spend up to one ‘secret’ on each of his Turns. For every “secret” used, he gains either a +10 bonus to a single Test, ignores a single point of Damage, or increases the Damage he inflicts by 2. “Secrets” not used by the end of the game session are lost.\n\nWarp Whispers is not without its dangers. If the power is used Fettered, any roll of doubles on the Focus Power Test forces an automatic roll on Perils of the Warp. If used Unfettered, the Librarian automatically suffers a Perils of the Warp. If the power is used at the Push level, the Librarian must automatically roll on Perils of the Warp, with a +20 modifier.",
    xpCost: 1000,
    prerequisite: "WP 40+"
  },
  {
    name: "Depths of Rage",
    category: "Flesh Tearers powers",
    action: "Half Action",
    opposed: "No",
    range: "5m x Psy Rating Radius",
    sustained: "Yes",
    description: "Librarians of the Flesh Tearers Chapter are well versed in the use of psychic powers while struggling with the Black Rage and Red Thirst. Many have even developed powers which tap into the rage deep within them and use it to fuel their powers or enhance their abilities. The Librarian can use this power to grant the Frenzy Talent to himself and a number of allies equal to his Psy Rating. While under the effects of Depths of Rage, the Flesh Tearer Librarian counts as possessing the Mental Rage Talent. In addition, while using the Depths of Rage, the Librarian adds 1 to his Psy Rating and can choose make an attack using a psychic power rather than make melee attacks as required by the Frenzy Talent.",
    xpCost: 500
  },
  {
    name: "Flensing",
    category: "Flesh Tearers powers",
    action: "Half Action",
    opposed: "Yes",
    range: "10m x Psy Rating",
    sustained: "No",
    description: "Flesh Tearers often live up to their name when engaged in combat, skinning their foes with well-practised blows from their blades and chain weapons. Librarians of the Chapter are no exception and the Flensing power has been developed with such hideous injuries in mind. When the Librarian uses this power, he chooses a number of targets up to half his Psy Rating—rounded up—within range. He then makes a single Challenging (+0) Opposed Willpower Test versus the Toughness of each of the targets. Those that fail suffer 1d10+Psy Rating rending Damage with no reduction for Toughness Bonus (though reduced by armour points as normal) as their skin and muscle are stripped away. Such is the agony this power inflicts that the target, should they survive, suffers a –10 on all Tests in their next turn. Targets slain by Flensing are reduced to a collection of bloody bones and meat and are completely unrecognisable, though their armour and equipment remains intact (if soaked in blood).",
    xpCost: 1000
  },
  {
    name: "Razor Blades",
    category: "Flesh Tearers powers",
    action: "Half Action",
    opposed: "No",
    range: "20m x Psy Rating Radius",
    sustained: "Yes",
    description: "A Flesh Tearers Librarian, like other Battle-Brothers of his Chapter, understands and appreciates the virtues of a good sharp blade. By focusing his psychic powers the Librarian can make edges keener and steel sharper so that it might more easily bite into flesh and bone. The Librarian and a number of allies up to his Psy Rating will have their bladed melee weapons affected by this power while they hold them in their hand. Melee weapons used by the Librarian and those affected increase their Penetration by his Psy Rating. If the melee weapon has a Penetration of 0 then it gains a Penetration value equal to the Librarian’s Psy Rating. This power only affects melee weapons which inflict Rending Damage.",
    xpCost: 500,
    prerequisite: "wp 35"
  },
  {
    name: "Augury",
    category: "Divination powers",
    action: "Extended (10)",
    opposed: "No",
    range: "Special",
    sustained: "No",
    description: "By reading the Emperor’s Tarot for a specific individual, the psyker can grant insight into what troubles lay ahead. During the reading both the psyker and the subject must remain in contact and no other actions may be taken by either of them. The psyker must then ask a specific question. It can be as detailed as “What must my Battle-Brothers overcome if they are to enter the Patriarch’s lair?” or as broad as “What dangers face the Chapter?” After that, the psyker reads the Emperor’s Tarot for the subject as they both concentrate on the question asked. At the end of this time the psyker interprets the Tarot and garners the results depending on his PR as detailed on Augury table. As with all forms of divination, the GM may decide how much or how little information the psyker can garner. The Warp is a capricious thing and seldom gives straight answers, often wrapping truths in riddles and lies.\n\n1–3: The psyker determines the most dangerous opposition that the subject will face.\n4–6: As above, plus the psyker also determines other negative forces that may be present. The psyker can determine as many forces as his PR.\n7–8: As all the above, plus the psyker determines the best advantage or tool that the subject can use for the situation.\n9+: As all the above, plus the psyker may offer a single sentence of advice to the subject concerning the clearest path to their answer."
  },
  {
    name: "Divination",
    category: "Divination powers",
    action: "Extended (3)",
    opposed: "No",
    range: "Special",
    sustained: "No",
    description: "The psyker can use this power to locate and track down a single object or person in his immediate vicinity. The psyker can find anything, but there must be some degree of familiarity. Touching a lock and trying to find the key to that lock is fine, but just thinking “I want a key” without a corresponding lock won’t work. In the same vein, the psyker must have seen the person he wants to find, or the subject’s true name. The psyker’s Focus Power Test is modified as follows:\n• The psyker is intimately familiar with target (e.g., he knows the subject well, or has an item that has been with the subject for a long time): +10\n• The psyker possesses a portion of the subject (e.g., a fragment from the item, a lock of hair from a person, etc.): +5\n• The subject is surrounded by others of its kind (e.g., a coin in a purse of coins, a person in a crowd, etc.): –10\n• The subject is within 50 metres x PR of the psyker: +5\n• The subject is over 2 km away from the psyker: –10\n\nIf the psyker successfully manifests the power, and the subject is within a number of kilometres equal or less than the psyker’s PR rating, he will get a rough idea of where the subject is located, based on his PR as detailed on Divination table.\n\n1–3: The psyker knows the rough direction of the subject.\n4–6: The psyker knows the specific direction of the subject, and roughly how far away it is.\n7+: The psyker knows the specific direction of the subject, and exactly how far away it is."
  },
  {
    name: "Lifting the Veil",
    category: "Divination powers",
    action: "Extended (5)",
    opposed: "No",
    range: "10 metres radius x PR",
    sustained: "No",
    description: "Lifting the Veil is an extension of the art of Psychometry and allows the psyker to look beyond individual psychic traces and relive the past of a place or item. As with Psychometry, the psyker can gain rough impressions from an object or a general area as long as it falls within the power’s radius. The level of information gained is dependent on the level of power used, as detailed on Table Lifting the Veil:\n\n1–3: The psyker detects the strongest emotion associated with the area or object.\n4–5: As above, plus the psyker sees the general features of the people who experienced the emotion, and a rough impression of the events that transpired.\n6–7: As all of the above, plus the psyker gets a clear image of the events from the area that left the strongest psychic impressions.\n8–9: As all of the above, plus the psyker can identify all participants from that strongest event, including their careers, ranks, and names.\n10+: As all of the above, plus the psyker determines other events that may have occurred in the area, in order of the relative strength of their psychic impressions, and gets a clear image of each event."
  },
  {
    name: "Possibility Shield",
    category: "Divination powers",
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "Using his understanding of future events and his perception of the flow of time, the psyker surrounds himself and nearby allies in a possibility shield. While this power is active, the psyker and a number of allies equal to his PR within range of the psyker gain a +10 bonus to one roll each Round. In addition, due to his ability to see attacks before they are coming the psyker himself adds +5 x PR to all Dodge and Parry Tests."
  },
  {
    name: "Psychometry",
    category: "Divination powers",
    action: "Extended (10)",
    opposed: "No",
    range: "Touch",
    sustained: "No",
    description: "Learning to read the Emperor’s Tarot is in part the act of learning to divine the Emperor’s word from psychic impressions. Refining this skill allows the psyker to learn more about others from the crude psychic traces they leave behind on objects in the world around them. In this form, the psyker can gain rough impressions from a personal object such as an article of clothing or weapon. The level of information he gains depends on his PR as detailed on Table Psychometry.\n\n1–3: The psyker detects the strongest emotion associated with the area or object.\n4–5: As above, plus the psyker can discern the general features of the person who experienced the emotion.\n6–7: As all of the above, plus the psyker gets a clear image of the person who experienced the emotion.\n8–9: As all of the above, plus the psyker can identify the person’s occupation (e.g. Career and Rank).\n10+: As all of the above, plus the psyker can determine the person’s name."
  },
  {
    name: "Reading",
    category: "Divination powers",
    action: "Full",
    opposed: "No",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "Diviners can read a person’s aura, the unconscious projection of his being in to the Warp. This is a very pale shadow, unnoticed by most beings, but a diviner can study this aura to learn about the person. When the psyker activates divination, he can attempt to read the aura of any person he can see. The level of information he gains depends on the PR at which he manifests the power as detailed on Table Reading.\n\nA psyker can only maintain this power on one target. If he wishes to divine the well-being of a different person, he must activate the power again.\n\n1–3: The psyker gains superficial impressions about the target person. This includes the three strongest emotions that the subject is currently experiencing, his race, whether or not he has any psychic powers, and a rough idea of his state of mental and physical wellbeing. Lastly, the psyker determines whether the target is an Untouchable.\n4–5: As above, plus the psyker gets a deeper insight into all of the target’s feelings, and gains +10 to all Fellowship Tests he makes against the target while Reading is active. The psyker also gets a better idea about the target’s physical state, including his current Wounds and Fatigue levels. Finally, if the target has psychic abilities, the psyker can sense his power and find out his Psy Rating.\n6–7: As all of the above, plus the psyker determines how many Insanity points the target has, as well as which addictions or madness he might be suffering from. If the target has psychic abilities, the psyker determines which discipline(s) he possesses.\n8+: As all of the above, plus the psyker determines how many Corruption points the target has. Also, the psyker can determine if the aura is genuine, or has been produced by some other means."
  },
  {
    name: "Avenger",
    category: "Codex powers",
    action: "Full",
    opposed: "No",
    range: "30m",
    sustained: "No",
    description: "The Librarian summons up the ancestors of his Chapter and shapes them into a flaming vengeful avatar of death. The construct then billows forward to incinerate those in its path. The Avenger power works exactly like a shot from an Adeptus Astartes heavy flamer (see page 145), with all the usual chance to hit and set targets on fire. However, due to the horrific nature of the psychic flames, the Penetration of the attack is equal to 2 x PR."
  },
  {
    name: "Force Dome",
    category: "Codex powers",
    action: "Full",
    opposed: "No",
    range: "5m x PR radius",
    sustained: "Yes",
    description: "Summoning up a shimmering field of force, the Librarian fashions a shell around himself and nearby allies. The shell is a sphere extending up to the radius around, above, and below the Librarian and protecting him and any within it. The shell provides 2 AP x PR against all kinds of ranged attacks or hazardous environmental effects (this additional protection stacks with any worn Armour), even trapping air and water within it. However, it does not stop melee attacks or creatures (friend or foe) that may pass through it without restriction."
  },
  {
    name: "The Gate of Infinity",
    category: "Codex powers",
    action: "Extended (3)",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "Rending the veil between worlds, the Librarian creates a rift through which he and his allies might pass. The Librarian chooses an exit point for the rift at any point within 10 kilometres x PR. The size of the rift depends on the power used to create it, and it will have a width and height of 2 metres x PR. The rift will remain open for 1 Round x PR or until the Librarian himself passes through it, at which time it will instantly close. While it remains open, creatures may pass through the gate freely provided they can fit.\nThis power is incredibly taxing and requires at least 12 hours recovery before it may be used again."
  },
  {
    name: "Iron Arm",
    category: "Codex powers",
    action: "Half or Reaction",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian sheathes his arm in an impenetrable field of energy with the power to ward off powerful melee attacks. While this power is in effect, the Librarian gains one additional Reaction each round that may only be used to parry, with a bonus on the Weapon Skill Test to parry equal to 3 x PR. Note that this power prevents the Librarian from using his arm for any other purpose, such as wielding a weapon, climbing, and so on."
  },
  {
    name: "Machine Curse",
    category: "Codex powers",
    action: "Full",
    opposed: "No",
    range: "20m x PR",
    sustained: "No",
    description: "The Librarian calls down a terrible curse on nearby machines and vehicles. The Librarian can either target a single vehicle (such as a battle tank or landspeeder) or a number of mechanical devices (such as guns or servitors) equal to his PR. If a single vehicle is targeted then it may not move or fire any of its weapons for a number of Rounds equal to the Librarian’s PR as it shorts and sparks alarmingly. If a number of mechanical devices are chosen then they will be rendered useless for the following Round. Guns will jam (see page 249) and must be unjammed before they can be used. Warded vehicles and devices may be resistant or even immune to this power at the GM’s discretion."
  },
  {
    name: "Might of the Ancients",
    category: "Codex powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Tapping into the deadly powers of the Immaterium, the Librarian infuses himself with psychic energy increasing his psychical prowess and strength of arms to exceptional levels. While this power is in effect, the Librarian’s melee attacks all have their Damage and Penetration increased by a number equal to his PR."
  },
  {
    name: "Smite",
    category: "Codex powers",
    action: "Half",
    opposed: "No",
    range: "10m x PR",
    sustained: "No",
    description: "The Librarian conjurers up lethal bolts of lightning that leap from his hands to burn and blast his enemies into ash. Smite must be targeted at a single creature. However, it may effect others nearby depending on its power. The Librarian does not need to make a BS test to hit the target. However, his Focus Power Test is modified as if he was making a ranged attack (using bonuses and penalties for range, lighting, enemy talents, etc.). Smite deals 1d10 Energy Damage x PR with a Penetration equal to his PR. Any creatures within 1 metre x PR of the target will also be affected by Smite."
  },
  {
    name: "Veil of Time",
    category: "Codex powers",
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Librarian attempts to predict the near future, seeing the flow of events and the actions of others. While this power is in effect, the Librarian benefits from this foreknowledge. Each Round, the Librarian has a pool of re-rolls, equal 1/2 to the PR used for this power (rounding up), which he may only use for himself. Any re-rolls not used by the beginning of the Librarian’s next turn are lost. Remember that a re-roll may never itself be re-rolled."
  },
  {
    name: "Vortex of Doom",
    category: "Codex powers",
    action: "Full",
    opposed: "No",
    range: "10m x PR",
    sustained: "No",
    description: "With an utter disregard for reality, the Librarian opens up a flickering vortex in the fabric of space and time. The vortex is 2 metres in diameter and may be placed anywhere within range of the psyker. Once created, however, the Librarian has no more control over it. Each Round after its creation the GM should roll a dice for the vortex. On a 1–4 its diameter shrinks by 1 metre, on a 5–8 its diameter grows by 1 metre, and on a 9-0 its diameter grows by 2 metres. If the vortex is ever reduced to 0 diameter then it vanishes. The GM then rolls a random direction for the vortex to travel 2d10 metres (use the Scatter diagram from page 248). Anything that touches the vortex, either when created or as it moves, must make a Challenging (+0) Agility Test or suffer 1d10 Energy damage x PR. Those killed by the vortex are sucked away into the Warp and lost forever.\nHaving an open rift to Warp is dangerous to the souls of anyone present. The first time any creature (including the Librarian) comes within 10 metres of the vortex, it must make a Hard (–20) Willpower Test or gain 1d5 Corruption Points."
  },
  {
    name: "Fury of the Ancients",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "No",
    range: "10 metres x PR",
    sustained: "No",
    description: "Calling upon the legends of his Chapter, the Librarian summons forth a ravening beast of ghostly flame and psychic energy. The flaming apparition then charges forward from the Librarian in a straight line, moving up to the extent of the power’s range before vanishing in a burst of energy. Those touched by the beast will suffer 1d5 x PR points of Energy damage and must make a Pinning Test with a penalty of –5 x PR."
  },
  {
    name: "Glory of the Emperor",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "No",
    description: "For the briefest of instants the Librarian channels the light of the Emperor, bathing all those nearby in His glory. The Librarian may affect a number of allies equal to his PR within line of sight and range of this power. Those affected are healed by the divine light and will recover Wounds equal to the Librarian’s PR. This healing cannot restore Critical Damage, nor will it take a creature above its starting Wound total.\nChannelling this power is difficult and draining, and a Librarian may only use it a number of times each day (within a 24 hour period) equal to his Willpower Bonus."
  },
  {
    name: "Inspiring Word",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "Yes",
    description: "The Librarian calms the minds of nearby allies and completely dispels their fear and doubt. While this power is active, a number of allies equal to PR, and within range, are immune to the effects of Fear."
  },
  {
    name: "Paragon",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Librarian lets his authority shine forth in a blaze of psychic energy, filling nearby allies with strength and resolve to emulate his glory. While this power is in effect, the Librarian can allow a number of allies equal to his PR within range of the power to use one of his characteristics. In effect, those benefiting from this power count as having a characteristic score equal to that of the Librarian, though if their own characteristic is higher they may choose to use that instead."
  },
  {
    name: "War Cry",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "No",
    description: "With a terrifying cry, the Librarian demoralises and stuns nearby foes, forcing them to cower before his might. This power can affect a number of foes equal to the Librarian’s PR. Those affected cannot use Reactions from the end of the Librarian’s turn to the start of his next turn."
  },
  {
    name: "Word of the Emperor",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian recites a sanctified prayer to the Emperor, speaking holy words that burn the minds of the unfaithful and cast out the spirits of the Warp. This power can affect a number of targets equal to the Librarian’s PR. Those affected will become Stunned for one Round. Targets with the Daemonic Trait are affected much more seriously by this power and will suffer 1d10 Explosive damage x PR and must make a Warp Instability Test. Finally, creatures targeted by this power suffering from Possession may immediately make a Challenging (+0) Willpower Test to break free."
  },
  {
    name: "Deus Ex Ferrum",
    category: "Iron Hands powers",
    action: "Full",
    opposed: "No",
    range: "1 metre radius x PR",
    sustained: "Yes",
    description: "The Iron Hands Librarian focuses his mind and links his iron will to the strength of his augmetics, bolstering himself and his allies. The Librarian and a number of Battle-Brothers equal to his Psy Rating within a number of metres of the Librarian equal to his Psy Rating gain a +10 bonus to both Strength and Toughness. This bonus is increased by +5 for every cybernetic possessed by the affected Space Marine (The Flesh Is Weak Talent counts its level towards these requirements). If used at the Unfettered Level, this Power is a Half Action. If used at the Push Level, this Power is a Free Action."
  },
  {
    name: "Betrayal of Flesh",
    category: "Iron Hands powers",
    action: "Half",
    opposed: "No",
    range: "10 metres x PR",
    sustained: "No",
    description: "Harnessing his hatred for weakness, the Iron Hands Librarian sunders the flesh of his enemies with a blast of psychic power, reducing his enemies to dust. This power must be targeted at a single creature. However, it may affect others nearby, depending on its strength. The Librarian does not need to make a BS Test to hit the target. However, his Focus Power Test is modified as if he was making a ranged attack (using bonuses and penalties for range, lighting, and so forth). This power deals 1d10 Energy Damage x PR with a Penetration equal to PR and the Felling (1) Quality to the targeted creature, as well as any creatures within 1 metre x PR. If used against a Horde at the Push Level, this power inflicts a number of hits equal to the Librarian’s Psy Rating +1d10 instead of its normal effects. This power has no effect against a target with the Daemonic or Machine Traits."
  },
  {
    name: "Punish the Weak",
    category: "Iron Hands powers",
    action: "Full",
    opposed: "No",
    range: "1 metre radius x PR",
    sustained: "Yes",
    description: "After fighting alongside his Iron Hands Battle-Brothers for countless battles, the Librarian has learned how to spare their mechanical bodies while assailing his enemies. He summons forth a roiling tornado of force around himself, harshly tearing at the flesh of anyone not strong enough to stand against its assault. This power affects all creatures within 1 metre x PR of the Librarian, tearing at their weak flesh. The effected area blocks normal vision (Traits such as Dark Sight, Sonar Sense, or Unnatural Senses are needed to see clearly). Creatures within the area must succeed at a Hard (–20) Toughness Test or suffer 1d5 x PR Energy Damage, ignoring Armour and Toughness Bonus."
  },
  {
    name: "Corax's Ingenuity",
    category: "Raven Guard powers",
    action: "Full",
    opposed: "No",
    range: "5 metres radius x PR",
    sustained: "No",
    description: "The Librarian plunges his mind into the Warp, harnessing its power. He is infused with power, embodying the pure ideals of Corax, and emanating his power to those around him. All Battle-Brothers in range may take an immediate half-action for which all enemies count as surprised. The Librarian may only use this power once per combat at the fettered level, to use this power again he must cast it at the push level."
  },
  {
    name: "Curse of the Raven",
    category: "Raven Guard powers",
    action: "Half",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "The Librarian curses an opponent, condemning him to death at the hands of the Emperor’s champions. Warp energies eat at the target’s mind, and reveal weaknesses in his defences that the Battle-Brothers can exploit. This power only works on a single target. While the power is sustained, all attacks against the cursed target gain additional Penetration equal to the Librarian’s PR."
  },
  {
    name: "The Unkindness of Deliverance",
    category: "Raven Guard powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian manifests his psychic power as an unkindness of ravens. Black as night, these ferocious birds swarm over his opponents. The Librarian can either have the ravens target one individual, dealing 1d10 x PR Rending Damage, or swarm a number of opponents equal to the Librarian’s PR, blinding them until the end of the Librarian’s next turn."
  },
  {
    name: "Fury of the Salamander",
    category: "Salamanders powers",
    action: "Half",
    opposed: "No",
    range: "2d10 metres x PR",
    sustained: "No",
    description: "The Librarian conjures the flame and fury of his home world and the terrible lizards that dwell upon it, and drives it towards his enemies. The roiling flames twist and writhe into the form of an ancient and powerful drake, its malevolent visage inspiring dread. This power conjures a 1 metre wide line out to its maximum range which strikes everything along its path. Any creature, friend or foe, or object struck by this power takes 3d10+5 Energy Damage with a Pen equal to the Librarian’s Psy Rating, unless they spend their reaction and pass a Challenging (+0) Dodge Test. In addition, any creature or horde damaged but not killed/destroyed by this power must take a Fear Test as if exposed to a Fear (1) Creature."
  },
  {
    name: "Heat of the Furnace",
    category: "Salamanders powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The searing heat of the forge runs through the veins of the Salamanders, and the Librarian can turn that heat outwards, wreathing himself in flame that enemies cannot bear to be near, and which causes flesh to burn and blister at his touch. Any creature, friend or foe, within 1 x PR metres of the Librarian, must pass a Challenging (+0) Toughness Test or gain a level of Fatigue. In addition, the Librarian’s melee attacks deal additional damage equal to his Psy Rating, and any struck by those melee attacks must pass an Agility Test or catch on fire."
  },
  {
    name: "Nocturne’s Fire",
    category: "Salamanders powers",
    action: "Full",
    opposed: "No",
    range: "5 metres x PR",
    sustained: "Yes (but see text)",
    description: "The volcanic fury of Nocturne is a deep and powerful force, and terrifying when fully unleashed. Salamanders are reluctant to use this power unless absolutely necessary, for it can be difficult to control once unleashed. The area around the Librarian is suddenly engulfed in a raging inferno which few things can withstand. All creatures, friend or foe, within the area suffer 1d10 x PR Energy Damage with a Pen of 4, and must pass a Difficult (–10) Agility Test or catch light.\nThe Librarian remains unharmed, but cannot move while this power is being sustained. Every turn this power is sustained, increase the effective Psy Rating by +1 (increasing the damage and range), and then compare the total damage rolled to the Librarian’s Willpower score—if the damage roll is higher, then the power must be sustained next turn, as its energies rage on uncontrolled."
  },
  {
    name: "Vulkan’s Anvil",
    category: "Salamanders powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian draws upon the unyielding endurance that the Salamanders are legendary for, becoming an anvil against the attacks of his enemies. There is little that can strike a Librarian down when he manifests this power. The Librarian gains a Force Field with a protection rating equal to 5 x Psy Rating. This force field cannot overload."
  },
  {
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
  },
  {
    name: "Blood Boil",
    category: "Blood Angels powers",
    action: "Half",
    opposed: "Yes",
    range: "10 metre x PR",
    sustained: "No",
    description: "With a blast of psychic power, the Librarian superheats the target’s blood, flash-boiling it and causing it to burst from their eyes, mouth, and ears. This power can only be used against a single target. The target of a Blood Boil will suffer 1d10 Energy damage plus 2 extra points of damage x PR (to a maximum of 1d10+20) which is not reduced by armour or Toughness. If the target is killed by this attack then he explodes in a crimson shower, spattering those nearby with scalding blood. All creatures within 5 metres of an exploding target take 2d10 Energy damage to their least armoured location.\nManifesting Blood Boil is taxing for a Librarian, and inflicts 1 level of fatigue upon him, whether or not the target resists."
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
  },
  {
    name: "Force Barrier",
    category: "Dark Angels powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Wrapping himself in a blanket of power, the Librarian creates a potent but static psychic shell over himself. While this power is in effect, and as long as the Librarian does not move, he gains 3 AP x PR to all locations. In addition, if this power is manifested with a PR of 5 or more, all ranged attacks count as having a Penetration of 0."
  },
  {
    name: "Hellfire",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "No",
    range: "50 metres x PR",
    sustained: "No",
    description: "The Librarian summons a torrent of psychic fire to burn and char his foes. He may pick a point within range and engulf it in a cloud of flame with a radius of 2 metres x PR. All those within the area will suffer 1d10 Energy damage x PR. In addition, all those within the area of effect must make Challenging (+0) Agility Tests or be set on fire."
  },
  {
    name: "Mask of Shadows",
    category: "Dark Angels powers",
    action: "Half or Reaction",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Covering his thoughts in darkness, the Librarian hides his mind from sight, confounding the efforts of enemy psykers or fearsome foes to psychically engage him. While this power is in effect, the Librarian is immune to the effects of all Telepathy powers unless created by a psyker with a Willpower greater than his own. In addition, the psyker suffers no ill effects to Cohesion or Willpower as a result of Fear."
  },
  {
    name: "Mind Worm",
    category: "Dark Angels powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "Driving deep into the target’s mind, the Librarian implants the seed of doubt and remorse, crippling the creature with indecision and guilt. This powers works against a single target. Those affected by the power suffer a –5 x PR to WS, BS, S, Ag, Int, and Fel (all to a minimum of 05). If this power is sustained then the target may make a new Opposed Willpower Test at the start of each of its turns to end the effects.\nThis power also confers a +30 bonus to the psyker’s Interrogation skill."
  },
  {
    name: "True Strike",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "Deadly against those with the psychic gift, the effects of a True Strike can smash an enemy psyker’s mind to pieces. If the Librarian performs a melee attack against a psyker (an individual Psy Rating of at least 1) within 1 Round x PR of activating the power, a successful attack will inflict an additional 2 points of damage x PR which cannot be reduced by armour or Toughness. In addition, an individual suffering damage from this power must make a Hard (–20) Willpower Test or lose access to his Psychic Powers for 1 Round.\nThis power has no additional effects on individuals without a Psy Rating of at least 1."
  },
  {
    name: "Weaken Resolve",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Dark Angels Librarian forces his way into the minds of his foes, robbing them of their will to fight and eroding whatever resistance they possess. This power can affect a number of foes equal to the Librarian’s PR. Those affected have their Willpower characteristic temporarily reduced by –5 x PR (to a minimum of 1). This has corresponding effects on their Willpower Bonus. If this power is sustained, targets are allowed a new Opposed Willpower Test (using their reduced Willpower) to end its effects on them at the start of each of their turns."
  },
  {
    name: "Fury of the Wolf Spirits",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest summons up the spirits of the Thunderwolves, Freki the Fierce and Geri the Cunning, unleashing them upon his foes. As long as this power is sustained, the Rune Priest is flanked by two spectral wolves that he may direct against his foes with a verbal command. The wolves cannot be damaged by attacks nor can they be grappled (though effects that end or disrupt the power will affect them as normal). They also cannot stray outside the range of the power. Each Round on the Librarian’s Initiative, each wolf may make a single melee attack against any target within range (they move automatically into contact with their foe and are not impeded by any kind of terrain). Each attack will automatically hit unless Dodged or Parried. Freki’s bite inflicts 1d10 x PR Rending damage, while Geri’s Bite inflicts 1d5 x PR Rending damage with a Penetration of 3 x PR. Any target that takes damage from either Freki or Geri must make a roll on the Shock Table (unless the target is immune to Fear) adding the damage taken to the result."
  },
  {
    name: "Living Lightning",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "30 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest cries out to the sky and calls forth a dancing bolt of sentient electricity arcing down from the heavens. While this power is in effect, the Rune Priest can direct the bolt of lightning against any target within range, changing targets between turns regardless of how far apart they are. Those struck by the lightning will suffer 1d10 x PR Energy damage with the Shocking quality. If the target passes a Challenging (+0) Agility Test, he reduces this damage by half (round up).\nThis power can only be used outside under an open sky."
  },
  {
    name: "Storm Caller",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest invokes the ancient rites of ice and snow, calling up a blizzard of psychic energy around himself and his allies. While this power is in effect, the Rune Priest and all allies within the power’s radius become shrouded in ethereal mist. All ranged attacks they make, or that are made against them, suffer a penalty of –5 x PR. Any ally who moves outside the range of the power immediately loses its effects."
  },
  {
    name: "Tempest’s Wrath",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "150 metre radius x PR",
    sustained: "Yes",
    description: "In a fearsome display of power, the Rune Priest calls upon the spirits of wind, storm, and snow, tearing the air with gales and tempests. While this power is in effect, any creature with the Hoverer or Flyer trait must pass a Strength Test at a penalty of –5 x PR to move through the air. Even those that pass the test have their Movement reduced by half. Flying vehicles are also affected, and their pilots suffer a penalty of –5 x PR on all Skill tests they must make to operate their craft. Flying vehicles also have their speed reduced by half. Finally, ranged attacks inside, into or out of the radius of effect have their shots fouled by the winds. Thrown and Primitive ranged weapons suffer a penalty of –5 x PR to hit, while all other ranged weapons suffer a penalty of –2 x PR to hit. This power may only be used on the surface of a planet with atmosphere, and even then, the power only functions when outside of a building or other confined space."
  },
  {
    name: "Thunderclap",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "No",
    description: "With a word of power and a clap of his mighty hands, the Rune Priest creates a deafening crack of thunder that rolls across the battlefield. All those within range of this power (friends or foes, though not including the Rune Priest) suffer 1d5 x PR Impact damage. This damage is reduced by Toughness as normal. However, only armour worn on the head protects against it. In addition, anyone suffering damage from this attack must make a Toughness Test with a penalty of –5 x PR or be deafened for 1d10 rounds (see page 260 for the effects of being deafened). Finally, fragile objects such as mundane glass, crystal or fine ceramics within the power’s range are shattered (though the GM has the final say on whether an object is affected)."
  },
  {
    name: "Ancestors' Rage",
    category: "Storm Wardens powers",
    action: "Full",
    opposed: "No",
    range: "1 metre x PR",
    sustained: "Yes",
    description: "Calling upon the talents of dead heroes, the Librarian instils within himself or another exceptional skill at arms. While this power is in effect, the Librarian or a target of his choosing gains a number of Exotic Melee Weapons Talents of his choice equal to his PR, and increases his WS by +5 x PR (to a maximum of 95)."
  },
  {
    name: "Call to Arms",
    category: "Storm Wardens powers",
    action: "Extended (2)",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "Yes",
    description: "Plunging his will into the Immaterium, the Librarian calls forth ancestral spirits to fight on his side, and summons up a number of ancestral warriors equal to his PR to fight for him. These warriors use the Imperial Guardsman profile on page 376 and are armed and armoured as detailed there. They will not stray beyond the range of the power nor can they be used for anything but combat. When they are killed, both they and their gear will vanish into smoke."
  },
  {
    name: "Crown of Lightning",
    category: "Storm Wardens powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Librarian encases one of his foes in a crackling cage of lightning, searing his flesh and contorting his muscles. This power may only be used against a single target. The target suffers 1d10 Energy damage x PR counting as having the Shock Quality. If this power is sustained, the target suffers 2d10 Energy damage in each of the Librarian’s turns."
  },
  {
    name: "Hammer of the Emperor",
    category: "Storm Wardens powers",
    action: "Extended (5)",
    opposed: "No",
    range: "1 kilometre x PR",
    sustained: "No",
    description: "With the power of an orbital barrage, the Librarian calls down a mighty hammer of psychic energy with the power to lay waste to entire towns. The Librarian chooses a point within range and calls down the Hammer. The Hammer has a radius of 100 metres x PR. Anything within the area of effect is subjected to a moderate earthquake, inflicting 3d10 x PR damage on all structures, possibly causing them to collapse. Creatures within the area must make a Hard (–20) Agility Test to remain standing. This power cannot be used Fettered, and does not work indoors. This power is extraordinary taxing and inflicts 1d5 levels of Fatigue on the Librarian. In addition, the Librarian may not attempt to use the power again for at least 24 hours.\nAt the GM’s discretion, falling buildings and raining debris may inflict 3d10 I damage on those in the area of effect who fail a Challenging (+0) Agility Test."
  },
  {
    name: "Mark of Scorn",
    category: "Storm Wardens powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Librarian casts a curse upon one of his foes, marking him for death at the hands of the righteous. This power only works on a single target. The target becomes Marked, and all successful melee attacks against him will gain a bonus to damage equal to the Librarian’s PR. In addition, any instances of Righteous Fury from melee attacks against him automatically occur without the need to pass a WS test."
  },
  {
    name: "Thunder's Shell",
    category: "Storm Wardens powers",
    action: "Half or Reaction",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian covers himself in a fine reactive psychic shield that gets stronger the more force brought against it. While this power is in effect, all attacks against the Librarian have their Penetration reduced by an amount equal to his PR (to a minimum of 0). In addition, attacks that ignore armour completely have this special ability negated by this power, instead inflicting normal damage against whatever armour the Librarian is wearing."
  },
  {
    name: "Astrotelepathy",
    category: "Telepathy powers",
    action: "Full",
    opposed: "No",
    range: "See Below",
    sustained: "No",
    description: "Any Librarian can use Astrotelepathy, provided he has enough time and skill—sending a message across the stars though is a far cry from communicating with someone on the same world or even a vessel in orbit. To send a message the Librarian must have at least one power from the Telepathy Discipline. It requires one full round to activate for every 10 words or one image it contains and uses Willpower for its Focus Power Test. The range is based on the Librarian’s Psy Rating (see below).\n\nPsy Rating 1–3: The message can reach out to a recipient in the same system.\nPsy Rating 4–6: The message can reach out to a recipient in the same sub-sector.\nPsy Rating 7–9: The message can reach out to a recipient in the same sector.\nPsy Rating 10+: The message can reach out to a recipient in an adjacent sector.\n\nTypically only other Astropaths or Librarians will be able to receive the message and unless the Librarian has a specific recipient in mind the GM may have a chance of it reaching the wrong ears..."
  },
  {
    name: "Compel",
    category: "Telepathy powers",
    action: "Full",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "No",
    description: "This power can affect a number of targets equal to the psyker’s PR. Those affected must follow a simple command given by the psyker. Some examples include “Flee”, “Fall”, “Attack your friend.” If the command is a potentially suicidal act, the target gets a +20 to his Willpower Test. In all cases the command must be achievable in a single round."
  },
  {
    name: "Dominate",
    category: "Telepathy powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "The psyker may take over the mind of another, controlling his victim with his will. This power only affects a single target and only if his total Wounds are less than 3 times the psyker’s PR. An affected target is controlled by the psyker as if he was a puppet. For as long as the psyker maintains the power, he can divide his Actions between himself and the target. The dominated target uses its own Characteristics, but at –10 due to the crudity of the control. Any action deemed suicidal allows the target an Opposed Willpower Test to try and break the hold."
  },
  {
    name: "Inspire",
    category: "Telepathy powers",
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The psyker can bolster his comrades by sending out waves of reassurance and calm. A number of targets equal to the psyker’s PR immediately overcome the effects of Pinning and gain a +10 resistance against Fear. This effect lasts as long as the targets stay within range of the psyker, and the psyker maintains the power."
  },
  {
    name: "Long-Range Telepathy",
    category: "Telepathy powers",
    action: "Free",
    opposed: "No",
    range: "50 kilometres x PR",
    sustained: "Yes",
    description: "This functions just the same as Short-range Telepathy, but with an extended range. In addition, once the psyker learns this power, such is his mastery of telepathy that he no longer incurs a chance of invoking Psychic Phenomena when using either Short- or Long-range Telepathy unless used at the Push power level. Sustaining this power is a Free Action."
  },
  {
    name: "Mind Probe",
    category: "Telepathy powers",
    action: "Extended (5)",
    opposed: "Yes",
    range: "1 metre x PR",
    sustained: "Yes",
    description: "This power allows the psyker to peel back the layers of another’s mind to read the basic surface thoughts and beyond. This power works only against a single target, and if the psyker wants to perform the Probe without the target’s knowledge, then the psyker takes a –20 penalty to his Focus Power Test and cannot Push the power. The amount of information the psyker gains from the probe depends on his PR as detailed on Table 6–4: Mind Probe. The Librarian has the option of using some of his Psy Rating to reduce the number of rounds required to use this power instead (trading speed for force), to a minimum of 1 Round. For instance, a Librarian with a Psy Rating of 8 could use 4 of his Psy Rating to reduce the time required to a single Round, and he would then gain information from as if his Psy Rating was 4 (8 –4 = 4).\n\n1–3: The psyker makes initial contact and learns basic information about the target such as his name, mood, Insanity level, and the state of his physical health.\n4–5: As above, plus the psyker can sense the thoughts uppermost in the target’s mind such as immediate fears/concerns, conscious lies, etc. The psyker also learns the target’s Corruption Level.\n6–7: As all the above, plus the psyker can sort through the target’s memories over the last 12 hours. The psyker can also glean less casual information that the subject hides, such as simple passwords or recent secret experiences.\n8–9: As all the above, plus the psyker gains detailed information about people, places or objects that the target considers important, as well as how these all relate to each other. The psyker learns about the target’s beliefs, motivations, and personal goals, as well as any contacts or complicated hidden ciphers the target might know about. The psyker also becomes aware of the pivotal moments in the target’s life.\n10+: As all the above, plus the psyker may plunder the target’s mind at will. Any information contained in the target’s psyche is an open book for the psyker. The psyker can also use this technique to break down implanted memories or personalities within the target."
  },
  {
    name: "Mind Scan",
    category: "Telepathy powers",
    action: "Half",
    opposed: "No",
    range: "200 metres x PR",
    sustained: "No",
    description: "The psyker extends his mind to contact and identify other sentient minds within range, even if they are out of sight, enabling him to garner impressions and information about the consciousnesses. The level of information gathered depends on PR as detailed on Table 6–5: Mind Scan. Untouchables and other psychically inert creatures are invisible to Mind Scan. Individuals with psychic resistance or similar protections may also be hidden (the GM may make secret Opposed Willpower tests against the psyker to see if they remain hidden from him).\n\n1–2: The psyker gains a crude impression of the number of conscious minds within range of the power, and their general position in relation to him.\n3–4: As above, plus the psyker knows the number, general location, and relative ‘strength’ of conscious minds within range of the power, and can determine if these minds have any psychic ability.\n5–7: As all the above, plus the psyker may attempt to initiate telepathic communication with any of the minds he has discerned.\n8+: As all the above, plus the psyker may attempt to carry out a Mind Probe on one of the minds he has contacted."
  },
  {
    name: "Short-Range Telepathy",
    category: "Telepathy powers",
    action: "Free",
    opposed: "No",
    range: "50 metres x PR",
    sustained: "Yes",
    description: "The psyker can send his thoughts into the minds of those around him, touching a number of targets equal to his PR. The targets can be a select group, either individuals the psyker can see or minds he is familiar with within the power’s range. Alternatively, the psyker can choose to make a generalised broadcast to every mind within range indiscriminately. An affected mind’s processes are still affected by the structure of language, and if telepathy is attempted without a shared language, the power suffers a –20 penalty. Targets who do not wish to be open to such a communication can resist with an Opposed Willpower test. Sustaining this power is a Free Action."
  }
];

export const TECHMARINE_ABILITIES = [
  {
    name: "Improve Cover",
    description: "The Techmarine can add a number of Armour Points equal to his unmodified Intelligence Bonus to any cover. Improving cover requires one Full Action."
  }
];

export const CUSTOM_CHAPTER_SOLO_MODES = [
  {
    name: "Parent Chapter Doctrine",
    description: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Solo Mode Ability from an existing Chapter.",
    effects: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Solo Mode Ability from an existing Chapter.",
    improvement: "",
    needsSoloChoice: true,
  },
  {
    name: "Highly Skilled",
    description: "This Chapter is highly skilled in certain areas of expertise. Choose any two skills. At Rank 1, your Chapter may re-roll failed Tests with these skills. At Rank 4, your Chapter gains a +10 to all Skill Tests using those Skills. At Rank 8, your Chapter gains a bonus degree of success on any Skill Test using those skills.",
    effects: "This Chapter is highly skilled in certain areas of expertise. Choose any two skills. At Rank 1, your Chapter may re-roll failed Tests with these skills.",
    improvement: "At Rank 4, your Chapter gains a +10 to all Skill Tests using those Skills. At Rank 8, your Chapter gains a bonus degree of success on any Skill Test using those skills.",
    needsSkillChoices: 2,
  },
  {
    name: "Standout Characteristic",
    description: "One particular characteristic stands out prominently for this Chapter. Choose any one Characteristic. At Rank 1 your chapter may re-roll failed Tests using this Characteristic. (such as all Perception-based Tests). At Rank 4, your Chapter gains a +10 bonus to this test. At Rank 8, your Chapter gains a bonus degree of success on this test.",
    effects: "One particular characteristic stands out prominently for this Chapter. Choose any one Characteristic. At Rank 1 your chapter may re-roll failed Tests using this Characteristic. (such as all Perception-based Tests).",
    improvement: "At Rank 4, your Chapter gains a +10 bonus to this test. At Rank 8, your Chapter gains a bonus degree of success on this test.",
    needsCharacteristicChoice: 1,
  },
  {
    name: "Quick Reaction",
    description: "Quick reaction is the hallmark of this Chapter. While in Solo Mode, the Battle-Brother is considered to have the Lightning Reflexes Talent. At Rank 3, the Battle-Brother receives a +10 to all Dodge tests. At Rank 5, the Battle-Brother is considered to have the Rapid Reaction Talent. At Rank 7, once per game session the Battle-Brother may automatically pass any one Agility-Based test (for Opposed Tests, the Battle-Brother is considered to have rolled a 01).",
    effects: "Quick reaction is the hallmark of this Chapter. While in Solo Mode, the Battle-Brother is considered to have the Lightning Reflexes Talent.",
    improvement: "At Rank 3, the Battle-Brother receives a +10 to all Dodge tests. At Rank 5, the Battle-Brother is considered to have the Rapid Reaction Talent. At Rank 7, once per game session the Battle-Brother may automatically pass any one Agility-Based test (for Opposed Tests, the Battle-Brother is considered to have rolled a 01)."
  },
  {
    name: "Warp Attunement",
    description: "This Chapter has been trained to spot minute disturbances of the warp pressing in on realspace. This attunement to the empyrean grants the character the Psyniscience Skill as a Trained Skill. The Battle-Brother may also re-roll any failed Willpower Tests to resist a psychic power.",
    effects: "This Chapter has been trained to spot minute disturbances of the warp pressing in on realspace. This attunement to the empyrean grants the character the Psyniscience Skill as a Trained Skill. The Battle-Brother may also re-roll any failed Willpower Tests to resist a psychic power.",
    improvement: ""
  }
];

export const CUSTOM_CHAPTER_ATTACK_PATTERNS = [
  {
    name: "Followers of the doctrine",
    description: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Squad Mode Attack Pattern Ability from an existing Chapter.",
    effects: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Squad Mode Attack Pattern Ability from an existing Chapter.",
    improvement: "",
    needsSquadChoice: true
  },
  {
    name: "Siege-Breaker",
    description: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, the Battle-Brother and those within Support Range of him may re-roll Damage rolls against enemies in cover. The second Damage roll must be accepted.",
    effects: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, the Battle-Brother and those within Support Range of him may re-roll Damage rolls against enemies in cover. The second Damage roll must be accepted.",
    improvement: ""
  },
  {
    name: "Tactical Finesse",
    description: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, the Battle-Brother and those within Support Range of him may make one Melee or Ranged attack as a Half Action (the Ranged Attack may only be made using the single shot rate of fire) and may then make a Half Move. A character benefiting from this ability may disengage from an opponent in melee without penalty.",
    effects: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, the Battle-Brother and those within Support Range of him may make one Melee or Ranged attack as a Half Action (the Ranged Attack may only be made using the single shot rate of fire) and may then make a Half Move. A character benefiting from this ability may disengage from an opponent in melee without penalty.",
    improvement: ""
  },
  {
    name: "Storm of Hell",
    description: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, The Battle-Brother and those within Support Range of him gain the Furious Assault Talent and the Frenzy Talent. At Rank 4, activating this ability is a Half Action.",
    effects: "Action: Full Action, Cost: 3, Sustained: Yes. While this ability is in effect, The Battle-Brother and those within Support Range of him gain the Furious Assault Talent and the Frenzy Talent.",
    improvement: "At Rank 4, activating this ability is a Half Action."
  },
  {
    name: "Oath of Vengeance",
    description: "Action: Free Action, Cost: 1, Sustained: No. When any member of the Kill-Team suffers Damage, the character receives a +4 bonus to Damage rolls against the attacker. At Rank 5, this ability may be Sustained.",
    effects: "Action: Free Action, Cost: 1, Sustained: No. When any member of the Kill-Team suffers Damage, the character receives a +4 bonus to Damage rolls against the attacker.",
    improvement: "At Rank 5, this ability may be Sustained."
  }
];

export const CUSTOM_CHAPTER_DEFENSIVE_STANCES = [
  {
    name: "Followers of the doctrine",
    description: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Squad Mode Defensive Stance Ability from an existing Chapter.",
    effects: "The Chapter strictly follows the guidelines for combat set down by its parent Chapter. Choose one Squad Mode Defensive Stance Ability from an existing Chapter.",
    improvement: "",
    needsSquadChoice: true
  },
  {
    name: "Courage Under Fire",
    description: "Action: Free Action, Cost: 0, Sustained: No. The Battle-Brother inspires those under his command to press on in the face of danger. When this ability is used, the Battle-Brother and any within Support Range of him may immediately recover from being Pinned. At Rank 4, those under the effect of this ability may also make a Half-Move as a Free Action.",
    effects: "Action: Free Action, Cost: 0, Sustained: No. The Battle-Brother inspires those under his command to press on in the face of danger. When this ability is used, the Battle-Brother and any within Support Range of him may immediately recover from being Pinned.",
    improvement: "At Rank 4, those under the effect of this ability may also make a Half-Move as a Free Action."
  },
  {
    name: "Only in Death...",
    description: "Action: Free Action, Cost: 3, Sustained: Yes. Space Marines from this Chapter are venerated amongst the Imperium for their ability to fight on through even the most grievous wounds. While this ability is active, the Battle-Brother and any within Support Range of him ignore the effects of any critical damage that would not kill them until this ability is no longer active. Once this ability ends, they suffer the full effects of any critical damage they received. This ability cannot be improved.",
    effects: "Action: Free Action, Cost: 3, Sustained: Yes. Space Marines from this Chapter are venerated amongst the Imperium for their ability to fight on through even the most grievous wounds. While this ability is active, the Battle-Brother and any within Support Range of him ignore the effects of any critical damage that would not kill them until this ability is no longer active. Once this ability ends, they suffer the full effects of any critical damage they received.",
    improvement: "This ability cannot be improved."
  },
  {
    name: "Swift Advance",
    description: "Action: Reaction, Cost: 2, Sustained: Yes. Members of this Chapter have the skill and training necessary to move quickly through even the most punishing onslaughts of gunfire. While this ability is active, the Battle-Brother and any within Support Range who successfully dodge a Ranged attack may spend their Reaction to make a Full Move. At Rank 4, they may also reload one weapon provided it does not take longer than a Half or Full Action to do so.",
    effects: "Action: Reaction, Cost: 2, Sustained: Yes. Members of this Chapter have the skill and training necessary to move quickly through even the most punishing onslaughts of gunfire. While this ability is active, the Battle-Brother and any within Support Range who successfully dodge a Ranged attack may spend their Reaction to make a Full Move.",
    improvement: "At Rank 4, they may also reload one weapon provided it does not take longer than a Half or Full Action to do so."
  },
  {
    name: "Knowledge is Power",
    description: "Action: Half Action, Cost: 3, Sustained: Yes. With knowledge of secret and forbidden lore, the Space Marines of this Chapter are able to more easily avoid sorcery and witchcraft. While under the effect of this ability, the Battle-Brother and any within Support Range of him receive a +10 bonus to any Tests made to resist the effects of a psychic power (this can include attempts to Dodge). At Rank 4, this bonus increases to +20.",
    effects: "Action: Half Action, Cost: 3, Sustained: Yes. With knowledge of secret and forbidden lore, the Space Marines of this Chapter are able to more easily avoid sorcery and witchcraft. While under the effect of this ability, the Battle-Brother and any within Support Range of him receive a +10 bonus to any Tests made to resist the effects of a psychic power (this can include attempts to Dodge).",
    improvement: "At Rank 4, this bonus increases to +20."
  }
];

export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string } } = {
  "Carnage": {
    name: "Carnage",
    requiredRank: 1,
    chapter: "Carcharodons",
    effects: "The Carcharodons excel in brutal close combat and value the ability to do as much Damage as possible in a brief amount of time. Once per combat, the Battle-Brother may activate this Solo Mode Ability. Until the end of his next Turn, all of the Battle-Brother's attacks made in melee and at Point Blank Range deal additional Damage equal to half of his unmodified Willpower Bonus, rounding up.",
    improvement: "At Rank 3, the Battle-Brother's additional Damage becomes equal to his full unmodified Willpower Bonus. At Rank 5, he gains the choice; instead of the usual bonus for Carnage, he may choose to have one hit (not attack) in melee or Point Blank Range deal additional magnitude Damage to a Horde equal to his unmodified Willpower Bonus. At Rank 7, when the Battle-Brother is benefiting from Carnage, he may take the Multiple Attacks Action to make two melee attacks against every opponent in melee range with him. These attacks benefit from the Carnage Damage bonus."
  },
  "Marksman's Honour": {
    name: "Marksman's Honour",
    requiredRank: 1,
    chapter: "Raptors",
    effects: "When firing single shots from a ranged weapon at Long and Extreme ranges, the Battle-Brother reduces the range penalty by 10.",
    improvement: "At Rank 4 the Battle-Brother has mastered sniping targets at range and gains a +20 to his Ballistic Skill Tests when making single shots at Long and Extreme range. At Rank 6 the Battle-Brother has become a veteran sniper and extends the range of any bolt weapon he uses by 20m; this increases the weapon’s short, long and extreme ranges accordingly."
  },
  "Tales of the Void": {
    name: "Tales of the Void",
    requiredRank: 1,
    chapter: "Novamarines",
    effects: "Novamarines are extensively travelled and the collective knowledge and experiences of the Chapter covers a huge portion of the galaxy. This knowledge is often passed down to new recruits though tales and advice from more veteran members of the Chapter which the Battle-Brother can then call upon as needed. The Battle-Brother can use this knowledge to make a Lore: Common, Scholastic, or Forbidden Skill Test as if he has a specific Skill and associated speciality. If he possesses the Skill and speciality he wants to test against, he gains a +10 bonus to his test instead. A Battle-Brother may use this ability a number of times equal to his Rank each game session.",
    improvement: "At Rank 6 the Battle-Brother’s knowledge becomes even more extensive and he can gains an additional degree of success if he passes any Lore: Common, Scholastic, or Forbidden Skill Test."
  },
  "Tactical Assessment": {
    name: "Tactical Assessment",
    chapter: "Howling Griffons",
    requiredRank: 1,
    effects: "Keen of mind and shrewd tacticians all, the Howling Griffons are able to make the best of a poor tactical situation and take advantage of resources and positions few would recognise as beneficial. This ability can be activated at the end of the Battle-Brother’s Turn in the Initiative Order during combat. When this ability is activated, the Battle-Brother immediately swaps positions in the Initiative Order with an enemy who has already acted during the current Combat Round. The Battles-Brother’s Turn is then over and the Initiative Order proceeds onward from the end of his original position.",
    improvement: "At Rank 5 when the Howling Griffons Battle-Brother uses this ability, in addition to all other effects, for the full following Combat Round, he gains a +10 bonus to all Tests against the opponent with which he traded places in the Initiative Order. At Rank 7, the target opponent takes a –10 penalty to all Tests for the full following Combat Round in addition to all other effects."
  },
  "Ork Slayer": {
    name: "Ork Slayer",
    requiredRank: 1,
    chapter: "Crimson Fists",
    effects: "When combating Orks, the Battle-Brother knows just where to target the creatures to cause the maximum amount of Damage. Damage inflicted by the Battle-Brother on an Ork from either a ranged or melee weapon is only reduced by half of the creature's Toughness Bonus—rounded up. Armour still reduces Damage as normal.",
    improvement: "At Rank 5 the Battle-Brother also becomes adept at picking out weak points in an Ork’s armour. The Battle-Brother increases the Pen of any ranged or melee attack against an Ork by 4."
  },
  "Zero Tolerance": {
    name: "Zero Tolerance",
    chapter: "Marines Errant",
    requiredRank: 1,
    effects: "The Marines Errant view any failure as a grievous flaw. While in Solo Mode, the Battle-Brother may re-roll any failed test when fighting against Daemons, Xenos or Heretics. He must accept the results of the second roll.",
    improvement: "At Rank 3, he gains a +10 to the re-roll. At Rank 5, he gains +20."
  },
  "Foreknowledge": {
    name: "Foreknowledge",
    requiredRank: 1,
    chapter: "Blood Ravens",
    effects: "Blood Ravens covet knowledge and use it as a weapon in battle to predict and counter the actions of their foes. Once per combat, the Battle-Brother may expend a Half Action to negate a single foe’s Reaction for that Round. Alternatively, as a Free Action, the Battle-Brother may make a Challenging (+0) Opposed Intelligence Test against a single foe (or a Horde) to determine its next action before he acts himself. If successful, the Battle-Brother may choose to either gain +10 to all Tests made against the foe this Turn or gain +10 to any Dodge or Parry Tests made against attacks from the foe until the start of his next Turn.",
    improvement: "At Rank 3, the Battle-Brother increases the bonuses to +20 on all Tests for that Turn or +20 on any Dodge and Parry Tests made against attacks until the start of his next Turn. At Rank 7 he can negate the Reaction of a single foe as a Free Action rather than a Half Action."
  },
  "Taint Sense": {
    name: "Taint Sense",
    chapter: "Red Scorpions",
    requiredRank: 1,
    effects: "Red Scorpions are fanatical about the purity of their Chapter and their loyalty and devotion to the Emperor. This constant vigilance and unceasing suspicion of those less pure than themselves gives them the ability to gain a sense of corruption or disloyalty in their allies and enemies, hints that even the keenest eyed of Battle-Brothers might miss if they had not spent a lifetime seeking such signs. The Battle-Brother may make a Challenging (+0) Awareness Test when he meets an NPC for the first time to detect whether the NPC has more than 20 Corruption Points. The GM should secretly roll for the Battle-Brother so he does not know if the NPC does indeed hold taint or if he has simply failed to detect it. At the GM’s discretion he may grant the Battle-Brother a bonus of +10 to his Awareness Test if the NPC has more than 30 Corruption Points as the taint is easier to detect. In addition to detecting taint, the Battle-Brother is always vigilant for signs of betrayal and is rarely surprised when allies become enemies. If an ally (or NPC considered nonhostile) makes a surprise attack against the Battle-Brother, he can make a Challenging (+0) Awareness Test to not be surprised and act normally in the first round of combat.",
    improvement: "At Rank 4 the Battle-Brother becomes even more adept at detecting flaws in others and can detect corruption in NPCs with 10 or more Corruption Points. At Rank 7 the Battle-Brother can pre-empt the betrayal of an ally turning the tables on them; if he passes his Awareness Test he not only is not surprised but gains a surprise round against the ally."
  },
  "A Taste for Blood": {
    name: "A Taste for Blood",
    chapter: "Flesh Tearers",
    requiredRank: 1,
    effects: "Even newly recruited Flesh Tearers must learn to turn their Chapter’s flaws to their advantage and can tap into the hunger of the Red Thirst to fuel their attacks against their enemies. This can give the Battle-Brother a burst of vigour once he has smelled the blood of his foe, allowing him to throw himself into combat with more strength and speed than normal. When the Battle-Brother makes a Charge Action against a foe which has been bloodied (i.e. has suffered at least a single wound) he adds 5m to his charge distance and gains an additional +10 to his Weapon Skill Test in addition to the normal benefits for charging.",
    improvement: "At Rank 4 the Battle-Brother becomes more adept at channelling his rage and adds +2 to any Damage rolls made during the turn he charges. At Rank 7 the Battle-Brother is even swifter to attack once he senses the blood of his prey and adds 7m to his charge distance."
  },
  "Tank Commander": {
    name: "Tank Commander",
    requiredRank: 3,
    chapter: "Storm Wardens",
    effects: "The Battle-Brother is skilled in the operation of heavy combat vehicles, from Rhino APCs to mighty Land Raiders and earth-shattering Vindicators, and can allow his adamantium steed to elude and endure the fire of the enemy. If a vehicle the Battle-Brother is driving is attacked, he may attempt to Dodge without the usual penalty for the vehicle’s size; if successful, the attack counts as striking the vehicle’s front armour.",
    improvement: "At Rank 5 and above, the Battle-Brother’s skill at firing on the move is such that all the vehicle’s weapons are considered to benefit from the Auto-Stabilised Trait. At Rank 7 and above, the Battle-Brother can deliver death from a tank’s weapons with remarkable precision, adding +10 to his Ballistic Skill when firing a vehicle-mounted weapon."
  },
  "Righteous Zeal": {
    name: "Righteous Zeal",
    requiredRank: 1,
    chapter: "Black Templars",
    effects: "The Black Templars are well known for their fanatical devotion to the Emperor and their burning hatred for psykers, witches, and warp spawn. Once per combat, a Battle-Brother of the Black Templars Chapter may call upon Righteous Zeal as a Free Action at the start of his Turn. While under the effects of the Righteous Zeal, Damage inflicted by the Battle-Brother’s melee attacks against creatures with the Daemonic Trait is not reduced by Toughness Bonus. In addition, the Battle Brother’s own Toughness Bonus is increased by +4 when reducing Damage from attacks by creatures with the Daemonic Trait or Damage from Psychic Powers and weapons. Righteous Zeal lasts for a number of Rounds equal to the Battle-Brother’s Rank.",
    improvement: "At Rank 3 and above the Battle-Brother gains an additional +10 to hit and +2 to Damage rolls when making melee attacks against any creature with psychic abilities. At Rank 5 and above, the increase to Toughness Bonus rises to +8. At Rank 7 and above the Warp Weapons Trait no longer has any effect on the Battle-Brother. All of these improvements only apply during Righteous Zeal."
  },
  "Blood Frenzy": {
    name: "Blood Frenzy",
    requiredRank: 1,
    chapter: "Blood Angels",
    effects: "Blood Angels possess a savagery in combat that has its roots deep in the history of their Chapter. It is, however, a trait that can serve them well in close quarters combat where strength and speed are vital. Once per combat, a Battle-Brother of the Blood Angels Chapter may summon up a Blood Frenzy. Blood Frenzy is a Free Action that can be activated at the start of a turn. While under the effects of this ability, the Battle-Brother may re-roll Damage dice with melee weapons. In the case of melee weapons that inflict multiple dice of Damage, all dice or none must be re-rolled. In addition, such is the brutality of his attacks that he scores Righteous Fury (see page 245) on a dice result of 9 or 10 rather than just 10. This ability lasts a number of rounds equal to the Battle-Brother’s Rank, divided by 2 (rounding up).",
    improvement: "At Rank 3 and above the Penetration of any melee weapon attacks by the Battle-Brother are increased by +2. At Rank 5 and above this additional melee weapon Penetration rises to +4. At Rank 7 and above the chance of scoring Righteous Fury increases to a dice result of 8, 9, or 10."
  },
  "Stoic Defence": {
    name: "Stoic Defence",
    requiredRank: 1,
    chapter: "Dark Angels",
    effects: "Dark Angels are stubborn in attack and intractable in defence, holding their ground against even the most furious of assaults. Once per combat a Battle-Brother of the Dark Angels Chapter may enact a Stoic Defence. Stoic Defence is a Free Action that can be activated at the start of a turn. The Space Marine gains 6 Temporary Wounds and his maximum Movement Rate is reduced to 1/2 his Agility Bonus, rounding up (most Space Marines with this ability hold their chosen position and do not advance or retreat!). Unlike normal Wounds, these bonus Wounds are removed when affected by the Damage of any successful attack, and are always removed first before applying Damage to the Battle-Brother’s normal Wounds. These bonus Wounds will also be lost if the Battle-Brother leaves his chosen location either by his own choice or involuntarily.",
    improvement: "At Rank 3 and above the temporary Wounds increase to 12. At Rank 5 and above the Battle-Brother may move a number of metres equal to his Agility Bonus each round without losing the effects of the ability. At Rank 7 and above the temporary Wounds increase to 18."
  },
  "Wolf Senses": {
    name: "Wolf Senses",
    requiredRank: 1,
    chapter: "Space Wolves",
    effects: "As part of the genetic gifts of their Primarch Leman Russ, the Space Wolves have almost preternatural senses that exceed even those of other Space Marines. Whenever a Battle-Brother of the Space Wolves Chapter is in Solo Mode he may re-roll any failed Perception-based Tests and counts as possessing the Dark Sight Trait. However, it is important to note that none of these bonuses apply if the Space Wolf is wearing a helmet for a sealed set of armour (e.g., Power Armour, Artificer Armour, or Terminator Armour).",
    improvement: "At Rank 3 and above the Battle-Brother adds +10 to all Perception-based Tests. At Rank 5 and above, he gains the Unnatural Perception (x2) Trait while using this ability. At Rank 7 and above the Battle-Brother’s senses are such that once per game session he can automatically pass any test based on Perception (for purposes of Opposed Tests the Battle-Brother is considered to have rolled a 01)."
  },
  "Hero's Saga": {
    name: "Hero's Saga",
    requiredRank: 3,
    chapter: "Space Wolves",
    effects: "The people of Fenris have a long and proud tradition of storytelling, recounting their history in the tales of their heroes, and the Space Wolves are no different, with every Battle-Brother seeking to forge a great saga of triumph, honour, and heroism over the course of their long lives. When taking an Oath with his Kill-Team, the Battle-Brother may swear his own oath, a promise of his future accomplishments and the saga that comes from them. While under this oath, the Battle-Brother will strive all the harder to achieve his personal goal. The sagas that the Battle-Brother could aspire towards are listed below—one, and only one, should be chosen before each mission. Each oath grants a benefit, but also comes with a requirement, and if this is not fulfilled, the Battle-Brother’s honour and skill will be in question, tarring his reputation and reducing his Renown by 1d5 at the end of the mission.\n\nSaga of the Bear: The Battle-Brother has the determination and endurance of the great Ice Bears of Fenris; even the mightiest of blows cannot lay him low. A number of times during the mission equal to half the Battle-Brother’s rank (rounding up), he may reduce the amount of damage suffered from a single hit, after deductions from Toughness Bonus and Armour, by half, rounding up. Visit Fury Upon The Evil Ones: The might of the Sons of Russ must be demonstrated for all to see; during the mission, the Battle-Brother must deal the killing blow to a single Master creature, or slay single-handed three Elite creatures.\n\nSaga of the Warrior Born: The Battle-Brother slays with unrelenting fury, the blood coating his blade only inspiring greater ferocity. A number of times equal to the Battle-Brother’s rank, he may gain a +10 bonus to hit in Melee for every enemy he slew in the previous turn, and/or a +1 bonus to hit for every point of Magnitude he removed from an enemy Horde. Reap a Great Tally: Many foes must fall to the Battle-Brother’s blade. The Battle-Brother must slay at least 10 individual enemies, or inflict at least 30 points of Magnitude damage (or some combination of the two: 3 magnitude is, in this case, counted as equal to a single enemy slain), and these kills must occur in melee.\n\nSaga of the Beastslayer: Many tales have been told of heroes triumphing against monstrous foes, and many Space Wolves seek out such prey to prove their might. A number of times equal to the Battle-Brother’s rank, he may re-roll an attack roll made against a target (creature or vehicle) that is Enormous or larger or which has a Toughness Bonus of 10 or higher. This does not have to be a failed attack roll—the Battle-Brother could re-roll a successful roll in the hopes of scoring more Degrees of Success. Fear Not the Beast: To demonstrate that he does not fear such mighty foes, the Battle-Brother must deal the killing blow to at least one enemy that is Enormous or larger or which has a Toughness Bonus of 10 or higher.",
    improvement: "This ability does not improve with rank."
  },
  "Thunder's Call": {
    name: "Thunder's Call",
    requiredRank: 1,
    chapter: "Storm Wardens",
    effects: "Storm Wardens often choose to prove their honour and bravery by facing foes in single combat and duelling to the death. Once per combat as a Free Action, a Battle-Brother of the Storm Wardens Chapter may issue a Thunder’s Call against any single enemy which can both see and hear him (though it need not be able to understand his language). As long as the Battle-Brother takes no Actions other than melee attacks against the target or moving him into melee with the target, and none of his allies attack the target, he gains +10 to Weapon Skill Tests against it. In addition, as long as the Battle-Brother is engaged in melee combat with the target, it suffers –10 to make attacks against anyone but the Storm Warden and must pass a Challenging (+0) Agility Test to move away. This ability lasts until either the target is dead or withdraws from combat (i.e. it retreats and combat ends) or the Battle-Brother withdraws from combat.",
    improvement: "At Rank 3 and above the Battle-Brother’s duelling skills mean that he may re-roll both Parry and Dodge Tests against attacks from the target of his Thunder’s Call. At Rank 5 and above the target’s penalties to attack anyone other than the Storm Warden increase to –20 and the Agility Test to move away becomes Hard (–20). At Rank 7 and above he may issue the Thunder’s Call to a group of foes up to his Rank in number."
  },
  "Favoured Son": {
    name: "Favoured Son",
    requiredRank: 1,
    chapter: "Ultramarines",
    effects: "The Ultramarines consider themselves a pure expression of the Codex Astartes and among the truest of the Emperors sons. This pride and unshakable personal belief often manifests itself in their leadership abilities and the example they set to other members of the Adeptus Astartes. While in Solo Mode, a Battle-Brother of the Ultramarines Chapter may re-roll any Fellowship Tests when dealing with either Space Marines or members of the Imperial armed forces (i.e. Imperial Guard, Imperial Navy, etc.). In addition, their strength of leadership means that the Battle-Brother adds +1 to the Kill-team’s Cohesion if he is the squad leader. This bonus to Cohesion remains active even when the Battle-Brother is not in Solo Mode.",
    improvement: "At Rank 3 and above once per combat the Battle-Brother may automatically pass one Command Skill Test. At Rank 5 and above the Dispositions (see page 276) of all Imperial forces and agents are improved favourably by one step when dealing with the Battle-Brother. At Rank 7 and above the Battle-Brother adds +2 to his Kill-team’s Cohesion rather than +1."
  },
  "Siege Master": {
    name: "Siege Master",
    requiredRank: 1,
    chapter: "Imperial Fists",
    effects: "The Imperial Fists are recognised as amongst the finest practitioners of the art and science of the siege, a mastery born of practice, determination and self-sacrifice. When in Solo Mode, the Battle-Brother is able to locate weak points in enemy fortifications, as well as strong points in cover he himself is using. When using this ability, the Armour Points of any cover used by a target he is firing at is count as half their normal value. In addition, the Armour Points of any cover the Imperial Fist is making use of are doubled, so long as he remains stationary.",
    improvement: "At Rank 5 or more, the Battle-Brother may re-roll failed to hit rolls when firing at enemies in cover."
  },
  "Suffer No Weakness": {
    name: "Suffer No Weakness",
    requiredRank: 1,
    chapter: "Iron Hands",
    effects: "Space Marines of the Iron Hands Chapter find strength in bolstering their bodies with augmetics and bionics. Harnessing cold fury and hatred into their assaults, the Iron Hands are powerful warriors. Once per combat, the Battle-Brother may select a single enemy. For the duration of the combat, the Battle-Brother gains the Hatred Talent against his chosen foe and gains a bonus to Damage equal to one-half (rounding up) of his unmodified Intelligence Bonus.",
    improvement: "At Rank 3, the Battle-Brother gains the Sturdy Trait; the Battle-Brother must possess at least 4 cybernetics. At Rank 5, all Interaction Skill Tests used against the Battle-Brother suffer a –30 penalty; the Battle-Brother must possess at least 5 cybernetics. At Rank 7, the Battle-Brother gains the Undying Trait; the Battle-Brother must possess at least 6 cybernetics. Note: For this Solo Mode Ability, The Flesh Is Weak Talent counts its level as an equal number of cybernetics. Thus, a Space Marine with The Flesh Is Weak 3 and 2 cybernetics would count as having 5 cybernetics for the purposes of this Solo Mode Ability."
  },
  "Master of the Shadows": {
    name: "Master of the Shadows",
    requiredRank: 1,
    chapter: "Raven Guard",
    effects: "The Raven Guard excel at covert operations, opting for the more subtle approach over an all-out assault. Millennia of training and refining their guerilla tactics have made them masters of blending into the shadows and striking when their opponent least expects it. When the Battle-Brother is in solo mode, he may re-roll any failed Shadowing and Silent Move Tests.",
    improvement: "At Rank 3 or above, all attacks made by the Battle-Brother against surprised targets gain a +2 to Armour Penetration. At Rank 5 or above, the Battle-Brother gains a +20 bonus to Shadowing and Silent Move Tests. At Rank 7 or above, all attacks made by the Battle-Brother against surprised targets gain a +4 to Armour Penetration."
  },
  "Fire-Born": {
    name: "Fire-Born",
    requiredRank: 1,
    chapter: "Salamanders",
    effects: "The Salamanders speak of themselves as Fire-Born, referring not only to their volcanic home world but also to their skill with the crafts of forge and furnace. The Salamanders hold that all battle is a test of their skill, determination, and endurance: a crucible within which the strong are forged and the weak are annihilated. The Battle-Brother may either add the Proven (2) Quality (see page 96) to, or remove one of the Unreliable, Unbalanced, or Unwieldy qualities from any one weapon he possesses either as Standard Issue or as an item of Signature Wargear, due to his skill at creating and maintaining his wargear.",
    improvement: "At Rank 3 and above, the Battle-Brother’s stoicism grants him an increased resistance to fire, he no longer suffers the effects of being lit on fire. At Rank 5 and above, the Battle-Brother becomes so self-reliant that his Kill-Team does not suffer any loss of Cohesion from any attack, effect, or event that affects him. At Rank 7 and above, all enemies successfully set on fire by an attack by the Battle-Brother take 2d10 Damage (with no reduction from armour) per round instead of the normal amount for being set on fire."
  },
  "As Swift as the Wind": {
    name: "As Swift as the Wind",
    requiredRank: 1,
    chapter: "White Scars",
    effects: "The White Scars are renowned for their lightning assaults, their attacks delivered with precise timing and intense focus, unleashing their fury against the enemy and then withdrawing to prepare for another attack from a different direction. After making a ranged attack, a successful Challenging (+0) Agility Test (or Drive or Pilot Test, if operating a vehicle) allows the Battle-Brother to make a standard Half Move (or move half his vehicle’s Tactical Speed, rounding up) as a Free Action. The character may only make this move once per Round.",
    improvement: "At Rank 3 and above, the Battle-Brother’s swift and sudden attacks grant him an additional +10 to hit and +2 damage against Surprised or Unaware enemies. At Rank 5 and above, the White Scar maintains a swift pace at all times, counting his Agility Bonus as 1 higher for the purposes of movement and increasing the Tactical Speed of any vehicle he uses by 1m (this bonus to movement speed remains active even when the Battle-Brother is not in Solo Mode). At Rank 7 and above, the Battle-Brother may make a Full Move, or move his vehicle’s full Tactical Speed, after making a ranged attack"
  },
  "Descent of Angels": {
    name: "Descent of Angels",
    requiredRank: 3,
    chapter: "Blood Angels",
    effects: "Since their founding, the Blood Angels have employed attack craft like the Thunderhawk and Stormraven, and equipment like Jump Packs, to strike their foes from above. In emulation of their winged Primarch, they excel at airborne assaults, striving to perfect this form of warfare. Once per game session, a Blood Angel with a Jump Pack may declare that he is performing a Descent of Angels at the start of a combat. For a number of rounds equal to the Battle-Brother’s Rank, he gains the Flyer (18) Trait, and counts as having rolled a 10 for his Initiative roll for the duration of the combat.",
    improvement: "At Rank 5 and above, the Battle-Brother’s first attack during the combat causes the target to be Stunned for 1 Round if the attack roll passes by 2 or more Degrees. At Rank 7 and above, on any round in which the Blood Angel has moved using his Jump Pack, enemies suffer a –20 penalty on all Attack Rolls against him."
  },
  "Storm of Vengeance": {
    name: "Storm of Vengeance",
    requiredRank: 3,
    chapter: "Dark Angels",
    effects: "While the Dark Angels adhere to the tenets of the Codex Astartes (for the most part) and are capable of utilising a wide range of tactics, a withering hail of bolter fire is a time-honoured tradition and one frequently used by the Dark Angels. Once per combat, the Battle-Brother may unleash a Storm of Vengeance when making a Semi-auto Burst, Full-Auto Burst, Overwatch or Suppressing Fire action. If the attack hits, the Battle-Brother gains two bonus Degrees of Success on the attack roll.",
    improvement: "At Rank 5 and above, all attempts to Dodge a Storm of Vengeance attack suffer a –20 penalty. At Rank 7 and above, the number of bonus Degrees of Success increases to three."
  },
  "Indomitable Defense": {
    name: "Indomitable Defense",
    requiredRank: 3,
    chapter: "Imperial Fists",
    effects: "The Imperial Fists are known for their determination and their ability to stand in stalwart defense against even the most vicious of assaults. Once per game session, a Battle-Brother may call upon his Indomitable Defense. This is a Free Action that can be done at the start of any of his Turns. For a number of rounds equal to his Rank, the Battle-Brother effectively increases his Unnatural Toughness Trait (see page 136 of the Deathwatch Rulebook) by one level, so for instance Unnatural Toughness x2 becomes Unnatural Toughness x3.",
    improvement: "At Rank 5 and above, Indomitable Defense also grants an additional +10 to all Tests to Dodge and Parry while active. At Rank 7 and above, Indomitable Defense increases the character’s Unnatural Toughness by two levels."
  },
  "Student of the Codex": {
    name: "Student of the Codex",
    requiredRank: 3,
    chapter: "Ultramarines",
    effects: "The Battle-Brother is well-versed in the writings of Guilliman and generations of Captains and Chapter Masters, having studied them at length over many years, and knows how best to apply the lessons taught within. The Battle-Brother treats all Tactics Skills as Basic Skills. In addition, at the start of any combat, when rolling for initiative, the Battle-Brother may attempt a Tactics Test (whichever is most appropriate to the combat being fought; the GM’s decision is final on this), gaining a number of re-rolls that can be used on Tests during the combat equal to 1+ the number of Degrees of Success he scores if he passes.",
    improvement: "At Rank 5 and above, the number of rerolls increases to his Intelligence Bonus plus the number of Degrees of Success scored. At Rank 7 and above, the Battle-Brother may exchange three of those re-rolls to automatically pass a Skill Test during the combat, passing by a number of Degrees of Success equal to his Intelligence Bonus."
  },
  "No Respite, No Forgiveness": {
    name: "No Respite, No Forgiveness",
    requiredRank: 3,
    chapter: "Black Templars",
    effects: "The fervent anger and indomitable determination of the Black Templars often drives them forward all the faster against insurmountable odds or heavy fire, such things serving only to enrage the Black Templars and incite them to deliver retribution. Once per combat as a Free Action, a Battle-Brother of the Black Templars Chapter may activate this ability at the start of his Turn. While under the effects of No Respite, No Forgiveness, the Battle-Brother may use his Reaction when targeted by an enemy ranged attack (before the attack is made, but after it has been declared) to move up to his Agility Bonus in metres towards the nearest enemy. The Battle-Brother must move a minimum of one metre for this Ability to take effect. His wrathful mien and apparent heedlessness for danger cause the attacker to hesitate, imposing a –10 penalty on their attack roll. If the Battle-Brother has multiple reactions, he may only use one of them each turn to move in this way. No Respite, No Forgiveness lasts for a number of Rounds equal to the Battle-Brother’s Rank.",
    improvement: "At Rank 5 and above, the penalty imposed upon the enemy attack is increased to –20. At Rank 7 and above, the maximum distance he can move is increased to twice the Battle-Brother’s Agility Bonus in metres."
  }
};

export const CODEX_DEFENSIVE_STANCES = [
  {
    name: "Dig In",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "Against fearsome weapons like plasma cannons and meltaguns, even Space Marines will use cover to their advantage. A Battle-Brother may order his squad to Dig In, seeking out the most defensible firing positions. While this ability is in effect, the Battle-Brother and those in Support Range of him can double the Armour Points provided by any cover (see page 246) they are currently using. This bonus to cover only applies to each individual Battle-Brother so long as they remain stationary.",
    improvement: "If the Battle-Brother is Rank 5 or more, both he and those supporting him may move freely. The benefits of doubled Armour Points applying to all cover they use for the duration of the ability."
  },
  {
    name: "Go To Ground",
    action: "Reaction",
    cost: 1,
    sustained: false,
    effects: "When subjected to heavy, accurate, and effective fire, a well-trained squad knows to take cover. As a Reaction, the Battle-Brother may issue a Go to Ground order when he or another member of his Kill-team within his Support Range has been hit by a ranged attack. Both the Battle-Brother and those in Support Range of him may immediately make a free move up to their Agility Bonus in metres to find cover. Note that the effects of the hit are worked out before any Battle-Brothers may move. In the case of hits from semi or full auto weapons, only the first hit is worked out before the Battle-Brothers move and the remaining hits after they have gone to ground.",
    improvement: "If the Battle-Brother is Rank 4 or more, the free move to cover may be up to twice the Battle-Brother’s Ability Bonus."
  },
  {
    name: "Regroup",
    action: "Full Action",
    cost: 2,
    sustained: false,
    effects: "A Kill-team stands united and is always stronger supporting each other against their foes. As a Full Action, the Battle-Brother may order a Regroup to allow himself and those in Support Range of him to move up to twice their Agility Bonus in any direction, just as if they had made a Full Move Action. In addition, Regroup move does not trigger enemy Overwatch or Suppression Fire. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat.",
    improvement: "If the Battle-Brother is Rank 4 or more, in addition to this free movement, Battle-Brothers may reload any weapons they are currently carrying, provided doing so would only be a Half Action or a Free Action."
  },
  {
    name: "Soak Fire",
    action: "Reaction",
    cost: 2,
    sustained: false,
    effects: "While a good formation covers all angles of attack, it also shields the squad from directed fire. This is especially true of Space Marines, who use their bulk and armour to shrug off hails of bullets, bolts, and beams. A Battle-Brother may use the Soak Fire ability whenever another member of his squad currently within his Support Range is hit by a Semi or Full Auto fire attack and would be eligible to make a Dodge Test to avoid the attack. These hits are then divided evenly between the original target, the Battle-Brother, and those supporting him, provided they would normally be eligible targets for the attack. Regardless of the number of Battle-Brothers soaking fire, the original target always takes at least one hit. Note that Battle-Brothers soaking fire cannot Dodge attacks allocated to them.",
    improvement: "If the Battle-Brother is Rank 4 or more, both he and those supporting him may soak single-attack ranged weapons, such as a blast from a lascannon or a sniper’s bullet, dividing the Damage evenly between those involved."
  },
  {
    name: "Strongpoint",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "Sometimes a Space Marine squad needs to hold a position at all costs, setting up fields of overlapping fire and holding the enemy back with a hail of bolt shells. A Battle-Brother can establish a Strongpoint, nominating either himself or a member of his Kill-team within Support Range as the Centre of the Strongpoint. The Centre must remain stationary for the ability to remain in effect. The Centre may then Call Targets either as a Free Action in his turn or as a Reaction. Battle-Brothers in Support Range of the Centre (including the Centre himself ) then gain a +20 to Ballistic Skill and Weapon Skill Tests against a Called Target, may reroll Damage against it, and may use their Reactions to make Standard Attacks against it. A target remains marked in this way until either the Centre moves (ending the Strongpoint) or the Centre marks a new target.",
    improvement: "This ability cannot be improved."
  },
  {
    name: "Tactical Spacing",
    action: "Full Action",
    cost: 1,
    sustained: true,
    effects: "Formation and spacing are an important part of a squad’s function on the battlefield and influence their ability to warn each other of danger and defend themselves against attack. While this ability is in effect, the Battle-Brother and those in Support Range of him can share their Reactions. For example, one member of the Kill-team could give his Reaction (losing it for himself for the turn) to another member of the Kill-team to use. If the Space Marine has extra reactions (such as the bonus reactions granted from the Step Aside Talent), these may also be shared.",
    improvement: "If the Battle-Brother is Rank 5 or more, in addition to being able to share Reactions within the group, all members gain an additional Reaction while this ability is in effect."
  }
];

export const CHAPTER_DEFENSIVE_STANCES: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {
  "Bleed Them Dry": {
    name: "Bleed Them Dry",
    chapter: "Carcharodons",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "The other half of the Carcharodons' strategy is the ability to withdraw quickly and completely if the battle goes against them, only to strike again later. The Battle-Brother and all allies within Support Range do not suffer Attacks of Opportunity when leaving melee with an opponent while this Squad Mode is sustained.",
    improvement: "If the Battle-Brother is Rank 4 or higher, the Battle-Brother and all allies within Support Range gain a +20 to Agility while this Squad Mode is sustained in addition to the aforementioned bonus. This improves their Movement Speed, as well as any Agility-based Tests."
  },
  "Swift Withdrawal": {
    name: "Swift Withdrawal",
    chapter: "Raptors",
    action: "Reaction",
    cost: 3,
    sustained: false,
    effects: "When the squad has been surprised by an enemy, this ability can be used to disengage before combat truly begins. The GM should make the Surprise attacks for the enemies then if the squad chooses to make a swift withdrawal, combat immediately ends and the squad makes a retreat. The GM should use his discretion to decide whether retreat would be possible and where the squad would be able to retreat to. Unless they would absolutely not be able to withdraw from their foes or there is nowhere to run, the squad can disengage from combat without further attacks made against them.",
    improvement: "At Rank 5 the Battle-Brothers can each take a Half Action before making their retreat, which can be an attack against their foes."
  },
  "Tactical Reassessment": {
    name: "Tactical Reassessment",
    chapter: "Novamarines",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Part of having an adaptable combat doctrine is the ability to change tactics at a moment’s notice in the face of the enemy. If an attack has failed, the Battle-Brother may quickly change his stance or make a swift retreat or advance to place himself in a better position. When used as part of a squad, this ability allows the Kill-team to test an enemy’s defences and own attack strength by repositioning themselves or withdrawing as needed. The Battle-Brother and squad members within Support Range of him may spend their Reaction immediately after their turn (before another PC or NPC has acted) to reverse a move action he has just taken. The Battle-Brother immediately returns to the position he was at the start of his turn before he took any actions, just as if he had moved there normally. This ability has no effect if the Battle-Brother did not move voluntarily during his turn (such as if he was moved by a foe or an environmental effect) or if he can no longer return to his former position (it is now occupied by a foe or no longer exists having collapsed or drifted off into space, etc.). In the latter case, he will move back as close to his original position as possible along the route he took during his turn.",
    improvement: "At Rank 5 the Battle-Brother has more control over his movement and when using this ability may return to any point within 5m of his original position."
  },
  "Staggered Defence": {
    name: "Staggered Defence",
    chapter: "Howling Griffons",
    action: "Free Action",
    cost: 3,
    sustained: true,
    effects: "Just as a well-executed attack can be devastating when every Battle-Brother works in flawless cooperation, a well constructed defensive formation can allow every member of a squad to cover the other and move to their defence should they come under attack or be threatened. Battle-Brothers within Support Range of each other can provide each other with a defensive bonus provided they have line of sight to at least one other member of the squad. Against ranged attacks, this grants a Battle-Brother a +10 to Dodge attempts as his brothers cover his position and warn him of incoming attacks. Against melee attack, Battle-Brothers can use the Ganging Up bonus they would normally receive on Weapon Skill Tests against a foe as a bonus to their Parry attempts against that same foe.",
    improvement: "At Rank 5 the bonus to Dodge attempts increases to +20."
  },
  "Last Stand": {
    name: "Last Stand",
    chapter: "Crimson Fists",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "While this ability is active, any Battle-Brother that falls in combat (either incapacitated or killed) will strengthen the group and provides those that remain with 3 Fate Points to share. These Fate Points cannot be burnt but can be spent to gain bonuses in all the normal ways. Any Battle-Brother may use these Fate Points instead of his own while he remains within Support Range of the fallen brother.",
    improvement: "At Rank 4 a fallen Battle-Brother provides the group with 4 additional Fate Points. At Rank 7 a Fallen Battle-Brother provides his Kill-team with 5 additional Fate Points."
  },
  "Preservation of Force": {
    name: "Preservation of Force",
    chapter: "Marines Errant",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "The Marines Errant value their Battle-Brothers and wargear highly. The Battle-Brother and those in Support Range gain +2 to their Armour points on all locations.",
    improvement: "At Rank 4, the bonus increases to +4 Armour points."
  },
  "Battle Knowledge": {
    name: "Battle Knowledge",
    chapter: "Blood Ravens",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "The Blood Ravens are masters of counter attack and counter defence, reacting with well-practised battle cunning to every action their opponents takes. When the Battle-Brother and those within Support Range of him use the Delay Action (see page 238 of the DEATHWATCH Core Rulebook) they can make a Full Action rather than a Half Action when they choose to act.",
    improvement: "At Rank 4, if Battle-Brothers are forced to make a Challenging (+0) Opposed Agility Test to see if they go before an enemy also using the Delay Action, they gain a +30 bonus to their roll."
  },
  "Feast of Flesh": {
    name: "Feast of Flesh",
    chapter: "Flesh Tearers",
    action: "Reaction",
    cost: 2,
    sustained: true,
    effects: "When a Flesh Tearer is wounded it fuels his rage, the pain of the injury and the smell of blood igniting deeper feelings of rage and hatred and directing them at his foes. A Battle-Brother benefiting from Feast of Flesh who is struck a blow in battle will often respond in kind, using the pain to channel his strength into a potent retributive strike and turn the agony of being wounded upon his foes. When a Battle-Brother affected by Feast of Flesh is wounded by Damage from a melee attack, they may spend their reaction to channel this Damage into their next attack. The Battle-Brother adds the Damage he has just suffered (after reduction from armour and Toughness) to the Damage he inflicts with his next melee attack. If he misses with this subsequent attack then this Damage is lost. Using this power does not prevent the Damage suffered by the Battle-Brother.",
    improvement: "At Rank 5 the Battle-Brother adds double the Damage he has just suffered to his next attack. At Rank 7 the bonus to Damage from Feast of Flesh applies to all attacks that the Battle-Brother makes in his turn and not just the first."
  },
  "Armour of Faith": {
    name: "Armour of Faith",
    chapter: "Black Templars",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "Black Templars are among the most zealous and devoted of the Emperor’s chosen, turning aside even the powers of the warp with their faith. A Battle-Brother of the Black Templars Chapter may cloak himself and those around him in an Armour of Faith, usually by chanting prayers to the Emperor or singing battle hymns. While this power is in effect, the Battle-Brother and those in Support Range of him add +10 to all tests made to resist Psychic Powers and add +4 to their Toughness Bonus when reducing Damage from physical attacks from creatures with the Daemonic Trait and from Psychic Powers.",
    improvement: "If the Battle-Brother is Rank 5 or more, the bonus to resistance tests increases to +20 and the bonus to Toughness Bonus increases to +8."
  },
  "Immediate Retribution": {
    name: "Immediate Retribution",
    chapter: "Black Templars",
    action: "Reaction",
    cost: 1,
    sustained: false,
    effects: "The Black Templars will never allow a slight to go unpunished, nor see a challenge go unanswered, and the gravest of slights and clearest of challenges is an attack against a Battle-Brother. A Battle-Brother may use the Immediate Retribution ability whenever another member of his squad currently within Support Range is hit by a melee attack. The Battle-Brother may immediately make a Charge Move and a Standard Attack with a melee or ranged weapon against the attacking enemy, adding +1 to Damage for this attack for each member of the Kill-team within Support Range. This ability lasts only for a single attack; the Cohesion cost must be paid every time this ability is used.",
    improvement: "If the Battle-Brother is Rank 4 or above, he may also use Immediate Retribution if a member of his squad is hit by a ranged attack."
  },
  "Feel No Pain": {
    name: "Feel No Pain",
    chapter: "Blood Angels",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "Blood Angels often fight on regardless of the damage dealt to them. Until the start of his next Turn, the Battle-Brother and those in Support Range of him use their training and the fiery will of the Blood Angel to ignore their wounds and focus on the attack, halving all Damage (round up) after reduction for Armour Points and Toughness Bonus. While using this ability, however, such is the Battle-Brothers’ rage that they may not use their Reactions to Parry or Dodge and must use an Action with the Attack subtype (see page 236). This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat.",
    improvement: "If the Battle-Brother is Rank 5 or more, the restrictions on using Reactions to Parry or Dodge can be ignored."
  },
  "Immovable Defence": {
    name: "Immovable Defence",
    chapter: "Dark Angels",
    action: "Full Action",
    cost: 2,
    sustained: true,
    effects: "Stubbornness is a valued trait among the Dark Angels, especially in battle where they seldom give ground to their foes even in the face of overwhelming odds. While this ability is in effect, the Battle-Brother and those in Support Range of him gain a +10 to all Ballistic Skill Tests, a +10 to all Dodge Tests, and an additional +4 Armour Points to all locations as long as they remain stationary.",
    improvement: "If the Battle-Brother is Rank 4 or more, the bonus to Ballistic Skill Tests and Dodge Tests is increased to +20."
  },
  "Hold at all Costs": {
    name: "Hold at all Costs",
    chapter: "Imperial Fists",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "The Imperial Fists hold numerous battle honours for actions in which they have held a strongpoint against the most horrific of foes, declaring they will die before relinquishing their position to the enemy. A Battle-Brother may issue the command to Hold at all Costs by nominating a specific terrain feature, fortification, or an area of cover up to ten metres in diameter. While this ability is in effect, the Battle-Brother and those in Support Range of him and within the nominated position are entirely immune to the effects of Fear.",
    improvement: "This ability cannot be improved."
  },
  "Strength of Iron": {
    name: "Strength of Iron",
    chapter: "Iron Hands",
    action: "Half Action",
    cost: 2,
    sustained: false,
    effects: "The cold fury of the Iron Hands Space Marine Chapter makes them exceptionally good at holding ground, particularly in the face of enemy fire. The Battle-Brother and those in Support Range of him gain a +10 bonus to resist Fear and Cohesion Damage and add +2 to their Toughness Bonus when reducing Damage from ranged attacks.",
    improvement: "If the Battle-Brother is rank 4 or more, the bonus to resist Fear and Cohesion Damage increases to +20, and the additional Toughness Bonus increases to +4."
  },
  "Evasive Manoeuvres": {
    name: "Evasive Manoeuvres",
    chapter: "Raven Guard",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "Battle-Brothers of the Raven Guard favour agilely avoiding their opponent’s main attack over a stalwart defence. All Battle-Brothers in Support Range no longer trigger the effects of Overwatch from an enemy. In addition, Battle-Brothers in Support Range gain a +20 bonus to all tests to avoid Pinning.",
    improvement: "At Rank 3, all Battle-Brothers in Support Range are immune to the effects of Pinning."
  },
  "Unto the Anvil of War": {
    name: "Unto the Anvil of War",
    chapter: "Salamanders",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "A squad of Salamanders Space Marines in defence is an immovable object, standing resolute in the face of any foe or peril. Shoulder to shoulder, they are as unyielding as the adamantium anvils that sit in the hearts of their forges. While this ability is in effect, the Battle-Brother and those in Support Range of him gain a +2 Toughness bonus, though all those affected by this ability count their Agility Bonus as half its normal value (rounding up) for the purposes of movement.",
    improvement: "If the Battle-Brother is Rank 5 or more, then the Battle-Brother and those in Support Range are also immune to Fear, Pinning and Stunning, and their movement rate is no longer reduced."
  },
  "Pack Tactics": {
    name: "Pack Tactics",
    chapter: "Space Wolves",
    action: "Free Action",
    cost: 2,
    sustained: false,
    effects: "Space Wolves are skilled at baiting an opponent or distracting an enemy at a critical time so that another Space Wolf can attack unhindered. When a Space Marine attacks a single target, another Space Marine within support range may voluntarily give up an unused reaction to distract the target. If he does so, the first Space Marine’s melee or ranged attacks against that target may not be parried or dodged this turn.",
    improvement: "If the Battle-Brother is Rank 3 or more, Melee attack rolls against the target affected by this ability gain a +10 bonus."
  },
  "Shield and Sword": {
    name: "Shield and Sword",
    chapter: "Storm Wardens",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "Many Battle-Brothers of the Storm Wardens Chapter favour storm shields and power swords and train to fight side by side with these heavy weapons. The Storm Wardens have adapted this tactic to other forms of melee combat. While this ability is in effect, the Battle-Brother and those in Support Range of him can Parry attacks directed against those by their side (allies within 2 metres). In addition, any time a Battle-Brother benefiting from this ability is struck in melee, he may use his Reaction to make a Standard Attack with a melee weapon back at the creature that attacked him.",
    improvement: "If the Battle-Brother is Rank 5 or more, all those affected by this ability gain a +20 bonus to Parry Tests."
  },
  "Rally Cry": {
    name: "Rally Cry",
    chapter: "Ultramarines",
    action: "Free Action",
    cost: 0,
    sustained: false,
    effects: "Ultramarines are natural leaders and the embodiment of the Codex Astartes. In battle their purity and natural authority is a power force, able to rally their fellow Battle-Brothers and reinforce their will to fight. When a Battle-Brother uses this ability, it instantly restores a number of Cohesion equal to his Fellowship Bonus. The reverence the Ultramarines hold for their Primarch and the strength of will required to make a Rally Cry is such that a Battle-Brother may only use this ability once per game session.",
    improvement: "This ability cannot be improved."
  },
  "Sudden Withdrawal": {
    name: "Sudden Withdrawal",
    chapter: "White Scars",
    action: "Full Action",
    cost: 2,
    sustained: false,
    effects: "The White Scars are quick to withdraw their forces, their sudden attacks typically followed by an equally sudden disappearance as the Battle-Brothers retreat to prepare for another attack elsewhere. The Battle-Brother may call for a Sudden Withdrawal, nominating either himself or another member of the Kill-Team within Support Range to perform a Suppressing Fire Action. Once this action is complete, all remaining members of the Kill-Team within Support Range may immediately move up to twice their Agility Bonus away from the enemy, just as if they had made a Full Move Action.",
    improvement: "If the Battle-Brother is Rank 5 or more, he may call for a Sudden Withdrawal as a Half Action instead of a Full Action."
  },
  "Conviction": {
    name: "Conviction",
    chapter: "Blood Angels",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "Sanguinius shared the Emperor’s vision for the future of Mankind, and even knowing his own fate, stood to defend it with his final breath. The Blood Angels aspire to emulate Sanguinius’ sacrifice and his dream of hope for Mankind’s future, and will not shirk from the necessary sacrifices that a warrior must make to secure victory. The Battle-Brother moves to the fore, standing as a challenge to those who would act against the Imperium, and while this ability remains in effect, all enemy ranged attacks against any member of the Kill-Team except the Battle-Brother suffer a –20 penalty.",
    improvement: "If the Battle-Brother is Rank 4 or above, enemies attempting to charge a member of the Kill-Team must pass a Challenging (+0) Willpower Test or be forced to select the Battle-Brother as their target."
  },
  "With Every Last Breath": {
    name: "With Every Last Breath",
    chapter: "Dark Angels",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "While even a single Dark Angel still stands in defence of the Imperium, no enemy of Man shall be suffered to live. So resolute are they that even the most grievous of injuries will not cause them to falter. While this ability remains in effect, the Battle-Brother and those in Support Range may ignore the effects of Fatigue and cannot be Stunned.",
    improvement: "If the Battle-Brother is Rank 5 or above, he and those in Support Range may also ignore the effects of any Critical Hit which does not cause gross physical trauma (loss of an eye or limb) or death."
  },
  "Exemplar of Stoicism": {
    name: "Exemplar of Stoicism",
    chapter: "Imperial Fists",
    action: "Free Action",
    cost: 1,
    sustained: false,
    effects: "In holding the line against seemingly impossible odds, the character assumes the mantle of an exemplar of duty, stoicism and sacrifice. In shrugging off wounds that would cripple even a mighty Space Marine, he inspires others to do the same. This Defensive Stance may be used by an Imperial Fists character that has sustained Critical Damage and kept on fighting. With this ability in effect, the Battle-Brother and those in Support Range may reduce the effects of any roll on any Critical Effects table by the Rank of the Imperial Fists character, to a minimum of 1. For example, if a Battle-Brother suffers result of 9 on Table 8-9: Energy Critical Effects – Body, a result which would kill him quite spectacularly, and the Imperial Fists character has a Rank of 3, his injury would be reduced to a result of 6, a serious, but survivable effect.",
    improvement: "This ability cannot be improved."
  },
  "Counter-Charge": {
    name: "Counter-Charge",
    chapter: "Space Wolves",
    action: "Reaction",
    cost: 3,
    sustained: false,
    effects: "The Space Wolves are not ones to eschew the frenzy of melee, and will often meet an enemy assault with a charge of their own. When an enemy charges a member of the Kill-Team, the Battle-Brother or any of those in Support Range may immediately make a Charge Move and Standard Attack against the charging enemy. The Counter-Charge is resolved before the charging enemy completes their attack.",
    improvement: "If the Battle-Brother is Rank 5 or above, the charging enemy (if it survives) must pass a Challenging (+0) Toughness Test or be Stunned, losing their attack."
  },
  "Tactical Withdrawal": {
    name: "Tactical Withdrawal",
    chapter: "Ultramarines",
    action: "Reaction",
    cost: 3,
    sustained: false,
    effects: "Where some Chapters cannot abide the idea of retreating in the face of the enemy, the Ultramarines know better, understanding that taking a step back in the fury of battle can frequently prove the difference between victory and defeat. A momentary withdrawal from the enemy can open up opportunities for allies to exploit, bringing victory more swiftly and decisively than might otherwise have been the case. After being attacked in melee combat, the Battle-Brother may call for a Tactical Withdrawal. The Battle-Brother and those in Support Range may immediately move up to their Agility Bonus in metres directly away from their enemy as if they had performed a Disengage Action.",
    improvement: "If the Battle-Brother is Rank 5 or above, the distance moved is increased to twice their Agility Bonus in metres."
  },
  "Considered Defence": {
    name: "Considered Defence",
    chapter: "Ultramarines",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "The Ultramarines are disinclined to stubborn, costly defence, preferring instead to adapt their stance to the situation at hand, relying on the teachings of the Codex Astartes to judge the shifting tides of battle and adjusting as required. While this ability remains in effect, the Battle-Brother and those in Support Range may gain one of the following benefits, which may be chosen when this ability is activated: +4 Armour Points from Cover, move Agility Bonus metres as a Free Action, or an additional Reaction. The choice of benefit may be changed as a Half Action.",
    improvement: "If the Battle-Brother is Rank 3 or above, the choice of benefit may be changed as a Free Action."
  }
};

export const CODEX_ATTACK_PATTERNS = [
  {
    name: "Bolter Assault",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "Space Marines are shock troops and excel at closing rapidly with the enemy, annihilating them in a storm of bolter fire. When the Battle-Brother calls a Bolter Assault, both he and those in Support Range may make an immediate Charge Move and a Standard Attack with a bolter, bolt pistol, or storm bolter (including variants of these weapons). Alternatively, they may use their Standard Attack to throw a grenade. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat.",
    improvement: "If the Battle-Brother is Rank 4 or more, both he and the Kill-team can make Semi Auto Bursts and Full Auto Bursts instead of a Standard Attack with their bolt weapons."
  },
  {
    name: "Fire for Effect",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Working as a single well-oiled machine, the Killteam can snap off shots at targets as they appear. While this power is in effect, the Kill-team may use their Reactions to make a Standard Attack with a ranged weapon.",
    improvement: "If the Battle-Brother is Rank 4 or more, both he and the Kill-team can make Semi Auto Bursts and Full Auto Bursts instead of a Standard Attack with their ranged weapons."
  },
  {
    name: "Fire Support",
    action: "Half Action",
    cost: 1,
    sustained: true,
    effects: "All combat squads train in concentrating their fire and working as a team to achieve fire superiority over their foes. While this ability is in effect, the Kill-team does not suffer the normal –20 to hit when using the Suppressing Fire and Overwatch actions (see page 241).",
    improvement: "If the Battle-Brother is Rank 3 or more, calling for Fire Support becomes a Free Action."
  },
  {
    name: "Furious Charge",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "Often the only way to break a foe is to charge into their midst and hack them down. Using this ability, the Battle-Brother and those in Support Range of him may make an immediate Charge Move and a Standard Attack with a melee weapon. In addition, such is the fury of such an attack that all Battle-Brothers involved may re-roll Damage for their attacks. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat.",
    improvement: "If the Battle-Brother is Rank 5 or more then both he and the Kill-team can make Multiple Attacks instead of a Standard Attack with their melee weapons."
  },
  {
    name: "Squad Advance",
    action: "Half Action",
    cost: 1,
    sustained: true,
    effects: "Kill-teams move with a deadly precision across the battlefield, covering each other as they advance and crossing ground swiftly from cover to cover. While this ability is in effect, the Kill-team may use their Reactions to make a Tactical Advance (see page 243).",
    improvement: "If the Battle-Brother is Rank 3 or more, calling for a Squad Advance becomes a Free Action."
  },
  {
    name: "Tank Buster",
    action: "Free Action",
    cost: 1,
    sustained: false,
    effects: "As small elite infantry squads, Kill-teams are well versed in the methods of dealing with large, hardened threats like armour and bunkers. When attacking such enemies, the squad will typically use some members to draw fire while the others dispatch it with heavy weapons or demo-packs. The Battle-Brother may nominate a member of the Kill-team armed with either a heavy weapon or an explosive (this could be himself ) to initiate a Tank Buster manoeuvre as part of an Attack Action against an armoured vehicle or fortification. For every member of the Kill-team in Support Range, the nominated Battle-Brother may add either +5 to his Ballistic Skill to attack or move 2 metres closer to his target (if he is trying to plant a charge or grenade).",
    improvement: "If the Battle-Brother is Rank 4 or more, the nominated Battle-Brother may add +10 to his Ballistic Skill or move 5 metres closer to his target for every member of the Kill-team in Support Range."
  }
];

export const CHAPTER_ATTACK_PATTERNS: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {
  "Savage Finish": {
    name: "Savage Finish",
    chapter: "Carcharodons",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "The Carcharodons are known for their bloody hit-and-fade attacks, only committing when they are sure to have the advantage against the foe. When they commit, however, they destroy everything in their path. Whenever a Battle-Brother would gain the To Hit bonus for outnumbering an opponent, he deals 5 additional Damage.",
    improvement: "If the Battle-Brother is Rank 4 or higher, activating this Ability takes a Half Action, and the additional Damage bonus increases to 10."
  },
  "Clean Kill": {
    name: "Clean Kill",
    chapter: "Raptors",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "In pairs or as a squad, Raptors can become even more proficient marksmen than normal, hitting targets at long ranges again and again with unrivalled accuracy. The Battle-Brother and members of his squad within Support Range can re-roll Ballistic Skill Tests when firing single shots (i.e. not semi or full auto fire) with ranged weapons at Long and Extreme ranges. Additionally, any member of the squad may \"spot\" for another as a Full Action, negating any penalties to his Ballistic Skill Test against a single target provided he only takes a single shot.",
    improvement: "At Rank 4 the Battle-Brother gains the benefits of re-rolls at Long and Extreme ranges with semi auto fire. At Rank 6 the Battle-Brother gains the benefits of re-rolls at Long and Extreme ranges with full auto fire. In both cases, the Battle-Brother may still only make single shots when benefiting from a spotter."
  },
  "Weak Spot": {
    name: "Weak Spot",
    chapter: "Novamarines",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Novamarines can use their extensive knowledge of foes to predict weak spots in their armour or venerable places on their hides. This information comes in handy when facing foes for the first time with little or no actual experience in combat against them and only instinct and training to guide the way. The Battle-Brother and members of his squad within Support Range of him increase the bonus for Ganging Up by +10 and decrease the penalty for Called Shots by –10. In addition, Critical Damage inflicted by the Battle-Brother when making a Called Shot is increased by +2 after all other factors. If the Battle-Brother makes a Called Shot while Ganging Up on a foe he will receive both the bonus to his Weapon Skill and a reduction in the Called Shot penalty.",
    improvement: "At Rank 4 the Battle-Brother suffers no penalty when making Called Shots. At Rank 7 the Battle-Brother increases the bonus Critical Damage from a called shot to +3."
  },
  "Synchronised Assault (Howling Griffons)": {
    name: "Synchronised Assault",
    chapter: "Howling Griffons",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Calling upon years of training using the doctrines of the Codex Astartes and their own personal tactics, the Howling Griffons can execute swift and stunning attacks where every member of the squad works in perfect union with their brothers. The Battle-Brother and other members of his squad within Support Range can swap their Initiative order with other members of their Kill-team without penalty and without the need to use the Delay Action. Immediately upon starting his turn, a Battle-Brother can choose to either use it for himself or give it to another member of his squad, who then acts in his place. The Battle-Brother then takes the initiative place of the squad member who has taken his turn and will not act again until that time, unless of course another member of the squad chooses to grant him their own placing in the Initiative order. Regardless of the Battle-Brother’s new Initiative placing, he may still not act more than once a turn.",
    improvement: "At Rank 4 a Battle-Brother using this ability which gives up his initiative placing to act later in the turn gains a +10 to his first test as he is able to better survey the situation. At Rank 7 this +10 bonus to tests applies to all tests he makes in his turn."
  },
  "Dedicated Kill-Team": {
    name: "Dedicated Kill-Team",
    chapter: "Crimson Fists",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "The Battle-Brother and those within support range can combine their Hunter of Alien bonuses if they choose to attack a single target. In a single turn each successive attack against a single foe by a squad member with the Hunter of Aliens Talent adds the bonus to hit and Damage of the one before. Squad members without the Hunter of Aliens Talent can also benefit from this ability and... gain the current bonus to hit and Damage... but add nothing themselves.",
    improvement: "At Rank 6 the Kill-team can spread its attacks out among a number of foes and the cumulative bonuses to hit and Damage will work against any xenos of the chosen type in the combat provided all of the Kill-team remain in Support Range."
  },
  "Void Strike": {
    name: "Void Strike",
    chapter: "Marines Errant",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Coordinating fire to precisely eliminate targets without wasting ammunition. The Battle-Brother and those in Support Range gain +10 to Ballistic Skill tests and add +2 to the Penetration of their ranged weapons.",
    improvement: "At Rank 4, the bonus to Ballistic Skill increases to +20."
  },
  "Psychic Conclave": {
    name: "Psychic Conclave",
    chapter: "Blood Ravens",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Blood Ravens Librarians are skilled in using their abilities to predict the actions of their enemies. The Librarians within the Battle-Brother’s squad may choose to confer psychic powers with a range of 'Self' to those within Support Range. The chosen Battle-Brother becomes the recipient for the psychic power and benefits from all of its effects. The Librarian must choose at the start of each Turn to continue conferring the power, shift it, or use it himself. The power is activated and sustained as normal. More than one Librarian can benefit from this, and multiple powers can be conferred onto the same Battle-Brother.",
    improvement: "At Rank 4, activating the power becomes a Free Action. At Rank 7, psychic powers conferred on other Battle-Brothers do not count for that Round against the number of powers a Librarian is sustaining and thus do not reduce the Psy Rating of other powers."
  },
  "Reckless Assault": {
    name: "Reckless Assault",
    chapter: "Flesh Tearers",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "The Flesh Tearers are well known for their bloodthirsty assaults and the heedless brutality with which they throw themselves at their foes. Battle-Brothers of the Chapter are well schooled in such vicious attacks, which often disregard the more prudent and considered assaults as laid out by the Codex Astartes. When the Battle-Brother and other members of his Kill-team within Support Range make a Charge Action they may choose for it to be a Reckless Assault. A Reckless Assault follows all the normal rules for Charging (as described on page 238 of the DEATHWATCH Core Rulebook), however, if he managed to kill his foe with his Charge attack he may immediately make another Charge Action as a Free Action provided there is another foe within charge range. A Battle-Brother may only make one additional charge as part of a Reckless Assault even if he manages to also slay his second foe with his attack. The drawback of making a Reckless Assault is that the Battle-Brother completely ignores any kind of defence against his foes and as a result loses his Reaction for that turn.",
    improvement: "At Rank 4 the Battle-Brother increases his chance to hit when Charging by +10, this is in addition to the normal bonus to Weapon Skill for charging. At Rank 7 the Battle-Brother adds an additional 1d10 to Damage for the first attack made during a charge."
  },
  "Holy Vengeance": {
    name: "Holy Vengeance",
    chapter: "Black Templars",
    action: "Half Action",
    cost: 2,
    sustained: false,
    effects: "The holy fury of the Emperor lives in the hearts of all Black Templars, awaiting the time when it will be unleashed upon his foes. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat. Whenever the Battle-Brother and those in Support Range of him make a successful Standard Attack with a melee weapon (whether or not Damage is inflicted) they may immediately make an additional Standard Attack with that same weapon, against the same foe, as a Free Action. If this blow also hits, then they may make an additional Standard Attack and so on, up to a total number of extra attacks equal to their Agility Bonus.",
    improvement: "If the Battle-Brother is Rank 4 or more, summoning the Holy Vengeance is a Free Action."
  },
  "Fury of Sanguinius": {
    name: "Fury of Sanguinius",
    chapter: "Blood Angels",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "The Blood Angels possess a fury on the battlefield that can turn them into wild beasts intent only on rending their foes limb from limb. A Battle-Brother of the Blood Angels Chapter may call out to his Primarch Sanguinius to strengthen his arm and fill him with rage against his foes. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat. The Battle-Brother and those in Support Range of him add +10 to their Weapon Skill, Strength, and Toughness, including any corresponding increases in Strength Bonus and Toughness Bonus.",
    improvement: "If the Battle-Brother is Rank 4 or more the bonuses to Weapon Skill, Strength, and Toughness are increased to +20."
  },
  "Sustained Suppression": {
    name: "Sustained Suppression",
    chapter: "Dark Angels",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "Dark Angels are masters of holding their ground and have a keen understanding of the tactics of overlapping fields of fire and kill zones. While this ability is in effect, the Battle-Brother and those in Support Range of him may take actions normally while maintaining Overwatch (see page 241), such as moving and making attacks. The attacks made while using this ability may include single shot and semi-auto fire, but not full-auto bursts.",
    improvement: "If the Battle-Brother is Rank 4 or more, the test to avoid Pinning when caught in a kill zone created by him or those supporting him increases from Hard (–20) to Very Hard (–30)."
  },
  "Tooth and Nail": {
    name: "Tooth and Nail",
    chapter: "Space Wolves",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "The animalistic nature and fighting style of the Space Wolves often gives them an edge in close combat where they may unleash their inner beast against their enemies. While this ability is in effect, the Battle-Brother and those in Support Range of him may re-roll all Opposed Tests in grapples, add an additional +10 to any bonuses for outnumbering foes in hand-to-hand, and add +10 to Dodge and Parry rolls against melee attacks.",
    improvement: "If the Battle-Brother is Rank 4 or more, the bonus to outnumbering and to Dodge rolls increases to +20."
  },
  "Lightning Strike": {
    name: "Lightning Strike",
    chapter: "Storm Wardens",
    action: "Reaction",
    cost: 2,
    sustained: false,
    effects: "The Storm Wardens know well the doctrine of strike first, strike fast and practise this both in personal duels and their squad tactics. A Battle-Brother of the Storm Wardens Chapter may order a Lightning Strike at the start of any combat where neither side is Surprised (see page 235). The Battle-Brother and those in Support Range of him immediately gain a Surprise Round just as if they had Surprised their foes. This ability only lasts for the duration of the Battle-Brother’s turn instead of the full combat.",
    improvement: "If the Battle-Brother is Rank 3 or more, in addition to gaining a Surprise Round, both he and those supporting him may roll two dice and choose the highest when determining their Initiative for the following combat."
  },
  "Lead by Example": {
    name: "Lead by Example",
    chapter: "Ultramarines",
    action: "Free Action",
    cost: 2,
    sustained: true,
    effects: "Of all the Chapters, the Ultramarines pride themselves as among the most loyal and bravest of all the Emperor’s chosen, a fact that they like to impress upon their fellow Battle-Brothers. While this power is in effect, all Battle-Brothers within Support Range of the Battle-Brother (including the Battle-Brother himself ) gain a bonus on all tests equal to the Battle-Brother’s Fellowship Bonus. In addition, each Round the Battle-Brother may single out one member of his Kill-team and grant that character a re-roll on any one test (this re-roll includes the bonus provided by his Fellowship).",
    improvement: "If the Battle-Brother is Rank 4 or more, the bonus to tests increases to twice his Fellowship Bonus."
  },
  "Tactical Bolter Drill": {
    name: "Tactical Bolter Drill",
    chapter: "Imperial Fists",
    action: "Free Action",
    cost: 2,
    sustained: false,
    effects: "The Imperial Fists are every bit as effective in the attack as the most ferocious of their fellow Chapters. Rather than savagery however, their methods rely upon the precise application of firepower, selfless discipline and a refusal to accept that a foe cannot be taken down. With this ability in effect, the Battle-Brother and those in Support Range gain the benefits of the Bolter Drill Talent when firing bolt pistols, bolters, heavy bolters, and storm bolters.",
    improvement: "If the Battle-Brother is Rank 3 or more, all Battle-Brothers benefiting from this ability gain a +10 to BS when firing a bolt pistol, bolter, heavy bolter, or storm bolter."
  },
  "Crimson Tide": {
    name: "Crimson Tide",
    chapter: "Blood Angels",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "Since the Great Crusade, the Blood Angels have had a reputation as fearsome shock troops, using a combination of speed, controlled fury and intimidation to crush enemy after enemy. This reputation itself is part of their strategy, employing the fear of their prowess as just another weapon in their arsenal. A Blood Angels assault is a swift and terrible thing, driving enemies back in terror even as their comrades fall to the blades of Sanguinius’ Sons. While this ability remains in effect, the Battle-Brother and those in Support Range gain the Fear (1) Trait (or, if they already have the Fear Trait, increase it by 1, to a maximum of Fear (3)) whenever they perform a Charge action.",
    improvement: "If the Battle-Brother is Rank 4 or above, then the Charge Move of the Battle-Brother and those in Support Range increases to 4 x Agility Bonus, instead of the normal 3 x Agility Bonus."
  },
  "Codex Manoeuvres": {
    name: "Codex Manoeuvres",
    chapter: "Red Scorpions",
    action: "Full Action",
    cost: 4,
    sustained: true,
    effects: "The Red Scorpions revere the Codex Astartes as a religious text, sacred orders laid down by true servants of the God-Emperor and integral to the strength and effectiveness of the Chapter. In battle they can use the Codex to execute flawless attacks and provide an answering tactic to anything the enemy throws at them. The Battle-Brother’s Kill-team gains a number of re-rolls equal to the number of its members each turn (measured from the start of the squad leader’s turn to the start of his following turn) reflecting the greater efficiency which the squad works together while adhering to the Codex. These re-rolls form a pool which can be used by any Battle-Brother in support range of the squad leader and are replenished at the start of the next turn. Remember though that a dice roll can only ever be re-rolled once and the player must abide by the re-rolled result. This pool can be used to re-roll Weapon Skill, Ballistic Skill, Dodge, and Parry Tests.",
    improvement: "At Rank 4 activating this ability becomes a Half Action. At Rank 6 this ability costs 1 less point of Cohesion to activate."
  },
  "Angel's Wrath": {
    name: "Angel's Wrath",
    chapter: "Dark Angels",
    action: "Full Action",
    cost: 2,
    sustained: true,
    effects: "The Dark Angels’ righteous disdain for their foes and their urgent fervour to demonstrate their devotion and loyalty to the Emperor makes them decisive and ruthless in battle. There are few things that can stand before so driven and focussed an assault. While this ability remains in effect, all attempts to Dodge or Parry the attacks of the Battle-Brother and those in Support Range suffer a –10 penalty.",
    improvement: "If the Battle-Brother is Rank 4 or above, the penalty to Dodge and Parry Tests increases to –20."
  },
  "Unto the Breach": {
    name: "Unto the Breach",
    chapter: "Imperial Fists",
    action: "Full Action",
    cost: 3,
    sustained: true,
    effects: "For the Imperial Fists, a siege is not simply a military operation. It is the supreme test of courage, skill and resolve, the ultimate crucible of war. The veteran of a siege has tested himself in the fires of war and emerged an exemplar, a leader whose brethren will follow him into the most desperate of assaults, certain that by heeding his example they will emerge victorious. Unto the Breach may be used when the Kill-team is assaulting a fortified position held by an enemy, and may be activated as the Battle-Brothers close on the enemy position. With this ability in effect, the Battle-Brother and those in Support Range are entirely immune to the effects of Fear, and reduce the effects of any negative movement modifiers incurred during their charge by one level.",
    improvement: "If the Battle-Brother is Rank 5 or more, he and all members of the Kill-team within Support Range also gain one “free” Fate Point for the duration of their assault on the enemy position (as determined by the GM)."
  },
  "The Hunt": {
    name: "The Hunt",
    chapter: "Space Wolves",
    action: "Free Action",
    cost: 1,
    sustained: false,
    effects: "The Wolves of Fenris hunt. If nothing else can be said of the Space Wolves’ way of war, it is that they hunt. With raw aggression tempered by ruthless cunning and surprising discipline, the Space Wolves are not the savage berserkers many take them to be, but rather circumspect and cruel predators, closing upon their foes intimidatingly, striking only at the moment their foe is at their weakest. The Battle-Brother may call the Hunt at the start of any combat, requiring a Full Action during his first Turn. The Battle-Brother and any of those in Support Range may immediately move up to their Agility Bonus in metres towards the enemy, and make a Challenging (+0) Intimidate Test. If one or more of these Tests is passed, any enemies attacked before the start of the Battle-Brother’s next turn suffer a penalty on all Dodge and Parry Tests equal to –5x the number of Intimidate Tests passed.",
    improvement: "If the Battle-Brother is Rank 4 or above, the Battle-Brother and those in support range may move up to twice their Agility Bonus in metres."
  },
  "Coordinated Strike": {
    name: "Coordinated Strike",
    chapter: "Ultramarines",
    action: "Free Action",
    cost: 2,
    sustained: false,
    effects: "All warriors can fight alone, but it is a point of particular pride amongst the Adeptus Astartes—and the Ultramarines in particular—that a squad is greater than the sum of the warriors who make it up. Their discipline and coordination allow them to slay their enemies with ruthless efficiency, each Battle-Brother cutting down the foes his brothers wound, or selflessly maiming foes for his brothers to slay. The Battle-Brother may call for a Coordinated Strike, which lasts until the beginning of his following turn. During this time, the Battle-Brother and all those within Support Range gain a +2 bonus to all damage rolls when attacking an enemy who has already been hit by a member of the Killteam during the Coordinated Strike.",
    improvement: "If the Battle-Brother is Rank 4 or above, the bonus to damage rolls increases to +5."
  },
  "Synchronised Assault (Ultramarines)": {
    name: "Synchronised Assault",
    chapter: "Ultramarines",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "The Ultramarines prize fluid tactics and adaptability, understanding that the tides of battle can change at a moment’s notice. When rolling for initiative, the Battle-Brother may call for a Synchronised Assault. For the duration of that combat, the Battle-Brother and those in Support Range may exchange initiative rolls freely before the first round begins, choosing amongst themselves the sequence in which they wish to act.",
    improvement: "If the Battle-Brother is Rank 4 or above, they may exchange initiative rolls freely at the start of each round instead of only at the start of the combat."
  },
  "Ruthless Advance": {
    name: "Ruthless Advance",
    chapter: "Iron Hands",
    action: "Half Action",
    cost: 2,
    sustained: false,
    effects: "The Iron Hands are renowned for their implacable methods of war, able to capture and hold ground in the face of superior numbers or inhospitable terrain. The Battle-Brother and those within Support Range may spend their Reactions to make a Full Move. This movement must be made towards the nearest enemy. The Space Marines using this ability are immune to pinning until the beginning of their next Turn.",
    improvement: "If the Battle-Brother is Rank 4 or more, activating this ability becomes a Free Action."
  },
  "Exploit Weakness": {
    name: "Exploit Weakness",
    chapter: "Raven Guard",
    action: "Half Action",
    cost: 4,
    sustained: false,
    effects: "The Raven Guard use precise application of force to cripple their enemy. The squad works in concert to exploit the foe’s weaknesses and deliver potent, strategic blows. As a Half Action, any Battle-Brother in Support Range may single out an enemy. Until the beginning of that Battle-Brother’s next turn, all members of the Kill-team may re-roll damage rolls against that target (the second result must be taken). Only one target may be singled out at a time.",
    improvement: "At Rank 5, singling out a target becomes a Free Action."
  },
  "Into the Fires of Battle": {
    name: "Into the Fires of Battle",
    chapter: "Salamanders",
    action: "Free Action",
    cost: 3,
    sustained: false,
    effects: "The Salamanders are relentless on the attack, pushing forward inexorably to crush their foes. When the Battle-Brother uses this ability, both he and those in Support Range may make an immediate Half Move and two Standard Attacks with any ranged weapon.",
    improvement: "If the Battle-Brother is Rank 3 or more, then both Standard Attacks may be exchanged for a single Semi Auto Burst or Full Auto Burst."
  },
  "Swift Assault": {
    name: "Swift Assault",
    chapter: "White Scars",
    action: "Free Action",
    cost: 3,
    sustained: true,
    effects: "When attacking, the White Scars are swift and deadly, advancing quickly and manoeuvring deftly around their enemies, harassing them at range before closing to deal the killing blow. While this ability is in effect, the Battle-Brother and those in support range of him gain a bonus Half Action each Round, so long as at least one of the actions they perform has the Movement sub-type (with the exception of the Dodge Reaction, but including any vehicle movement actions). If a character does not perform an action with the Movement sub-type, they do not get the additional Half Action. A character may still not perform the same action twice in the same turn.",
    improvement: "If the Battle-Brother is Rank 4 or more, then enemies attacked by the Battle-Brother or any other member of the Kill-Team in Support Range suffer a –10 penalty on Dodge and Parry Tests, as they struggle to defend themselves against the fast-moving Astartes."
  },
  "Judgement of Sigismund": {
    name: "Judgement of Sigismund",
    chapter: "Black Templars",
    action: "Full Action",
    cost: 2,
    sustained: false,
    effects: "The Black Templars regard themselves as judge and executioner for all those who have betrayed the Emperor and mankind, and all those who would stand opposed to the rule of the Imperium, enacting the ultimate judgement with every foe slain and every battle won. A Battle-Brother may invoke the Judgement of Sigismund upon a single enemy he can see, granting all others within Support Range a bonus to Damage rolls against that enemy equal to the Battle-Brother’s Willpower Bonus until that enemy is dead. Once the judged enemy is slain, this ability ends.",
    improvement: "If the Battle-Brother is Rank 3 or above, he may invoke the Judgement of Sigismund again upon a different enemy as a Free Action and with no Cohesion cost as soon as the previous enemy is slain."
  }
};

export const GENERAL_SOLO_MODE_ABILITIES = [
  {
    name: "Burst of Speed",
    requiredRank: 1,
    effects: "A Battle-Brother can call on reserves of speed when needed, crossing great distances to close with the foe. Once per game session, a Battle-Brother can perform a Burst of Speed. Burst of Speed ability is a Free Action that can be activated at the start of a turn. This ability increases the character’s Agility Bonus by 2 with all the usual associated benefits for a number of Rounds equal to his Rank.",
    improvement: "At Rank 3 and above Burst of Speed also adds a +10 to all Agility tests based on movement. At Rank 5 the bonus to Agility Bonus increases to +4. At Rank 7 this ability allows the Battle-Brother to ignore the need to make Agility Tests when running or charging in difficult terrain"
  },
  {
    name: "Emperor's Grace",
    requiredRank: 7,
    effects: "A Battle-Brother is touched by the divine will of the Emperor, a piece of the Master of Mankind passed down to him through his Primarch and the teachings of his Chapter. Once per game session, a Battle-Brother can call on the Emperor’s Grace to recover spent Fate Points. Emperor’s Grace ability can be activated as a Free Action or a Reaction. For a number of Rounds equal to his Rank, whenever the Battle-Brother spends a Fate Point, he should roll 1d10. If he scores equal or less than his Rank, the Fate Point is immediately recovered. This ability cannot restore Fate Points that have been burnt.",
    improvement: "This ability does not improve with Rank."
  },
  {
    name: "Extreme Endurance",
    requiredRank: 5,
    effects: "Battle-Brothers are born tough. Even before being gifted with their Chapter’s gene-seed, they are selected for their endurance and physical stamina, a trait that only strengthens over time. Once per game session, a Battle-Brother may use his Extreme Endurance to fortify his constitution, granting him a re-roll on all Toughness Tests for a number of hours equal to his Rank. Extreme Endurance can be activated as a Free Action or a Reaction.",
    improvement: "At Rank 7 the Battle-Brother may add +20 to the result of the re-roll."
  },
  {
    name: "Feat of Strength",
    requiredRank: 1,
    effects: "Space Marines are genetically gifted with great strength far exceeding that or normal men. In times of need, a Battle-Brother can push this great brawn to its limits to perform truly impressive feats. Once per day of game time, a Battle-Brother may perform a Feat of Strength. Feat of Strength is a Free Action that can be activated at the start of a turn. This ability effectively increases his Unnatural Strength Trait (see page 136) by one level, so for instance Unnatural Strength x2 becomes Unnatural Strength x3. This effect lasts for a number of Rounds equal to his Rank.",
    improvement: "At Rank 3 and above Feat of Strength also adds +10 to all Strength Tests and Strength-based Skill Tests for its duration. At Rank 5 and above Feat of Strength last for a number of Rounds equal to twice the character’s Rank. At Rank 7 and above Feat of Strength increases the character’s Unnatural Strength Trait by two levels."
  },
  {
    name: "Mental Fortress",
    requiredRank: 5,
    effects: "The Adeptus Astartes are as strong of mind as they are of body, their training and devotion to the Emperor hardening their wills against the perils of a deadly universe. Once per game session, a Battle-Brother may use the Mental Fortress ability to re-roll a failed Willpower Test to resist a Psychic Power or an attempt to subvert his will.",
    improvement: "At Rank 7 the Battle-Brother may add +20 to the result of the re-roll."
  },
  {
    name: "Renewed Vigour",
    requiredRank: 3,
    effects: "A Space Marine’s physiology and his training give him an incredible tolerance to pain, injury, and wounds. Once per game session, a Battle-Brother may call upon his Renewed Vigour. This is a Free Action that can be done at the start of any of his Turns. For a number of Rounds equal to his Rank, he can ignore the effects of a single critical hit, such as Stunning, levels of Fatigue, or unconsciousness. Note, however, this does not allow the use of limbs that have been completely blown off or critical hits that result in death. Also, any new critical hit effects suffered during the Renewed Vigour affect the Battle-Brother as normal.",
    improvement: "At Rank 5 the Renewed Vigour also restores a number of Wounds to the Battle-Brother equal to his Rank. At Rank 7 the Battle-Brother can ignore all of the critical hit effects he is currently suffering from for the duration of the ability."
  }
];

export const TACTICAL_MARINE_ABILITIES = [
  {
    name: "Bolter Mastery",
    description: "The Tactical Marine gains a +10 bonus to all Ballistic Skill Tests and +2 to Damage when firing a Bolt weapon. This ability only functions in Solo Mode."
  },
  {
    name: "Tactical Expertise",
    description: "When initiating a Squad Mode ability, the Tactical Marine may share the benefits of his Chapter’s Squad Mode abilities with the members of his Kill-team as if they were part of his Chapter. This requires a successful Hard (-20) Command Test. At Rank 3, the Command Test becomes Challenging (+0). At Rank 7, the Command Test becomes Routine (+20). This Command Test is rolled once when the Tactical Marine initiates the Squad Mode ability for the first time during the mission (for Sustained Squad Mode abilities) or during the combat encounter (for nonsustained Squad Mode abilities). If the Command Test is successful the Tactical Marine may then share the benefits of his Chapter’s Squad Mode ability freely for the full duration of the Squad Mode ability."
  }
];

export const APOTHECARY_ABILITIES = [
  {
    name: "Guardian of Purity",
    description: "The Apothecary’s careful monitoring of his Battle-Brothers’ gene-seed means that any Space Marine in a Kill-team that includes the Apothecary reduces all Corruption Points he suffers by 2 (to a minimum of 1), as long as the Apothecary has access to his narthecium—a special tool that assists with battlefield surgery (see page 173)."
  },
  {
    name: "Create Toxins",
    description: "Once per day, the Apothecary can create a virulent poison that he can hand out to the members of his Kill-team to help destroy a particular enemy. The Apothecary needs a tissue sample of a particular enemy, his narthecium, and one hour to create the toxins. Once the toxin is applied, the Kill-team’s attacks in the next combat all have the Toxic quality against the enemy type (Tyranid, Tau, etc.) for a number of rounds equal to the Apothecary’s Intelligence Bonus. Creatures with the Daemonic Trait are not affected by this ability. In order to benefit from this ability, the Space Marines in the Kill-team must be in Squad Mode."
  },
  {
    name: "Enhance Healing",
    description: "The Apothecary may restore 1d5 additional Wounds with any successful Medicae Test for First Aid (see page 102)."
  }
];

export const ASSAULT_MARINE_ABILITIES = [
  {
    name: "Wings of Angels",
    description: "The Assault Marine may add 20 metres the movement rate of his Jump Pack with a successful Challenging (+0) Pilot (Personal) Test. When making a Charge whilst using this ability, the Space Marine adds an additional 1d5 Damage to any melee attacks. This ability only functions when in Solo Mode."
  },
  {
    name: "Wrathful Descent",
    description: "When making a Charge against a Horde, the Assault Marine may inflict an additional 1d10 damage to the Horde’s Magnitude on his first successful attack. This ability only functions when in Squad Mode."
  }
];

export const DEVASTATOR_MARINE_ABILITIES = [
  {
    name: "Immovable Warrior",
    description: "When the Devastator Marine is wielding a Heavy weapon and behind cover, he gains the Sturdy Trait and a +10 bonus to all Ballistic Skill Tests. This ability only functions in Solo Mode."
  },
  {
    name: "Unrelenting Devastation",
    description: "When the Devastator Marine successfully attacks and damages a Horde with a Heavy weapon, he deals an additional 1d5 damage to the Horde’s Magnitude. This additional damage stacks with any other additional damage dealt to the Horde, such as damage from a Blast weapon or a Flame weapon. This additional damage applies per attack, not per hit. If the attack deals damage to multiple Hordes, the Marine chooses which Horde takes the extra damage."
  }
];

export const EMPERORS_CHAMPION_ABILITIES = [
  {
    name: "Slayer of Champions",
    description: "The creature challenged can have an Intelligence of no less than 15—any lower and it is little more than a mindless beast rather than a warrior—but otherwise can be anything, so long as it leads others of its kind in battle, or fights as a champion for those that do. Whether or not the challenged foe accepts, the Champion’s full attentions are focussed upon slaying that enemy, and he will leave Squad Mode immediately. While that enemy lives, the Emperor’s Champion gains the Hatred Talent appropriate to that enemy, and may activate any one of his Black Templars Solo Mode Abilities and have it remain in effect until the enemy is slain rather than only lasting for the normal duration."
  }
];

export const EMPERORS_CHAMPION_VOWS: { [key: string]: string } = {
  "Abhor the Witch, Destroy the Witch": "The Champion counts his Agility Bonus as 1 higher for the purposes of movement, so long as he is moving to engage an enemy psyker, and he gains a +20 bonus on all Tests to resist the effects of Psychic Powers. If the Emperor’s Champion is the Kill-team’s leader, then all members of the team gain this Vow’s effects, but the team loses 2 points of Cohesion if there is a Librarian among them.",
  "Accept Any Challenge, No Matter the Odds": "In melee combat, the Champion gains a +10 bonus to hit and a +2 bonus to Damage against all enemies. However, such is his zeal to strike them down that he does not as readily defend himself, and thus suffers a –10 penalty on all Tests to Dodge or Parry. If the Emperor’s Champion is the Kill-team’s leader, then all members of the team gain this Vow’s effects.",
  "Suffer Not The Unclean To Live": "The Champion summons up greater reserves of strength with which to strike down his foes, granting him a +5 bonus to all Damage rolls made in melee combat. However, this holy might takes time to muster, granting enemies a +10 bonus to Dodge and Parry Tests as they move to counter the Champion’s slow-but-deadly strikes. If the Emperor’s Champion is the Kill-team’s leader, then all members of the team gain this Vow’s effects.",
  "Uphold the Honour of the Emperor": "The Champion’s faith in the Emperor and his own might allows him to stride unflinching through enemy fire. He counts his Toughness Bonus as 2 higher than normal for the purposes of resisting Damage and becomes immune to Pinning. The Champion may not skulk or cower to elude the enemy’s gaze and thus may not make use of the Concealment, Silent Move, or Shadowing Skills, nor may he benefit from any Squad Mode Abilities which rely on him taking cover, such as Squad Advance or Go to Ground. If the Emperor’s Champion is the Kill-team’s leader, then all members of the team gain this Vow’s effects."
};

export const DEATHWATCH_CHAMPION_ABILITIES = [
  {
    name: "Xenos Bane",
    description: "Whenever the Champion scores Righteous Fury against an alien enemy with equal or fewer Wounds than he has (using his total rather than his current) the enemy must make a Challenging (+0) Toughness Test or be instantly slain. In addition, all attacks (even unarmed ones) made by the champion against xenos creature count as having the Toxic Special Quality."
  }
];

export const DEATHWATCH_CHAPLAIN_ABILITIES = [
  {
    name: "Fearsome Presence",
    description: "The Chaplain adds a bonus point to the Kill-team’s Cohesion, and the Chaplain may perform a special Oath if he is the Kill-team’s leader. The Chaplain gains the following Talents: Fearless, Hatred (Choose one), and Litany of Hate."
  },
  {
    name: "Oath: Liturgies of Battle",
    description: "All Battle-Brothers in Support Range of the Chaplain gain the Fearless Talent. In addition, the effects of the Chaplain’s Litany of Hate Talent extend to all Battle-Brothers in support range, and the effects of that Talent are Doubled (from +10 to +20) when performing a charge."
  }
];

export const DEATHWATCH_EPISTOLARY_ABILITIES = [
  {
    name: "Xenos Psychology",
    description: "Deathwatch Librarians excel at countering and combating xenos pykers and alien witches, subverting their powers and breaking their will with a single thought. By the time a Battle-Brother attains the rank of Epistolary he has become a true master of psychic warfare and has learnt well the strengths and weaknesses of the alien mind and how best to exploit them. This ability gives the Battle-Brother an edge whenever he uses his psychic powers against a xenos foe, be it a cursed Eldar, bloodthirsty Ork or hated Tau. This ‘edge’ equates to a bonus to all damage caused by psychic means (including damage inflicted by force weapons) equal to the Battle-Brother’s Willpower Bonus. This bonus damage is only ever added once, regardless of the amount of psychic damage caused or the number of dice rolled. In addition to this extra damage, the Battle-Brother is also more adept at defeating the alien will and so gains a +10 to all Opposed Willpower Tests to use psychic powers on xenos."
  }
];

export const DEATHWATCH_FORGE_MASTER_ABILITIES = [
  {
    name: "Master Armourer",
    description: "The Tech-Priests of Mars are masters of the secret and lost technical lore of the Imperium, harbouring a knowledge of machines and machine spirits long lost to the bulk of humanity. When a Techmarine is trained on Mars he gains some of this knowledge so that he might better serve his Chapter, though even such training is only the tip of the iceberg and the very beginning of understanding. A Forge Master has taken the next step and through long years of working with ancient weapons and armour has developed a knack and empathy with machines that allows him to use them in unexpected and interesting ways, coaxing abilities from archaic tech and stubborn machine spirits. To reflect this unique gift, a Master Armourer may unlock or suppress a single Special Quality in a ranged or melee weapon. This must be done at the start of a Mission, during the preparation stage and will only apply to one item, though it need not be wielded by the Forge Master. The effects of this ability last for the duration of the Mission but are otherwise not permanent. The Forge Master may unlock the following qualities: Melee Weapons—Balanced, Defensive, Razor Sharp, Shocking. Ranged Weapons—Accurate, Gyro-Stabilised, Reliable. The Forge Master may suppress the following qualities: Melee Weapons—Primitive, Unbalanced, Unwieldy. Ranged Weapons—Overheats, Recharge."
  }
];

export const DEATHWATCH_KEEPER_ABILITIES = [
  {
    name: "Oath Bound",
    description: "A Keeper holds a special place within the ranks of the Deathwatch and has direct control over some of its most valuable assets as well as access to some of its most sensitive secrets. This binding process has the following effects:\n• A Closed Book—the Keeper gains a +30 to resist all attempts to control his mind, such as from Telepathy powers. In addition if the Keeper would not normally be allowed a chance to resist a mind controlling effect he may spend a Fate point to be allowed a Challenging (+0) Willpower Test to ignore its effects.\n• Alien Witchcraft—a Keeper is often required to deal with dangerous and subversive xenos and has had his mind hardened against their trickery. Whenever an alien foe uses a skill or ability which forces the Keeper to make an Opposed Willpower or Fellowship Test (excluding those from psychic powers) the Keeper automatically wins with one degree of success.\n• Beyond Reproach—those that recognise a Keeper will respect his position and favour him with their trust. When dealing with NPCs, the Keeper improves their Disposition by two degrees. This automatically applies when dealing with members of the Deathwatch and may apply to other organisations at the GM’s discretion."
  }
];

export const DEATHWATCH_KILL_MARINE_ABILITIES = [
  {
    name: "ONE MAN KILL-TEAM",
    description: "His unique ability allows the Kill-marine to enter Squad Mode without the support of another Battle-Brother. The Battle-Brother generates and uses his Cohesion as normal, though he receives no bonus Cohesion points for having the Command Skill—he simply need not be in support range of another Battle-Brother to enter or maintain Squad Mode. When in Squad Mode the Kill-marine can use the following (and only the following) Squad Mode Abilities: Bolter Assault, Dig in, Fire for Effect, Furious Charge and Regroup."
  }
];

export const DEATHWATCH_CAPTAIN_ABILITIES = [
  {
    name: "Improved Tactics",
    description: "Taking time to review data on the Kill-team’s intended target, the Battle-Brother gains insight into the intentions of the enemy. The Battle-brother may re-roll a number of Tactics Tests up to his Intelligence Bonus during the course of the Mission. These Tactics Tests must be directly related to his Kill-team and their actions on the Battlefield. Furthermore, this ability allows all members of the Kill-team to automatically enter squad mode a number of times equal to the Watch Captain’s Intelligence Bonus during the Mission."
  },
  {
    name: "Increased Resources",
    description: "The Deathwatch Captain places a request for more resources for his Mission, stressing its vital importance with the higher echelons of command. The Battle-Brother gains and additional 1d10 x Intelligence Bonus in Requisition points for his Kill-team which he may choose to divide amongst his team as he sees fit."
  },
  {
    name: "Renown Boost",
    description: "Using his logistical savvy the Deathwatch Captain secures hard-to-find resources or rare equipment from the Chapter’s quartermasters. All members of the Kill-team, including the Deathwatch Captain, count as having a level of Renown one higher than normal for the duration of this Mission (i.e., a Battle-Brother with a Renown of Respected counts as Distinguished, etc)."
  },
  {
    name: "Auxiliary Support",
    description: "The Deathwatch Captain calls in additional units to help the Kill-team in their mission by hitting another nearby target or attacking the enemy in another location to ease pressure on the Battle-Brothers. This equates to 2d10 x the Deathwatch Captain’s Intelligence Bonus in Kill Markers which he can apply to any mission objective making it easier for the Kill-team to complete."
  },
  {
    name: "Bolster Morale",
    description: "At a crucial moment the Deathwatch Captain can boost the morale of his men using his natural aura of command to spur them on to greater efforts. Once during the course of the mission the Deathwatch Captain can restore his Kill-team’s Cohesion by 1d10 + his Fellowship Bonus. This can be done at any time and counts as a Free Action. This cannot raise the Kill-team’s Cohesion above its normal maximum."
  }
];

export const DEATHWATCH_EPISTOLARY_PSYCHIC_POWERS = [
  {
    name: "Alien Minds",
    category: "Epistolary powers",
    cost: 1500,
    action: "Half",
    opposed: "Yes",
    range: "5 metre radius x PR",
    sustained: "No",
    description: "By reading the moods and surface thoughts of nearby aliens the Librarian can anticipate their actions and gain insight into their intentions. The Librarian chooses a number of xenos in range, equal to or less than his PR, to be affected by this power. Each affected alien must then make an Opposed Willpower Test with the Librarian to hide their thoughts from him. Those that fail suffer a –5 x PR penalty to Dodge and Parry Tests against the Librarian in the following Turn. In addition, the GM can provide the player with some limited insight into the affected aliens’ actions on the following Turn such as where they intend to move, which weapons they are going to use or if they are planning on attacking or retreating."
  },
  {
    name: "Bond of Brotherhood",
    category: "Epistolary powers",
    cost: 1500,
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "This power has two primary functions, one that helps the Kill-team work together and one that aids the Librarian’s efforts at building goodwill with other Space Marines.\n\nThe Epistolary focuses his mind upon the links between himself and his fellow Battle-Brothers in the Kill-team, inspiring them with scenes of victory and shared peril. When this power is activated, the Kill-team may enter Squad Mode at no penalty and without requiring a Cohesion roll. The Kill-team regains 1 point of Cohesion per degree of success on the Focus Power Test if it had suffered any Cohesion Damage, and the Librarian may treat the other members of his Kill-team as if they were part of his Chapter for Squad Mode Abilities.\n\nAlternatively, the Librarian may also use this power to subtly support the weight of his arguments in council or when influencing other Adeptus Astartes Chapters. A successful use of this power increases the Librarian’s Fellowship by +5 for every degree of success on his Focus Power Test. However, the use of this ability does not function against a Space Marine with the Hatred (Psykers) Talent, and certain Chapters with prejudices against psykers (such as the Black Templars) may find the use of this power as an insult rather than an attempt at diplomacy."
  }
];

export const PERSONAL_DEMEANORS = [
  { name: "Calculating", description: "The Space Marine’s mind is highly analytical..." },
  { name: "Gregarious", description: "The Space Marine is a charismatic and talkative sort..." },
  { name: "Hot-Blooded", description: "The Space Marine is quick to temper and aggressive in all things." },
  { name: "Studious", description: "The Space Marine values lore and learning." },
  { name: "Taciturn", description: "The Space Marine is a brooding individual." },
  { name: "Pious", description: "The Space Marine cherishes faith in his Primarch and the Emperor." },
  { name: "Stoic", description: "No test of endurance is too much." },
  { name: "Scornful", description: "Pity has no place in this Space Marine’s heart." },
  { name: "Ambitious", description: "This Space Marine’s gaze is ever-lifted towards his goal." },
  { name: "Proud", description: "Dignity and honour are important." }
];

export interface AdvancedSpecialityRule {
  name: string;
  xpCost: number;
  requiredChapter?: string;
  forbiddenChapter?: string;
  check: (char: CharacterData, getScore: (key: keyof Characteristics) => number) => { ok: boolean; reason?: string };
}

export const ADVANCED_SPECIALITY_RULES: AdvancedSpecialityRule[] = [
  {
    name: "Wolf Guard",
    xpCost: 4000,
    requiredChapter: "Space Wolves",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Space Wolves") reasons.push("Space Wolves only");
      if (char.rank < 5) reasons.push("Rank 5+");
      if (['Apothecary', 'Techmarine', 'Librarian'].includes(char.specialization)) reasons.push("Not Apothecary/Techmarine/Librarian");
      if (!char.talents.some(t => t === "Wisdom of the Ancients" || t.startsWith("Wisdom of the Ancients "))) reasons.push("Wisdom of the Ancients talent");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      if (getScore('BS') < 40) reasons.push("BS 40+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (char.renown < 50) reasons.push("Renown 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Black Shield",
    xpCost: 0,
    check: (char) => ({ ok: char.rank >= 1 })
  },
  {
    name: "Deathwatch Champion",
    xpCost: 4000,
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (char.renown < 40) reasons.push("Renown 40+");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Chaplain",
    xpCost: 3000,
    forbiddenChapter: "Space Wolves",
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (getScore('WP') < 45) reasons.push("WP 45+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (['Librarian', 'Techmarine'].includes(char.specialization)) reasons.push("Not Librarian/Techmarine");
      if (char.chapter === "Space Wolves") reasons.push("Not Space Wolf");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Dreadnought",
    xpCost: 5000,
    check: (char) => {
      const reasons = [];
      if (char.fate.current > 0) reasons.push("0 Fate Points");
      if (char.renown < 60) reasons.push("Renown 60+");
      if (char.specialization === "Librarian") reasons.push("Not Librarian");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Epistolary",
    xpCost: 2000,
    check: (char) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (char.specialization !== "Librarian") reasons.push("Must be Librarian");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Forge Master",
    xpCost: 2000,
    check: (char) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (char.specialization !== "Techmarine") reasons.push("Must be Techmarine");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Keeper",
    xpCost: 3000,
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (char.renown < 50) reasons.push("Renown 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Kill-Marine",
    xpCost: 1000,
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 1) reasons.push("Rank 1+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (['Techmarine', 'Apothecary'].includes(char.specialization)) reasons.push("Not Tech/Apoth");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Captain",
    xpCost: 3000,
    check: (char) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (char.renown < 60) reasons.push("Renown 60+");
      if (!char.hasCruxTerminatus) reasons.push("Crux Terminatus Required");
      const commandSkill = char.skills.find(s => s.name === "Command");
      if (!commandSkill || commandSkill.mastery < 3) reasons.push("Command +20 Required");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "First Company Veteran",
    xpCost: 2000,
    check: (char) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (!char.hasCruxTerminatus) reasons.push("Crux Terminatus Required");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Furioso Dreadnought",
    xpCost: 6000,
    requiredChapter: "Blood Angels",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Blood Angels") reasons.push("Must be Blood Angels");
      if (char.fate.current > 0) reasons.push("0 Fate Points");
      if (getScore('WS') < 60) reasons.push("WS 60+");
      if (char.renown < 80) reasons.push("Renown 80+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Sanguinary Priest",
    xpCost: 1000,
    requiredChapter: "Blood Angels",
    check: (char) => {
      const reasons = [];
      if (char.chapter !== "Blood Angels") reasons.push("Must be Blood Angels");
      if (char.specialization !== "Apothecary") reasons.push("Must be Apothecary");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Ravenwing Veteran",
    xpCost: 1000,
    requiredChapter: "Dark Angels",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Dark Angels") reasons.push("Must be Dark Angels");
      if (getScore('Ag') < 45) reasons.push("Ag 45+");
      if (getScore('Per') < 35) reasons.push("Per 35+");
      if (getScore('WP') < 35) reasons.push("WP 35+");
      if (char.rank !== 1) reasons.push("Rank 1 only");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwing Terminator",
    xpCost: 3000,
    requiredChapter: "Dark Angels",
    check: (char) => {
      const reasons = [];
      if (char.chapter !== "Dark Angels") reasons.push("Must be Dark Angels");
      if (char.rank < 4) reasons.push("Rank 4+");
      if (!char.hasCruxTerminatus) reasons.push("Crux Terminatus Required");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Wolf Scout",
    xpCost: 200,
    requiredChapter: "Space Wolves",
    check: (char) => {
      const reasons = [];
      if (char.chapter !== "Space Wolves") reasons.push("Must be Space Wolves");
      if (char.rank !== 1) reasons.push("Rank 1 only");
      if (char.specialization !== "Tactical Marine") reasons.push("Tactical Marines only");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Wolf Priest",
    xpCost: 4000,
    requiredChapter: "Space Wolves",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Space Wolves") reasons.push("Must be Space Wolves");
      if (char.rank < 4) reasons.push("Rank 4+");
      if (getScore('WP') < 45) reasons.push("WP 45+");
      if (getScore('Fel') < 45) reasons.push("Fel 45+");
      if (getScore('Int') < 45) reasons.push("Int 45+");
      if (char.specialization === "Librarian" || char.specialization === "Techmarine") reasons.push("Cannot be Librarian or Techmarine");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Tyrannic War Veteran",
    xpCost: 1000,
    requiredChapter: "Ultramarines",
    check: (char) => {
      const reasons = [];
      if (char.chapter !== "Ultramarines") reasons.push("Must be Ultramarines");
      if (char.rank !== 1) reasons.push("Rank 1 only");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Ultramarines Honour Guard",
    xpCost: 5000,
    requiredChapter: "Ultramarines",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Ultramarines") reasons.push("Must be Ultramarines");
      if (char.rank < 6) reasons.push("Rank 6+");
      if (char.renown < 80) reasons.push("Renown 80+");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      if (!char.talents.some(t => t === "Duty Unto Death" || t.startsWith("Duty Unto Death "))) reasons.push("Must have Duty Unto Death Talent");
      if (!char.talents.some(t => t === "Exemplar of Honour" || t.startsWith("Exemplar of Honour "))) reasons.push("Must have Exemplar of Honour Talent");
      if (["Librarian", "Apothecary", "Techmarine"].includes(char.specialization)) reasons.push("Cannot be Librarian, Apothecary, or Techmarine");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Sword Brother",
    xpCost: 1000,
    requiredChapter: "Black Templars",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Black Templars") reasons.push("Must be Black Templars");
      if (char.specialization === "Techmarine") reasons.push("Cannot be Techmarine");
      if (char.rank < 4) reasons.push("Rank 4+");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Librarian Dreadnought",
    xpCost: 8000,
    requiredChapter: "Blood Angels",
    check: (char, getScore) => {
      const reasons = [];
      if (char.fate.current > 0) reasons.push("0 Fate Points");
      if (getScore('WS') < 60) reasons.push("WS 60+");
      if (char.renown < 80) reasons.push("Renown 80+");
      if (char.chapter !== "Blood Angels") reasons.push("Must be Blood Angel");
      if ((char.psychicRating || 0) < 6) reasons.push("Psy Rating 6+");
      if (getScore('WP') < 60) reasons.push("WP 60+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") + " (Must have performed a great deed)" };
    }
  },
  {
    name: "Tempest Blade",
    xpCost: 2000,
    requiredChapter: "Storm Wardens",
    check: (char, getScore) => {
      const reasons = [];
      if (char.chapter !== "Storm Wardens") reasons.push("Must be Storm Wardens");
      if (char.rank < 5) reasons.push("Rank 5+");
      if (char.renown < 40) reasons.push("Renown 40+");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      if (['Apothecary', 'Devastator Marine', 'Techmarine'].includes(char.specialization)) reasons.push("Cannot be Apothecary/Devastator/Techmarine");
      return { ok: reasons.length === 0, reason: reasons.join(", ") + " (Must be nominated)" };
    }
  }
];

export const TRAIT_DESCRIPTIONS: { [key: string]: string } = {
  "Auto-stabilised": "The creature is always considered braced when firing Heavy weapons and may fire them on semi-auto or full auto as a Half Action.",
  "Brutal Charge": "A creature with this trait deals an extra 3 points of damage when it charges in the same round. A horde with this trait does an additional 1d10 damage when it charges in the same round.",
  "Engine of War": "Dreadnoughts can only take Advances from the Dreadnought Advances Table. Dreadnoughts are not affected by Blood Loss or Fatigue. Dreadnoughts have no fine manipulators and cannot complete tasks that require fine manual dexterity. Dreadnoughts can only be healed (repaired) using the Tech-use Skill. Dreadnoughts suffer a –30 penalty on all tests when attempting Shadowing or Silent Move.",
  "Size (Enormous)": "Enormous creatures are massive, gaining +10 to Base Movement, +10 to Intimidate, and +10 to be hit by attacks. They have a base stealth penalty of -10.",
  "Sturdy": "Sturdy creatures are hard to move and gain a +20 bonus to tests made to resist grappling and the Takedown talent.",
  "Weight of Years": "Whenever the Dreadnought wishes to use a Skill based on either Intelligence or Fellowship he must roll equal to or under his Intelligence Bonus on 1d10. If he fails he cannot recall the information or knowledge required and cannot use the skill until the next time he is “awakened.”"
};

export const TALENT_DESCRIPTIONS: { [key: string]: string } = {
  "Abhor the Witch": "The Battle-Brother spends the time before battle armouring himself against the power of the warp by reciting canticles and litanies of hate and contempt against the unclean powers. This Talent may be used in the Oath Making phase before undertaking a mission. The Battle-Brother spends a Fate Point in the Oath Making phase and counts as having spent this Fate Point for the duration of the mission. During the mission, the Battle-Brother must take a Challenging (+0) Willpower Test whenever he is the subject of the effects of a Psychic Power, daemonic power other warp-based power. If the Willpower Test succeeds, then the Battle-Brother is unaffected by the power. If the Test fails, then the power affects him as normal. The effects of this Talent also apply to powers that cause Damage indirectly such as blasts, and those used by friendly psykers which might be beneficial to the Battle-Brother. A power that is resisted by a Battle-Brother using this Talent is not nullified if others will be affected by it as normal.",
  "Air of Authority": "The character was born to command, either motivating or terrifying those under his charge. On a successful Command Test, the character may affect a number of targets equal to 1d10 plus his Fellowship Bonus. Furthermore the character’s voice commands such respect that even those not in his retinue pay heed. The character may make a Command Test on those not under his authority with a –10 penalty. This Talent has no effect on hostile targets, and only affects NPCs.",
  "Ambidextrous": "This Talent does not represent true ambidexterity so much as sufficient training with both hands to make the distinction moot. The character may use either hand equally well for any task, and does not suffer the –20 penalty for actions using his off hand.\nSpecial: When combined with a Two-Weapon Wielder Talent, the penalty for making attacks with both weapons in the same turn drops to –10.",
  "Armour-Monger": "The finest armours and most powerful shields are all products of the followers of the machine god, based on the fabled and ancient designs of man’s glorious past. With years of training, a Techmarine can learn to enhance these protections, or use them in their optimum fashion. The Techmarine increases the Armour Points of any armour he wears by 2 on all locations it would normally cover as long as he has at least an hour each day to bless and prepare the armour. This bonus applies only to armour worn by the Techmarine.",
  "Assassin Strike": "The character’s natural agility and graceful martial forms turn him into a dervish of death on the battlefield. After making a melee attack, a successful Acrobatics Test allows the character to move at half rate as a Free Action. Opponents do not receive free attacks resulting from this move. The character may only make this move once per Round.",
  "Astartes Weapon Specialisation": "A Space Marine is a master of the tools of warfare, but through long practice and affinity he may reach a level of mastery with a particular type of weapon so that it becomes a tool of perfect destruction. When this Talent is taken, a type and class of weapons must be specified, such as bolt (pistols) or melee (chain). This Talent may be taken multiple times for different types and classes of weapons. When using the specified type of weapon, the Battle-Brother never suffers a penalty greater than –30 when using the weapon.",
  "Astartes Weapon Training": "Battle-Brothers of the Adeptus Astartes spend years becoming proficient with all manner of weapons. By the time that a Battle-Brother has entered service in a squad, he will have not only trained with both heavy and melee weapons, but used those weapons on countless battlefields. The Battle-Brother is proficient with bolt, chain, melta, plasma, power, flame, primitive (ranged and melee), las weapons, launchers, solid projectile, and thrown weapons of all Classes. In essence, the only weapons that the Battle-Brother is not proficient with are exotic weapons; for these, he must acquire individual proficiencies as normal.",
  "Autosanguine": "The ancient and blessed technology of the Mechanicus flows through the character’s blood. These miniscule machines repair minor injuries and speed healing. When applying healing, the character is always considered Lightly Damaged, and heals at an increased rate, removing 2 points of Damage per day.",
  "Basic Weapon Training": "The character has received Basic Weapon Training in a group of weapons, and can use them without penalty. The Universal group includes the Bolt, Las, Launcher, Melta, Plasma, and SP groups. Weapon Skill or Ballistic Skill Tests used with a weapon that a character does not have training for suffer a –20 penalty",
  "Bastion of Iron Will": "The character’s sheer willpower and psychic focus have become one and the same over years of practice and training, such that their combined use is second nature. The character doubles his Psy Rating on any Opposed Test involving the Psyniscience Skill or Psychic Powers.",
  "Battle Rage": "Long experience and indomitable will have allowed the character to master the beast within him, directing its rage while keeping a clear head. The character may Parry while Frenzied.",
  "Berserk Charge": "The character has learned to put the whole force of his momentum behind his weapon blows. When the character charges into combat, few can stand before him. If the character uses the Charge Action, he gains a +20 bonus to Weapon Skill instead of +10.",
  "Binary Chatter": "The character has optimised his use of Techna-Lingua for controlling servitors. The character receives a +10 bonus to any attempt to instruct, program, or communicate with servitors.",
  "Blademaster": "The character’s mastery of bladed weapons and martial disciplines has no peer. When attacking with any bladed weapon, including chainswords and power swords, the character may re-roll one missed attack per Round.",
  "Blind Fighting": "Years of practice and development of other senses allows the character to fight in close combat without the benefit of sight. This Talent reduces all penalties for obscured vision by half, permitting the character to fight in fog, smoke, or darkness more effectively.",
  "Bolter Drill": "The skill of an Adeptus Astartes with bolters of all types can be honed by training and combat, allowing Space Marines to unleash devastating volleys of disciplined fire that cut down their enemies like the sweep of a scythe. When firing any class of Bolt weapon on Full or Semi-Auto, the Battle-Brother may opt to increase the weapon’s rate of fire by +1 (this bonus applies to any and all bolt weapons wielded by the Space Marine, meaning that if he is firing more than one bolt weapon at a time, the bonus will apply to all such weapons). This Talent only applies to personal weaponry and does not impact vehicle-mounted weapons of any kind.",
  "Bulging Biceps": "Whereas a weaker man would be sent flying when using heavy weapons, the character’s strong physique allows him to remain standing. The character can fire heavy weapons using Semi-Auto Burst or Full Auto Burst without bracing, and he does not suffer the –30 penalty for failing to brace.",
  "Call to Vengeance": "When a Space Marine falls in battle, one of his Battle-Brothers may inspire those who remain to great deeds in revenge for their fallen comrade. When another member of the unit is killed or taken out of action, the Battle-Brother may take a Full Action and spend a Fate Point to call his remaining brothers to revenge the fallen. The character may raise his weapon in defiance and speak an oath of hatred, or recite one of the canticles of vengeance. No matter how it is embodied, his action restores the Battle-Brother and all those in Support Range of him to their starting Cohesion.",
  "Catfall": "Gymnastic ability and natural balance enables the character to fall great distances without harm. Whenever he falls, the character may take an Agility Test as a Free Action. Success, and each additional Degree of Success, reduces the distance fallen by a number of metres equal to the character’s Agility Bonus for the purposes of determining Damage from the fall.",
  "Chem Geld": "Either chemical and surgical treatments or sheer will has rendered the character immune to most mundane temptations. Seduction attempts against him automatically fail, and Charm Tests increase their Difficulty by one level. Taking this Talent gives the character one Insanity Point.",
  "Chosen Representative": "The Battle-Brother gains +10 to all Fellowship Tests when dealing with Imperial Authorities and can spend a Fate point to gain the instant and total support of a local Imperial organisation or individual",
  "Cleanse and Purify": "The character can control the flowering flow of promethium like no other, manipulating flame like an old accomplice. The targets of the character’s flamer attacks take a –20 penalty to their Agility tests to escape its effects, and when used against an enemy with the Horde trait, the number of hits on the Horde is increased by +1d5.",
  "Combat Formation": "The character has directed his comrades to prepare for danger, planning out their actions for many contingencies if attacked. Before rolling Initiative, all other members of the group may choose to use the character’s Intelligence Bonus for all Initiative rolls rather than individual Agility Bonuses",
  "Combat Master": "The character’s weapon seems to be everywhere at once, keeping many more opponents at bay in close combat than would seem possible. Opponents fighting the character in hand-to-hand combat gain no bonuses for outnumbering him.",
  "Combat Sense": "The character has the ability to consciously recognise the proddings of his subconscious as it reacts to his preternaturally sharp senses, giving the character an edge that mere speed cannot match. The character may use his Perception Bonus in place of his Agility Bonus when rolling Initiative.",
  "Commanding Presence": "A Battle-Brother with this talent has both a knack for command and a naturally impressive presence that shrouds him in awe and demands respect. This presence has two effects: the first is that the Battle-Brother may use his Strength characteristic for Fellowship Tests should his Strength be higher. The second is that the Battle-Brother never suffers more than –20 to any Fellowship Test (including when using his Strength as Fellowship as noted above) regardless of modifiers.",
  "Concealed Cavity": "The character’s flesh or augmetics conceals a small compartment. This might be a pouch hidden under a flap of flesh or a chamber fitted into a cybernetic enhancement. The character may conceal one small item, no larger than a closed fist, within this cavity. Discovering this compartment requires success on a Difficult (–10) Search Test. If using a medicae scanner or auspex, the Difficulty is reduced to Ordinary (+10).",
  "Counter Attack": "The character’s lightning ripostes are things of deadly beauty, swift and invisible as the wind. After successfully Parrying an opponent’s attack, the character may immediately make an attack against that opponent using the weapon with which he Parried as a Free Action. This attack suffers a –20 penalty",
  "Crack Shot": "The character can place his shots where they inflict more harm, at creases, gaps, or joints in armour. When the character’s ranged attack causes Critical Damage, add +2 to the Damage.",
  "Crippling Strike": "The character can land his blows precisely where they inflict the most harm, cutting into seams or hammering at weak points. When the character’s melee attack causes Critical Damage add +4 Damage.",
  "Crushing Blow": "The character has the ability to focus his entire body into close combat attacks. The character adds +2 to damage inflicted in melee.",
  "Deadeye Shot": "The character’s rock-steady hand and hawk-like eyesight make him a dreaded marksman. No target, however precise, can escape his crosshairs. When making a called shot, the character suffers a –10 penalty instead of –20.",
  "Death From Above": "A Space Marine descending into battle on trails of fire is a true angel of death come to bring ruin and ending on all who stand in his way. When the Battle-Brother makes a Charge Action using a jump pack, his melee attack deals an extra d10 Damage for every two Degrees of Success, to a maximum bonus of 2d10.",
  "Deathwatch Training": "All Deathwatch Space Marines automatically confirm any Righteous Fury results (see page 245) against alien enemies without needing to re-roll the Ballistic Skill Test or Weapon Skill Test.",
  "Deflect Shot": "The character’s weapons move with such speed that they can deflect thrown weapons and shots fired from primitive weapons. The character may spend a Reaction to Parry an incoming ranged attack from a primitive or thrown weapon.",
  "Detestation": "When attacking an enemy to whom one or more of the Sword Brother’s Hatred Talents applies, the attack deals additional Damage equal to one-half the Sword Brother’s Rank, rounding up.",
  "Die Hard": "Through either willpower or sheer stubbornness, the character refuses to cross into shadow. When the character suffers from blood loss, he may roll twice to avoid death.",
  "Disarm": "The character can wrest weapons from his opponent’s hands through practised technique or brute force. If in close combat, the character may use a Full Action to disarm his foe by making an Opposed Weapon Skill Test. If the character wins the Test, the enemy drops his weapon at his feet. Should the character obtain three or more Degrees of Success, he may take the enemy’s weapon from him.",
  "Disturbing Voice": "The character’s voice has particularly baleful or menacing qualities, causing others to quail before it. The character gains a +10 bonus to all Intimidate or Interrogation Tests when employing this talent, but suffers a –10 penalty to Fellowship Tests when dealing with others in a non-threatening manner, such as animals, children, or the easily startled.",
  "Double Team": "The character has experience of fighting in paired teams that work together to take down their enemies. When ganging up on an opponent, the character gains an additional +10 bonus to Weapon Skill Tests. If both characters who outnumber the enemy have this Talent, both gain an additional +10 bonus, for a total of +20. This bonus is in addition to the normal bonus gained from outnumbering opponents",
  "Dual Shot": "The character’s skill with guns is such that he can target two shots on exactly the same point. When armed with two pistols, the character may fire both simultaneously as a Full Action. A single Ballistic Skill Test is made, and if successful, the character hits his target with both shots. As the character is firing both guns as a single attack, he may take an Aim Action before firing to get a +10 or +20 bonus to the BS Test, and a red-dot laser sight mounted on any one of the weapons provides its +10 bonus. The character does not suffer from the normal –20 Ballistic Skill penalty for wielding two weapons. If the attack hits, the target’s armour gets applied as normal to both hits individually, but Toughness only counts once against the combined damage rolls of both hits. A single successful Dodge Test from the target avoids both shots.",
  "Dual Strike": "The character’s skill with melee weapons can place two blows together to maximise Damage. When armed with two melee weapons, the character may attack with both simultaneously as a Full Action. Make a single Weapon Skill Test. If the test is successful, the character hits the target with both weapons. As the character is swinging both weapons as a single attack, he may take an Aim Action before attacking to get a +10 or +20 bonus to the WS Test. The character does not suffer from the normal –20 WS penalty for wielding two weapons. If the attack hits, the target’s armour gets applied as normal to both hits individually, but Toughness only counts once against the combined Damage rolls of both hits. A single successful Dodge or Parry Test from the target avoids both blows.",
  "Duty Unto Death": "The character’s will or faith can sustain him when his flesh fails. He ignores the effects of injury, Fatigue, and Stunning during combat. This Talent does not prevent the Damage, but allows the character to temporarily ignore its effects for the duration of the combat. Death still affects him normally.",
  "Electrical Succour": "The character can channel the sacred flow of energy from his Potentia Coil or other energy source to replenish his flesh. Whilst in contact with a functioning, powered machine or fully charged battery or power cell, the character may make an Ordinary (+10) Toughness Test. Success removes one level of Fatigue plus one additional level of Fatigue for each additional Degree of Success. This takes one minute of meditation and ritual incantation.",
  "Electro Graft Use": "The character may use his Electro Graft to access data ports and commune with machine spirits. This grants a +10 bonus to Common Lore, Inquiry, or Tech-Use Tests whilst connected to a data port.",
  "Enemy": "The opposite of Good Reputation, the character is particularly despised by a specific social group or organisation. The character suffers an additional –10 penalty to Fellowship Tests when dealing with this group. This Talent is cumulative with the Rival talent, for a total –20 penalty.",
  "Energy Cache": "The character has learned to focus the power stored within his Potentia Coil with greater efficiency. The character no longer gains Fatigue from using Luminen Charge, Luminen Shock, and Luminen Blast.",
  "Enhanced Bionic Frame": "The character’s already impressive bionic body structure is steadied by a gyro-array guided by a targeting system linked to the machine-spirit. The character gains the Auto-stabilised Trait",
  "Exemplar of Honour": "The Battle-Brother exemplifies all that is finest in an Adeptus Astartes to the extent that his presence can rally his brothers and inspire them to fight together against overwhelming odds. The Battle-Brother may spend a Fate Point as a Free Action to regain Cohesion equal to his Fellowship Bonus. He may do this once per Round.",
  "Exotic Weapon Training": "The character is trained to use a particularly obscure type of weapon, allowing him to use armaments few others have ever seen. Weapons requiring this unique Talent are noted in their armoury descriptions. Weapon Skill or Ballistic Skill Tests used with a weapon that a character does not have training for suffer a –20 penalty",
  "Eye of Vengeance": "The Battle-Brother can focus his intent on where it is likely to do most Damage to his enemy and then strike the target down with a single shot. The Battle-Brother may declare that he is using this Talent before he makes a single ranged attack. If the attack hits, it ignores an additional point of armour per Degree of Success. If a 10 is rolled for Damage, it automatically triggers Righteous Fury without the need for another Ballistic Skill Test (see Righteous Fury on page 245 in Chapter VIII: Combat). This Talent may not be used in conjunction with Blast weapons, Semi or Full-Auto Bursts, or Flame weapons. It may, however, be used in conjunction with accurate weapons and in conjunction with making Called Shots and taking Aim Actions.",
  "Favoured by the Warp": "Whenever a Psychic Power results in Psychic Phenomena, the character may roll twice on that table and take the more favourable result.",
  "Fearless": "Through hard experience with horrifying situations, fear no longer commands the character’s actions. The character is immune to the effects of Fear and Pinning, but disengaging from combat or backing down from a fight requires a successful Willpower Test.",
  "Feedback Screech": "The character can scramble his vox synthesizers, causing a hideous blast of noise that shocks and distracts others. All unprotected creatures within a 30-meter radius who have the ability to hear must make a Willpower Test or lose a Half Action on their next turn as they involuntarily react to the cacophonous shriek.",
  "Ferric Lure": "The character can cause an unsecured metal object within his field of vision to fly into his hand. The object may weigh up to 1 kilogram per point of the character’s Willpower Bonus, and must lie within 20 metres. Using this Talent requires a Full Action and a successful a Willpower Test.",
  "Ferric Summons": "The character can call an unsecured metal object to his hand as with Ferric Lure. The character may summon objects of up to 2 kilograms per point of Willpower Bonus, and the object may be up to 40 metres distant. The character must spend a Full Action and succeed on a Willpower Test to enact this rite.",
  "Flame Weapon Training": "The sight of flaming streams of promethium brings joy to the Explorer’s heart and dread to his foes. He has mastered the art of a wide variety of flamer weapons. The Universal Talent group encompasses all non-Exotic weapons with the Flame special quality.",
  "Flesh Render": "The Battle-Brother has a taste for the massive damage that can be inflicted with chain weapons and other melee weapons that rip apart the flesh of their enemies. When inflicting Damage with a melee weapon that has the Tearing quality, the character rolls a single additional die for Damage and picks the highest roll. For weapons that inflict several dice worth of Damage, only a single additional die is rolled.",
  "Foresight": "Logic and analysis do for the character what Tarot and the bones claim to do for the superstitious masses. By careful consideration of all the possible consequences, and examination of all evidence and information, the character can identify the best path for success. By spending 10 minutes studying or analysing a problem, the character gains a +10 bonus to his next Intelligence Test.",
  "Forging the Bond": "The Space Marine is gifted at adapting to the fighting styles and traditions of other Chapters, and while serving in the Deathwatch has forged strong bonds of brotherhood with his Kill-team.\n• At Rank 1–3, the Space Marine may benefit from the Squad Mode abilities specific to any other Chapter. When members of the Kill-team activate a Chapter-specific Squad Mode ability, the activating Battle-Brother can choose to allow any Space Marines from a different Chapter possessing this Talent to benefit from the ability as well. If he chooses to do so, activating the Squad Mode ability costs an additional 3 Cohesion (total, not per Battle-Brother).\n• At Rank 4–5, the Talent functions as above, but the cost is reduced to 2 additional Cohesion.\n• At Rank 6–8, the Talent functions as above, but the cost is reduced to 1 additional Cohesion.",
  "Frenzy": "The character’s temper and passion boil just below the surface of his psyche, mostly held in check by his rational mind, but easily released when needed. If the character spends one full Round fuelling his anger—by flagellation, drugs, or other means—on the next Round he goes into an uncontrolled rage, gaining a +10 bonus to Weapon Skill, Strength, Toughness, and Willpower, but suffering a –20 penalty to Ballistic Skill and Intelligence. The character must attack the nearest enemy in melee combat if possible. If he is not engaged with the nearest enemy, he must move towards that enemy and engage it if possible. The character will not take obviously suicidal actions such as leaping off a building in order to engage someone on the ground, but he will take any actions that have a reasonable opportunity to engage in melee with the nearest enemy. While Frenzied, he is immune to Fear, Pinning, Stunning effects, the effects of Fatigue, and he may not Parry, retreat, or flee. He remains Frenzied for the duration of the combat. Unless the character has a Talent that allows him to do so, he may not use Psychic Powers whilst in Frenzy. Some beings are either permanently Frenzied or can Frenzy at will.",
  "Furious Assault": "The character’s speed and martial prowess allow him to land several blows where lesser combatants land one. If the character successfully hits his target using the All Out Attack Action, he may spend his Reaction to make an additional attack using the same bonuses or penalties as the original attack.",
  "Good Reputation": "The character is well respected within a social group or organisation. The character gains an additional +10 bonus to Fellowship Tests when dealing with this group. This Talent is cumulative with Peer, for a total of a +20 bonus. This bonus also applies to Influence Tests when dealing with this particular group. The GM and player may agree to award this Talent when appropriate to the adventure or campaign.",
  "Gun Blessing": "Utilising his sacred ability to subtly affect ferrous materials, the character may un-jam a number of weapons equal to his Intelligence Bonus, so long as they are within a 10-meter radius. A successful Intelligence Test indicates the character has appeased the spirits of the weapons. This blessing requires a Full Action.",
  "Gunslinger": "The character has trained with pistols for so long that they are like extensions of his own body, barely requiring conscious thought to aim and fire. When armed with two pistols, the character reduces the penalty for Two-Weapon Fighting by –10. If the character also possesses the Ambidextrous Talent, the penalty is reduced to 0.",
  "Hammer Blow": "The Battle-Brother strikes a single blow with such focus and force that it breaks armour and pulps flesh as it strikes. When the Battle-Brother makes an All Out Attack manoeuvre to make a single melee attack, he may add half his Strength Bonus to the weapon’s Armour Penetration. The attack also counts as having the Shocking quality to represent the concussive force of the blow’s impact.",
  "Hard Target": "Light on his feet, the character dodges and weaves as he moves, skills learned from long years in the line of fire. When the character performs a Charge or Run Action, opponents suffer a –20 penalty to Ballistic Skill Tests made to hit the character with a ranged weapon. This penalty continues until the start of the character’s next turn.",
  "Hardy": "The character’s constitution rebounds quickly from shock or injury. When undergoing medical treatment or healing from injures, the character recovers Damage as if Lightly Damaged.",
  "Hatred": "A group, organisation, or race has wronged the character in the past, fuelling this animosity. When fighting opponents of that group in close combat, the character gains a +10 bonus to all Weapon Skill Tests made against them.",
  "Heavy Weapon Training": "The character can employ some of the most devastating weapons of the battlefield. The character can use weapons of the groups for which he has selected this Talent, choosing one new group each time the character obtains it. When a character attempts to use a weapon he does not have the correct Weapon Training Talent for, he suffers a –20 penalty to any relevant Weapon Skill or Ballistic Skill Test.",
  "Heightened Senses": "Either genetics or augmetics have made one of the character’s senses are superior to others. When the character gains this Talent, select one of the five senses. The character gains a +10 bonus to any tests specifically involving this sense. Thus, Heightened Senses (Sight) would apply to an Awareness Test to see a distant flock of shale crows, but not to a Ballistic Skill Test or a Weapon Skill Test simply because the character is using his eyes.",
  "Hip Shooting": "The character’s prowess with ranged weapons is such that he can still fire accurately without his eye behind the weapon’s sights. As a Full Action, the character may both move up to his Full Move rate and make a single attack with a ranged weapon. This attack can only be a single shot—no automatic fire.",
  "Honour or Death": "Once per combat, when attacking an enemy Elite- or Master-level creature in melee, the Battle-Brother may choose to gain one of the following benefits: his weapon gains the Proven (3) quality, his weapon gains the Felling (1) quality, his weapon gains the Razor-Sharp quality, or he receives an additional +1 Renown (if Elite) or +1d5 Renown (if a Master) if he slays the creature single-handed.",
  "Hunter of Aliens": "Aliens are a foul and constant threat to the Imperium, and the character has taken a vow to rid the galaxy of their foul presence. Though he knows such a task is greater than his actions alone, the character hopes the vile xenos blood he spills goes some way to winning the Emperor’s war against this most terrible of foes. The character gains +10 to his Weapon Skill and +2 to melee weapon Damage when combating aliens.",
  "Improved Warp Sense": "The character can now see the warp and physical universe side by side, no longer taking any concentration on his part. After gaining this Talent, the character may use the Psyniscience Skill as a Free Action.",
  "Independent Targeting": "The character has developed his peripheral vision and situational awareness to a point where he can fire in two directions within a split second. When firing two weapons as part of a single Action, the targets need not be fewer than 10 metres apart.",
  "Infused Knowledge": "The character has been infused with a great wealth of lore and knowledge, either through punishing noetic techniques or by arcane methods kept secret by the guardians of technology and knowledge. The character treats all Common and Scholastic Lore Skills as Basic Skills. This Talent also provides a +10 bonus to any tests involving Common or Scholastic Lore for which the character already possesses the Skill.",
  "Inspire Wrath": "The character knows just the turn of phrase that incites individuals or groups to rage against others. The character’s rhetoric grants him +20 to Interaction Tests when inspiring hatred or anger, and this Talent doubles the number of individuals affected. This Talent can be combined with Master Orator to further increase the number of listeners affected.",
  "Into the Jaws of Hell": "The character inspires loyalty and devotion in his followers such that they would follow him into the warp vortices of the Maw or on a boarding action against xenos corsairs. In personal combat, while visible to the character, the followers are immune to Fear and Pinning.",
  "Iron Discipline": "Iron sharpens iron. The character does not coddle his subordinates nor motivate them through kindness. The character’s stalwart example and stern leadership exhorts them with steel instead of spoils. If the character is visible to his followers, either in person or via vox- or pict-caster, they may re-roll failed Willpower Tests made to resist Fear and Pinning. Iron Discipline can affect a number of targets equal to the character’s Willpower Bonus, who must be under the character’s command. Player characters can benefit from Iron Discipline if the character with this Talent is the official group leader.",
  "Iron Jaw": "The character has taken blows from Orks and given back as good as he got. The character can bounce back from most strikes without ill effects. If ever Stunned, a successful Toughness Test allows the character to ignore the effects.",
  "Jaded": "The character’s wide travels have shown him both wonders and horrors beyond the ken of most. The galaxy has thrown its worst at the character, and he has yet to flinch. Mundane events, from death’s horrific visage to xenos abominations, do not cause Insanity Points, nor Fear Tests. Terrors of the warp still affects the character normally.",
  "Killing Strike": "Space Marines are amongst the deadliest warriors in the galaxy, and they have learned how best to place their blows for maximum effect. When taking the All-Out Attack action, a Space Marine may spend a Fate Point (before rolling the dice) to make his melee attacks for that round impossible to parry or dodge.",
  "Last Man Standing": "The character has developed a sixth sense about hails of gunfire, allowing him to sense gaps and pauses in the lethal rain. The character is immune to Pinning by pistols and Basic Weapons, and he adds +1 AP to the value of any cover protecting him from ranged attacks.",
  "Leap Up": "A combination of athletic ability and speed allow the character to spring to his feet in virtually any circumstance. The character may stand up as a Free Action.",
  "Light Sleeper": "The slightest change in conditions or disturbance brings the character from sleep to full awareness, remaining alert even in slumber. The character is always assumed to be awake, even when asleep, for the purposes of Awareness Tests or surprise. Unfortunately, the character’s sleep is not deep and can be frequently interrupted, resulting in a less-than-cheery disposition when awake.",
  "Lightning Attack": "The character’s speed with weapons is legendary, allowing him to launch flurries of attacks in melee. As a Full Action, the character may make three melee attacks on his turn. The effects of this Talent replace those of Swift Attack rather than adding to them. The use of Lightning Attack may not be combined with Dual Strike. If the character has the Two-Weapon Wielder Talent and is wielding two melee weapons, the character gains the advantage of Lightning Attack with only one of the weapons, and a single attack with the other. If the character has the Two-Weapon Wielder Talent and is wielding a melee weapon in one hand and a gun in the other, they gain the advantage of Lightning Attack with the melee weapon and a single attack with the gun.",
  "Lightning Reflexes": "The character always expects trouble, even in the most innocuous situations, allowing him to act quickly when needed. Add twice the character’s Agility Bonus when rolling for Initiative. If the character has Unnatural Agility, then add one to the multiplier before factoring the bonus into the character’s Initiative roll.",
  "Litany of Hate": "The character’s belief in the righteousness of his hatred is so ingrained in his being that he can inspire the same hate in others. As a Full Action, make a Command Test to extend the effects of the character’s Hatred Talent to nearby allies. Success on the test confers a +10 bonus to WS when fighting hated foes to one ally per point of the character’s Fellowship Bonus. The effects last for the duration of the encounter.",
  "Logis Implant": "The character’s logis processors work with preternatural speed, filtering sensory input and allowing the character to analyse and anticipate the actions of those around him. By using the character’s Reaction for the Round, the character may make a Tech-Use Test to make use of this Talent. The character gains a +10 bonus to all Weapon Skill and Ballistic Skill Tests until the end of his next turn. The character must pass a Toughness Test when he uses this Talent or gain a level of Fatigue.",
  "Luminen Blast": "The Omnissiah has blessed the character with augmetic conduits that parallel the bones of his arms. By reciting the proper litany, the character can channel the energy stored in his Potentia Coil down these channels and direct it at enemies. Success on a Ballistic Skill Test allows the character to direct this energy against a single target within 10 metres. The target takes 1d10 plus the character’s Willpower Bonus of Energy Damage with the Shocking Quality. The character must pass a Toughness Test when he uses this ability or gain a level of Fatigue.\nTalent Use: Half Action Attack",
  "Luminen Charge": "The character has mastered the union between his holy mechanical elements and his mortal flesh, allowing the former to power the latter. With a successful Toughness Test, the character may recharge or power machinery with his internal coils. This requires one minute of meditation and ritual incantation. The difficulty of the Toughness Test varies depending on the nature of the powered system:\n\nOrdinary (+10) Simple Power Cell, Illuminator\nChallenging (+0) Weapon Charge Pack, Data Slate, Bridge Terminal\nDifficult (–10) Hotshot Charge Pack, Shuttle Electronics, Servo-Skull\nHard (–20) Lascannon Charge Pack, Servitor, Bridge Hololith\nVery Hard (–30) Ship’s Cogitator Core, Reactor Machine Spirit, Xenos Tech\n\nThe character must pass a Toughness Test when he uses this ability or gain a level of Fatigue. No matter the power bestowed upon the character by the Omnissiah, some systems are either too large or too alien for this Talent",
  "Luminen Shock": "The power of the character’s Potentia Coil flows through a network of inductors within his flesh. This allows the character to channel this energy into his blows. In close combat, a successful Weapon Skill Test or Grapple delivers the shock. The Luminen Shock inflicts 1d10+3 points of Energy Damage with the Shocking Quality. The character must pass a Toughness Test when he uses this ability or gain a level of Fatigue.\nTalent Use: Half Action Attack",
  "Machinator Array": "The character has returned to the crèches of the Mechanicus so the Priesthood of Mars may bring him closer to the most holy of forms by adding an extensive machinator array to the character’s existing augmetics. The character’s Strength and Toughness Characteristics are increased by +10. Reduce the character’s Agility and Fellowship by –5. The character’s mass increases to three times that of a normal person, and the character may no longer stay afloat or swim in water or similar liquids. The character may mount a single pistol or close combat weapon on any Servo-Arm or Servo-Harness he possesses. The character must still have the proper Talent to use the mounted weapon. Machinator Array counts as a cybernetic, meaning all stat bonuses from this talent are applied after the calculation of Unnatural Characteristics.",
  "Maglev Grace": "The character is implanted with anti-grav coils throughout his lower body, allowing him to hover just off the ground. Using a Half Action, the character may hover 20–30 centimetres off the ground for a number of minutes equal to 1d10 plus the character’s Toughness Bonus. The character must employ a Half Action each Round to maintaining the rite, and may use the other actions to move normally. The character may activate this rite to slow his rate of descent when falling, reducing all falling Damage to 1d10+3 Impact. Each use of Maglev Grace exhausts the power stored in the character’s Potentia Coil, and so this Talent cannot be reused until the Coil has been recharged (usually 1d5 hours).",
  "Maglev Transcendence": "The character has proven his devotion to the Machine God by lacing anti-grav coils through every portion of his body. Using a Half Action, the character may hover 20–30 centimetres off the ground for a number of minutes equal to 2d10 plus the character’s Toughness Bonus. The character must employ a Half Action each Round to concentrate on maintaining this rite, but any Move Action allows the character to move up to his running speed. The character can slow his rate of descent when falling so long as this rite is active when the character reaches the ground, taking no falling Damage. Each time the character enacts this rite, it drains 50% of the power stored in his Potentia Coil.",
  "Marksman": "The character’s steady hand and eagle eye allows him to keep crosshairs steady on any target, regardless of range. Distance is no protection against the character’s marksmanship, and he suffers no penalties for Ballistic Skill Tests at long or extended range",
  "Master Chirurgeon": "The character’s advanced medical skills enable him to knit flesh with deft same mastery. The character’s exceptional education in use of the Narthecium, med-slate, and supplemental drugs give his patients an enormous advantage. The character gains a +10 bonus on all Medicae Tests. If treating a Heavily or Critically Damaged patient, a successful test heals 2 Wounds instead of 1. If the patient is in danger of losing a limb from a Critical Hit (see Chapter VIII: Combat), the character provides the patient with a +20 bonus to the Toughness Test to prevent limb loss.",
  "Master Enginseer": "The character’s knowledge of engines and their machine spirits surpasses all but the most venerable servants of the Machine-God. The character can almost feel the plasma pulsing through a reactor’s conduits as if it were his own veins. The character may spend a Fate Point for automatic success on a Tech Use Test for enhancement, repair, or upgrade of a machine’s system, taking the minimum amount of time possible on the task.",
  "Master Orator": "The character has learned the techniques required to influence large audiences. The character’s Fellowship Tests and Fellowship-based Skill Tests affect 10 times the normal number of targets.",
  "Mechadendrite Use": "Though there are many different types of Mechadendrite, this Talent divides them into two broad categories:\nServo-Arm: Servo-arms are powerful mechanical arms fitted with piston-driven claws that are equally effective as weapons as they are at repairing machines.\nWeapon: Mechadendrites of this type end in either ranged or close combat weapons, and have the supplemental support and strength necessary for combat. Servo-Arms and the Servo-Harness may also count as this type.\nUtility: Including such varied types as Machine Spirit Interface, Manipulator, Medicae, Utility, Optical, and countless others, these Mechadendrites generally require less hardy mountings, but all interface with the Cyber Mantle in a similar manner.",
  "Meditation": "The character has mastered his body and its reactions by the practice of meditative techniques, shutting down unnecessary functions that enables him to refresh both body and mind. Success on a Willpower Test and 10 minutes without interruptions removes one level of Fatigue.",
  "Melee Weapon Training": "The character has trained extensively with hand-to-hand weaponry, becoming proficient in the use of virtually all hand-held close combat arms. The “Universal” group includes the Primitive, Chain, Shock and Power groups. When a character attempts to use a weapon he does not have the correct Weapon Training Talent for, he suffers a –20 penalty to any relevant Weapon Skill or Ballistic Skill Test.",
  "Mental Rage": "The character’s madness and hate open his mind to the warp, allowing the character to use its power with little conscious thought. While in a Frenzied state, the character may use his Psychic Powers normally.",
  "Mighty Shot": "The character knows the weak points in every armour and material, and has the skill to ensure that his shots land exactly where they do the most damage. The character adds +2 to Damage inflicted with a ranged weapon",
  "Mimic": "Vox synthesisers, training, or innate abilities allow the character to accurately mimic the voice of another. The character must study the voice patterns of his intended target for at least one hour for proper imitation, and speak the same language. The character cannot accurately copy the voice of a xenos due to the difference in physiology and the subtle complexities of most alien languages. Listeners must succeed on a Difficult (–10) Scrutiny Test to penetrate the deception. If the character’s study used vox recordings or comm-link conversations rather than in-person observation, the Difficulty of the Scrutiny Test is reduced to Challenging (+0). The character’s deception automatically fails if the listener can clearly see him.",
  "Nerves of Steel": "Long years on the battlefield enable the character to remain calm as fire impacts all around them. The character may reroll failed Willpower Tests to avoid or recover from Pinning.",
  "Orthoproxy": "A liturgical circuit has been implanted within the character’s skull, allowing him to focus on the prayers recited by the proxy unit when the character’s mental fortitude is in peril. The character receives a +20 bonus to Willpower Tests made to resist mind control or interrogation.",
  "Paranoia": "The character knows that danger lurks behind every corner and knows the galaxy will hit him as soon as he lets his guard down. The character gains a +2 bonus on Initiative rolls, and the GM may secretly test using the character’s Perception to notice hidden threats. The price of this eternal vigilance is a twitchy disposition and the inability to relax.",
  "Patient Hunter": "The Battle-Brother may treat the Shadowing and Silent Move Skills as if they were Perception-based Skills. This means that they will, for example, benefit from the Wolf Senses Solo Mode Ability. The effects of this talent do not apply if the Battle-Brother is wearing Terminator Armour.",
  "Peer": "The character knows how to deal with a particular social group or organisation. He gains a +10 bonus to all Fellowship Tests when interacting with the chosen group. The GM and player may agree to award this Talent when appropriate to the adventure or campaign.",
  "Pistol Weapon Training": "The character has practised with nearly every single-handed ranged weapon within the confines of the Imperium, and no small number without. This talent confers proficiency with most pistol-type weapons, including the Bolt, Las, Launcher, Melta, Plasma, Primitive, and SP groups. When a character attempts to use a weapon he does not have the correct Weapon Training Talent for, he suffers a –20 penalty to any relevant Weapon Skill or Ballistic Skill Test.",
  "Polyglot": "The character has an innate ability to derive meaning from unknown languages, and make himself understood using this intuitive grasp. The character treats all languages as Basic Skills. This is not the same as true knowledge of the language, and tests using this Talent suffer a –10 penalty due to the simplistic nature of translation.",
  "Precise Blow": "The character’s eye, hand, and weapon act seamlessly together, placing the character blows exactly where the character intends. When making a called shot with a melee weapon, the character does not incur the normal –20 penalty.",
  "Preternatural Speed": "The character is a swift moving bringer of death, a living, bloody scythe before whom foes die like corn before the reaper. The character may use Swift Attack and Lighting Attack as a Half Action rather than a Full Action. In addition, the character may use the Swift Attack and Lightning Attack Talents during a Charge.",
  "Prosanguine": "Through the application of his will, the character may speed the function of his Autosanguinators. By spending 10 minutes in meditation and ritual incantation, the character may make a Tech-Use Test, and if successful, remove 1d5 points of Damage. If the character rolls a 96–100, he overstrains his implants, losing the ability to use them for one week. During that week, the character may use neither the Autosanguine nor Prosanguine Talents. Using Prosanguine requires 10 minutes of meditation and ritual incantation.",
  "Psy Rating": "The character is a psyker; their power in game terms is rated on a scale of 1 to 10, where Psy Rating 1 is the lowest to warrant the attentions of the Scholastica Psykana and the Black Ships, and a rating of 10 represents one of the most powerful of the entire human sphere. A Librarian begins play with Psy Rating 3, as detailed on page 80 of Chapter II: Specialities. See Chapter VI: Psychic Powers for detailed rules on the game mechanics of this ability. Increasing a character’s Psy Rating represents that character unlocking more of his psychic potential and becoming more and more powerful. A character may take this Talent multiples times. Each time this Talent is taken, the character’s Psy Rating is increased by 1. An increase in Psy Ratings in Deathwatch does not give additional Psychic Powers.",
  "Quick Draw": "The character has practiced so frequently with his weapons that they practically leap into his hands in response to a simple thought. The character can Ready as a Free Action when armed with a pistol or basic ranged weapon, or a melee weapon that can be wielded in one hand.",
  "Rapid Reaction": "The character has honed his reactions to a razor’s edge, allowing them to act while most stand dumbfounded. When surprised or ambushed, a successful Agility Test allows the character to act normally.",
  "Rapid Reload": "The firing ranges and weapon drill chambers are the character’s constant abode, and hours of reloading countless magazines or power cells means that he can replace them without looking and without thinking. The character halves all reload times, rounding down. Thus, Half Action reload become a Free Action, a Full Action reload becomes a Half Action and so on.",
  "Resistance": "The character’s background, experience, training, exposure, or plain stubbornness has developed a resistance within him. Each time the character selects this Talent, choose one area of resistance. The character gains a +10 bonus when making tests to resist the effects of this group. The character’s GM may wish to approve certain choices or have them justified by the character’s past.",
  "Rite of Awe": "The augmetic blessing of the Omnissiah on the character’s voice box allows him to recite infrasonic liturgies that trigger awe and fear. All humans, regardless of their ability to hear, within a 50-meter radius feel a sense of dread and take a –10 penalty to their next Skill Test (including Weapon Skill and Ballistic Skill Tests). Player characters may ignore these effects with a successful Willpower Test. Whilst incanting the rite, the character may not talk or communicate with others. The rite requires one-Half Action speaking the litany in Techna-Lingua, and it is considered very bad form to break off the recitation before completion. Humans without auditory implants cannot hear infrasonic sounds, and though still affected do not know the character is speaking.",
  "Rite of Fear": "The character’s infrasonic dirges cause terror in the weak. All humans, regardless of their ability to hear, within a 50-meter radius treat the character as if he had a Fear Rating of 1. While incanting the dirge, the character may not communicate in any other way. The rite requires one-Half Action chanting in Techna-Lingua, and most would not consider halting the incantations prior to their completion. Humans without auditory augmentation cannot hear infrasonic sounds, and though still affected do not know the character is speaking.",
  "Rite of Pure Thought": "The character has replaced the creative half of his brain with sacred cranial circuitry. The character can no longer feel emotion, and instead embraces the crystal purity of logic. The character is immune to Fear, Pinning, and any effects that stem from emotional disturbance. The character’s GM removes any Mental Disorders that no longer apply, and grant the character appropriate new ones of equal severity. The character’s comrades may find the character somewhat cold, though other followers of the Omnissiah will rejoice in the character’s newfound freedom.",
  "Rite of Sanctioning": "The character has been trained to resist the dangers of the warp: his resistance has been weighed and measured and found to be sufficient for his power to be sanctioned. This ceremony changes a psyker, and the character bears these physical changes along with a Sanctioning Mark. Choose one result on the Psychic Phenomena chart on page (other than Perils of the Warp). When rolling for Psychic Phenomena, the character may substitute the specified result for the effect rolled on the table, so long as the character did not roll Perils of the Warp.",
  "Rival": "This Talent represents aggressive competition and some animosity with a particular social group or organisation. The character suffer a –10 penalty to all Fellowship Tests when interacting with the group in question. The GM and player may agree to award this Talent when appropriate to the storyline. This Talent may be removed with an Elite Advance and the approval of the GM if the character has taken suitable actions to earn the trust of the group.",
  "Scourge of Heretics": "The character has taken a vow to purge heretics wherever he finds them and has honed his skills in dispatching them. This is not a blood-fuelled rage or the uncontrollable madness of death but rather a cold, calculated skill drilled into the character through countless hours of training and prayer. The character gains a +10 to his Weapon Skill and +2 to melee weapon Damage when combating heretics. It is up to the GM to decide exactly which enemies count as heretics.",
  "Servo-Harness Integration": "The Techmarine has had his implanted systems integrated with a many-armed servo harness, allowing him to use its pincer-arms and weapon arrays as if they were extra limbs of his body. The Techmarine may be fitted with and use a Servoharness (see page 177 in Chapter V: Armoury) and may use weapons fitted to the harness in which he is proficient.",
  "Sharpshooter": "The character’s steady hand and eagle eye allow him to place shots exactly where he wants. When making a Called Shot, the character does not incur the normal –20 penalty. The effect of this Talent replaces those of Deadeye Shot.",
  "Siegecraft": "The Adeptus Astartes of the Imperial Fists Chapter are renowned for their ability to craft fortifications that have stood the tests of the worst enemies of Mankind. Rules: If he has time to prepare the battlefield (1d5 hours at a minimum), the Imperial Fist may improve the Armour Points of a piece of cover by a number equal to his Intelligence Bonus. At the GM’s discretion, this effect may apply to a number of pieces of cover equal to the Space Marine’s Rank. This bonus stacks with that of the Siege Master ability, but the bonus points are added after any effect from Siege Master. The effects of this Talent cannot be applied more than once to any piece of cover, and the effects are permanent.",
  "Signature Wargear": "A tool of war has served the Battle-Brother in countless victories, and is always at his side. Select one item from the Armoury (excluding unusual ammunition) with a Requisition cost of 20 or less. This Requisition limit may include Upgrades and/or Craftsmanship modifiers in its calculation. (For example, a Master-Crafted Flamer.) This item is permanently in the Battle-Brother’s possession without the need to Requisition it, effectively becoming standard issue for him. He must meet any Renown requirement for the item. A Battle-Brother may purchase this Talent multiple times in accordance with his Career Advances. Each time, note the item it applies to such as Signature Wargear (Master-Crafted Flamer).",
  "Signature Wargear (Master)": "The Battle-Brother has forged a bond with his chosen tool of war, and can perform impressive feats with it. The maximum Requisition cost of his Signature Wargear increases to 40. (At the time this Talent is purchased, you may choose to apply additional Upgrades to your existing Signature Wargear, or replace the Signature Wargear item with a new item worth up to 40 Requisition.) Choose one applicable effect from the table below and apply it when equipped with the Signature Wargear.",
  "Slayer of Daemons": "Vowing to battle the beyond, the character has marked the warp-spawned for death. The character gains a +10 to his Weapon Skill and +2 to melee weapon Damage when combating daemons.",
  "Sound Constitution": "The character gains an additional Wound. The character may purchase this Talent multiple times, the exact number of times is determined by his Career Path. When a character has gained this Talent multiple times, note the number of times it’s been taken after the Talent, such as Sound Constitution 3.",
  "Sprint": "The character can move at great speeds. When taking a Full Move Action, the character can move an extra number of metres equal to his Agility Bonus. When taking the Run Action, the character may double his movement for one Round. The character gains one level of Fatigue if he uses this Talent two Turns in a row.",
  "Stalwart Defence": "The Battle-Brother stands immovable and indomitable, as if he were made of rock and iron against which foes break like water against a cliff. The Battle-Brother may spend a Fate Point as a Full Action to adopt a Stalwart Defence. While adopting this condition, the Battle-Brother may not move and may not Dodge. He may make a Parry reaction against all successful strikes even if doing so exceeds his normal number of reactions, but may not attempt more than one Parry per successful strike, and all Damage he suffers is reduced by -2. Furthermore, the character’s enemies gain no benefits for outnumbering the Battle-Brother in close combat. These effects last until the Battle-Brother chooses to end his Stalwart Defence or until he is rendered incapable of fighting.",
  "Step Aside": "The character can sway his body out of the path of an attack, causing it to pass through thin air. The character may make an additional Dodge once per Round. In effect, this gives the character a second Reaction that may only be used to Dodge, allowing two Dodges in a Turn. However, the character may still only attempt a single Dodge against one attack.",
  "Storm of Iron": "When facing massed enemy, the Battle-Brother’s firepower is laid down in precise patterns and well trained rhythm, so that they create a storm of iron that kills and maims many. By such discipline, the Battle-Brother has faced enemies many times his number and emerged victorious. When using a flamer or firing a Semi or Full Auto Burst against an enemy with the Horde trait, the Battle-Brother doubles any Damage that he deals to the Horde’s Magnitude. For example, if the Battle-Brother’s attacks would reduce the Horde’s Magnitude by 5, this amount is doubled to 10.",
  "Speaker of the Dead": "While in Squad Mode, all of those in Support Range of the Wolf Priest add +10 to all Tests made with any Skill which the Wolf Priest is trained in. Additionally, the Wolf Priest may spend a Fate Point on behalf of any other member of the Kill-Team within Support Range, granting one of the normal benefits of spending a Fate Point to that character.",
  "Street Fighting": "The character is an experienced survivor of the kind of murderous fights that occur in the depths of an underhive or stinking alleys of a sink hab. When dealing Critical Damage with an unarmed attack or knife, the character deals an additional +2 points of Damage.",
  "Strong Minded": "The character’s conditioned mind acts as a fortress against psychic attacks. The character may re-roll failed Willpower Tests to resist any Psychic Powers that affect his mind. Psychic Powers that have a physical effect, such as Telekinesis, are unaffected by this Talent.",
  "Sudden Attack": "When attacking a Horde which is unaware of his presence, using ranged weapons or placed explosives, the Battle-Brother deals an additional 1d10 damage to the Horde’s Magnitude, and the Horde must make a Hard (–20) Pinning Test or become Pinned.",
  "Sure Strike": "The character has a degree of control over where his melee attacks land. When determining hit location for a melee attack, the character may use the dice as rolled, or he may reverse them, choosing the preferred location.",
  "Survivor": "The Battle-Brother has a remarkable ability to survive even the most harrowing of circumstances. Whether through sheer luck, divine intervention, or a stubborn refusal to die, he has cheated death time and again. When the Battle-Brother is reduced to 0 Wounds, he may spend a Fate Point to automatically pass any Toughness Test to avoid death or permanent injury. In addition, he gains a +10 bonus to all Tests made to resist the effects of the Toxic Quality.",
  "Swift Attack": "The character’s speed and martial ability allows him to land flurries of blows. As a Full Action, the character may make two melee attacks. If the character has the Two-Weapon Wielder Talent and is wielding two melee weapons, the character gains the advantage of Swift Attack with only one of the weapons, and a single attack with the other. If the character had the Two-Weapon Wielder Talent and is wielding a melee weapon in one hand and a gun in the other, the character gets the advantage of Swift Attack with the melee weapon and a single attack with the gun.",
  "Takedown": "As a Half Action, the character may declare that he is attempting a takedown before making his Weapon Skill Test. If the character hits and would have done at least 1 point of Damage, it is ignored, but the character’s opponent must make a Toughness Test or be Stunned for 1 Round. In addition, when performing a Stun Action, the character does not suffer a –20 penalty to his Weapon Skill.",
  "Talented": "The character has an affinity for a particular Skill. Choose any one of the character’s Skills, and gain a +10 bonus to tests made using the Skill.",
  "Target Selection": "The character’s dread gaze marks out his chosen victim, and not even the riotous confusion of close combat interferes. The character may shoot into melee with no penalty.",
  "Technical Knock": "Either through the ease of long practice, or the proper ritual to appease a weapon’s machine spirit, the character can clear stoppages with a simple knock. The character may un-jam any gun as a Half Action, but may only perform this rite on one weapon per Round. The character must touch the weapon to enact this rite.",
  "The Flesh is Weak": "The character’s body has undergone significant bionic replacement to the point where he is far more machine than man. This Talent grants the character the Machine Trait (see page 133) with Armour Points equal to the number of times this Talent has been taken. The character may purchase this Talent multiple times in accordance with his Career Path. In this case, note the number of times this Talent has been taken, such as The Flesh is Weak 3. The Armour Points gained through this Talent stack with any Armour Points of the armour the character is wearing, and are considered to be Non-Primitive Armour.",
  "The Leader of the Pack": "When the Wolf Guard kill an elite or master enemy add +2 to the next attack, if in squad mode make a +0 fellowship test, if successful this bonus is granted to battle brothers in close visual support range. In addition if a battle brother in close support range is attacked by a melee strike and the Wolf Guard is not in melee range, he can move up to his agility bonus toward the enemy, if the enemy is within melee range of the Wolf Guard, the Wolf Guard can after the move make one melee attack.",
  "Thrown Weapon Training": "The character’s mastery of the balance, spin, and weight of thrown weapons makes him a formidable foe at any distance, even if only armed with a knife. The Universal group includes the Primitive, Chain, Shock, and Power weapon groups. When a character attempts to use a weapon he does not have the correct Weapon Training Talent for, he suffers a –20 penalty to any relevant Weapon Skill or Ballistic Skill Test.",
  "Thunder Charge": "The Battle-Brother charges into combat using his armoured body as an additional weapon. Driven by his armour and the Battle-Brother’s enhanced muscle, the impact of such a charge is like being struck by a thunderbolt. When the Battle-Brother makes a Charge Action, first make an unarmed attack (see page 245 for more details) against every opponent he is charging. This represents slamming into the enemy with the character’s armoured bulk. This attack automatically also has the potential to knock the opponent down in the same way as if the Battle-Brother had used the Knock Down Action (see page 241 for more details). Once this attack has been resolved, the Battle-Brother may make his normal Charge Attack as normal. If the Battle-Brother charges a Horde, he may make d5+1 unarmed attacks against the Horde.",
  "Total Recall": "Mental conditioning or augmentation enables the character to record and recall great amounts of information, effectively granting him a perfect memory. The character can automatically remember trivial facts or pieces of information he might feasibly have picked up in the past. When dealing with more detailed, complex, or obscure facts, such as the exact layout of a defence network, the GM may require a successful Intelligence Test to recall the information.",
  "True Grit": "The character is able to shrug off wounds that would fell lesser men. Whenever the character suffers Critical Damage, halve the result (rounding up).",
  "Two-Handed Weapon Expertise": "When wielding any two-handed melee weapon, the character ignores the Unbalanced Quality and treats weapons with the Unwieldy Quality as being Unbalanced instead. This Talent may be purchased twice; if a Character does so, then the character ignores the Unwieldy Quality and treats weapons with the Unbalanced Quality as having the Balanced Quality instead.",
  "Two-Weapon Wielder": "Years of training allow the character to use a weapon in each hand when needed. When armed with two weapons of the same type, the character may spend a Full Action to attack with both. Both tests made to attack with the weapons suffer a –20 penalty (see Chapter VIII: Combat for more details on fighting with two weapons). The character must possess Two-Weapon Wielder (Melee) and Two-Weapon Wielder (Ballistic) if he wishes to use a gun and hand weapon with this Talent.",
  "Tyrannic War Stratagem": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids, and gains a single one of the Stratagems described below. This Talent may be purchased multiple times, each time requiring that a different Stratagem be selected. The bonus to command Tests remains at +10 no matter how many times the Talent is purchased.\n\nBulwark: When fighting against a Horde, the Battle-Brother may attempt to Parry melee attacks, but suffers a penalty equal to half the Horde’s Magnitude (rounding up) on the Test, due to the sheer number of creatures attacking.\n\nCleansing Flame: Any creature attempting an Agility Test to avoid being hit by a Flame weapon must re-roll successful Tests. Against Hordes of Tyranids, the amount of random Magnitude damage dealt by a Flame weapon may be rolled twice, selecting the highest result.\n\nGrenadier: The Battle-Brother may use a Krak Grenade as his chosen weapon for any Charge Attack, Standard Attack or All-Out Attack action, suffering a –20 penalty to hit due to the difficulty of the attack. However, if the attack roll succeeds, the Battle-Brother deals the normal damage of an Astartes Krak Grenade (with its associated Pen value), adding +1 to the Pen for every Degree of Success on the attack roll (to represent the grenade being thrust into vulnerable points in the creature’s carapace).\n\nMaster of Venoms: For the duration of the mission, a single non-powered weapon (i.e., not a chainsword, power sword, force weapon, etc) may be given the Toxic quality, and he may requisition special poison-delivery bolter shells for 5 requisition per clip, which deal –2 damage but gain the Toxic quality. All weapons the Battle-Brother wields with the Toxic quality may affect Tyranids in spite of their normal immunity to poisons.\n\nSlaughter the Swarm: When calculating the number of hits inflicted against a Horde, the Battle-Brother scores a number of bonus hits (after all other modifiers) equal to either his Intelligence Bonus or his Perception Bonus (whichever is higher).\n\nWithdraw: The Battle-Brother, if engaged in melee, may attempt to disengage from combat when Dodging by taking a –20 penalty on the Dodge Test. If the Test is successful, the Battle-Brother moves his Agility Bonus in metres and is prone, but no longer in melee.",
  "Tyrannic War Stratagem (Bulwark)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nBulwark: When fighting against a Horde, the Battle-Brother may attempt to Parry melee attacks, but suffers a penalty equal to half the Horde’s Magnitude (rounding up) on the Test, due to the sheer number of creatures attacking.",
  "Tyrannic War Stratagem (Cleansing Flame)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nCleansing Flame: Any creature attempting an Agility Test to avoid being hit by a Flame weapon must re-roll successful Tests. Against Hordes of Tyranids, the amount of random Magnitude damage dealt by a Flame weapon may be rolled twice, selecting the highest result.",
  "Tyrannic War Stratagem (Grenadier)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nGrenadier: The Battle-Brother may use a Krak Grenade as his chosen weapon for any Charge Attack, Standard Attack or All-Out Attack action, suffering a –20 penalty to hit due to the difficulty of the attack. However, if the attack roll succeeds, the Battle-Brother deals the normal damage of an Astartes Krak Grenade (with its associated Pen value), adding +1 to the Pen for every Degree of Success on the attack roll (to represent the grenade being thrust into vulnerable points in the creature’s carapace).",
  "Tyrannic War Stratagem (Master of Venoms)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nMaster of Venoms: For the duration of the mission, a single non-powered weapon (i.e., not a chainsword, power sword, force weapon, etc) may be given the Toxic quality, and he may requisition special poison-delivery bolter shells for 5 requisition per clip, which deal –2 damage but gain the Toxic quality. All weapons the Battle-Brother wields with the Toxic quality may affect Tyranids in spite of their normal immunity to poisons.",
  "Tyrannic War Stratagem (Slaughter the Swarm)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nSlaughter the Swarm: When calculating the number of hits inflicted against a Horde, the Battle-Brother scores a number of bonus hits (after all other modifiers) equal to either his Intelligence Bonus or his Perception Bonus (whichever is higher).",
  "Tyrannic War Stratagem (Withdraw)": "The Battle-Brother gains a +10 bonus on all command Tests that relate specifically to combating the Tyranids.\n\nWithdraw: The Battle-Brother, if engaged in melee, may attempt to disengage from combat when Dodging by taking a –20 penalty on the Dodge Test. If the Test is successful, the Battle-Brother moves his Agility Bonus in metres and is prone, but no longer in melee.",
  "Unarmed Master": "The character has developed unequalled mastery of unarmed combat techniques. The character’s unarmed combat attacks do 1d10 + Strength Bonus in Impact Damage, and these attacks no longer have the Primitive quality.",
  "Unarmed Warrior": "Due to extensive training in unarmed combat, the character’s unarmed combat attacks do 1d10–3 + Strength Bonus in Damage instead of 1d5–3. Because of the character’s advanced training against both armed and unarmed foes, he does not count as Unarmed, as defined on page 245, when making attacks against armed opponents. The character’s unarmed attacks still count as having the Primitive quality.",
  "Unbowed and Unbroken": "The Battle-Brother is a source of inspiration to those around him; when all seems lost, he stands defiant and by his deeds raises the warrior spirits of his comrades. If the squad has suffered Cohesion Damage caused by the enemy in the present or previous Round, the Battle-Brother may declare that his next Action is an act to demonstrate that the squad is unbowed and unbroken. His next Action may be one of the following: a ranged attack against the enemy, a melee attack against the enemy, or a Challenging (+0) Fellowship Test that represents a roar of defiance or exhortation to heroism. If the test involved in the Action (the attack roll or Fellowship Test) succeeds, then the Battle-Brother and those within Support Range of him regain all of the Cohesion they lost to Cohesion damage in this or the last round.",
  "Unshakeable Faith": "The character’s confidence in the Emperor is so strong that the character can face any danger. The character may re-roll any failed Willpower Tests to avoid the effects of Fear.",
  "Wall of Steel": "The character’s skill with blades is so profound that to try to land a blow on him is like trying to strike an invisible wall of steel, as the character’s blade is constantly in the correct place to deflect an attack. The character may make one additional Parry per Round, in effect giving the character a second Reaction that may only be used to Parry. The character may only attempt a single Parry against any one attack.",
  "Warp Affinity": "The character has a special connection to the warp, allowing him to sense and avoid its less desirable effects as he channels its power. The character may not select this Talent if he has undergone the Rite of Sanctioning. When rolling for Psychic Phenomenon, the character may discard the die roll, gaining 1d5 Corruption Points, and then re-roll with no modifiers.",
  "Warp Conduit": "The sheer power of the character’s mind allows him to channel vast amounts of warp energy. When pushing, the character may add +1 to his Psy Rating and subtract –10 on any resultant Psychic Phenomenon rolls.",
  "Warp Sense": "The character’s senses have evolved to perceive the warp in parallel with the physical world, though it requires some concentration to do so. After gaining this Talent, using the Psyniscience Skill requires a Half Action instead of a Full Action.",
  "Web of Peers": "When the Kill-marine first meets a new NPC, he may make a Fellowship Bonus Test (rolling 1d10 and comparing it to his Fellowship Bonus). If the roll is equal to or less than his Fellowship Bonus, he has a previous connection with this individual or their organisation. This grants him a +10 bonus on all Fellowship-based Tests when interacting with that NPC for the duration of the encounter.",
  "Weapon-Tech": "It is in the nature of a Techmarine to become concerned with learning the blessed and secret intricacies of weaponry. Once per combat, the Techmarine can enhance his weapon or seek out the weak points in an opponent’s armour, increasing the Techmarine’s deadliness. The effects of this mean that for one Round per combat encounter, a weapon personally wielded by the Techmarine from the Melta, Plasma, Power, or Exotic category increases its Damage and Penetration by an amount equal to the character’s Intelligence Bonus.",
  "Whirlwind of Death": "When facing massed opponents in combat, the Battle-Brother becomes a whirlwind of death, moving, hacking, gutting, and beheading with ceaseless fury. When attacking an enemy with the Horde trait in close combat, the Battle-Brother doubles any Damage dealt to the Horde’s Magnitude. For example, if the Battle-Brother’s attacks would reduce the Horde’s Magnitude by 3, this amount is doubled to 6.",
  "Wisdom of the Ancients": "The Battle-Brother has survived many wars, seen much, and been favoured with the experience of his chapter’s most ancient warriors. Within their mind and soul, they hold the well of knowledge that stretches back far before they were raised to become one of the Adeptus Astartes. The Battle-Brother may spend a Fate Point during a combat to get insight on a situation."
};

export const CYBERNETICS: Cybernetic[] = [
  {
    name: "Bionic Arm",
    summary: "A mechanical replacement for a lost arm.",
    description: "Common versions of these systems replace the function of the Battle-Brother’s arms and hand exactly, retaining his strength, dexterity, and sense of touch. Rules: Exceptional bionic arms provide a +10 bonus on Tests requiring delicate manipulation (such as Tech-Use Tests to repair small circuitry) and add a +10 bonus to Strength Tests using the arm.",
    location: "Arm",
    modifiers: {
      traits: ["Exceptional: +10 delicate manipulation, +10 Strength using arm"]
    }
  },
  {
    name: "Bionic Hand",
    summary: "A mechanical replacement for a lost hand.",
    description: "The hand is a frequent choice among Techmarines and other Adeptus Astartes who voluntarily give a part of themselves over to the Omnissiah. Rules: Common craftsmanship bionic hands function identically to the replaced appendage. Those of Exceptional craftsmanship provide the same +10 bonus to fine manipulation Tests as a bionic arm, but not the Strength bonus.",
    location: "Hand",
    modifiers: {
      traits: ["Exceptional: +10 fine manipulation"]
    }
  },
  {
    name: "Bionic Locomotion",
    summary: "A mechanical replacement for lost legs or spinal function.",
    description: "Common locomotion bionics must be fully integrated into the spine and nervous system to function properly; basic models accomplish this while retaining complete motor function. Rules: Exceptional versions of these systems grant the owner the Sprint Talent. In addition, they add a +20 bonus to Tests made to jump or leap.",
    location: "Legs/Spine",
    modifiers: {
      traits: ["Exceptional: Sprint Talent, +20 to jump/leap"]
    }
  },
  {
    name: "Bionic Respiratory System",
    summary: "Implanted respiratory systems that mimic human lungs.",
    description: "Common bionic lungs and implanted respiratory systems mimic the action of human lungs and keep the body supplied with oxygen. Rules: Characters with such a system installed gain a +20 bonus to Toughness Tests made to resist airborne toxins and gas weapons. Exceptional bionic lungs count as a full life support system; if for any reason the user’s power armour loses integrity or his own respiratory system fails, his bionic lungs keep his blood oxygenated. If desired, Exceptional bionic lungs may be designed to go undetected by scans.",
    location: "Internal",
    modifiers: {
      traits: ["+20 Toughness vs Gas", "Exceptional: Full life support, undetectable by scans"]
    }
  },
  {
    name: "Bionic Heart",
    summary: "A mechanical replacement for a destroyed heart.",
    description: "A Space Marine is quite capable of living through the destruction of one of his two hearts. Naturally if this happens, the organ must be replaced. The necessarily lightweight materials of a bionic heart do not provide quite as much shielding as the thick plating of an external bionic. Rules: adding only 1 to the Body location’s Toughness Bonus. Exceptional models can be triggered to pump more rapidly to increase physical capacity, though prolonged operation puts stress on the circulatory system. This provides the Sprint Talent.",
    location: "Internal",
    toughnessBonus: 1,
    modifiers: {
      traits: ["Exceptional: Sprint Talent"]
    }
  },
  {
    name: "Cybernetic Senses",
    summary: "Artificial replacement for sight, hearing, touch, or taste.",
    description: "Sight, hearing, touch, and taste may all need to be duplicated artificially when nerves or organs are damaged. Followers of the Machine God sometimes add more esoteric senses. Rules: Common systems, while usually very obviously artificial, duplicate the approximate range of normal senses adequately and have no further game effects. Exceptional cybernetic senses grant the Heightened Senses Talent for that particular sense, and a +20 bonus to Tests made to resist attacks on the sense itself, such as deafening noises or blinding flashes. Basic and advanced cybernetic eyes may also incorporate magnifying lenses (duplicating the effect of a telescopic sight for any ranged weapon used, a full photo-visor, and/or a system duplicating the Dark Sight Trait. Likewise, basic or advanced cybernetic hearing may also include an internal micro-bead system.",
    location: "Varies",
    modifiers: {
      traits: ["Exceptional: Heightened Senses Talent, +20 resist attacks on sense"]
    }
  },
  {
    name: "Mind Impulse Unit (MIU)",
    summary: "Allows direct neural interface with equipment.",
    description: "These devices, also known as sense-links, allow the owner to directly interface with a machine or technological device. MIUs see widespread use among Techmarines. A basic MIU implant involves a single spinal or cortex connector, while advanced variants include wrist connector probes—and possibly mechadendrite connectors—in addition to the spinal plug. Rules: Common models give no modifiers to machine spirit communication and add a +10 bonus to the Tech-Use, Pilot, or Drive Tests used in conjunction with devices capable of MIU link. Exceptional models grant a +10 bonus to communicate with machine spirits, and for Tech-Use, Pilot, Drive, Logic, Inquiry, and Ballistic Skill Tests when interfaced with MIU systems.",
    location: "Head/Spine",
    modifiers: {
      traits: ["Common: +10 Tech-Use, Pilot, Drive with MIU link", "Exceptional: +10 communicate with machine spirits, +10 Tech-Use, Pilot, Drive, Logic, Inquiry, BS with MIU"]
    }
  },
  {
    name: "Augur Array",
    summary: "Implanted sensor systems that go beyond human perception.",
    description: "These implanted devices duplicate the effects of sensor systems that go beyond the human horizons of perception. In all cases their use requires concentration. Rules: their use requires concentration and a Half Action. Common systems function identically to a standard handheld auspex (see page 174 core book). Exceptional systems function as a full auspex and also allow re-rolls on Perception based Tests when using its functions.",
    location: "Head",
    modifiers: {
      traits: ["Requires Half Action", "Common: Functions as standard auspex", "Exceptional: Functions as full auspex, reroll Perception tests when using"]
    }
  },
  {
    name: "Servo-Arm",
    summary: "Techmarine servo-arms are powerful manipulators tipped with crushing pincers, useful for field repairs and punishing enemies.",
    description: "Techmarine servo-arms are powerful manipulators tipped with crushing pincers, useful for field repairs and punishing enemies. Ports for these detachable appendages are installed at the shoulder, and the Battle-Brother’s armour must also be upgraded with more powerful power cells to support them. Rules: A servo-arm allows the Techmarine to use his Reaction to make a single strike with the arm. This strike uses the Techmarine’s Weapon Skill and deals 2d10 + double the Techmarine’s Strength Bonus in Impact Damage with a Penetration of 10. The arm can also be used to lift heavy objects, adding a +20 bonus to Strength Tests. Exceptional servo-arms grant a +10 bonus to WS and Strength Tests made using the arm.",
    location: "Shoulder",
    modifiers: {
      traits: ["Can use Reaction for single strike (2d10 + 2xSB I, Pen 10)", "+20 Strength Tests for lifting", "Exceptional: +10 WS and Strength Tests"]
    }
  },
  {
    name: "Servo-Harness",
    summary: "A cluster of auxiliary limbs integrating with power armour for repairs and combat.",
    description: "Like a servo-arm, a full servo-harness integrates with the Techmarine’s power armour and is controlled through the same spine interface that makes him one with his armour. Radiating from a boosted fusion backpack capable of powering them all, this cluster of auxiliary limbs aid in battlefield repairs as well as combat. The composition of each servo-harness is unique, customised with the tools most preferred by its previous owners for tending to machine spirits and laying waste to the God-Emperor’s enemies. Rules: At a minimum, a servo-harness consists of two servo-arms, a Combi-tool, a fyceline torch, and a plasma cutter. The torch is identical to an Astartes flamer. The plasma cutter can cut through a metre of adamantine plating up to 20 centimetres thick every minute (thinner material can be cut through faster). It may also be used as though it were an Astartes Plasma Pistol with a Range of 10m and no option to fire on Maximal Mode. A character with Talents that make him capable of taking the Multiple Attacks Action may use any weapon (or equivalent) on his servo-harness for any of the attacks he would normally be allowed, subject to all normal limitations including weapon Class. Additionally, the Techmarine may use his Reaction to make a single shot or strike with any one weapon on the harness. Exceptional servo-harnesses enhance the servo-arms to Exceptional as discussed above, and add a +5 to all Skill, WS, and BS Tests made using the components of the harness. The Servo-Harness Integration Talent is required in order to use a Servo-Harness.",
    location: "Back/Spine",
    modifiers: {
      traits: ["Requires Servo-Harness Integration Talent", "Includes: 2 servo-arms, Combi-tool, fyceline torch, plasma cutter", "Can use Reaction for single shot/strike with harness weapon", "Exceptional: Exceptional servo-arms, +5 Skill/WS/BS Tests using harness components"]
    }
  }
];

export const FIRST_COMPANY_VETERAN_ABILITIES = [
  {
    name: "Seen it All Before",
    description: "The Veteran draws upon his world-weary nature and dogged determination to get the job done regardless of the horrors which may try and divert him from his task. For the duration of the mission the Veteran and any Battle-Brothers in Support Range of him are immune to the effects of Fear and Pinning."
  },
  {
    name: "Old Scars",
    description: "First Company Veterans have been wounded countless times and their bodies are a latticework of scars and marks. Sometimes these old wounds flare up and rather than weakening the Battle-Brother, they make him less vulnerable to pain and injury. For the duration of the mission the Veteran may re-roll a number of failed Toughness Tests equal to his Toughness Bonus."
  },
  {
    name: "Flashback",
    description: "The Veteran has been here before, done this exact same thing on some other mission on some other world and knows how best to complete the objective. Once during the course of the mission the Veteran may add 2d10 x his Intelligence Bonus in Kill Markers to a single objective, reflecting his past knowledge of how best to achieve it."
  },
  {
    name: "An Old Friend",
    description: "A Veteran’s weapons are his oldest and most trusted friends and he keeps then in excellent condition. Sometimes he takes extra special care of them if he feels he requires a great service of them in a coming battle. For the duration of the mission the Veteran may re-roll a number of Ballistic Skill Test or Weapon Skill Tests (one or the other, chosen at the start of the mission) equal to his Rank. In addition he may ignore the first Jam result he suffers. Both of these benefits only apply when the Veteran is using his own weapons."
  }
];

export const SANGUINARY_PRIEST_ABILITIES = [
  {
    name: "Scion of Sanguinius",
    description: "The Apothecary increases his Fellowship by +5, and may enter a Frenzied state (if he has the Frenzy Talent) as a Free Action. In addition, any Blood Angel (or Successor) within Support Range of the Sanguinary Priest may also enter a Frenzied state as a Free Action. If a Sanguinary Priest is slain, and his body and wargear not recovered, the dishonour of such an act reduces the Renown of every surviving member of the Kill-Team that are Blood Angels (or Successors) by 1d5"
  }
];

export const RAVENWING_VETERAN_ABILITIES = [
  {
    name: "Skilled Rider",
    description: "A Ravenwing Veteran never suffers a penalty of greater than –10 for dangerous terrain or other hazards, and may perform the Evasive Manoeuvring action as a Half Action instead of a Full Action."
  },
  {
    name: "Advanced Reconnaissance",
    description: "While mounted upon a Bike, Attack Bike or some variety of Land Speeder, a Ravenwing Veteran cannot enter Squad Mode except with those who are similarly mounted, and he may not use the Stoic Defence Solo Mode Ability. These restrictions are waived as soon as the Battle-Brother dismounts."
  }
];

export const DEATHWING_TERMINATOR_ABILITIES = [
  {
    name: "No Mercy",
    description: "The Terminator gives no quarter, slaying all who stand against him without hesitation. The Battle-Brother adds +2 to his damage whenever he deals Critical Damage to an enemy, or deals an additional +1d5 Magnitude damage when attacking a Horde. However, his killing instinct cannot easily be restrained once unleashed—the Battle-Brother must pass a Challenging (+0) Willpower Test in order to leave an enemy alive."
  },
  {
    name: "Unending Advance",
    description: "The Terminator’s advance is unceasing and unstoppable, giving the enemy no opportunity to flee. The Battle-Brother may move-and-fire with Heavy and Mounted weapons on Semi- and Fully-Automatic, in the same way as with Pistol and Basic weapons. In addition, moving-and-firing in this manner imposes no penalties upon the attack roll."
  },
  {
    name: "Shield of the Righteous",
    description: "The Terminator’s armoured bulk is a bulwark against the enemies of man, his resilient form enduring the worst of his foes’ attacks so that his comrades do not have to. So long as the Battle-Brother is visible to an enemy, enemies must attack the Battle-Brother unless they can pass a Challenging (+0) Willpower Test. Hordes that fail the Willpower Test must allocate at least one attack to the Battle-Brother if possible."
  },
  {
    name: "Wrath of the Unforgiven",
    description: "The Terminator strikes with the fury of one betrayed, leaving no foe alive within his reach. The Battle-Brother’s melee attacks gain the Felling (1) and Devastating (1) qualities."
  }
];

export const WOLF_GUARD_ABILITIES = [
  {
    name: "The Making of a Saga",
    description: "Once per session, you can activate this ability during combat as a free action. When doing so, you get one token for the following actions to a maximum of five, these actions cannot be repeated in combat. The ability will be active for the duration of the combat. Only one token can be earned per battle round.\n\n• Slay an elite or master enemy in melee combat.\n• 3 degrees of success with an attack.\n• Slay an elite or master foe while being outnumbered by two or more elite enemies.\n• Activate a space wolf Squad mode or solo mode ability.\n• Slay one elite enemy that damaged another battle brother last round.\n• Grapple an elite or master enemy or defeat one while unarmed.\n• Sully your opponent's honor with a vicious insult. Depending on the severity of the insult, make an opposed fellowship test, if successful add a token.\n• Take critical damage.\n\nThe Wolf Guard will receive the following bonuses depending on the amounts of tokens:\n• 1 Mark: +5 Weapon Skill\n• 2 Marks: +1 melee damage\n• 3 Marks: Gain Fear (1) against enemies in melee range\n• 4 Marks: Once per round, reroll a failed melee attack\n• Max Marks: Your melee attacks gain Felling (2) and cannot be parried by lesser enemies"
  }
];

export const WOLF_SCOUT_ABILITIES = [
  {
    name: "Behind Enemy Lines",
    description: "The Battle-Brother reduces his Fellowship by 5, representing his quiet and distant manner, but his familiarity with stealth tactics increases his Agility by 5 in place of the normal Deathwatch Tactical Marine Characteristic Advances, and is Trained in the Shadowing Skill instead of the Command Skill. However, he may not purchase any Talents that have a Fellowship-based Skill, or a particular value in the Fellowship Characteristic, as a prerequisite. This Special Ability must be taken instead of either of the normal Deathwatch Tactical Marine Special Abilities."
  }
];

export const WOLF_PRIEST_ABILITIES = [
  {
    name: "Morkai's Chosen",
    description: "A Wolf Priest is trained in the Medicae Skill, and gains the Fearless, Hatred (Choose one) and Litany of Hate Talents. In addition, his presence grants a bonus point of Cohesion to the Kill-Team. Finally, if the Wolf Priest is chosen as Squad Leader, he may perform a special Oath, the Oath of War."
  },
  {
    name: "Oath of War",
    description: "If the Wolf Priest is chosen as Squad Leader, he may perform this special Oath. (See Deathwatch First Founding page 105 for details)."
  }
];

export const TYRANNIC_WAR_VETERAN_ABILITIES = [
  {
    name: "The Scars of Experience",
    description: "The Battle-Brother may attempt to impart any Talent from the Tyrannic War Veteran Advances list. This requires a Full-Round Action and costs a single point of Cohesion, at which point all those in Support Range of the Battle-Brother count as possessing the Talent until the end of the combat. In addition, the Battle-Brother gains the Hatred (Tyranids) Talent for free upon entering this Advanced Specialty, and gains 1d10 Renown due to the recent memory of the First Tyrannic War."
  }
];

export const ULTRAMARINES_HONOUR_GUARD_ABILITIES = [
  {
    name: "Astartes Paragon",
    description: "A Kill-Team containing an Honour Guard adds +2 to its Cohesion."
  }
];

export const TEMPEST_BLADE_ABILITIES = [
  {
    name: "The Highlander's Wrath",
    description: "When Heavily Damaged or Critically Damaged, the Tempest Blade ignores the effects of Fatigue, gains a +10 bonus to all Weapon Skill Tests and a +2 bonus to all melee Damage rolls, and any Heroic Sacrifice he declares lasts for a number of Rounds equal to his Toughness Bonus +2. Additionally, a Tempest Blade may always choose to take the Deathwatch Dreadnought Advanced Speciality even though characters are not normally allowed to take two Advanced Specialities; to a Tempest Blade, internment within a Dreadnought is the greatest expression of their beliefs."
  }
];

export const SWORD_BROTHER_ABILITIES = [
  {
    name: "Righteous Rage",
    description: "The Sword Brother’s hearts burn with the fury of one who has seen many of the horrors of the galaxy and learned only to detest them. His passion for the extinction of all that is not human knows no bounds and is only barely restrained by the stoic determination typical of those who descend from Rogal Dorn. The Sword Brother gains the Frenzy Talent and, while in a frenzied state, increases the bonus gained from the Hatred Talent (including any temporarily conferred onto the Sword Brother by the Litany of Hate Talent) to +20."
  },
  {
    name: "Eternal Crusader",
    description: "The Sword Brother has endured much and triumphed in spite of it, and possesses a deep understanding for the necessity and righteousness of the Black Templars’ Crusade. While he still draws breath, he will not cease in his own efforts to strike down the enemies of Man. Once per combat, the Sword Brother may add his Willpower Bonus to his Toughness Bonus when determining how much (if any) Damage he suffers from an attack. This applies only to a single Damage roll, even if the attack scores many hits."
  },
  {
    name: "Many Deaths to Bring",
    description: "The Sword Brother is a keen student of the many tools and techniques employed by the Adeptus Astartes, and can bring them to bear upon the enemy with contemptuous ease. The Sword Brother counts any Astartes weapon he wields as having the Proven (3) quality."
  },
  {
    name: "Wrathful Firepower",
    description: "The Templar’s wrath knows no limitations, and his fury is as easily expressed with a storm of fire as with the clash of blades. The character gains the benefits of the Hatred Talent with ranged attacks as well as with melee attacks."
  }
];

export const MISSION_OATHS = [
  {
    name: "Oath of the Astartes",
    info: "A Battle-Brother’s loyalty to his Chapter and Primarch is second only to his loyalty to the Emperor. Those who serve in the Deathwatch are no different. These Space Marines learn to share this loyalty with their newfound brothers in arms. Taking the Oath of the Astartes means studying the Codex Astartes and drilling with squad tactics until the Battle-Brother’s skills are honed to a fine edge.",
    prerequisite: "Tactical Marine, Assault Marine or Devastator Marine",
    effect: "Those who take this oath have added faith in their Battle-Brothers and a keener understanding of the strength of their squad. A Kill-team which takes this oath before a Mission may add +2 to their Cohesion for the duration of that Mission.",
    squadModeAbilities: "Squad Advance, Bolter Assault and Tactical Spacing."
  },
  {
    name: "Oath of the Emperor",
    info: "A Battle-Brother’s loyalty to the Emperor is a vital part of his existence, a value instilled in him since his induction and a shield he carries with him wherever he goes. Often before battle, Space Marines gather in the Watch Fortress’ grand shrine to the Emperor and reaffirm these oaths of loyalty, giving themselves a greater sense of purpose and renewing their fervour for defending the Imperium.",
    prerequisite: "Tactical Marine, Librarian or Apothecary",
    effect: "Those who take the Oath to the Emperor before battle have spent long hours praying to the Emperor and are filled with his righteous zeal. All members of the Kill-team may add +10 to Willpower Tests for the duration of the Mission.",
    squadModeAbilities: "Fire for Effect, Regroup and Strongpoint."
  },
  {
    name: "Oath of Glory",
    info: "The Adeptus Astartes relentlessly seek glory in the Emperor’s name, often pushing themselves to feats of greatness (even by the high standards of the superhuman Space Marines) against the Imperium’s foes. Such feats become the tales of glory told within a Chapter and can earn those responsible great respect and standing amongst their peers.",
    prerequisite: "Tactical Marine or Assault Marine",
    effect: "Those that take the Oath of Glory pledge to the Emperor, their Chapter, their Primarch, and their Battle-Brothers to prove themselves in battle above and beyond their duty. All members of a Kill-team which take this oath will gain an additional point of Renown for each Primary and Secondary Objective that the Kill-team completes, as long as they are personally involved.",
    squadModeAbilities: "Squad Advance, Bolter Assault and Furious Charge."
  },
  {
    name: "Oath of Knowledge",
    info: "Knowledge is power, and on the battlefield it can mean the difference between anticipating a foe’s attacks and being caught off guard. Many Battle-Brothers study the Imperium’s foes to learn their strengths and weaknesses so they may better kill them in combat. However, the Imperium’s foes are near infinite and a Battle-Brother’s time is not.",
    prerequisite: "Librarian or Apothecary",
    effect: "Those who take the Oath of Knowledge endeavour to learn all they can of their foes. A Kill-team which takes this oath may choose a single kind of foe (i.e. Ork, Tau, Tyranid), and for the duration of the Mission all members of the team will gain a +10 to Weapon Skill and Ballistic Skill Tests against this chosen enemy with ranged or melee weapons. Alternatively a Librarian who takes the Oath of Knowledge (or is part of a Kill-team which selects it) may instead choose to study their powers more exhaustively and steel himself against the perils of the warp. This grants the Librarian the ability to re-roll the results of any rolls on Table 6–1: Psychic Phenomena for the duration of the Mission.",
    squadModeAbilities: "Go to Ground, Dig In and Strongpoint."
  },
  {
    name: "Oath of Loyalty",
    info: "As important as loyalty to the Chapter is loyalty to one’s comrades. Knowing they can be relied upon in combat to watch a Battle-Brother’s back and support his attacks is key to the squad’s strength and effectiveness. An Oath of Loyalty is a way of strengthening that faith within the squad and boosting a Battle-Brother’s own connection with his Kill-team.",
    prerequisite: "Tactical Marine or Apothecary",
    effect: "Those who take the Oath of Loyalty spend time with their Battle-Brothers to strengthen their camaraderie. A Kill-team which takes this oath gains a +1 bonus on Cohesion Challenge rolls and their leader may add +10 to all tests to resist Cohesion damage.",
    squadModeAbilities: "Tactical Spacing, Regroup and Soak Fire."
  },
  {
    name: "Oath of the Weapon",
    info: "Space Marines drill constantly, and when they are not fighting. they are training for combat. Some Battle-Brothers take this a step further and take oaths to ensure their weapons do not fail them in combat, blessing bolters and chainswords so that the Emperor might ensure their effectiveness against His enemies.",
    prerequisite: "Techmarine or Devastator Marine",
    effect: "Those taking the Oath of the Weapon pray over their weapons before battle and strive to extinguish even the smallest element of chance in their function. A Kill-team which takes this oath may ignore the effects of Jams (see page 249) with their personal weaponry and re-roll Weapon Skill Tests to confirm Righteous Fury (see page 245) with melee weapons for the duration of the Mission.",
    squadModeAbilities: "Fire Support, Fire for Effect and Tank Buster."
  },
  {
    name: "Liturgies of Battle",
    info: "Chaplains are the very embodiment of Honour, and when war calls, his righteous wrath at the foes of the Imperium inspires his Battle-Brothers.",
    prerequisite: "Deathwatch Chaplain",
    effect: "All Battle-Brothers in Support Range of the Chaplain gain the Fearless Talent. In addition, the effects of the Chaplain’s Litany of Hate Talent extend to all Battle-Brothers in support range, and the effects of that Talent are Doubled (from +10 to +20) when performing a charge.",
    squadModeAbilities: "—"
  },
  {
    name: "Oath of Hope",
    info: "The Blood Angels, like their Primarch, believe absolutely in the promise of a better future for Mankind, citing their transformation from wretched wasteland dwellers to beings of angelic mien as an example of this. Blood Angels Space Marines strive to protect that hope, even if it takes the final breath of the very last Son of Sanguinius to bring about that future.",
    prerequisite: "Blood Angels",
    effect: "Those that take the Oath of Hope stand as paragons of humanity and avatars of the Emperor’s grace, and few true servants of the Imperium can help but feel inspired by so powerful a presence. A Kill-Team which takes this oath gains a +20 bonus to all Tests to resist Fear and Pinning, as do any other servants of the Imperium within 100m of the Kill-Team.",
    squadModeAbilities: "Bolter Assault, Furious Charge, Squad Advance"
  },
  {
    name: "Oath of Vengeance",
    info: "The Dark Angels do not suffer those who stand against Mankind, or those who rebel or betray. Many are the litanies of retribution and declarations of hatred intoned upon the eve of battle by the Dark Angels, but all have a singular purpose—to incite the servants of the Emperor to wrath and retribution. A Dark Angel enacts vengeance not only for the acts already committed against Mankind, but is also vigilant for all those misdeeds yet to come, and by swearing this oath, exhorts his allies to do likewise.",
    prerequisite: "Dark Angels",
    effect: "Those that take the Oath of Vengeance contemplate the wrongs done to them and the masses of Humanity by heretics, aliens and daemons, hardening themselves for the battles to come. A Kill-Team which takes this Oath gains +1 Cohesion when any member of the Kill-Team takes any Test to resist Cohesion Damage and passes by 2 or more Degrees of Success, as their determination is strengthened by the attacks of their foes.",
    squadModeAbilities: "Fire Support, Dig In, Strongpoint"
  },
  {
    name: "Masters of the Craft",
    info: "In addition to having overcome the challenges of siege warfare, many Imperial Fists veterans are masters of its technical aspects. These masters of the art of siegecraft seek to pass on their expertise to those around them.",
    prerequisite: "Imperial Fists",
    effect: "By the application of insight, experience and logic, the Imperial Fist team leader instils his Battle-Brothers with an understanding of siegecraft. A Kill-team which takes this oath before a Mission may add +20 to all Command Skill tests.",
    squadModeAbilities: "Furious Charge, Squad Advance, Dig In, Strongpoint."
  },
  {
    name: "Oath of War",
    info: "Wolf Priests embody the cycle of life and death, and for the Wolves of Fenris, the purest expression of this cycle is warfare. War is the formalised act of survival, the moment where the survival of one being or species is anathema to the survival of another, and few understand the harsh necessities of survival better than those who have endured the brutality of Fenris.",
    prerequisite: "Wolf Priest",
    effect: "Those who take this Oath feast and drink in the days before battle is joined, celebrating the lives they have led and the victories they have won, for soon they may die—to sleep upon the red snow, as the Fenrisians say—and it is better that one has no regrets when one’s thread is cut. All Battle-Brothers within Support Range of the Wolf Priest gain the Fearless Talent, and the Kill-Team may nominate a single type of enemy (such as Tyranid Genestealers, Tau Fire Warriors, etc); against this enemy, all members of the Kill-Team gain +10 to hit and +2 to damage with all weapons and attacks.",
    squadModeAbilities: "Furious Charge, Squad Advance, Tactical Spacing"
  },
  {
    name: "Oath of the Wolf-King",
    info: "The Space Wolves look to the example of their father and master, Leman Russ, the Wolf-King of Fenris, in all aspects of battle. The Wolf-King’s cunning and ruthlessness are as legendary as his might and valour, and the Space Wolves seek to emulate this. Once committed to battle, the Wolves know only to see it through, and are unceasing in their pursuit of victory, heedless of peril and inured to doubt.",
    prerequisite: "Space Wolves",
    effect: "Those who take this Oath do not meditate upon the philosophies of war, but rather steel themselves for the brutality of conflict and the necessary atrocities that accompany it. Any Squad Attack Pattern used by a member of this Kill-Team has its cost reduced by 1, to a minimum of 1.",
    squadModeAbilities: "Bolter Assault, Fire for Effect, Furious Charge"
  },
  {
    name: "Oath of Duty",
    info: "Taken upon a volume of the Codex Astartes, the Oath of Duty is an avowal of one’s duty, stated for all to hear and its fulfilment is promised upon a sacred tome. The Ultramarines hold that an oath sworn upon something sacred is unbreakable, for to break such a vow would not only be disgraceful, but blasphemous, and few can refute such reasoning.",
    prerequisite: "Ultramarines",
    effect: "Those that take the Oath of Duty meditate upon the task at hand, focussing utterly on the completion of their immediate task, with no consideration of anything irrelevant to their mission. Such focus grants the members of the Kill-Team the freedom to approach the mission’s objectives in any way they choose, unfettered by any other considerations. This Oath grants no special ability, but rather grants access to four Squad Mode abilities instead of three.",
    squadModeAbilities: "Fire for Effect, Squad Advance, Regroup, Tactical Spacing"
  },
  {
    name: "Oath of the Endless Crusade",
    info: "The Black Templars are a Chapter whose every deed is surrounded by righteous zeal and the oaths, vows, promises and declarations of warriors and commanders. It should come as no surprise, then, to imagine that the rituals of oath-taking are of particular significance to the Black Templars, for the selection and swearing of an oath represents the culmination of a time of fasting and prayer for every Battle-Brother, and signifies the final moments of calm before battle is joined. The Oath of the Endless Crusade is one of the most commonly taken of the Black Templars’ oaths, drawing upon ten millennia of perpetual crusading, and is believed to have been originally composed by Sigismund himself, upon becoming the Chapter’s first High Marshal. Taking the Oath of the Endless Crusade means committing utterly to the indiscriminate destruction of all creatures who would oppose mankind’s dominion of the galaxy.",
    prerequisite: "Black Templars",
    effect: "Those that take the Oath of the Endless Crusade are inspired to greater feats of wrath and valour and strive to push ever onwards to victory and the annihilation of their foes. All members of a Kill-team that take this Oath gain the Brutal Charge Trait and gain an additional point of Renown for each Primary and Secondary Objective that the Killteam completes, as long as they were personally involved and the objective required that the enemy be assaulted and exterminated—the Black Templars do not see the valour in defence while there are yet foes to slay.",
    squadModeAbilities: "Bolter Assault, Furious Charge, Regroup."
  },
  {
    name: "Oath of the Final Duel",
    info: "Sworn upon a rough-hewn altar of vitrified sand taken from the shores of one of Sacris’ storm-wracked seas, the Storm Wardens regard this oath as an acceptance of the end that they may face in honourable combat, and with that acceptance, free themselves of the burdens of doubt or self-preservation.",
    prerequisite: "Any Battle-Brother of the Storm Wardens Chapter",
    effect: "Those that take the Oath of the Final Duel do so silently, each confronting the notion of their own fate and their own demise. Their silent vow sworn, the Killteam face battle prepared to die, with every moment of continued existence a blessing from the Emperor. Any member of a Kill-team which takes this Oath gains a +10 bonus to Weapon Skill when engaged in single combat with an enemy.",
    squadModeAbilities: "Furious Charge, Soak Fire, Tank Hunter"
  }
];

export const GENE_SEED_PURITIES: Record<string, { description: string }> = {
  "Pure": {
    description: "The new Chapter is a direct descendent of its Progenitor. It is likely to maintain close contact with its Progenitor and many brother Successors, and follows the traditions of its peers closely. Characters drawn from such Chapters follow all of the rules for those of their Progenitor."
  },
  "A New Generation": {
    description: "Attempts have been made to “breed out” real or perceived flaws in the Progenitor’s gene-stock, introducing some divergence. Such Chapters often go on to define their own traditions and write their own histories, looking forward to the future more than back to the past. Some links may be maintained with the Progenitor Chapter, but it is just as likely that the new Chapter strikes out entirely on its own. Characters drawn from this Chapter follow all of the rules for those drawn from its Progenitor, but are not tied to the Progenitor’s Chapter Demeanour. Instead of using the Progenitor’s Chapter Demeanour, choose or roll on Table 1–5: Codex Demeanours to randomly select one of the new Codex Demeanours."
  },
  "Altered Stock": {
    description: "For whatever reason, the Chapter’s gene-seed has subtly altered, causing some zygotes to become deficient. While some links are maintained with the Progenitor, the Battle-Brothers of the Chapter may be shunned, for they appear subtly different to their brethren. Characters drawn from this Chapter follow the normal rules for the Progenitor, but must roll on Table 1–7: Gene-Seed Deficiencies."
  },
  "Flawed": {
    description: "A major flaw has been introduced, marking the Chapter apart from its brother Successors. Chapters suffering some kind of flaw are often forced to forge their own destiny, either embracing their fate or raging against it. Some go on to earn glory despite their flaw, while others are consumed by it, burning brightly, if all too briefly. Characters drawn from this Chapter follow the usual rules for the Progenitor, but have a 50/50 chance of either using the Chapter Demeanour or rolling on Table 1–5: Codex Demeanours. In addition, they must roll on Table 1–8: Chapter Flaws."
  }
};

export const GENE_SEED_DEFICIENCIES: Record<string, { description: string }> = {
  "Hyper-stimulated Omophagea": {
    description: "Having tasted the flesh of the foe once, the Chapter’s Battle-Brothers develop an addiction to the processes allowed by the Omophagea. A player character confronted with the opportunity to partake of the flesh of a fallen enemy must pass a Challenging (+0) Willpower Test or do so immediately, whether he wants to or not."
  },
  "Oversensitive Occulobe": {
    description: "The organ that allows the Space Marines to see in low light conditions has become overly sensitised, working exceptionally well in the dark but suffering in full light conditions. The character can see in total dark as if it were merely low light, and low light as if it were full light. However, should he remove his helmet in full light conditions he will suffer –10 to all Awareness Tests."
  },
  "Mutated Catalepsean Node": {
    description: "The implant that allows the Battle-Brother to enter a half-sleep in which he can remain alert for danger has become dangerously mutated. The Space Marine is unable to sleep normally, and stays awake for days, even weeks on end without effect. However, when sleep does come, sometimes with little or no warning, it is wont to last for many days on end."
  },
  "Oolitic Secretions": {
    description: "The Chapter’s oolitic kidney function is unbalanced in such a way that the Battle-Brother’s skin is turned an unusual colour due to its secretions. The Space Sharks (for example) have grey skin, while the Salamanders’ is the colour of volcanic rock. A whole range of other colours is possible, and the more extreme might be viewed by some as a seriously disturbing mutation."
  },
  "Disturbing Voice": {
    description: "Due to a malfunction in or related to the function of the Betcher’s gland, the Chapter’s brethren exhibit unusual vocal characteristics. Some cannot speak above a sibilant whisper for example, while others have deep, booming voices or speak with an otherworldly cant. Allies might find it truly terrifying. All Space Marines with this deficiency have the Disturbing Voice Talent."
  },
  "Lost Zygote": {
    description: "One of the Chapter’s zygotes has entirely ceased to function. Choose one of the Implants described on page 36 of the DEATHWATCH Rulebook. The in game benefits of this Implant no longer apply. In some cases the player should agree with the GM exactly what effect this has on the character, as the effects of some implants are wrapped up in other character abilities, Skills and Talents."
  },
  "Doomed": {
    description: "A Chapter that loses the ability to replicate either the Black Carapace or Progenoid zygotes is ultimately doomed. Without the former the future generations of Space Marines will not be able to interface with their power armour, and without the latter there will be no future generations at all. Battle-Brothers with this mutation are unaffected themselves, but know that unless their Chapter’s Apothecaries can affect a cure, they are the very last of their line."
  },
  "Multiple Instabilities": {
    description: "Roll d3 more times on this table, re-rolling multiples of the same result (including this one)."
  }
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Common Lore": "The Common Lore skill allows the character to recall general information, procedures, divisions, traditions, famed individuals, and superstitions of a particular world, group, organisation, or race. This skill differs from Scholastic Lore, which represents scholarly learning, and Forbidden Lore, which involves hidden or proscribed knowledge, in that it deals with basic information learned from prolonged exposure to a culture or area.\nSuccess in a Common Lore Test indicates the character recalls general information about the subject. The GM determines what extra information to provide for additional Degrees of Success.",
  "Forbidden Lore": "Forbidden Lore skills represent knowledge usually hidden, veiled, or proscribed by an organisation or society. Mere possession of this knowledge may cause difficulties for those not associated with the group in question. Excessive knowledge of the hidden truths of the Traitor Legions, for example, can be decidedly bad for one’s health for those outside (or even inside) the Adeptus Astartes. A successful Forbidden Lore Test indicates the character recalls basic information about the subject. The GM reveals additional information as appropriate to the Degree of Success on the roll.",
  "Scholastic Lore": "Scholastic Lore grants the character knowledge of a particularly complex or esoteric subject. A successful Skill Test allows the character to recall necessary information or research a particular subject if appropriate reference material is readily available. Scholastic Lore grants a depth of knowledge far beyond that of Common Lore, requiring both experience and study to obtain. Scholastic Lore Tests can identify things that fall within the character’s area of expertise, such as a person, book, starship, or machine spirit. Scholastic Lore can overlap with Common Lore and Forbidden Lore in some areas, but it represents more indepth—and academic—information. A character with Common Lore (Imperial Creed) might know conventional information about the Cult of the Emperor and its various organisations and their practices within the Imperium, but one with Scholastic Lore (Imperial Creed) would be able to name the various cults within a subsector and their varying levels of divergence from the Ministorum. Scholastic Lore Tests require no time, as the character either knows the fact or not. Researching, however, requires an Extended Test of a duration and difficulty appropriate to the task at hand.",
  "Navigation": "The character uses the Navigation Skill to plot a course between two points. The course might be across a continent or across a star system. A successful Navigation Test also provides an estimated travel time based on geography, cosmography, prevailing conditions, weather, and solar winds. Surface navigation is used to navigate across a planet’s surface, using logi-compasses, map readouts, and geographical knowledge. Stellar navigation is used to navigate in space between planets, using star-charts, and carto-mantic rituals. A Navigation Test represents several hours of charting courses, consulting maps, and making necessary trajectory corrections. However, 1 minute is adequate for the purpose of finding the character’s current location.\nSkill Use: 1 minute for simple location; 1d5 hours for plotting courses or routes",
  "Pilot": "Characters utilise the Pilot Skill to fly anything from personal jump packs, to small atmospheric craft such as landers or guncutters, to void-capable fighters, bombers, and capital vessels. Under normal conditions, piloting does not require a test, but unusual or difficult conditions such as storms, obstacles or dangerous manoeuvres do require a Skill Test. When chasing another vehicle or ship or contesting for position, the character makes an opposed Pilot Test against his opponent. The skill also allows the character to control land-based, hover, or skimmer-type vehicles. Vehicles include Cargo-8s, Rhinos, Land Speeders, Sentinels, and other ground-based transports. Normal driving does not require a test, but a test is required for hazardous conditions, excessive speed, or dangerous manoeuvres.\nSkill Use: Half Action",
  "Speak Language": "The Speak Language Skill is used to communicate with others using the same language. The Imperium has nearly as many languages as it has star systems, but for all this variety, most can speak or understand a variation of Low Gothic. In most situations, Skill Tests are unnecessary so long as those involved all speak a common tongue. However, communication with those using obscure dialects or cryptic, complex concepts requires a test at an appropriate difficulty.",
  "Trade": "Trade Skills allow the character to create things, from guns to starships. Characters with this Skill can earn money or reputation plying a trade. They can identify the works of particularly famous or infamous craftsmen, or recall information concerning items of their trade. Trade Tests can represent the work of an hour, week, or month depending on the complexity of the task at hand. However, tests that involve the examination of an item to recall information require a Full Action."
};
export const ALL_SPECIAL_ABILITIES = [...TACTICAL_MARINE_ABILITIES, ...APOTHECARY_ABILITIES, ...ASSAULT_MARINE_ABILITIES, ...DEVASTATOR_MARINE_ABILITIES, ...TECHMARINE_ABILITIES, ...DEATHWATCH_CHAMPION_ABILITIES, ...DEATHWATCH_CHAPLAIN_ABILITIES, ...DEATHWATCH_EPISTOLARY_ABILITIES, ...DEATHWATCH_FORGE_MASTER_ABILITIES, ...DEATHWATCH_KEEPER_ABILITIES, ...DEATHWATCH_KILL_MARINE_ABILITIES, ...DEATHWATCH_CAPTAIN_ABILITIES, ...FIRST_COMPANY_VETERAN_ABILITIES, ...SANGUINARY_PRIEST_ABILITIES, ...RAVENWING_VETERAN_ABILITIES, ...DEATHWING_TERMINATOR_ABILITIES, ...WOLF_SCOUT_ABILITIES, ...WOLF_PRIEST_ABILITIES, ...TYRANNIC_WAR_VETERAN_ABILITIES, ...ULTRAMARINES_HONOUR_GUARD_ABILITIES, ...SWORD_BROTHER_ABILITIES, ...WOLF_GUARD_ABILITIES, ...TEMPEST_BLADE_ABILITIES, ...EMPERORS_CHAMPION_ABILITIES];
