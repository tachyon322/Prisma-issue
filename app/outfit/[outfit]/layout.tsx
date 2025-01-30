import React from 'react'
import HeaderElement from '@/components/HeaderElement'

export default function layout({ children }: any) {
  return (
    <div className='wide-wrap'>
        <HeaderElement />
        {children}
    </div>
  )
}
