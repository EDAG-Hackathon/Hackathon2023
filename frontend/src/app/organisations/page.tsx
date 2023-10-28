"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {useState} from "react";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');

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
            id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Bonifatiusschulej",
            address: "Bonifatiusstraße 8"
        },
        {
            id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Heinrich-von-Bibra-Schule",
            address: "Heinrich-von-Bibra-Platz 1"
        },
        {
            id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
            name: "Schule am Rosenbad",
            address: "Rosenbadstraße 1"
        }
    ];

    const filteredOrganisations = organisations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Box sx={{height: "50vh", width: "100%"}}>
                <Map />
            </Box>
            <Box sx={{height: "50vh", width: "100%", color: "primary.main"}}>
                <Typography variant="h4">Organisationen</Typography>
                <TextField
                    id="input-with-sx"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FixedSizeList
                    height={400}
                    width="100%"
                    itemSize={60}
                    itemCount={filteredOrganisations.length}
                >
                    {({index, style}) => (
                        <Link href={`/organisations/${filteredOrganisations[index].id}/buildings`}>
                            <ListItem style={style}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={filteredOrganisations[index].name}
                                    secondary={filteredOrganisations[index].address}
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
