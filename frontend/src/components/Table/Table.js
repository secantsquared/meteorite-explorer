import React from 'react'
import Meteor from '../Meteor'

import './table.css'

export default function Table(props) {
  const data = props.data
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Name Type</th>
          <th>Rec Class</th>
          <th>Mass (g)</th>
          <th>Fall</th>
          <th>Year</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {data.map(data => (
          <Meteor key={data.id} data={data} />
        ))}
      </tbody>
    </table>
  )
}
