import '@styles/globals.css';
import Nav from "@components/Nav"
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TaskTopia",
  description: "Manage all your tasks under one roof and increase your productivity"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Toaster />

        <div className="main">
          <div className="gradient" />

        </div>
        <main className="app">
          <Nav />
          {children}
        </main>


      </body>

    </html>
  )
}



export default RootLayout
