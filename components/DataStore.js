import { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const getKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      /// const o = JSON.parse(value)
      return(value)
    }
  } catch(e) {
    /// error reading value
  }
}

const saveKey = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    return getKey(key)
  } catch (e) {
    /// saving error
  }
}



const deleteKey = async (key) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (e) {
    /// error deleting value
  }
}


const DataStore = () => {

  const key = 'client-info'
  const [value, setValue] = useState(null)


  const clientInfo = {
    name: 'Rene Krewinkel',
    email: 'rene@krewinkel.nl',
    web: 'krewinkel.studio',
    phone: '+31651840813'
  }

  const handleSave = () => {
    saveKey(key, clientInfo)
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
        <Text>Value: { JSON.stringify(clientInfo, null, 2) }</Text>
      </View>

      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Stored:</Text>
        <Text>Key: { key }</Text>
        <Text>Value: { JSON.stringify(value, null, 2) }</Text>
      </View>

      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Nice:</Text>
        <Text>Key: { key }</Text>
        <Text>Value: { value ? JSON.stringify(JSON.parse(value), null, 2): '' }</Text>
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



export default DataStore