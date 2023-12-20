use bigdecimal::BigDecimal;
use diesel::{Queryable, Selectable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::rooms)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Room {
    id: Uuid,
    building_id: Option<Uuid>,
    name: Option<String>,
    number: Option<String>,
    room_temp_occupied: Option<BigDecimal>,
    room_temp_unoccupied: Option<BigDecimal>,
    room_humidity: Option<BigDecimal>
}