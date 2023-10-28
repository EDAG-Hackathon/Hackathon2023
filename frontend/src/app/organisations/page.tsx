"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';

export default function Page() {
    // Mocked api response
    const organisations = [
        {
            id: "43459e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Hochschule Fulda",
            address: "Leipziger Str. 124"
        },
        {
            id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Testschule",
            address: "Bonifatiusstraße 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
        {
            id: "63759e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Propsteihaus Petersberg",
            address: "Am Petersberg 1"
        },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Box sx={{height: "50vh", width: "100%"}}>Karte</Box>
            <Box sx={{height: "50vh", width: "100%", color: "primary.main"}}>
                <Typography variant="h4">Organisationen</Typography>
                    <List>
                        {organisations.map((organisation) => (
                            <Link
                                key={organisation.id}
                                href={`/organisations/${organisation.id}/buildings`}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={organisation.name} secondary={organisation.address}/>
                                </ListItem>
                                <Divider />
                            </Link>
                            ))}
                    </List>
            </Box>
        </main>
    )
        ;
}
