import * as React from "react";

export class CharacterData {
  updater: (data: Partial<CharacterData>) => void;
  // information
  name: string;
  player: string;
  occupation: string;
  age?: number;
  sex: string;
  residence: string;
  birthplace: string;

  // characteristics
  str?: number;
  con?: number;
  siz?: number;
  dex?: number;
  app?: number;
  int?: number;
  pow?: number;
  edu?: number;
  luck?: number;
  mov?: number;
  constructor(updater: (data: Partial<CharacterData>) => void) {
    this.name = "";
    this.player = "";
    this.occupation = "";
    this.sex = "";
    this.residence = "";
    this.birthplace = "";
    this.updater = updater;

  }
}

export const SheetContext = React.createContext(new CharacterData(() => {
}));


