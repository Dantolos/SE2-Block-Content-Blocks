import React, { useContext, useState, useEffect } from 'react'

const SessionGeneralContext = React.createContext();
const SessionGeneralUpdateContext = React.createContext();

export function useSessionGeneral() {
    return useContext(SessionGeneralContext)
}

export function useSessionGeneralUpdate() {
    return useContext(SessionGeneralUpdateContext)
}

export function SessionGeneralProvider( props ) {

    const [ general, setGeneral ] = useState({ general: props.sessionGeneral } )

    useEffect(() => { 
        console.log('CONTEXT RERENDER: ', general )
    }, [general] )

    function handleChanges( target, key, value ){
        props.generalHandler( target, key, value )
        setGeneral({ general: props.sessionGeneral } )
    }

    return (
        <SessionGeneralContext.Provider value={general}>
            <SessionGeneralUpdateContext.Provider value={ handleChanges }>
                {props.children}
            </SessionGeneralUpdateContext.Provider>
        </SessionGeneralContext.Provider>
    )
}