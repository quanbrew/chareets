import * as React from "react";
import {Map} from "immutable";

type Updater = <K extends keyof CharacterData>(data: Pick<CharacterData, K>) => void;

export class CharacterData {
  attributes: Map<string, number>;
  information: Map<string, string>;
  update: Updater;

  constructor(f: Updater) {
    this.attributes = Map();
    this.information = Map();
    this.update = f;
  }
}

export const SheetContext = React.createContext(new CharacterData((_) => {
}));


