"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {AccountCircle, SearchOutlined} from "@mui/icons-material";

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
                <TextField id="input-with-sx" label="Search" variant="outlined" />
                <FixedSizeList
                    height={400} // Set the fixed height of the list
                    width="100%" // Set the fixed width of the list
                    itemSize={60} // Set the fixed height of each item
                    itemCount={organisations.length} // Total number of items
                >
                    {({index, style}) => (
                        <Link href={`/organisations/${organisations[index].id}/buildings`}>
                            <ListItem style={style}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={organisations[index].name}
                                    secondary={organisations[index].address}
                                />
                            </ListItem>
                            <Divider/>
                        </Link>
                    )}
                </FixedSizeList>
            </Box>
        </main>
    );
}
