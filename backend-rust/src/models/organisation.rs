use diesel::{Insertable, Queryable, Selectable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Default, Queryable, Selectable, Serialize, Insertable, Deserialize)]
#[diesel(table_name = crate::schema::organisations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Organisation {
    id: Uuid,
    name: String,
    image: Option<String>,
    coordinates: serde_json::Value,
    address: Option<String>,
}