import * as React from "react";

export class CharacterData {
  // information
  name: string;
  player: string;
  occupation: string;
  age: number;
  sex: string;
  residence: string;
  birthplace: string;
  updater: (data: Partial<CharacterData>) => void;

  constructor(updater: (data: Partial<CharacterData>) => void) {
    this.name = "";
    this.player = "";
    this.occupation = "";
    this.age = 20;
    this.sex = "";
    this.residence = "";
    this.birthplace = "";
    this.updater = updater;
  }
}

export const SheetContext = React.createContext(new CharacterData(() => {
}));


export default CharacterData;
