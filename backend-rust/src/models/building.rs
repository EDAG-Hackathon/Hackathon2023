use bigdecimal::BigDecimal;
use diesel::{Queryable, Selectable};
use serde::Serialize;
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::buildings)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Building {
    id: Uuid,
    organisation_id: Option<Uuid>,
    name: Option<String>,
    coordinates: serde_json::Value,
    address: Option<String>,
    room_temp_occupied: BigDecimal,
    room_temp_unoccupied: BigDecimal,
    room_humidity: BigDecimal
}