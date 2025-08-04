export interface MakeDto {
  Make_ID: number;
  Make_Name: string;
}

export interface MakeList {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: MakeDto[];
}
