"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  // Mocked api response
  const rooms = [
    {
      id: "73459e1e-7d12-4e70-9d8d-5bf7eee890ba",
      name: "Raum 1",
    },
    {
      id: "83659e1e-7d12-4e70-9d8d-5bf7eee890bb",
      name: "Raum 2",
    },
  ];

  const pathname = usePathname();

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        Raumliste
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "start",
            paddingLeft: 1,
          }}
        >
          {rooms.map((room) => (
            <Link key={room.id} href={`${pathname}/${room.id}`}>
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
                {room.name}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
