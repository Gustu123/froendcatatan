import react from 'react'
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = (props) => {
    const { title } = props
    
    return (
        <TouchableOpacity
            style={styles.container}
            {...props}
        >
            <Text
                style={styles.title}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        width: 100,
        alignSelf: 'center',
        marginVertical: 8
    },
    title: { color: 'black', fontSize: 16 }
})