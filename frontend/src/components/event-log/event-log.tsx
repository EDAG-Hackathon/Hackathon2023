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

export function EventLog() {
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
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-26 15:00"),
      type: EventLogItemType.sun,
      action: "Jalousie geschlossen",
      trigger: "Starke Sonneneinstrahlung",
    },
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-27 07:30"),
      type: EventLogItemType.occupancy,
      action: "Heizen auf 22°C",
      trigger: "Raum belegt",
    },
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-27 10:00"),
      type: EventLogItemType.forecast,
      action: "Dachfenster geschlossen",
      trigger: "Wettervorhersage meldet Regen",
    },
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-27 18:00"),
      type: EventLogItemType.daylight,
      action: "Beleuchtung eingeschaltet",
      trigger: "Sonnenuntergang",
    },
  ]);
  const [eventLogItems, setEventLogItems] = useState<EventLogItem[]>([
    {
      id: uuidv4().toString(),
      timestamp: new Date("2023-10-26 06:00"),
      type: EventLogItemType.temperature,
      action: "Heizen auf 18°C",
      trigger: "Temperatur < 15°C",
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
