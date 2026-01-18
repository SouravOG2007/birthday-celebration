export interface Photo {
  id: number;
  url: string;
  caption: string;
}

export interface OracleResponse {
  advice: string;
  category: 'wisdom' | 'humor' | 'future';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}