use axum::extract::{State};
use axum::Json;
use diesel_async::RunQueryDsl;
use schema::events;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::event::Event;
use crate::schema;

pub async fn get_events(State(pool): State<AsyncPool>) -> Result<Json<Vec<Event>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let events = events::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(events))
}