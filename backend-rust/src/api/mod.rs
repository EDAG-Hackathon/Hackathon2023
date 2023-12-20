use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use diesel_async::AsyncPgConnection;
use diesel_async::pooled_connection::mobc::Pool;

pub mod organisations;
type AsyncPool = Pool<AsyncPgConnection>;
type ServerError = (StatusCode, String);

fn internal_server_error<E: std::error::Error>(err: E) -> ServerError {
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}

pub async fn welcome(State(_pool): State<AsyncPool>) -> Result<Json<&'static str>, ServerError> {
    Ok(Json("Hello"))
}