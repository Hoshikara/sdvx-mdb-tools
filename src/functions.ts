import { readFileSync } from "fs";
import { XMLParser } from "fast-xml-parser";
import { decode } from "iconv-lite";
import { MDBEntry } from "./types";

type MDB = {
  "?xml": {
    "@_version": string;
    "@_encoding": string;
  };
  mdb: {
    music: MDBEntry[];
  };
};

const CHAR_REBINDS: Record<string, string> = {
  "‾": "~",
  "〜": "～",
  䧺: "ê",
  彜: "ū",
  曦: "à",
  曩: "è",
  躔: "🐾",
  騫: "á",
  驩: "Ø",
  驫: "ā",
  驪: "ō",
  骭: "ü",
  鬯: "ī",
  黷: "ē",
  齣: "Ú",
  齧: "Ä",
  霻: "♠",
  齪: "♣",
  鑈: "♦",
  齲: "♥",
  齶: "♡",
  齷: "é",
  罇: "ê",
  隍: "Ü",
  趁: "Ǣ",
  鬮: "¡",
  雋: "Ǜ",
  魄: "♃",
  鬥: "Ã",
  鬆: "Ý",
  龕: "€",
  鹹: "Ĥ",
  煢: "ø",
  闃: "Ā",
  盥: "⚙",
  墸: "͟͟͞ ",
  饌: "²",
  餮: "Ƶ",
  鑷: "ゔ",
  釁: "🍄",
  蔕: "ũ",
};

export function parseDb(path: string): MDBEntry[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const sjisContent = readFileSync(path);
  const utf8Content = decode(sjisContent, "shift-jis");
  const xml = parser.parse(utf8Content) as MDB;

  return xml.mdb.music;
}

export function fixString(string: string): string {
  return string
    .split("")
    .map((c) => CHAR_REBINDS[c] ?? c)
    .join("");
}
