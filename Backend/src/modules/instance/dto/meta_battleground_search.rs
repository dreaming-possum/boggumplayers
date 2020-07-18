#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct MetaBattlegroundSearch {
    pub map_id: u16,
    pub server_id: u32,
    pub score_alliance: u32,
    pub score_horde: u32,
    pub start_ts: u64,
    pub end_ts: Option<u64>,
}
