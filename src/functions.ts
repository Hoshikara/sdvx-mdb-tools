import { readFileSync } from "fs";
import { XMLParser } from "fast-xml-parser";
import { decode } from "iconv-lite";
import { fixString } from "./utils";
import { MDBChart, MDBEntry, Song } from "./types";

type MDB = {
  "?xml": {
    "@_version": string;
    "@_encoding": string;
  };
  mdb: {
    music: MDBEntry[];
  };
};

const DIFF_KEYS = ["novice", "advanced", "exhaust", "infinite", "maximum"];

export function parseDb(path: string) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const sjisContent = readFileSync(path);
  const utf8Content = decode(sjisContent, "shift-jis");
  const xml = parser.parse(utf8Content) as MDB;
  const songs = [] as Song[];

  for (const entry of xml.mdb.music) {
    const difficulties = [] as Song["difficulties"];

    for (const key of DIFF_KEYS) {
      const chart = entry.difficulty[key as keyof MDBEntry["difficulty"]];

      if (chart) {
        difficulties.push({
          effector: chart.effected_by,
          illustrator: chart.illustrator,
          level: Number(chart.difnum["#text"]),
          name: String(key),
          radar: {
            notes: chart.radar?.notes?.["#text"] ?? 0,
            peak: chart.radar?.peak?.["#text"] ?? 0,
            tsumami: chart.radar?.tsumami?.["#text"] ?? 0,
            tricky: chart.radar?.tricky?.["#text"] ?? 0,
            hand_trip: chart.radar?.["hand-trip"]?.["#text"] ?? 0,
            one_hand: chart.radar?.["one-hand"]?.["#text"] ?? 0,
          },
        });
      }
    }

    songs.push({
      id: Number(entry["@_id"]),
      title: fixString(entry.info.title_name),
      title_yomigana: String(entry.info.title_yomigana),
      artist: fixString(entry.info.artist_name),
      artist_yomigana: String(entry.info.artist_yomigana),
      bpm_min: entry.info.bpm_min["#text"] / 100,
      bpm_max: entry.info.bpm_max["#text"] / 100,
      distribution_date: entry.info.distribution_date["#text"],
      inf_ver: entry.info.inf_ver["#text"],
      ascii: String(entry.info.ascii),
      version: entry.info.version["#text"],
      difficulties,
    });
  }

  return songs;
}

export function parseDbRaw(path: string): MDBEntry[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const sjisContent = readFileSync(path);
  const utf8Content = decode(sjisContent, "shift-jis");
  const xml = parser.parse(utf8Content) as MDB;

  return xml.mdb.music;
}

export function getCharts(entry: MDBEntry): MDBChart[] {
  return DIFF_KEYS.map(
    (key) => entry.difficulty[key as keyof MDBEntry["difficulty"]]
  );
}
