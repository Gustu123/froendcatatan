import react from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native'
import {useSelector} from "react-redux";

const Navbar = (props) => {

    const nav = useNavigation()
    const username = useSelector(state => state.userReducer.username)
    const showDrawer = () => {
        nav.goBack()
    }

    const { title, hasicon = true } = props

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
                alignItems: 'center',
                backgroundColor: '#6AA84F'
            }}
            {...props}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                {...props}
                >
                   <Icon
                    name="arrow-back"
                    type="ionicons"
                    size={30}
                    color={'white'}
                    onPress={showDrawer}
                />
                </TouchableOpacity>
                <Text
                    style={{ color: 'white', fontSize: 20, marginLeft: 8 }}
                >
                    {title}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {
                    hasicon
                        ? < Icon
                            name="search"
                            type="font-awesome"
                            style={{ marginRight: 20 }}
                            size={30}
                            color={'white'}
                        />
                        : null
                }
                <Icon
                    name="user"
                    type="font-awesome"
                    style={{ marginRight: 10 }}
                    size={30}
                    color={'white'}
                />
                <Text
                    style={{ color: 'white', fontSize: 20, marginLeft: 8 }}
                >
                    {username}
                </Text>
            </View>
        </View>
    )
}

export default Navbar

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
