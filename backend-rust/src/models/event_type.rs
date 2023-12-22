use serde::{Deserialize, Serialize};

#[derive(diesel_derive_enum::DbEnum)]
#[derive(Debug, Serialize, Deserialize)]
#[ExistingTypePath = "crate::schema::sql_types::EventType"]
pub enum EventType {
    Temperature,
    Forecast,
    Sun,
    Rain,
    Daylight,
    Occupancy,
    Airquality
}

impl Default for EventType {
    fn default() -> Self { EventType::Temperature }
}