import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import AuthProvider from '@/providers/AuthProvider'
import '@/styles.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default () => {
  const [loaded, error] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style='auto' />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </AuthProvider>
  )
}
