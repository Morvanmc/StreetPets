import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
    const [ currentRegion, setCurrentRegion ] = useState(null);

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

    if(!currentRegion) {
        return null;
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={currentRegion}>
                <Marker coordinate={{latitude: -22.8781559, longitude: -42.0196071}}>
                    <Image style={styles.petAvatar} source={require('../img/dog.png')}/>

                    <Callout>
                        <View style={styles.callout}>
                            <Text style={styles.stationName}>Estação Teste</Text>
                            <Text style={styles.stationStatus}>Vazia</Text>
                            <Text style={styles.stationUser}>by: Morvan Marques</Text>
                        </View>
                    </Callout>
                </Marker>
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
        height: 54,
        width: 54,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
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
        marginTop: 5,
    },
    stationUser: {
        color: '#666',
        marginTop: 5,
    }
  });

export default Main;