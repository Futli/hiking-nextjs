
import React from "react"
import sideStyles from "./sidebar.module.scss"

export default function SideBar({ showSidebar, sidebar, children }) {
    return (
        <>
        <div
            className={
                sidebar
                    ? `${sideStyles.sidebar} ${sideStyles.active}`
                    : sideStyles.sidebar
            }
        >
           

            <div className={sideStyles.content}>{children}</div>
        </div>
        <button
                onClick={showSidebar}
                className={
                    sidebar
                        ? `${sideStyles.button} ${sideStyles.active}`
                        : sideStyles.button
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
        </>
    );
}