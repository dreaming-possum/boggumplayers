#[derive(Debug, Clone, Deserialize, Serialize, JsonSchema)]
pub struct PasteDto {
    pub id: Option<u32>,
    pub title: String,
    pub expansion_id: u8,
    pub addon_name: String,
    pub tags: String,
    pub description: String,
    pub content: String,
}