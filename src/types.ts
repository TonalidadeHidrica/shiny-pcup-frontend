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
