import { Marker } from "react-map-gl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ReactECharts from "echarts-for-react";
import { useState } from "react";
import Link from "next/link";
import { Building } from "@/app/buildings/[buildingId]/page";

export default function BuildingMarker({ building }: { building: Building }) {
  const [open, setOpen] = useState(false);

  const chartOption = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: "#FFAB91",
        },
        progress: {
          show: true,
          width: 30,
        },

        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -20,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "100%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 30,
          fontWeight: "bolder",
          formatter: "{value} °C",
          color: "inherit",
        },
        data: [
          {
            value: 20,
          },
        ],
      },

      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: "#FD7347",
        },
        progress: {
          show: true,
          width: 8,
        },

        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 20,
          },
        ],
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <Marker
      longitude={building.coordinates.lng}
      latitude={building.coordinates.lat}
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
                image="https://upload.wikimedia.org/wikipedia/commons/9/9e/MK56762_Hochschule_Fulda.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {building.name}
                </Typography>
                <ReactECharts option={chartOption} />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href={`/buildings/${building.id}`}>
                <Button size="small" color="primary">
                  Räume anzeigen
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
