/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {Button,View} from '@tarojs/components'
import Taro from '@tarojs/taro'

 function sleep(t = 100) {
  let timer: NodeJS.Timeout
  return new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, t)
  })
}


const getCacheToken = () => Taro.getStorageSync('token') ?? ''
const setCacheToken = (token: string) => Taro.setStorageSync('token', token)
const removeCacheToken = () => Taro.removeStorageSync('token')

async function getUserInfo() {
  await sleep(999)
  return { msg: 'success', code: 200, data: { username: 'zd' } }
}

async function logout(token: string) {
  await sleep(0)
  return { msg: 'success', code: 200, data: token }
}

function useUserInfo(enabled = false) {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled,
  })
}

/**
 * 推出登录
 */
function useUserLogout({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: Error) => void
} = {}) {
  return useMutation({
    mutationFn: (token?: string) => {
      return logout(token || '123')
    },
    onSuccess,
    onError,
  })
}

export default function Home() {
  const queryClient = useQueryClient()
  const [token, _setToken] = useState(getCacheToken() ?? '')
  const [typeUser, _setTypeUser] = useState('')
  const setTypeUser = useCallback((_typeUser: string, log: any) => {
    console.log('@setTypeUser', log, _typeUser, performance.now())
    _setTypeUser(_typeUser)
  }, [])
  const {
    mutate: submitLogout,
    reset: restLogout,
    isPending: isLogoutPending,
  } = useUserLogout({
    // onSuccess() {
    //   console.log('Logout mutation success')
    //   // restLogout()
    // },
  })

  const setToken = useCallback((_token: string) => {
    setCacheToken(_token)
    _setToken(_token)
  }, [])
  const login = useCallback(() => {
    setToken('123')
  }, [setToken])
  const removeToken = useCallback(() => {
    console.log('@removeToken', performance.now())
    removeCacheToken()
    _setToken('')
  }, [])
  const {
    data: userInfo,
    isFetching: isUpdatingUserInfo,
  } = useUserInfo(!!token && !isLogoutPending)

  const isLoggedIn = useMemo(() => {
    return !!userInfo
  }, [userInfo])

  // 退出登录
  const logoutUserTwice = useCallback(() => {
    console.log('[logoutUser 触发两次 @ change]', performance.now())
    submitLogout('123')
    setTypeUser('', 1)
    removeToken()
    queryClient.clear()
  }, [queryClient, removeToken, setTypeUser, submitLogout])


  
  // 退出登录
  const logoutUserOnce1 = useCallback(() => {
    console.log('[logoutUser 触发一次 @ change]', performance.now())
    setTypeUser('', 1)
    submitLogout('123')
    removeToken()
    queryClient.clear()
  }, [queryClient, removeToken, setTypeUser, submitLogout])
    
  // 退出登录
  const logoutUserOnce2 = useCallback(() => {
    console.log('[logoutUser 触发一次 @ change]', performance.now())
    setTypeUser('', 1)
    removeToken()
    submitLogout('123')
    queryClient.clear()
  }, [queryClient, removeToken, setTypeUser, submitLogout])

  // 退出登录
  const logoutUserOnce3 = useCallback(() => {
    console.log('[logoutUser 触发一次 @ change]', performance.now())
    removeToken()
    submitLogout('123')
    setTypeUser('', 1)
    queryClient.clear()
  }, [queryClient, removeToken, setTypeUser, submitLogout])

  
  // 退出登录
  const logoutUserOnce4 = useCallback(() => {
    console.log('[logoutUser 触发一次 @ change]', performance.now())
    removeToken()
    setTypeUser('', 1)
    submitLogout('123')
    queryClient.clear()
  }, [queryClient, removeToken, setTypeUser, submitLogout])


  useEffect(() => {
    console.log('@ change')
    console.log({ typeUser, isLoggedIn })
  }, [typeUser, isLoggedIn])




  useEffect(() => {
    if (isLoggedIn) {
      setTypeUser('typeuser', 2)
    }
  }, [isLoggedIn, setTypeUser])


  return (

    <View>
      <View className='space-y-4 flex flex-col'>
        {
          isLoggedIn
            ? <>
              <Button onClick={logoutUserTwice}>logoutUserTwice</Button>
              <Button onClick={logoutUserOnce1}>logoutUserOnce1</Button>
              <Button onClick={logoutUserOnce2}>logoutUserOnce2</Button>
              <Button onClick={logoutUserOnce3}>logoutUserOnce3</Button>
              <Button onClick={logoutUserOnce4}>logoutUserOnce4</Button>
            </>
            : <Button onClick={login}>login</Button>
        }
      </View>
    </View>
  )
}
