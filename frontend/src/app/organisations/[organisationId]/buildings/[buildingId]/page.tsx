"use client";
import Box from "@mui/material/Box";

export default function Page({ params }: { params: { buildingId: string } }) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      Informationen zu Gebäude: {params.buildingId}
    </Box>
  );
}
