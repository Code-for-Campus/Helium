import Svg, { Path } from 'react-native-svg'

export const HomeSolid = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <Path
        fill-rule='evenodd'
        d='M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z'
        clip-rule='evenodd'
      />
    </Svg>
  )
}

export const HomeOutline = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <Path
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='4'
        d='m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5'
      />
    </Svg>
  )
}

export const BookSolid = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <Path
        fill-rule='evenodd'
        d='M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z'
        clip-rule='evenodd'
      />
    </Svg>
  )
}

export const BookOutline = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <Path
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='4'
        d='M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023'
      />
    </Svg>
  )
}

export const CalendarSolid = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <Path
        fill-rule='evenodd'
        d='M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z'
        clip-rule='evenodd'
      />
    </Svg>
  )
}

export const CalendarOutline = ({
  size,
  color,
}: {
  size?: string
  color?: string
}) => {
  return (
    <Svg
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <Path
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='4'
        d='M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z'
      />
    </Svg>
  )
}

export const Logout = ({ size, color }: { size?: string; color?: string }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <Path
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='4'
        d='M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2'
      />
    </Svg>
  )
}
