use diesel::{AsExpression, FromSqlRow};
use diesel::pg::sql_types::Jsonb;

#[derive(FromSqlRow, AsExpression, serde::Serialize, serde::Deserialize, Debug, Default)]
#[sql_type = "Jsonb"]
pub struct Coordinates {
    lat: f32,
    lng: f32
}
