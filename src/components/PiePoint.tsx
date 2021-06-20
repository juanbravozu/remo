import { PieSeries } from "@devexpress/dx-react-chart-material-ui";
import { FC } from "react";


const PiePoint:FC<any> = ({children, style, data,...props}) => {
    return (
        <PieSeries.Point
            {...props}
            /* style={{...style,  backgroundColor: data.color}} */
        >
            {children}
        </PieSeries.Point>
    )
}

export default PiePoint;