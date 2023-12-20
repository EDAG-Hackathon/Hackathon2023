use axum::extract::State;
use axum::Json;
use diesel_async::RunQueryDsl;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::organisation::Organisation;
use crate::schema;

async fn get_organisations(State(pool): State<AsyncPool>) -> Result<Json<Vec<Organisation>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let posts = schema::organisations::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(posts))
}