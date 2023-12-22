use axum::extract::{State, Path};
use axum::Json;
use diesel::{SelectableHelper, QueryDsl};
use diesel_async::RunQueryDsl;
use schema::buildings;
use uuid::Uuid;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::building::Building;
use crate::schema;

pub async fn get_buildings(State(pool): State<AsyncPool>) -> Result<Json<Vec<Building>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let buildings = buildings::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(buildings))
}

pub async fn get_building_by_uuid(State(pool): State<AsyncPool>, Path(building_id): Path<Uuid>) -> Result<Json<Building>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let building = buildings::table
        .find(building_id)
        .first(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(building))
}

pub async fn create_building(State(pool): State<AsyncPool>, Json(building): Json<Building>) -> Result<Json<Building>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;
    
    let building = diesel::insert_into(buildings::table)
        .values(building)
        .returning(Building::as_returning())
        .get_result(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(building))
}