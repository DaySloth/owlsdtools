import styles from '@/styles/Home.module.css'
import { Button, Card, Form, Dimmer, Header, Dropdown, Segment, Loader, Message, TextArea } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function LocationEditor({ issues, locationData }) {

    // use params.location to access the site info
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);



    const [issueID, setIssueID] = useState(locationData[0].IssueID);
    const [status, setStatus] = useState(locationData[0].Status);
    const [callNumber, setCallNumber] = useState(locationData[0].CallNumber || "");
    const [notes, setNotes] = useState(locationData[0].Notes || "");
    const [date, setDate] = useState(locationData[0].DateEmailed || "");


    // Handles the submission of the data
    async function handleSubmit() {
        const newEntry = {
            IssueID: issueID,
            Status: status,
            DateEmailed: date,
            Notes: notes,
            CallNumber: callNumber
        }

        setLoading(true);
        // locationData[0].ServiceID
        const { data } = await (await fetch(`http://localhost:3000/api/database/service/editEntry/${locationData[0].ServiceID}`, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(newEntry) })).json()

        if (data.affectedRows === 1) {
            // Success Here
            setSuccessMessage(true)
            setLoading(false)
            router.back()
        }

    }

    // Finds the ID of the issue selected and updates the newEntry to be added
    async function findIssueID(issue) {
        let i = await issues.find((i) => i.value === issue)
        setIssueID(i.IssueID)
    };


    const statusOptions = [
        {
            key: 'Need to Email',
            text: 'Need to Email',
            value: 'Need to Email',
        },
        {
            key: 'Emailed',
            text: 'Emailed',
            value: 'Emailed',
        },
        {
            key: 'Service Setup',
            text: 'Service Setup',
            value: 'Service Setup',
        },
        {
            key: 'Needs Checkup',
            text: 'Needs Checkup',
            value: 'Needs Checkup',
        },
        {
            key: 'Special',
            text: 'Special',
            value: 'Special',
        },

    ]






    return (
        <main className={`${styles.servicePage} ${styles.owlbackground}`}>
            <Dimmer active={loading}>
                <Loader>Saving...</Loader>
            </Dimmer>
            <Segment placeholder>
                <Header icon>
                    Location Editor
                </Header>
                <Card.Group>
                    <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.back() }}>
                        Go back
                    </Button>
                    <Button inverted fluid color='blue' onClick={(e) => { e.preventDefault(); router.push("/issues/add") }}>
                        Add a new issue
                    </Button>
                </Card.Group>
            </Segment>
            <div className={`${styles.locationEditor}`}>
                <Segment>
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <Form.Field>
                            <label>Location</label>
                            <input disabled value={locationData[0]['Account Name']} />
                        </Form.Field>

                        <Form.Field>
                            <label>Issue</label>
                            <Dropdown
                                placeholder='Select Issue'
                                fluid
                                selection
                                options={issues}
                                defaultValue={locationData[0].value}
                                // Use this function to update the entry
                                onChange={(e, data) => { findIssueID(data.value) }}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Status</label>
                            <Dropdown
                                placeholder='Select Status'
                                fluid
                                selection
                                options={statusOptions}
                                defaultValue={status}
                                // Use this function to update the entry
                                onChange={(e, data) => { setStatus(data.value) }}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Date Emailed</label>
                                <input value={date} onChange={(e) => { setDate(e.target.value) }} />
                                {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
                            </Form.Field>
                            <Form.Field>
                                <label>Call Number</label>
                                <input value={callNumber} onChange={(e) => { setCallNumber(e.target.value) }} />
                            </Form.Field>

                        </Form.Group>
                        <Form.Field>
                            <label>Notes</label>
                            <TextArea value={notes} onChange={(e) => { setNotes(e.target.value) }} />
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

export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3000/api/database/issues/all')
    const { data } = await res.json()
    let issues = data
    const locRes = await fetch(`http://localhost:3000/api/database/service/edit/${context.params.location}`)
    const { locationD } = await locRes.json()
    let locationData = locationD
    return { props: { issues: issues, locationData: locationData } }
}