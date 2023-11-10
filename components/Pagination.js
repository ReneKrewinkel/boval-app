import { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet, SafeAreaView
} from 'react-native'

const Pagination = () => {

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const num = 10

  useEffect( () => {
    const d = []
    for(let i = 0; i < 200; i++) {
      d.push({ id: i, title: `Item ${i}`})
    }
    setData(d)
    setFilteredData(d.slice(0,num))
  }, [])

  const renderItem = (item) => {
    return(
      <View style={styles.row }><Text>{ item?.title }</Text></View>
    )
  }

  const sliceData = (s) => {
    setFilteredData(data.slice(s,s+num))
  }

  return(
    <SafeAreaView style={styles.container}>
          <View style={styles.button}>

            <Button title={'1'} onPress={ () => sliceData(0) }/>
            <Button title={'2'} onPress={ () => sliceData(num) }/>
            <Button title={'3'} onPress={ () => sliceData(2*num) }/>
            <Button title={'4'} onPress={ () => sliceData(3*num) }/>
            <Button title={'5'} onPress={ () => sliceData(4*num) }/>

            <Button title={'alles'} onPress={ () => setFilteredData(data) }/>
          </View>

          <View styles={styles.card}>
            <FlatList
              data={filteredData}
              renderItem={ ({item}) => renderItem(item)}
              keyExtractor={item => item.id}
            />
          </View>

    </SafeAreaView>
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
    width: 320,
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
    marginTop: 80,
    padding:20,
    margin:10,
    width: 320,

  },
  row: {
    width: 320,
    padding: 8,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
  }
})

export default Pagination