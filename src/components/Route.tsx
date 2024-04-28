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

import { Link } from 'expo-router'

import {
  BookOutline,
  BookSolid,
  CalendarOutline,
  CalendarSolid,
  HomeOutline,
  HomeSolid,
  Logout,
} from '@/components/Icons'
import useAuth from '@/hooks/useAuth'
import { useRoute } from '@react-navigation/native'

export default ({ children }: { children?: ReactNode }) => {
  const auth = useAuth()

  return (
    <View className='dar h-full w-full bg-lightgray text-black dark:bg-black'>
      {auth.isAuthenticated ? (
        <View className='h-full w-full'>
          <View>
            <SafeAreaView>
              <View className='h-full p-[24px]'>{children}</View>
            </SafeAreaView>
          </View>
          <Nav />
        </View>
      ) : (
        <Login />
      )}
    </View>
  )
}

const Nav = () => {
  const route = useRoute()
  const auth = useAuth()

  return (
    <View className='fixed bottom-[100px] flex h-[80px] flex-row items-center justify-evenly rounded-t-[24px] bg-white py-[10px] dark:bg-black'>
      <Link
        href='/'
        className='flex items-center justify-evenly'
        asChild
      >
        <Pressable>
          {route.name === 'index' ? (
            <HomeSolid
              size='36'
              color='#171c26'
            />
          ) : (
            <HomeOutline
              size='40'
              color='black'
            />
          )}
          <Text className='text-[12px] font-bold text-primary'>Home</Text>
        </Pressable>
      </Link>
      <Link
        href='/courses'
        className='flex items-center justify-evenly'
        asChild
      >
        <Pressable>
          {route.name === 'courses' ? (
            <BookSolid
              size='36'
              color='#171c26'
            />
          ) : (
            <BookOutline
              size='40'
              color='black'
            />
          )}
          <Text className='text-[12px] font-bold text-primary'>Courses</Text>
        </Pressable>
      </Link>
      <Link
        href='/calendar'
        className='flex items-center justify-evenly'
        asChild
      >
        <Pressable>
          {route.name === 'calendar' ? (
            <CalendarSolid
              size='36'
              color='#171c26'
            />
          ) : (
            <CalendarOutline
              size='40'
              color='black'
            />
          )}
          <Text className='text-[12px] font-bold text-primary'>Calendar</Text>
        </Pressable>
      </Link>
      <Pressable
        onPress={auth.logoutAsync}
        className='flex items-center justify-evenly'
      >
        <Logout
          size='36'
          color='#171c26'
        />
        <Text className='text-[12px] font-bold text-primary'>Logout</Text>
      </Pressable>
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
