import { ReactNode } from 'react'
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import useAuth from '@/hooks/useAuth'

export default ({ children }: { children?: ReactNode }) => {
  const auth = useAuth()

  return (
    <View className='flex-1 bg-white text-black dark:bg-black'>
      {auth.isAuthenticated ? (
        <SafeAreaView>
          <View className='h-full p-[24px]'>{children}</View>
        </SafeAreaView>
      ) : (
        <Login />
      )}
    </View>
  )
}

const Login = () => {
  const colorScheme = useColorScheme()
  const auth = useAuth()

  return (
    <ImageBackground
      source={
        colorScheme === 'light'
          ? require('@/assets/images/light/login.png')
          : require('@/assets/images/dark/login.png')
      }
      resizeMode='cover'
      className='flex-1'
    >
      <SafeAreaView>
        <View className='bg-transparent flex h-full items-center justify-between p-[24px] pb-[48px]'>
          <View>
            <Text className='text-center text-[28px] text-black dark:text-white'>
              Welcome to Helium!
            </Text>
            <Text className='w-[240px] text-center text-[18px] text-darkgray dark:text-lightgray'>
              Login with your Exeter email to start tracking your GPA
            </Text>
          </View>
          <Pressable
            className='flex flex-row items-center rounded-[12px] bg-white px-[24px] py-[12px] shadow-xl dark:bg-black'
            disabled={auth.isAuthenticated}
            onPress={async () => {
              await auth.loginAsync?.()
            }}
          >
            <Text className='mr-[8px] text-center text-[20px] text-black dark:text-white'>
              Sign in with Microsoft
            </Text>
            <Image
              source={require('@/assets/images/microsoft.png')}
              className='ml-[8px] h-[30px] w-[30px]'
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
