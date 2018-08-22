import * as React from "react";
import {CharacteristicsData} from "./Characteristics";

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

  characteristics: CharacteristicsData;
  constructor(updater: (data: Partial<CharacterData>) => void) {
    this.name = "";
    this.player = "";
    this.occupation = "";
    this.sex = "";
    this.residence = "";
    this.birthplace = "";
    this.updater = updater;
    this.characteristics = new CharacteristicsData();
  }
}

export const SheetContext = React.createContext(new CharacterData(() => {
}));


