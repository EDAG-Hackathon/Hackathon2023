import { Box, List, SvgIconProps, Typography } from "@mui/material";
import { EventLogItem } from "./event-log-item";
import SensorWindowIcon from "@mui/icons-material/SensorWindow";
import InsightsIcon from "@mui/icons-material/Insights";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AirIcon from "@mui/icons-material/Air";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function EventLogRoom() {
  const [eventLogItemsStorage, setEventLogItemsStorage] = useState<
    EventLogItem[]
  >([
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-26 10:00"),
      type: EventLogItemType.airquality,
      action: "Belüftung eingeschaltet",
      trigger: "CO₂ > 1000ppm",
    },
  ]);
  const [eventLogItems, setEventLogItems] = useState<EventLogItem[]>([
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-23 06:13"),
      type: EventLogItemType.temperature,
      action: "Heizen auf 20°C",
      trigger:
        "Ist-Temperatur: 15°C. Schalte Heizung ein, um Soll-Temperatur in 47 Minuten zu erreichen.",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(moveFirstElement, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [eventLogItemsStorage, eventLogItems]);

  function moveFirstElement() {
    if (eventLogItemsStorage.length > 0) {
      const elementToMove = eventLogItemsStorage.shift();
      setEventLogItemsStorage([...eventLogItemsStorage]);
      if (elementToMove) setEventLogItems([...eventLogItems, elementToMove]);
    }
  }

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Typography variant="h5" sx={{ pb: 5 }}>
          Eventlog
        </Typography>
        <List>
          {eventLogItems.map((eventLogItem) => (
            <EventLogItem key={eventLogItem.id} item={eventLogItem} />
          ))}
        </List>
      </Box>
    </>
  );
}
