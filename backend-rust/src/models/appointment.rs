use chrono::NaiveDateTime;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize, Insertable, Deserialize)]
#[diesel(table_name = crate::schema::appointments)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Appointment {
    id: Uuid,
    room_id: Option<Uuid>,
    title: String,
    start_time: NaiveDateTime,
    end_time: NaiveDateTime,
    recurring: Option<bool>
}