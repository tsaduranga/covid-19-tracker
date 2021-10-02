import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = () => {

    const [ data, setData ] = useState({})



    useEffect( async () =>{
       const { data } =  await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
       console.log(data)


    })

    return (
        <div>
            {/* <Line 
                data
                options

                /> */}
        </div>
    )
}

export default LineGraph
