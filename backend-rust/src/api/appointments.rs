use axum::extract::{State, Path};
use axum::Json;
use diesel::{SelectableHelper, QueryDsl};
use diesel_async::RunQueryDsl;
use schema::appointments;
use uuid::Uuid;

use crate::api::{AsyncPool, internal_server_error, ServerError};
use crate::models::appointment::Appointment;
use crate::schema;

pub async fn get_appointments(State(pool): State<AsyncPool>) -> Result<Json<Vec<Appointment>>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let appointments = appointments::table
        .load(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(appointments))
}

pub async fn get_appointment_by_uuid(State(pool): State<AsyncPool>, Path(appointment_id): Path<Uuid>) -> Result<Json<Appointment>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;

    let appointment = appointments::table
        .find(appointment_id)
        .first(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(appointment))
}

pub async fn create_appointment(State(pool): State<AsyncPool>, Json(appointment): Json<Appointment>) -> Result<Json<Appointment>, ServerError> {
    let mut conn = pool.get().await.map_err(internal_server_error)?;
    
    let appointment = diesel::insert_into(appointments::table)
        .values(appointment)
        .returning(Appointment::as_returning())
        .get_result(&mut conn)
        .await
        .map_err(internal_server_error)?;

    Ok(Json(appointment))
}