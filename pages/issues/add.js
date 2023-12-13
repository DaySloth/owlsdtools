import styles from '@/styles/Home.module.css'
import { Button, Card, Form, Dimmer, Header, Loader, Segment, Message } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';


export default function AddServiceLocation() {
    // use params.location to access the site info
    const router = useRouter()

    const [issueText, setIssueText] = useState("")
    const [issueValue, setIssueValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    async function addNewIssue() {
        setLoading(true)
        const { data } = await (await fetch("http://localhost:3000/api/database/issues/add", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ text: issueText, value: issueValue }) })).json()

        if (data.affectedRows === 1) {
            // Success Here
            setIssueText("")
            setIssueValue("")
            setSuccessMessage(true)
        }
        setLoading(false)
    }


    return (
        <main className={`${styles.servicePage} ${styles.owlbackground}`}>
            <Dimmer active={loading}>
                <Loader>Saving...</Loader>
            </Dimmer>
            <Segment placeholder>
                <Header icon>
                    Add Issue
                </Header>
                <Card.Group>
                    <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.back() }}>
                        Go back
                    </Button>

                </Card.Group>
            </Segment>
            <div className={`${styles.issue}`}>
                <Segment>
                    <Form onSubmit={(e) => { e.preventDefault(); addNewIssue() }}>
                        <Form.Field>
                            <Form.TextArea required label='New Issue Overview' value={issueText} onChange={(e) => { setIssueText(e.target.value) }} />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea required label='New Issue Email Text' value={issueValue} onChange={(e) => { setIssueValue(e.target.value) }} />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    {successMessage ? <Message
                        onDismiss={() => { setSuccessMessage(false) }}
                        header='Success!'
                        content='Successfully added issue to database.'
                        success
                    /> : <></>}
                </Segment>
            </div>
        </main >
    )
}

