export type XMLText<T> = {
  "#text": T;
};

export type MDBChart = {
  difnum: XMLText<number>;
  illustrator: string;
  effected_by: string;
};

export type MDBEntry = {
  info: {
    label: string;
    title_name: string;
    title_yomigana: string;
    artist_name: string;
    artist_yomigana: string;
    inf_ver: XMLText<number>;
    ascii: string;
    version: XMLText<number>;
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
