"use client";
import Box from "@mui/material/Box";
import Link from "next/link";

export default function Page() {
  // Mocked api response
  const organisations = [
    {
      id: "43459e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Hochschule Fulda",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Testschule",
    },
    {
      id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Propsteihaus Petersberg",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Box sx={{ height: "50vh", width: "100%" }}>Karte</Box>
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
              href={`/organisations/${organisation.id}`}
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
