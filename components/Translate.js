import { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet, SafeAreaView
} from 'react-native'
import { useLocales } from 'expo-localization'

import languages from '../config/languages'

const Translate = () => {
  const [locale] = useLocales()
  const [language, setLanguage] = useState(null)
  const [title, setTitle] = useState('Language')

  useEffect( () => {
    const l = locale?.languageTag.split('-')[0]
    setLanguage(languages[l])
    setTitle(languages[l].title)
  },[])

  const switchLanguage = (lng) => {
    setLanguage(languages[lng])
    setTitle(languages[lng].title)
  }

  return(
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{ title }</Text>
        <Text>{ language && `${language.prompt } - ${ language.name }` }</Text>
      </View>
      <View style={styles.button}>
        {
          Object.keys(languages).map( (item, index) => {
            const t = `${item.toUpperCase()}`
            return(
              <Button title={t} onPress={ () => switchLanguage(item)} />
            )
          })
        }
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Available</Text>
        <Text>{JSON.stringify(Object.keys(languages), null, 2 )}</Text>
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

export default Translate