// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "event_type"))]
    pub struct EventType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "hardware_protocols"))]
    pub struct HardwareProtocols;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "sensor_types"))]
    pub struct SensorTypes;
}

diesel::table! {
    appointments (id) {
        id -> Uuid,
        room_id -> Nullable<Uuid>,
        #[max_length = 255]
        title -> Varchar,
        start_time -> Timestamp,
        end_time -> Timestamp,
        recurring -> Nullable<Bool>,
    }
}

diesel::table! {
    buildings (id) {
        id -> Uuid,
        organisation_id -> Nullable<Uuid>,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        number -> Nullable<Varchar>,
        #[max_length = 255]
        address -> Nullable<Varchar>,
        coordinates -> Json,
        room_temp_occupied -> Numeric,
        room_temp_unoccupied -> Numeric,
        room_humidity -> Numeric,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::EventType;

    events (id) {
        id -> Uuid,
        room_id -> Nullable<Uuid>,
        #[sql_name = "type"]
        type_ -> EventType,
        #[max_length = 255]
        action -> Varchar,
        #[max_length = 255]
        trigger -> Nullable<Varchar>,
        timestamp -> Timestamp,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::HardwareProtocols;

    hardware (id) {
        id -> Uuid,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        manufacturer -> Nullable<Varchar>,
        protocol -> HardwareProtocols,
    }
}

diesel::table! {
    organisations (id) {
        id -> Uuid,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 255]
        image -> Nullable<Varchar>,
        coordinates -> Json,
        #[max_length = 255]
        address -> Nullable<Varchar>,
    }
}

diesel::table! {
    rooms (id) {
        id -> Uuid,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        number -> Nullable<Varchar>,
        building_id -> Nullable<Uuid>,
        room_temp_occupied -> Nullable<Numeric>,
        room_temp_unoccupied -> Nullable<Numeric>,
        room_humidity -> Nullable<Numeric>,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::SensorTypes;

    sensors (id) {
        id -> Uuid,
        hardware_id -> Nullable<Uuid>,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        address -> Varchar,
        #[sql_name = "type"]
        type_ -> Nullable<SensorTypes>,
        room_id -> Nullable<Uuid>,
    }
}

diesel::joinable!(appointments -> rooms (room_id));
diesel::joinable!(buildings -> organisations (organisation_id));
diesel::joinable!(events -> rooms (room_id));
diesel::joinable!(rooms -> buildings (building_id));
diesel::joinable!(sensors -> hardware (hardware_id));
diesel::joinable!(sensors -> rooms (room_id));

diesel::allow_tables_to_appear_in_same_query!(
    appointments,
    buildings,
    events,
    hardware,
    organisations,
    rooms,
    sensors,
);
