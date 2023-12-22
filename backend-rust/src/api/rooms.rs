use axum::extract::{State, Path};
use axum::Json;
use diesel::{SelectableHelper, QueryDsl};
use diesel_async::RunQueryDsl;
use schema::rooms;
use uuid::Uuid;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::room::Room;
use crate::schema;

pub async fn get_rooms(State(pool): State<AsyncPool>) -> Result<Json<Vec<Room>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let rooms = rooms::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(rooms))
}

pub async fn get_room_by_uuid(State(pool): State<AsyncPool>, Path(room_id): Path<Uuid>) -> Result<Json<Room>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let room = rooms::table
        .find(room_id)
        .first(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(room))
}

pub async fn create_room(State(pool): State<AsyncPool>, Json(room): Json<Room>) -> Result<Json<Room>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;
    
    let room = diesel::insert_into(rooms::table)
        .values(room)
        .returning(Room::as_returning())
        .get_result(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(room))
}