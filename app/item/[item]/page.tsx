import React from 'react'

export default function page({ params }: { params: { item: string } }) {

  const itemID = Number(params.item)
  return (
    <div>
        <h1>Item</h1>
        <p>{itemID}</p>
    </div>
  )
}
