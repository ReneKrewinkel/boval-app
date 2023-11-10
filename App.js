import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {Button, StyleSheet, Text, View} from 'react-native'
import StoreSecure from './components/StoreSecure'
import DataStore from './components/DataStore'
import SQLData from './components/SQLData'
import Pagination from './components/Pagination'
import Translate from './components/Translate'

import AppContext from './context/AppContext'

export default function App() {

  const [data, setData] = useState(null)
  const [mod, setMod] = useState('translate')

  const setLanguage = (lng) => {
    alert(lng)
  }

  const renderContent = () => {
    if(mod === 'translate') return(<Translate />)
    if(mod === 'sql') return(<SQLData />)
    if(mod === 'pagination') return(<Pagination />)
    if(mod === 'datastore') return(<DataStore />)
    if(mod === 'secure') return(<StoreSecure />)
  }

  return (
    <AppContext.Provider value={{ data, setLanguage }}>
    <View style={styles.container}>
      { renderContent()}
      <View style={styles.button}>
        <Button title={'Translate'} onPress={ () => setMod('translate') }/>
        <Button title={'SQL'} onPress={ () => setMod('sql') }/>
        <Button title={'Secure'} onPress={ () => setMod('secure') }/>
        <Button title={'Data'} onPress={ () => setMod('datastore') }/>
        <Button title={'Pagination'} onPress={ () => setMod('pagination') }/>
      </View>
    </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding:10,
    margin:5,
  }
});
