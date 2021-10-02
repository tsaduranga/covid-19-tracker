import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({title, cases, total}) => {
    return (
        <Card className='infoBox'>
            <CardContent>

                <Typography  className='infoBox__title'>
                    {title}
                </Typography>

                <h2 className='infoBox__titile'>{cases}</h2>

                <Typography  className='infoBox__total'>
                    {total} Total
                </Typography>
                 
            </CardContent>
        </Card>
    )
}

export default InfoBox
