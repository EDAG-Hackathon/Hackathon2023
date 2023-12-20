use axum::Router;
use diesel_async::{AsyncPgConnection, pooled_connection::{AsyncDieselConnectionManager, mobc::Pool}};
use lambda_http::{Error, run};
use api::setup_api;

mod models;
mod api;
pub mod schema;

#[tokio::main]
async fn main() -> Result<(), Error> {
    init_tracing();

    let connection = setup_db_connection();
    let api = setup_api();
    let app = Router::new().nest("/api", api)
        .with_state(connection);

    run(app).await
}

fn setup_db_connection() -> Pool<AsyncPgConnection> {
    let db_url = std::env::var("DATABASE_URL").expect("missing DATABASE_URL environment variable");
    let config = AsyncDieselConnectionManager::<AsyncPgConnection>::new(db_url);

    return Pool::builder().build(config);
}

fn init_tracing() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .without_time()
        .init();
}
