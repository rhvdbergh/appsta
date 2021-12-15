
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BuyerOptionsSelectionBlock from "../BuyerOptionsSelectionBlock/BuyerOptionsSelectionBlock";



function OptionsCard() {

    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <BuyerOptionsSelectionBlock />
                </CardContent>

        </Card>
    );
}


export default OptionsCard;


