import React from 'react'
import Photos from "../components/photos";
import Section from "../components/layouts/section"
import { useParams } from 'react-router-dom'

export default function AlbumsPreview() {
    const { albumId } = useParams()

  return (
    <Section>
        <Photos albumId={albumId}/>
    </Section>
  )
}
