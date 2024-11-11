
import AdminNavbar from '@/components/navbar-admin'
import React from 'react'

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <AdminNavbar />
            {children}
        </div>
    )
}
