export interface SubSkill {
  label: string;
  name?: string;
  initial: number;
}


export interface Skill {
  label: string;
  name: string;
  initial?: number;
  occupation?: number;
  interest?: number;
  growth?: number;
  contains?: Array<SubSkill>;
  tag?: string;
  mark?: boolean;
  selected?: number | "other";
}


export const languages: Array<SubSkill> = [
  {label: "汉语", name: "chinese", initial: 1},
  {label: "英语", name: "english", initial: 1},
  {label: "日语", name: "japanese", initial: 1},
  {label: "西班牙语", name: "spanish", initial: 1},
  {label: "法语", name: "french", initial: 1},
  {label: "俄语", name: "russian", initial: 1},
  {label: "阿拉伯语", name: "arabic", initial: 1},
  {label: "韩语", name: "korean", initial: 1},
  {label: "德语", name: "german", initial: 1},
  {label: "希腊语", name: "greek", initial: 1},
  {label: "拉丁语", name: "latin", initial: 1}
];


export const skills: Array<Skill> = [
  // initial value equals DEX/2, hardcoded in `SkillTable`
  {label: "闪避", name: "Dodge", initial: undefined},
  // initial value equals EDU, hardcoded in `SkillTable`
  {label: "母语", name: "Language (Own)", initial: undefined, tag: "blank", contains: languages},
  {label: "心理学", name: "Psychology", initial: 10},
  {label: "信用评级", name: "Credit Rating", initial: 0},
  {label: "话术", name: "Fast Talk", initial: 5},
  {label: "恐吓", name: "Intimidate", initial: 15},
  {label: "魅惑", name: "Charm", initial: 15},
  {label: "说服", name: "Persuade", initial: 10},
  {label: "领航", name: "Navigate", initial: 10},
  {
    label: "生存", name: "Survival", initial: undefined, tag: "blank", contains: [
      {label: "沙漠", initial: 10},
      {label: "海洋", initial: 10},
      {label: "极地", initial: 10},
    ]
  },
  {label: "跳跃", name: "Jump", initial: 20},
  {label: "攀爬", name: "Climb", initial: 15},
  {label: "游泳", name: "Swim", initial: 20},
  {label: "汽车驾驶", name: "Drive Auto", initial: 20},
  {
    label: "驾驶", name: "Pilot", initial: undefined, tag: "blank", contains: [
      {label: "飞行器", initial: 1},
      {label: "船", initial: 1}
    ]
  },
  {label: "骑术", name: "Ride", initial: 5},
  {label: "潜行", name: "Stealth", initial: 20},
  {label: "追踪", name: "Track", initial: 10},
  {label: "乔装", name: "Disguise", initial: 5},
  {label: "锁匠", name: "Locksmith", initial: 1},
  {label: "妙手", name: "Sleight of Hand", initial: 10},
  {label: "会计", name: "Accounting", initial: 5},
  {label: "法律", name: "Law", initial: 5},
  {label: "神秘学", name: "Occult", initial: 5},
  {label: "历史", name: "History", initial: 5},
  {label: "人类学", name: "Anthropology", initial: 1},
  {label: "考古学", name: "Archaeology", initial: 1},
  {label: "博物学", name: "Natural World", initial: 10},
  {label: "电子学", name: "Electronics", initial: 1, tag: "modern"},
  {
    label: "科学", name: "Science", initial: undefined, contains: [
      {label: "天文学", name: "Astronomy", initial: 1},
      {label: "地质学", name: "Geology", initial: 1},
      {label: "气象学", name: "Meteorology", initial: 1},
      {label: "生物学", name: "Biology", initial: 1},
      {label: "司法科学", name: "Forensics", initial: 1},
      {label: "药学", name: "Pharmacy", initial: 1},
      {label: "植物学", name: "Botany", initial: 1},
      {label: "物理学", name: "Physics", initial: 1},
      {label: "化学", name: "Chemistry", initial: 1},
      {label: "密码学", name: "Cryptography", initial: 1},
      {label: "动物学", name: "Zoology", initial: 1},
      {label: "数学", name: "Mathematics", initial: 1},
    ]
  },
  {label: "侦查", name: "Spot Hidden", initial: 25},
  {label: "聆听", name: "Listen", initial: 20},
  {label: "图书馆利用", name: "Library Use", initial: 20},
  {label: "估价", name: "Appraise", initial: 5},
  {label: "克苏鲁神话", name: "Cthulhu Mythos", initial: 0},
  {label: "精神分析", name: "Psychoanalysis", initial: 1},
  {label: "急救", name: "First Aid", initial: 30},
  {label: "医学", name: "Medicine", initial: 1},
  {label: "催眠", name: "Hypnosis", initial: 1, tag: "irregular"},
  {
    label: "格斗", name: "Fighting", initial: undefined, contains: [
      {label: "斗殴", name: "Brawl", initial: 25},
      {label: "剑", name: "Sword", initial: 20},
      {label: "矛", name: "Spear", initial: 20},
      {label: "斧头", name: "Axe", initial: 15},
      {label: "绞索", name: "Garrote", initial: 15},
      {label: "电锯", name: "Chainsaw", initial: 10},
      {label: "连枷", name: "Flail", initial: 10},
      {label: "鞭子", name: "Whip", initial: 5},
    ]
  },
  {label: "投掷", name: "Throw", initial: 20},
  {
    label: "射击", name: "Firearms", initial: undefined, contains: [
      {label: "弓术", name: "Bow", initial: 15},
      {label: "手枪", name: "Handgun", initial: 20},
      {label: "步枪/霰弹枪", name: "Rifle/Shotgun", initial: 25},
      {label: "冲锋枪", name: "Submachine Gun", initial: 15},
      {label: "火焰喷射器", name: "Flamethrower", initial: 10},
      {label: "重武器", name: "Heavy Weapons", initial: 10},
      {label: "机关枪", name: "Machine Gun", initial: 10},
    ]
  },
  {label: "操作重型机械", name: "Operate Heavy Machinery", initial: 1},
  {label: "机械维修", name: "Mechanical Repair", initial: 10},
  {label: "电气维修", name: "Electrical Repair", initial: 10},
  {label: "计算机使用", name: "Computer Use", initial: 5, tag: "modern"},
  {
    label: "艺术与手艺", name: "Art and Craft", initial: undefined, tag: "blank", contains: [
      {label: "表演", initial: 5},
      {label: "美术", initial: 5},
      {label: "伪造", initial: 5},
      {label: "摄影", initial: 5}
    ]
  },
  {label: "动物驯养", name: "Animal Handling", initial: 5, tag: "irregular"},
  {label: "读唇", name: "Read Lips", initial: 1, tag: "irregular"},
  {label: "潜水", name: "Diving", initial: 1, tag: "irregular"},
  {label: "炮术", name: "Artillery", initial: 1, tag: "irregular"},
  {label: "爆破", name: "Demolitions", initial: 1, tag: "irregular"},
  {label: "语言", name: "Language (Other)", initial: undefined, tag: "blank", contains: languages}
];
