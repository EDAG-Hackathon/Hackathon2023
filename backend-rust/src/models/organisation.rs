use diesel::{Queryable, Selectable};
use serde::Serialize;
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::organisations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Organisation {
    id: Uuid,
    name: String,
    image: Option<String>,
    coordinates: serde_json::Value,
    address: Option<String>,
}