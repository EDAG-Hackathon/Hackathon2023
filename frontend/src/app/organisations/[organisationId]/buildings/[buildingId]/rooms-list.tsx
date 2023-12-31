import { useFetch } from "@/hooks/use-fetch";
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Room } from "./rooms/page";

export function RoomsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const building_id = pathname.split("/")[4];
  const { data, error, isLoading } = useFetch<Room[]>(
    `http://localhost:8000/api/rooms?building_id=${building_id}`
  );
  const rooms = data || [];
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "#FAFAFA" }}>
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography variant="h5">Raumliste</Typography>
        </Box>
        <TextField
          id="input-with-sx"
          label="Search"
          sx={{
            marginLeft: "1rem",
            marginRight: "1rem",
            width: "calc(100% - 2rem)",
          }}
          variant="outlined"
          focused={true}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Box sx={{ overflow: "scroll", marginTop: "1rem"}}>
        <List>
          {filteredRooms.map((room) => (
            <Link
              key={room.id}
              href={`${pathname}/rooms/${room.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem>
                <ListItemText primary={room.name} secondary={room.number} />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      </Box>
    </>
  );
}
