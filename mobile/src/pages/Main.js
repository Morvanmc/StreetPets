import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api';

function Main() {
    const [ stations, setStations ] = useState([])
    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ radius, setRadius ] = useState('')

    //Requisição de acesso e carregamento inicial da posição do usuário
    useEffect(() => {
        async function loadInitialPosition() {
            const { status } = await requestForegroundPermissionsAsync();

            if(status) {
                const { coords }  = await getCurrentPositionAsync({
                    enableHigAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loadStation() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                radius: parseInt(radius * 1000),
            }
        });

        setStations(response.data.stations);
        setRadius('');
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if(!currentRegion) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Busca por KM..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={radius}
                    onChangeText={setRadius}
                />

                <TouchableOpacity onPress={loadStation} style={styles.searchButton}>
                    <MaterialIcons name="search" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <MapView onRegionChangeComplete={handleRegionChanged} 
                style={styles.map} 
                initialRegion={currentRegion}
            >
                {stations.map(station => (
                    <Marker 
                    key={station._id}
                    coordinate={{
                        latitude: station.location.coordinates[1], 
                        longitude: station.location.coordinates[0]}}>
                    <Image style={styles.petAvatar} 
                        source={station.pet_avatar == 'dog' ? require('../img/dog.png') : 
                        require('../img/cat.png')}/>

                    <Callout>
                        <View style={styles.callout}>
                            <Text style={styles.stationName}>{station.nameStation}</Text>
                            <Text style={styles.stationStatus}>{station.status ? 'Cheia' : 'Vazia'}</Text>
                            <Text style={styles.stationUser}>by: {station.userName}</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
        </View>
    )       
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    petAvatar: {
        height: 42,
        width: 42,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 200,
    },

    stationPetAvatar: {
        width:54,
        height: 54,
    },

    stationName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },

    stationStatus: {
        color: '#000',
        marginTop: 5,
    },

    stationUser: {
        color: '#666',
        marginTop: 5,
    },

    searchArea: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#1c77c7',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },

    newStationArea: {
        position: 'absolute',
        bottom: 50,
        zIndex: 5,
        flexDirection: 'row',
    },

    addButton: {
        width: 70,
        height: 70,
        backgroundColor: '#3cba54',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
  });

export default Main;