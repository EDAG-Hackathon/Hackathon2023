use bigdecimal::BigDecimal;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize, Insertable, Deserialize)]
#[diesel(table_name = crate::schema::buildings)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Building {
    id: Uuid,
    organisation_id: Option<Uuid>,
    name: Option<String>,
    number: Option<String>,
    address: Option<String>,
    coordinates: serde_json::Value,
    room_temp_occupied: BigDecimal,
    room_temp_unoccupied: BigDecimal,
    room_humidity: BigDecimal
}