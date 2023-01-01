import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../components/Icon/Icon"
import { Headline } from "react-native-paper";

// Screens
import HomeScreenEmpty from "../screens/HomeScreen/HomeScreenEmpty";
import TestScreen from "../screens/TestScreen/TestScreen";

// Searchbar
import { SearchBar } from '@rneui/themed';
import HomeScreenNormal from "../screens/HomeScreen/HomeScreenNormal";

const Tab = createBottomTabNavigator();

const BottomNavigator: React.FC = () => {
  /* TODO: Encapsulate the search logic in a separate component */
  const [search, setSearch] = React.useState<string>("");

  const updateSearch = (search: string) => {
    setSearch(search);
  }

  const onSearch = () => {
    console.log(search);
  }
  /* End of search logic */

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreenNormal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Home24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
          header: () => (
            <SafeAreaView style={{backgroundColor: 'white'}}>
              <Headline style={{ margin: 10, fontFamily: 'Lato_900Black', fontSize: 28 }}>Home</Headline>
              {/* ToDO: Encapsulate */}
              <SearchBar
                placeholder="Search"
                style={{ margin: 10 }}
                value={search}
                onChangeText={updateSearch}
                onChange={() => {}}
                searchIcon={<Icon name="Search20Filled" color="gray" onPress={onSearch}/>}
                platform="ios"
                inputContainerStyle={{ height: 20 }}
                clearIcon={<Icon name="DismissCircle20Filled" color="gray" onPress={() => setSearch("") as void } />}
              />
              {/* End of encapsulation */}
            </SafeAreaView>
          )
        }}
      />
      <Tab.Screen
        name="Files"
        component={HomeScreenEmpty}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Folder24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
        }}
      />
      <Tab.Screen
        name="Server"
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Server24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="Beaker24Filled" color={focused ? "#1868F1" : "gray"} />
          ),
          tabBarActiveTintColor: "#1868F1",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
