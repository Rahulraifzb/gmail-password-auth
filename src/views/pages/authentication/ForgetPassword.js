import React, { useRef, useState } from 'react'
import { Card, Form ,Button} from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router'
import { useAuth } from '../../../context/AuthContext'
import useMounted from '../../../hooks/useMounted'
import AuthLayout from '../../../layouts/AuthLayout'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ForgetPassword = () => {
    const newPasswordRef = useRef()
    const [isSubmitting,setIsSubmitting] = useState(false)
    const {resetPassword} = useAuth()
    const query = useQuery()
    const history = useHistory()
    const {mounted} = useMounted()

    console.log(query.get("oobCode"))
    console.log(query.get("mode"))
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await resetPassword(query.get("oobCode"),newPasswordRef.current.value)
        .then((res) => {
            history.push("/login")
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            mounted && setIsSubmitting(false)
        })
    }

    return (
        <AuthLayout>
            <Card>
                <Card.Body>
                    <h4>Reset Password</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="new password">New Password</Form.Label>
                            <Form.Control type="password" ref={newPasswordRef} placeholder="********" required />
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting} className="mt-3">Reset Password</Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    )
}

export default ForgetPassword
