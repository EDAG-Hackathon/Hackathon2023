use bigdecimal::BigDecimal;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize, Insertable, Deserialize)]
#[diesel(table_name = crate::schema::rooms)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Room {
    id: Uuid,
    name: Option<String>,
    number: Option<String>,
    building_id: Option<Uuid>,
    room_temp_occupied: Option<BigDecimal>,
    room_temp_unoccupied: Option<BigDecimal>,
    room_humidity: Option<BigDecimal>
}