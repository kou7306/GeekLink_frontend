import {
  ages,
  desiredOccupationOptions,
  experienceOptions,
  graduateOptions,
  occupations,
  places,
  technologies,
} from "@/components/profile/options";

type StringArray = string[];

/**
 * 文字列を連番に変換する関数を生成します。
 * @param items 変換対象の文字列配列
 * @returns 文字列から連番へのマッピング関数
 */
export const createToIndexMap = (items: StringArray) => {
  const map = new Map(items.map((item, index) => [item, index]));
  return (item: string): number => {
    const index = map.get(item);
    if (index === undefined) {
      throw new Error(`Item "${item}" not found in the list.`);
    }
    return index;
  };
};

/**
 * 連番を文字列に変換する関数を生成します。
 * @param items 変換対象の文字列配列
 * @returns 連番から文字列へのマッピング関数
 */
export const createToStringMap = (items: StringArray) => {
  return (index: number): string => {
    if (index < 0 || index >= items.length) {
      throw new Error(`Index "${index}" is out of bounds.`);
    }
    return items[index];
  };
};

export const ageToIndex = createToIndexMap(ages);
export const indexToAge = createToStringMap(ages);
export const placeToIndex = createToIndexMap(places);
export const indexToPlace = createToStringMap(places);
export const techToIndex = createToIndexMap(technologies);
export const indexToTech = createToStringMap(technologies);
export const occupationToIndex = createToIndexMap(occupations);
export const indexToOccupation = createToStringMap(occupations);
export const graduateToIndex = createToIndexMap(graduateOptions);
export const indexToGraduate = createToStringMap(graduateOptions);
export const desiredOccupationToIndex = createToIndexMap(desiredOccupationOptions);
export const indexToDesiredOccupation = createToStringMap(desiredOccupationOptions);
export const experienceToIndex = createToIndexMap(experienceOptions);
export const indexToExperience = createToStringMap(experienceOptions);
