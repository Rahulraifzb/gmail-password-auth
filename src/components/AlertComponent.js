import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

const AlertComponent = ({variant,closeAlert,content}) => {

    useEffect(() => {
        setTimeout(() => {
            closeAlert()
        },5000)
    },[])

    return (
        <Alert variant={variant} >{content}</Alert>
    )
}

export default AlertComponent
