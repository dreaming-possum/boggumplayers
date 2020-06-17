use crate::modules::armory::dto::{ArmoryFailure, InstanceResetDto};
use crate::modules::armory::Armory;
use mysql_connection::tools::Execute;

pub trait HandleInstanceReset {
    fn set_instance_resets(&self, server_id: u32, instance_resets: Vec<InstanceResetDto>) -> Result<(), ArmoryFailure>;
    fn update_cache(&self) -> Result<(), ArmoryFailure>;
}

impl HandleInstanceReset for Armory {
    fn set_instance_resets(&self, server_id: u32, instance_resets: Vec<InstanceResetDto>) -> Result<(), ArmoryFailure> {
        self.db_main.execute_batch_wparams(
            "INSERT IGNORE INTO armory_instance_resets (`server_id`, `map_id`, `reset_time`, difficulty) VALUES (:server_id, :map_id, :reset_time, :difficulty)",
            instance_resets,
            &|instance| {
                params! {
                  "server_id" => server_id,
                  "map_id" => instance.map_id,
                  "reset_time" => instance.reset_time,
                  "difficulty" => instance.difficulty
                }
            },
        );
        self.update_cache()
    }

    fn update_cache(&self) -> Result<(), ArmoryFailure> {
        // TODO!
        Ok(())
    }
}
