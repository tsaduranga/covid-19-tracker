import React from 'react'

const Table = ({countries}) => {
    return (
        <div className='table'>
            {
                countries.map(({country, cases}) => (
                    <tr key={country}>
                        <td>{country} </td>
                        <td><strong>{cases}</strong></td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
