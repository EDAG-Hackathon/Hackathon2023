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
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "100%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#7CFFB2"],
              [0.5, "#58D9F9"],
              [0.75, "#FDDD60"],
              [1, "#FF6E76"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 16,
          offsetCenter: [0, "-55%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 3,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 14,
          distance: -40,
          rotate: "tangential",
          formatter: function (value: number) {
            if (value === 0.875) {
              return "Extrem";
            } else if (value === 0.625) {
              return "Hoch";
            } else if (value === 0.375) {
              return "Mittel";
            } else if (value === 0.125) {
              return "Gering";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 12,
        },
        detail: {
          fontSize: 26,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + "";
          },
          color: "inherit",
        },
        data: [
          {
            value: 0.2,
            name: "Aktueller Energieverbrauch",
          },
        ],
      },
    ],
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
                <div
                  style={{
                    height: "120px",
                    position: "relative",
                    top: "-170px",
                  }}
                >
                  <ReactECharts option={chartOption} />
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href={`/organisations/${organisation.id}`}>
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
