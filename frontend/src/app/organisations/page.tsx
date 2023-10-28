"use client";
import Box from "@mui/material/Box";
import Link from "next/link";

import Map from "@/components/map";

type Organisation = {
  id: string;
  name: string;
  image?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
};

export default async function Page() {
  const response = await fetch("http://localhost:8000/organizations");
  const organisations = (await response.json()) as Organisation[];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Box sx={{ height: "50vh", width: "100%" }}>
        <Map />
      </Box>
      <Box sx={{ height: "50vh", width: "100%" }}>
        Organisationen
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "start",
            paddingLeft: 1,
          }}
        >
          {organisations.map((organisation) => (
            <Link
              key={organisation.id}
              href={`/organisations/${organisation.id}/buildings`}
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
                {organisation.name}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </main>
  );
}
