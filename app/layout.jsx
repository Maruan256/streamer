import "../styles/globals.css"
import ThemeProvider from "../components/ThemeProvider"
import Header from "../components/Header"

export const metadata = {
  title: "Themeable Stream Portal",
  description: "Demo scaffold"
}

export default function RootLayout({ children }) {
  // initialTheme is undefined so ThemeProvider will load persisted or default later
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main className="page">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}