import styles from '@/styles/Home.module.css'
import { Button, Card, Form, Dimmer, Header, Dropdown, Segment, Loader, Message, Input, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';


export default function AddServiceLocation({ issues }) {
    // use params.location to access the site info
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // State varibles to be used below
    const [locationLookup, setLocationLookup] = useState("");
    const [locationOptions, setLocationOptions] = useState([]);
    const [databaseLocations, setDatabaseLocations] = useState([]);

    // This is what will be submitted to the database
    let [newEntry, setNewEntry] = useState({
        Account: "",
        'Account Name': "",
        Address: "",
        Address2: "",
        City: "",
        State: "",
        ZipCode: "",
        'Online Date': "",
        IssueID: "",
        Status: ""
    })

    // Handles the submission of the data
    async function handleSubmit() {
        setLoading(true);
        const { data } = await (await fetch("http://localhost:3000/api/database/service/add", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(newEntry) })).json()
        if (data.affectedRows === 1) {
            // Success Here
            setNewEntry({
                Account: "",
                'Account Name': "",
                Address: "",
                Address2: "",
                City: "",
                State: "",
                ZipCode: "",
                'Online Date': "",
                IssueID: "",
                Status: ""
            });
            setLocationLookup("");
            setLocationOptions([]);
            setDatabaseLocations([]);
            setSuccessMessage(true)
        }
        setLoading(false)
    }

    // Finds the Account information of the location selected and updates the newEntry to be added
    async function findLocationData(account) {
        let a = await databaseLocations.find((e) => e.Account === account)
        setNewEntry({
            ...newEntry,
            Account: account,
            'Account Name': a['Account Name'],
            Address: a.Address,
            Address2: a.Address2,
            City: a.City,
            State: a.State,
            ZipCode: a.ZipCode,
            'Online Date': a['Online Date'],
        })
    };

    // Finds the ID of the issue selected and updates the newEntry to be added
    async function findIssueID(issue) {
        let i = await issues.find((i) => i.value === issue)
        setNewEntry({
            ...newEntry,
            IssueID: i.IssueID
        })
    };

    // Formulates the locations to be displayed in the dropdown
    async function searchLocation(location) {
        const { data } = await (await fetch(`http://localhost:3000/api/database/accounts/search/${location}`)).json()
        const options = [];
        data.map((e) => { options.push({ key: e.Account, value: e.Account, text: e['Account Name'] }) })
        setLocationOptions(options)
        setDatabaseLocations(data)

    }




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
                    Add Location
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
            <div className={`${styles.main}`}>
                <Segment>
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <Form.Field>
                            <label>Search Location</label>
                            <Input value={locationLookup} onChange={(e, d) => { setLocationLookup(e.target.value) }} icon={<Icon name='search' inverted circular link color='blue' onClick={(e) => { e.preventDefault(); searchLocation(locationLookup) }} />} />

                        </Form.Field>
                        <Form.Field>
                            <label>Select Location</label>
                            <Dropdown
                                placeholder='Location'
                                selection
                                options={locationOptions}
                                // Use this function to update the entry
                                onChange={(e, data) => { findLocationData(data.value) }}
                            />
                            Number of locations found: {locationOptions.length}
                        </Form.Field>

                        <Form.Field>
                            <label>Issue</label>
                            <Dropdown
                                placeholder='Select Issue'
                                fluid
                                selection
                                options={issues}
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
                                // Use this function to update the entry
                                onChange={(e, data) => { setNewEntry({ ...newEntry, Status: data.value }) }}
                            />
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

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/database/issues/all')
    const { data } = await res.json()
    let issues = data
    return { props: { issues } }
}
