import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillOpacity={0.4}
      d="M7.5 10h1v2h-1v-2ZM10 9h1v3h-1V9ZM5 7h1v5H5V7Z"
    />
    <Path
      fill="#000"
      fillOpacity={0.4}
      d="M12.5 2.5H11V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v.5H3.5a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1ZM6 2h4v2H6V2Zm6.5 12h-9V3.5H5V5h6V3.5h1.5V14Z"
    />
  </Svg>
)
export default SvgComponent
