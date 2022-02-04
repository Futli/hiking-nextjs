
import React from "react"
import sideStyles from "./sidebar.module.scss"

export default function SideBarMobile({ showSidebar, sidebar, children }) {
    return (
     
        
        <div
            className={
                sidebar
                    ? `${sideStyles.sidebarM} ${sideStyles.activeM}`
                    : sideStyles.sidebarM
            }
        >
            <button
                onClick={showSidebar}
                className={
                    sidebar
                        ? `${sideStyles.buttonM} ${sideStyles.activeM}`
                        : sideStyles.buttonM
                }
            >
                <span
                    className={
                        sidebar
                            ? `${sideStyles.arrow} ${sideStyles.left}`
                            : sideStyles.arrow
                    }
                    alt="arrow"
                ></span>
            </button>

            <div className={sideStyles.contentM}>{children}</div>
        </div>
        
       
    );
}