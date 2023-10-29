import { Card, CardContent, Grid, Typography } from "@mui/material";
import { EventLogItem, iconMapping } from "./event-log";
import dayjs from "dayjs";

export function EventLogItem(params: { item: EventLogItem }) {
  const { item } = params;
  const IconComponent = iconMapping[item.type];

  return (
    <Card sx={{ minWidth: 275, mb: 2, cursor: "pointer" }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <IconComponent sx={{ m: 1 }} />
          </Grid>
          <Grid xs={10}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {dayjs(item.timestamp).format("DD.MM.YYYY HH:mm")} Uhr
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {item.action}
            </Typography>
            <Typography variant="body2">Auslöser: {item.trigger}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
