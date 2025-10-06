import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import UseTheme from '../hooks/UseTheme';

const TabsLayout = () => {
  const {colors} = UseTheme();
    return (
     <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight:"600",
        },
        headerShown:false,
      }}
      >
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login page',
            tabBarIcon: ({color, size})=>(
              <Ionicons name='log-in-outline' size={size} color={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'instant',
            tabBarIcon: ({color, size})=>(
              <Ionicons name='flash-outline' size={size} color={color}/>
            ),
          }}
        />
        </Tabs>
    )
  }

export default TabsLayout
