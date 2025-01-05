type MapTag =
  | "MAP"
  | "CHARACTER"
  | "CHECK"
  | "BOSS"
  | "SHOP"
  | "INN"
  | "AIRSHIP"
  | "FALCON"
  | "HOVERCRAFT"
  | "WHALE"
  | "CHOCOBO";

type MapLocation = {
  id: string;
  doors: string[];
  tags: MapTag[];
  virtual?: boolean; // Indicates this map location isn't a real map location, but is instead used to represent a class of map locations (e.g. a shop)
};

const doorsRandoLocations: MapLocation[] = [
  {
    id: "Overworld",
    tags: ["MAP"],
    doors: [
      "Baron",
      "BaronCastle",
      "BaronForest",
      "MistCaveS",
      "MistCaveN",
      "MistW",
      "MistE",
      "Kaipo",
      "WateryPassS",
      "WateryPassN",
      "WaterfallS",
      "WaterfallE",
      "Damcyan",
      "Antlion",
      "HobbsW",
      "HobbsE",
      "Fabul",
      "FabulForest",
      "Toroia",
      "ToroiaCastle",
      "ToroiaForest",
      "ChocoboVillage",
      "Magnes",
      "IslandForest",
      "Agart",
      "Mysidia",
      "Ordeals",
      "OrdealsForest",
      "Silvera",
      "Adamant",
      "EblanCastle",
      "EblanCave",
    ],
  },
  {
    id: "Underworld",
    tags: ["MAP"],
    doors: ["Dwarf", "DwarfCave", "Kokkol", "Tomra", "SealedCave", "Feymarch", "SylvanCave", "Tower"],
  },
  {
    id: "Moon",
    tags: ["MAP"],
    doors: ["Palace", "Hummingway", "LunarPath1S", "LunarPath1N", "LunarPath2S", "LunarPath2N", "Bahamut"],
  },
  {
    id: "Baron",
    tags: [],
    doors: ["Exit", "Item", "Inn", "Rosa", "Weapon", "Cid", "Waterway", "Serpent"],
  },
  {
    id: "BaronInn",
    tags: ["INN", "CHECK", "BOSS", "CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "BaronCastle",
    tags: ["CHECK", "BOSS", "AIRSHIP", "CHARACTER"],
    doors: ["Gate", "Waterway"],
  },
  {
    id: "MistyCave",
    tags: ["BOSS"],
    doors: ["South", "North"],
  },
  {
    id: "Mist",
    tags: ["CHECK", "AIRSHIP"],
    doors: ["West", "East", "Rydia", "Weapon", "Armor", "Inn"],
  },
  {
    id: "Kaipo",
    tags: [],
    doors: ["Exit", "Weapon", "Hospital", "Inn", "Armor"],
  },
  {
    id: "KaipoHospital",
    tags: ["CHECK", "CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "KaipoInn",
    tags: ["CHECK", "INN", "SHOP", "CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "WateryPass",
    tags: ["CHARACTER"],
    doors: ["South", "North"],
  },
  {
    id: "WaterfallLake",
    tags: ["BOSS"],
    doors: ["Exit"],
  },
  {
    id: "Damcyan",
    tags: ["CHARACTER", "HOVERCRAFT"],
    doors: ["Exit"],
  },
  {
    id: "Antlion",
    tags: ["CHECK", "BOSS"],
    doors: ["Exit"],
  },
  {
    id: "Hobbs",
    tags: ["CHARACTER", "BOSS"],
    doors: ["West", "East"],
  },
  {
    id: "Fabul",
    tags: ["CHECK", "BOSS"],
    doors: ["Exit", "Inn", "Weapon", "TowerW"],
  },
  {
    id: "FabulTowerW",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "Silvera",
    tags: [],
    doors: ["Exit", "Items", "Weapon", "Armor", "Inn"],
  },
  {
    id: "Adamant",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "Ordeals",
    tags: ["CHECK", "BOSS", "CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "Mysidia",
    tags: [],
    doors: ["Exit", "Weapon", "Armor", "Wishes", "Inn", "Item", "Serpent"],
  },
  {
    id: "HouseOfWishes",
    tags: ["CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "Agart",
    tags: [],
    doors: ["Exit", "Astro", "Well", "Inn", "Weapon", "Armor"],
  },
  {
    id: "AgartWell",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "AgartAstro",
    tags: [],
    doors: ["Exit"],
  },
  {
    id: "EblanCastle",
    tags: [],
    doors: ["Exit"],
  },
  {
    id: "EblanCave",
    tags: ["CHARACTER"],
    doors: ["Exit", "Weapon", "Item", "Tower"],
  },
  {
    id: "Toroia",
    tags: [],
    doors: ["Exit", "Weapon", "Armor", "Cafe", "Item", "Inn", "Farm"],
  },
  {
    id: "ToroiaCafe",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "ToroiaCastle",
    tags: ["CHECK", "CHARACTER", "AIRSHIP"],
    doors: ["Exit", "Eddie", "Treasury"],
  },
  {
    id: "ToroiaTreasury",
    tags: [],
    doors: ["Exit"],
  },
  {
    id: "ToroiaEddie",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "Magnes",
    tags: ["CHECK", "BOSS"],
    doors: ["Exit"],
  },
  {
    id: "BabilUpper",
    tags: ["BOSS", "FALCON"],
    doors: ["Eblan"],
  },
  {
    id: "BabilLower",
    tags: ["CHECK", "BOSS", "AIRSHIP"],
    doors: ["Exit"],
  },
  {
    id: "SealedCave",
    tags: ["CHECK", "BOSS"],
    doors: ["Exit"],
  },
  {
    id: "SylvanCave",
    tags: [],
    doors: ["Exit", "House", "Treasury"],
  },
  {
    id: "SylvanHouse",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "SylvanTreasury",
    tags: [],
    doors: ["Exit"],
  },
  {
    id: "FeymarchCave",
    tags: [],
    doors: ["Exit", "Warp"],
  },
  {
    id: "FeymarchTownUp",
    tags: ["CHECK"],
    doors: ["Exit", "Lower", "Treasury"],
  },
  {
    id: "FeymarchTownLow",
    tags: [],
    doors: ["Exit", "Armor", "Weapon", "Item", "Library", "Save"],
  },
  {
    id: "FeymarchLibrary",
    tags: ["BOSS", "CHECK"],
    doors: ["Exit"],
  },
  {
    id: "Tomra",
    tags: [],
    doors: ["Exit", "Item", "Storage", "Weapon", "Armor", "Inn"],
  },
  {
    id: "Kokkol",
    tags: ["CHECK"],
    doors: ["Exit"],
  },
  {
    id: "Dwarf",
    tags: ["CHECK", "BOSS", "CHARACTER"],
    doors: ["Exit", "Cave"],
  },
  {
    id: "LunarPassage1",
    tags: [],
    doors: ["North", "South"],
  },
  {
    id: "LunarPassage2",
    tags: [],
    doors: ["North", "South"],
  },
  {
    id: "Bahamut",
    tags: ["CHECK", "BOSS"],
    doors: ["Exit"],
  },
  {
    id: "LunarPalace",
    tags: ["CHECK", "BOSS", "CHARACTER"],
    doors: ["Exit"],
  },
  {
    id: "ChocoboVillage",
    tags: ["CHOCOBO"],
    doors: ["Exit"],
  },
  {
    id: "ChocoboForest",
    tags: [],
    doors: ["Exit"],
    virtual: true
  },
  {
    id: "Shop",
    tags: ["SHOP"],
    doors: ["Exit"],
    virtual: true
  },
  {
    id: "Inn",
    tags: ["INN"],
    doors: ["Exit"],
    virtual: true
  },
  {
    id: "Zonk",
    tags: [],
    doors: ["Exit"],
    virtual: true
  },
] as const;

const toVirtualId = (roomId: string, doorId: string, virtualId: string) => `${virtualId}:${doorId}/${roomId}`;
const doorRandoVirtualLocations = doorsRandoLocations.filter((x) => !!x.virtual);
const doorRandoRealLocations = doorsRandoLocations.filter((x) => !x.virtual);

export type { MapLocation, MapTag };
export { doorsRandoLocations, toVirtualId, doorRandoVirtualLocations, doorRandoRealLocations };
