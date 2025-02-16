import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
    color: {
        color: COLORS.light.primary,
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7,
    },
    shadow2:{
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default commonStyles;