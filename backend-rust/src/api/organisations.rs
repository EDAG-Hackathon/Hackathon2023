use axum::extract::{State, Path};
use axum::Json;
use diesel::{SelectableHelper, QueryDsl};
use diesel_async::RunQueryDsl;
use schema::organisations;
use uuid::Uuid;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::organisation::Organisation;
use crate::schema;

pub async fn get_organisations(State(pool): State<AsyncPool>) -> Result<Json<Vec<Organisation>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let posts = organisations::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(posts))
}

pub async fn get_organisation_by_uuid(State(pool): State<AsyncPool>, Path(organisation_id): Path<Uuid>) -> Result<Json<Organisation>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let organisation = organisations::table
        .find(organisation_id)
        .first(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(organisation))
}

pub async fn create_organisation(State(pool): State<AsyncPool>, Json(organisation): Json<Organisation>) -> Result<Json<Organisation>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;
    
    let organisation = diesel::insert_into(organisations::table)
        .values(organisation)
        .returning(Organisation::as_returning())
        .get_result(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(organisation))
}