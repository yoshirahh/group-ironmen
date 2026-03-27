export const SkillName = {
  Agility: "Agility",
  Attack: "Attack",
  Construction: "Construction",
  Cooking: "Cooking",
  Crafting: "Crafting",
  Defence: "Defence",
  Farming: "Farming",
  Firemaking: "Firemaking",
  Fishing: "Fishing",
  Fletching: "Fletching",
  Herblore: "Herblore",
  Hitpoints: "Hitpoints",
  Hunter: "Hunter",
  Magic: "Magic",
  Mining: "Mining",
  Overall: "Overall",
  Prayer: "Prayer",
  Ranged: "Ranged",
  Runecraft: "Runecraft",
  Slayer: "Slayer",
  Smithing: "Smithing",
  Strength: "Strength",
  Thieving: "Thieving",
  Woodcutting: "Woodcutting",
  Sailing: "Sailing",
};

const levelLookup = new Map();
levelLookup.set(1, 0);
function xpForLevel(level) {
  let xp = 0;
  for (let i = 1; i <= level; ++i) {
    xp += Math.floor(i + 300 * 2 ** (i / 7));
  }
  return Math.floor(0.25 * xp);
}

for (let i = 1; i <= 126; ++i) {
  levelLookup.set(i + 1, xpForLevel(i));
}

export class Skill {
  constructor(name, xp) {
    this.name = SkillName[name];
    this.xp = xp;
    this.level = this.calculateLevel();
  }

  static getIcon(skillName) {
    const basePath = window.BASE_PATH || "";
    switch (skillName) {
      case SkillName.Attack:
        return basePath + "/ui/197-0.png";
      case SkillName.Strength:
        return basePath + "/ui/198-0.png";
      case SkillName.Defence:
        return basePath + "/ui/199-0.png";
      case SkillName.Ranged:
        return basePath + "/ui/200-0.png";
      case SkillName.Prayer:
        return basePath + "/ui/201-0.png";
      case SkillName.Magic:
        return basePath + "/ui/202-0.png";
      case SkillName.Hitpoints:
        return basePath + "/ui/203-0.png";
      case SkillName.Agility:
        return basePath + "/ui/204-0.png";
      case SkillName.Herblore:
        return basePath + "/ui/205-0.png";
      case SkillName.Thieving:
        return basePath + "/ui/206-0.png";
      case SkillName.Crafting:
        return basePath + "/ui/207-0.png";
      case SkillName.Fletching:
        return basePath + "/ui/208-0.png";
      case SkillName.Mining:
        return basePath + "/ui/209-0.png";
      case SkillName.Smithing:
        return basePath + "/ui/210-0.png";
      case SkillName.Fishing:
        return basePath + "/ui/211-0.png";
      case SkillName.Cooking:
        return basePath + "/ui/212-0.png";
      case SkillName.Firemaking:
        return basePath + "/ui/213-0.png";
      case SkillName.Woodcutting:
        return basePath + "/ui/214-0.png";
      case SkillName.Runecraft:
        return basePath + "/ui/215-0.png";
      case SkillName.Slayer:
        return basePath + "/ui/216-0.png";
      case SkillName.Farming:
        return basePath + "/ui/217-0.png";
      case SkillName.Hunter:
        return basePath + "/ui/220-0.png";
      case SkillName.Construction:
        return basePath + "/ui/221-0.png";
      case SkillName.Sailing:
        return basePath + "/ui/228-0.png";
    }
    return "";
  }

  get icon() {
    return Skill.getIcon(this.name);
  }

  calculateLevel() {
    if (this.name === SkillName.Overall) return this.level;

    for (let i = 1; i <= 126; ++i) {
      const start = levelLookup.get(i);
      const end = levelLookup.get(i + 1);
      if (this.xp >= start && this.xp < end) {
        return i;
      }
    }
    return 1;
  }

  get levelProgress() {
    const currentLevel = this.level;
    const start = levelLookup.get(currentLevel);
    const end = levelLookup.get(currentLevel + 1);
    const xpInLevel = this.xp - start;
    return xpInLevel / (end - start);
  }

  get xpUntilNextLevel() {
    const nextLevelXp = levelLookup.get(this.level + 1);
    return nextLevelXp - this.xp;
  }

  static parseSkillData(skills) {
    const result = {};
    let overallLevel = 0;
    for (const [name, xp] of Object.entries(skills)) {
      const skill = new Skill(name, xp);
      result[name] = skill;
      if (name !== SkillName.Overall) overallLevel += Math.min(99, skill.level);
    }

    result[SkillName.Overall].level = overallLevel;
    return result;
  }
}
