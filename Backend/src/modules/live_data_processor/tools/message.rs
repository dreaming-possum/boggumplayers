use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Message};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::MapMessageType;

pub trait MessageParser {
    fn parse_message(&self) -> Result<Message, LiveDataProcessorFailure>;
}

impl MessageParser for Vec<u8> {
    fn parse_message(&self) -> Result<Message, LiveDataProcessorFailure> {
        if self.len() <= 11 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }

        let api_version = self[0];
        let message_length = self[2];
        let timestamp = byte_reader::read_u64(&self[3..11]).unwrap();
        let message_type = self[1].to_message_type(&self[11..])?;

        Ok(Message {
            api_version,
            message_type,
            message_length,
            timestamp,
        })
    }
}
