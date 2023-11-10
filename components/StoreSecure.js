import { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native'
import * as SecureStore from 'expo-secure-store'


/// Opties
const secureOptions = {
  requireAuthentication: false,
  authenticationPrompt: 'Authenticate to Verify Your Identity',
  keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
};


const getKey = async(key) => await SecureStore.getItemAsync(key)
const deleteKey = async(key) => await SecureStore.deleteItemAsync(key)
const saveKey = async (key, value) => {
  await SecureStore.setItemAsync(key, value, secureOptions)
  return await getKey(key)
}

const getAvailable = async() => {
  return await SecureStore.isAvailableAsync()
}

const StoreSecure = () => {
  const key = 'api-key'
  const init_value = 'super-secret-content'
  const [value, setValue] = useState(null)
  const [avail, setAvail] = useState(null)

  const handleSave = () => {
    saveKey(key, init_value)
      .then( result => setValue( result ))
  }

  const handleKill = () => {
    deleteKey(key)
      .then(result => setValue(null))
  }

  useEffect( () => {
     getKey(key).then( result => setValue(result))
  },[])

  return(
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Settings:</Text>
        <Text>Key: { key }</Text>
        <Text>Value: { init_value }</Text>
      </View>

      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Stored:</Text>
        <Text>Key: { key }</Text>
        <Text>Value: { value }</Text>
      </View>

      <View style={styles.button}>
        <Button title={'Save Key'} onPress={ handleSave }/>
        <Button title={'Kill Key'} onPress={ handleKill }/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    width: 300,
    backgroundColor: '#fcfcfc',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding:20
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding:20,
    margin:10,
    width: 300,

  }
})


export default StoreSecure