import React from 'react'

export default function Meteor(props) {
  const data = props.data
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.id}</td>
      <td>{data.nametype}</td>
      <td>{data.recclass}</td>
      <td>{data.mass}</td>
      <td>{data.fall}</td>
      <td>{data.year ? data.year.slice(0, 4) : 'unknown'}</td>
      <td>{data.reclat ? data.reclat : 'unknown'}</td>
      <td>{data.reclong ? data.reclong : 'unknown'}</td>
    </tr>
  )
}
