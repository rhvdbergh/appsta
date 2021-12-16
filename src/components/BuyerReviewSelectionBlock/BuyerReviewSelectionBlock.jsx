import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

function BuyerReviewSelectionBlock({ feature }) {

    return (
        <Box sx={{ display: 'flex' }}>
            <Box>
                <Typography component="div" variant="body2">
                    AVERAGE ESTIMATED COST: ${feature.id * 100}
                </Typography>
                <Typography component="div" variant="h5">
                    {feature.feature_name}
                </Typography>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 75 }}
                image={feature.image_url}
                alt={feature.feature_description}
            />
        </Box>
    )
}
export default BuyerReviewSelectionBlock;