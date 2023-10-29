import { Box, Typography } from "@mui/material";
import { TempChart } from "./rooms/tempChart";
import { TempGauge } from "./rooms/tempGauge";

export default function BuildingStats() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h5" sx={{ pb: 5 }}>
        Statistiken
      </Typography>
      <Typography variant="h6" sx={{ pb: 5 }}>
        Aktuelle Gebäude-Temperatur
      </Typography>
      <TempGauge />
      <Typography variant="h6" sx={{ pb: 5 }}>
        Gebäude-Temperatur der vergangenden 7 Tage
      </Typography>
      <TempChart />
    </Box>
  );
}
