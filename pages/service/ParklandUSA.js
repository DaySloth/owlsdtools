import styles from '@/styles/Home.module.css'
import { Button, Card, Header, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import LocationTable from '@/components/locationTable';

export default function ParklandUSAService({ data }) {
    const router = useRouter()

    return (
        <main className={`${styles.servicePage} ${styles.owlbackground}`}>

            <Segment placeholder>
                <Header icon>
                    Parkland USA Service Overview
                </Header>
                <Card.Group>

                    <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service", { scroll: false }) }}>
                        Go back to Service
                    </Button>
                    <Button inverted fluid color='blue' onClick={(e) => { e.preventDefault(); router.push("/service/email/parklandusa") }}>
                        Send Email
                    </Button>



                </Card.Group>
            </Segment>

            <LocationTable data={data} customer={"parklandusa"} />

        </main >
    )
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/database/service/parklandusa')
    const { data } = await res.json()
    return { props: { data } }
}