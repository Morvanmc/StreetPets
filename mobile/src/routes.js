import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import Main from './pages/Main';
import InfoStation from './pages/InfoStation';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Street Pets"
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#26d4e7' },
                    
                }}>
                <Stack.Screen name="Street Pets" component={Main} />
                <Stack.Screen name="Informações" component={InfoStation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;