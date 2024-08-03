export type XMLText<T> = {
  "#text": T;
};

export type MDBChart = {
  difnum: XMLText<number>;
  illustrator: string;
  effected_by: string;
  radar: {
    notes: XMLText<number>;
    peak: XMLText<number>;
    tsumami: XMLText<number>;
    tricky: XMLText<number>;
    "hand-trip": XMLText<number>;
    "one-hand": XMLText<number>;
  };
};

export type MDBEntry = {
  info: {
    label: string;
    title_name: string;
    title_yomigana: string;
    artist_name: string;
    artist_yomigana: string;
    ascii: string;
    bpm_min: XMLText<number>;
    bpm_max: XMLText<number>;
    distribution_date: XMLText<number>;
    version: XMLText<number>;
    inf_ver: XMLText<number>;
  };
  difficulty: {
    novice: MDBChart;
    advanced: MDBChart;
    exhaust: MDBChart;
    infinite: MDBChart;
    maximum: MDBChart;
  };
  "@_id": string;
};

export type Difficulty = {
  effector: string;
  illustrator: string;
  level: number;
  name: string;
  radar: {
    notes: number;
    peak: number;
    tsumami: number;
    tricky: number;
    hand_trip: number;
    one_hand: number;
  };
};

export type Song = {
  id: number;
  title: string;
  title_yomigana: string;
  artist: string;
  artist_yomigana: string;
  bpm_min: number;
  bpm_max: number;
  distribution_date: number;
  inf_ver: number;
  ascii: string;
  version: number;
  difficulties: Difficulty[];
};
