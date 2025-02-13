// import React, { Dispatch, SetStateAction, useState } from "react";
// import { TouchableOpacity, FlatList, Text, View, StyleSheet, GestureResponderEvent } from "react-native";


// function TabButton({ name, activeTab, onHandleSearchType }:
//     {name: string, activeTab: string, onHandleSearchType: (event: GestureResponderEvent) => void}
// ) {
//   return (
//     <TouchableOpacity
//       style={styles.btn(name, activeTab)}
//       onPress={onHandleSearchType}
//     >
//       <Text style={styles.btnText(name, activeTab)}>{name}</Text>
//     </TouchableOpacity>
//   );
// }

// const ProductDetailsTab = (
//     { tabs, activeTab, setActiveTab }: 
//     {tabs: string[], activeTab: string, setActiveTab: Dispatch<SetStateAction<string>>}) => 
//     {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tabs}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TabButton
//             name={item}
//             activeTab={activeTab}
//             onHandleSearchType={() => setActiveTab(item)}
//           />
//         )}
//         contentContainerStyle={{ columnGap: 10 }}
//         keyExtractor={(item) => item}
//       />
//     </View>
//   );
// }

// export default ProductDetailsTab

// const styles = StyleSheet.create({
//     container: {
//       marginTop: 10,
//       marginBottom: 15,
//     },
//     btn: (name: string, activeTab: string) => ({
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//       backgroundColor: name === activeTab ? "green" : "#F3F4F8",
//       borderRadius: 10,
//       marginLeft: 2,
//     }),
//     btnText: (name: string, activeTab: string) => ({
//       fontSize: 16,
//       color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
//     }),
// });

import { COLORS } from "@/theme/colors";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";

// TabButton component, which renders a button for each tab
function TabButton({
  name,
  activeTab,
  onHandleSearchType,
}: {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void; 
}) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)} className="font-bold text-black">{name}</Text>
    </TouchableOpacity>
  );
}

// ProductDetailsTab component renders the list of tabs
const ProductDetailsTab = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        keyExtractor={(item) => item} // Assuming `item` is a string
      />
    </View>
  );
};

export default ProductDetailsTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
    width: "100%"
  },
  btn: (name: string, activeTab: string) => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: name === activeTab ? "#F9F9F9" : null,
    borderBottomColor: name === activeTab ? COLORS.light.primary : null,
    borderBottomWidth: name === activeTab ? 2 : null,
  }),
  btnText: (name: string, activeTab: string) => ({
    fontSize: 12,
  }),
});
