use diesel::{AsExpression, FromSqlRow};
use diesel::pg::sql_types::Jsonb;
use serde::{Serialize, Deserialize};

#[derive(FromSqlRow, AsExpression, Serialize, Deserialize, Debug, Default)]
#[sql_type = "Jsonb"]
pub struct Coordinates {
    lat: f32,
    lng: f32
}
