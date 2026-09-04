import Sidebar from "./Sidebar";
import Header from "./Header";

import "./MainLayout.css";


function MainLayout({ children }) {

    return (

        <div className="app-layout">


            <Sidebar />


            <div className="main-section">


                <Header />


                <main className="main-content">

                    {children}

                </main>


            </div>


        </div>

    );

}


export default MainLayout;