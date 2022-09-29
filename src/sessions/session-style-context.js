import React, { useContext, useState, useEffect } from 'react'

const SessionStyleContext = React.createContext();
const SessionStyleUpdateContext = React.createContext();

export function useSessionStyle() {
    return useContext(SessionStyleContext)
}

export function useSessionStyleUpdate() {
    return useContext(SessionStyleUpdateContext)
}

export function SessionStyleProvider( props ) {

    const [ style, setStyle ] = useState({ style: props.sessionStyle } )

    useEffect(() => { 
        console.log('CONTEXT RERENDER: ', style )
    }, [style] )

    function handleChanges( target, key, value ){
        props.styleHandler( target, key, value )
        setStyle({ style: props.sessionStyle } )
    }

    return (
        <SessionStyleContext.Provider value={style}>
            <SessionStyleUpdateContext.Provider value={ handleChanges }>
                {props.children}
            </SessionStyleUpdateContext.Provider>
        </SessionStyleContext.Provider>
    )
}