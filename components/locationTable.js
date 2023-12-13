import styles from '@/styles/Home.module.css'
import { Button, Card, Grid, Icon, Label, Header, Table, Dropdown, Segment, Confirm } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

export default function LocationTable({ data, customer }) {
    const router = useRouter()

    // Setting up the confirm modal when removing entries or the entire list
    const [confirmModal, setConfirmModal] = useState({ open: false, text: "", single: false, serviceID: "" });

    // Delete single entry
    const handleSingleDeleteConfirm = async () => {
        const res = await fetch(`http://localhost:3000/api/database/service/delete/${confirmModal.serviceID}`);
        const { data } = await res.json()

        if (data.affectedRows === 1) {
            setConfirmModal({ open: false, text: "", single: false, serviceID: "" });
            router.refresh();
        }

    };
    // Delete the entire list
    const handleClearListConfirm = async () => {
        const res = await fetch(`http://localhost:3000/api/database/service/delete/all/${customer}`);
        const { data } = await res.json()
        console.log(data)

        if (data.affectedRows >= 1) {
            setConfirmModal({ open: false, text: "", single: false, serviceID: "" });
            router.refresh();
        }
    };
    // Cancel function for the confirm modal
    const handleCancel = () => setConfirmModal({ open: false, text: "", single: false, serviceID: "" });


    return (
        <main className={styles.servicePage}>
            {/* Confirm Modal for the deletes */}
            <Confirm
                open={confirmModal.open}
                content={confirmModal.text}
                onCancel={() => { handleCancel() }}
                onConfirm={confirmModal.single ? () => { handleSingleDeleteConfirm() } : () => { handleClearListConfirm() }}
            />

            <Table collapsing striped >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                            <Button inverted color='green' onClick={(e) => { e.preventDefault(); router.push("/service/addlocation", { scroll: false }) }}>
                                <Icon name='plus' /> Add Location
                            </Button>

                            <Button inverted floated='right' color='red' onClick={(e) => { e.preventDefault(); setConfirmModal({ open: true, text: "Are you sure you want to clear the entire list?", single: false }) }}>
                                <Icon name='trash' />Clear List
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Issue</Table.HeaderCell>
                        <Table.HeaderCell>Date Emailed</Table.HeaderCell>
                        <Table.HeaderCell>Call Number</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.length >= 1 ? data.map((site) => {
                        return (
                            <Table.Row key={site.Account}>
                                <Table.Cell>{site.Status}</Table.Cell>
                                <Table.Cell>{site['Account Name']}</Table.Cell>
                                <Table.Cell>{site.text}</Table.Cell>
                                <Table.Cell>{site.DateEmailed}</Table.Cell>
                                <Table.Cell>{site.CallNumber}</Table.Cell>
                                <Table.Cell>{site.Notes}</Table.Cell>
                                <Table.Cell textAlign='right'>
                                    <Button.Group size='tiny'>
                                        <Button icon='edit' color='blue' onClick={(e) => { e.preventDefault(); router.push(`/service/locationedit/${site.Account}`, { scroll: false }) }} />
                                        <Button icon='trash' color='red' onClick={(e) => { e.preventDefault(); setConfirmModal({ open: true, text: "Are you sure you want to clear the entry?", single: true, serviceID: site.ServiceID }) }} />
                                    </Button.Group>

                                </Table.Cell>
                            </Table.Row>
                        )
                    }) :
                        <Table.Row>
                            <Table.Cell colSpan='7' textAlign='center'>
                                No locatons were found! Please start by adding a location
                            </Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>

            </Table>
        </main >
    )
}
