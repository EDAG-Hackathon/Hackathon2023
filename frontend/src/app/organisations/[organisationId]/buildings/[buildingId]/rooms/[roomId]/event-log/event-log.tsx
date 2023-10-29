import { List, SvgIconProps, Typography } from "@mui/material";
import { EventLogItem } from "./event-log-item";
import SensorWindowIcon from "@mui/icons-material/SensorWindow";
import InsightsIcon from "@mui/icons-material/Insights";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AirIcon from "@mui/icons-material/Air";
import React from "react";

export enum EventLogItemType {
  temperature,
  forecast,
  sun,
  rain,
  daylight,
  occupancy,
  airquality,
}

export const iconMapping: {
  [key in EventLogItemType]: React.ComponentType<SvgIconProps>;
} = {
  [EventLogItemType.temperature]: SensorWindowIcon,
  [EventLogItemType.forecast]: InsightsIcon,
  [EventLogItemType.sun]: WbSunnyIcon,
  [EventLogItemType.rain]: WaterDropIcon,
  [EventLogItemType.daylight]: WbTwilightIcon,
  [EventLogItemType.occupancy]: SensorOccupiedIcon,
  [EventLogItemType.airquality]: AirIcon,
};

export type EventLogItem = {
  id: string;
  timestamp: Date;
  type: EventLogItemType;
  action: string;
  trigger: string;
};

export function EventLog() {
  const eventLogItems: EventLogItem[] = [
    {
      id: "78b6328d-7419-4700-b9b6-4a2ab7c1c0e4",
      timestamp: new Date(),
      type: EventLogItemType.temperature,
      action: "Heizen",
      trigger: "Temperatur < 18°C",
    },
    {
      id: "129a8bed-1dfc-4c04-9499-13a27220ae34",
      timestamp: new Date(),
      type: EventLogItemType.sun,
      action: "Jalousie geschlossen",
      trigger: "Starke Sonneneinstrahlung",
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ pb: 5 }}>
        Eventlog
      </Typography>
      <List>
        {eventLogItems.map((eventLogItem) => (
          <EventLogItem key={eventLogItem.id} item={eventLogItem} />
        ))}
      </List>
    </>
  );
}
