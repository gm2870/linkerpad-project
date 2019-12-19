import React, { useState } from "react";

export const RequestContext = React.createContext({
    requestIsDone: false,
    changeRequestStatus: () => {}
});

const RequestContextProvider = props => {
    const [requestDone, setRequestDone] = useState(false);

    const requestHandler = () => {
        setRequestDone(true);
    };

    return (
        <RequestContext.Provider
            value={{
                changeRequestStatus: requestHandler,
                requestIsDone: requestDone
            }}
        >
            {props.children}
        </RequestContext.Provider>
    );
};

export default RequestContextProvider;
