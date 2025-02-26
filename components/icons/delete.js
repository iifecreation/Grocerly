import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props=props, color, fillOpacity}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillOpacity={fillOpacity}
      d="M10.2 4.8h3.6a1.8 1.8 0 1 0-3.6 0ZM9 4.8a3 3 0 1 1 6 0h6A.6.6 0 0 1 21 6h-1.265l-1.433 12.413a3.6 3.6 0 0 1-3.576 3.187H9.273a3.6 3.6 0 0 1-3.575-3.187L4.264 6H3a.6.6 0 0 1 0-1.2h6ZM6.89 18.276A2.4 2.4 0 0 0 9.273 20.4h5.452a2.4 2.4 0 0 0 2.385-2.124L18.527 6H5.473L6.89 18.276ZM10.2 9a.6.6 0 0 1 .6.6v7.2a.6.6 0 0 1-1.2 0V9.6a.6.6 0 0 1 .6-.6Zm4.2.6a.6.6 0 1 0-1.2 0v7.2a.6.6 0 0 0 1.2 0V9.6Z"
    />
  </Svg>
)
export default SvgComponent
