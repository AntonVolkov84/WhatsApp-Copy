import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import ConversationScreen from "./Screens/ConversationScreen";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyB6CE5AXL3rIdjcwOWCnnJwfwVEJh1WVsI",
  authDomain: "whatsapp-11dbb.firebaseapp.com",
  projectId: "whatsapp-11dbb",
  storageBucket: "whatsapp-11dbb.appspot.com",
  messagingSenderId: "983350929825",
  appId: "1:983350929825:web:d32648052b8e53270a83e0",
  measurementId: "G-JKWEKLSV74",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export const AuthContext = createContext();

export default function App() {
  return (
    <AuthContext.Provider value={{ db, auth, app }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="register"
            options={{
              headerShown: false,
            }}
            component={Register}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            name="conversation"
            options={{
              headerShown: false,
            }}
            component={ConversationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
