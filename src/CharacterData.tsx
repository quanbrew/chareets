import * as React from "react";
import {CharacteristicsData} from "./Characteristics";
import {InformationData} from "./Information";

export class CharacterData {
  information: InformationData;
  characteristics: CharacteristicsData;

  constructor() {
    this.information = new InformationData();
    this.characteristics = new CharacteristicsData();
  }
}

export const SheetContext = React.createContext(new CharacterData());


