import react from 'react'
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native'

const Navbar = (props) => {

    const nav = useNavigation()
    const [isshowinput, setInput] = useState(false)

    const showDrawer = () => {
        nav.openDrawer()
    }

    const { title, hasicon = true, search, onSearchChange, onSearchSubmit } = props

    return (
        <View
            style={{
                flexDirection: 'column',
                padding: 16,
                backgroundColor: '#6AA84F',
            }}
            {...props}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="menu"
                        type="material-community"
                        size={30}
                        color={'white'}
                        onPress={showDrawer}
                    />
                    <Text
                        style={{ color: 'white', fontSize: 20, marginLeft: 8, fontWeight: 'bold' }}
                    >
                        {title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {
                        hasicon
                            ?
                            <TouchableOpacity onPress={() => {
                                setInput(!isshowinput)
                            }}>
                                < Icon
                                    name="search"
                                    type="font-awesome"
                                    style={{ marginRight: 20 }}
                                    size={30}
                                    color={'white'}
                                />
                            </TouchableOpacity>
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
                        style={{ color: 'white', fontSize: 20, marginLeft: 8, fontWeight: 'bold' }}
                    >
                        User
                    </Text>
                </View></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        isshowinput
                            ?
                            <TextInput
                                onChangeText={onSearchChange}
                                style={styles.inputtbg}
                                returnKeyType='search'
                                onSubmitEditing={onSearchSubmit}
                                value={search}
                                placeholder='Cari Data'
                                placeholderTextColor={'white'}
                            />
                            : null
                    }
                </View>
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
    inputtbg: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 8,
        marginLeft: 7,
        width: 390,
        color: 'white'
    },
    title: { color: 'black', fontSize: 16 }
})