// components/SanityImage.tsx

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { getSanityImageConfig } from 'lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'

interface Props {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props

  // Build a URL builder from your Sanity client config:
  const builder = imageUrlBuilder(getSanityImageConfig())

  // Generate the final image URL:
  const src = builder.image(asset).auto('format').fit('max').url()

  // If there’s no asset, render nothing:
  if (!asset || !src) {
    return null
  }

  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        sizes="(max-width: 800px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
