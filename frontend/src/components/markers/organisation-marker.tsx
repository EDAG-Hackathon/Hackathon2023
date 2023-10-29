import { Marker } from "react-map-gl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ReactECharts from "echarts-for-react";
import { Organisation } from "@/app/organisations/page";
import { useState } from "react";
import Link from "next/link";

export default function OrganisationMarker({
  organisation,
}: {
  organisation: Organisation;
}) {
  const [open, setOpen] = useState(false);

  const chartOption = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <Marker
      longitude={organisation.coordinates.lng}
      latitude={organisation.coordinates.lat}
      anchor="bottom"
    >
      {open ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "27px",
          }}
        >
          <Card sx={{ maxWidth: 370 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={organisation.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {organisation.name}
                </Typography>
                <ReactECharts option={chartOption} />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href={`/organisations/${organisation.id}/buildings`}>
                <Button size="small" color="primary">
                  Gebäude anzeigen
                </Button>
              </Link>
            </CardActions>
          </Card>
          <PlaceIcon
            sx={{
              //   color: "white",
              stroke: "white",
              fontSize: 64,
              cursor: "pointer",
              position: "relative",
              zIndex: -1,
              top: "-32px",
            }}
            onClick={() => setOpen(true)}
          />
        </div>
      ) : (
        <PlaceIcon
          sx={{
            //   color: "white",
            stroke: "white",
            fontSize: 64,
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />
      )}
    </Marker>
  );
}
