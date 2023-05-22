import './globals.css'

export const metadata = {
  title: 'ChatAI',
  description: 'ChatAPI made by muffinweb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}