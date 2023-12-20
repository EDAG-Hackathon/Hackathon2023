use axum::extract::State;
use axum::http::StatusCode;
use axum::routing::get;
use axum::{Json, Router};
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

pub fn setup_api() -> Router<Pool<AsyncPgConnection>> {
    return Router::new()
        .route("/", get(welcome))
        .route("/organisations", get(organisations::get_organisations).post(organisations::create_organisation))
        .route("/organisations/:id", get(organisations::get_organisation_by_uuid));
}