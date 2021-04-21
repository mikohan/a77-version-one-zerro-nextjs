export interface IDimension {
  width: number;
  height: number;
}
export interface IImage {
  id: string;
  img150?: string;
  img245?: string;
  img500?: string;
  img800?: string;
  img245x245?: string;
  img150x150?: string;
  img500x500?: string;
  img800x800?: string;
  main?: boolean;
  dimension: IDimension;
}
