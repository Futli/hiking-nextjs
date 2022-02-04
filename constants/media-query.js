import { useMediaQuery } from "react-responsive";

export const NoMobile = ({ children }) => {
    const isNoMobile = useMediaQuery({ minWidth: 768});
    return isNoMobile ? children : null;
};

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
};