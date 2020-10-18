export interface RetrieveDateEntryApi {
  id: number;
  event_id: number;
  character_id: number;
  retrieve_start: string;
  retrieve_end: string;
}

export interface RetrieveDateEntry {
  id: number;
  eventId: number;
  characterId: number;
  retrieveStart: Date;
  retrieveEnd: Date;
}

export interface TopHistoryEntryApi {
  id: number;
  retrieve_end: string;
  entries: TopHistoryRankEntryApi[];
}

export interface TopHistoryRankEntryApi {
  earth_user_id: string;
  rank: number;
  nickname: string;
  score: number;
}

export interface TopHistoryEntry {
  id: number;
  retrieveEnd: Date;
  entries: TopHistoryRankEntry[];
}

export interface TopHistoryRankEntry {
  earthUserId: string;
  rank: number;
  nickname: string;
  score: number;
}
