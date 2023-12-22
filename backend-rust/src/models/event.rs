use chrono::NaiveDateTime;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

use super::event_type::EventType;

#[derive(Default, Queryable, Selectable, Serialize, Insertable, Deserialize)]
#[diesel(table_name = crate::schema::events)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Event {
    id: Uuid,
    room_id: Option<Uuid>,
    type_: EventType,
    action: String,
    trigger: Option<String>,
    timestamp: NaiveDateTime
}