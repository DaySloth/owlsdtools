import styles from '@/styles/Home.module.css'
import { Button, Card, Header, Icon, Segment, TextArea } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import EmailGenerator from '@/components/emailGenerator'
import { useEffect, useState } from 'react'


export default function EmailForm({ data }) {
    const router = useRouter()


    return (
        <main className={`${styles.servicePage} ${styles.owlbackground}`}>

            <Segment placeholder>
                <Header icon>
                    {router.query.customer === "seveneleven" ?
                        <>
                            7-Eleven Email Overview
                        </> : <></>}
                    {router.query.customer === "ccfi" ?
                        <>
                            Community Choice Financial Email Overview
                        </> : <></>}
                    {router.query.customer === "parklandusa" ?
                        <>
                            Parkland USA Email Overview
                        </> : <></>}
                    {router.query.customer === "southpawabtb" ?
                        <>
                            Southpaw/ABTB Email Overview
                        </> : <></>}
                    {router.query.customer === "other" ?
                        <>
                            Other Email Overview
                        </> : <></>}
                </Header>
                <Card.Group>
                    <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.back() }}>
                        Go back
                    </Button>

                </Card.Group>

            </Segment>

            <EmailGenerator customer={router.query.customer} data={data} />


        </main>
    )
}

export async function getServerSideProps(context) {
    console.log(context.params.customer)
    let res;
    switch (context.params.customer) {
        case "seveneleven":
            res = await fetch('http://localhost:3000/api/database/service/seveneleven')
            break;

        case "ccfi":
            res = await fetch('http://localhost:3000/api/database/service/ccfi')
            break;

        case "parklandusa":
            res = await fetch('http://localhost:3000/api/database/service/parklandusa')
            break;

        case "southpawabtb":
            res = await fetch('http://localhost:3000/api/database/service/southpawabtb')
            break;

        case "other":
            res = await fetch('http://localhost:3000/api/database/service/other')
            break;

        default:
            break;

    }
    const { data } = await res.json()
    return { props: { data } }
}
