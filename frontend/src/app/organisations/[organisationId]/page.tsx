"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page({
  params,
}: {
  params: { organisationId: string };
}) {
  // Mocked api response
  const buildings = [
    {
      id: "43459e1e-7d12-4e70-9d8d-5bf7eee890ba",
      name: "Halle 8",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bb",
      name: "Gebäude 1",
    },
    {
      id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bc",
      name: "Gebäude 2",
    },
  ];

  const pathname = usePathname();

  return (
    <>
      <Box sx={{ height: "50vh", width: "100%" }}>
        Karte (Gebäudeplan) von Organisation {params.organisationId}
      </Box>
      <Box sx={{ height: "50vh", width: "100%" }}>
        Gebäude
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "start",
            paddingLeft: 1,
          }}
        >
          {buildings.map((building) => (
            <Link
              key={building.id}
              href={`${pathname}/buildings/${building.id}`}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 1,
                  height: 1,
                  padding: 1,
                }}
              >
                {building.name}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
