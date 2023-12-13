import styles from '@/styles/Home.module.css'
import { Button, Card, Header, Icon, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'

export default function ServiceAnalysis() {
    const router = useRouter()


    return (

        <main className={`${styles.servicePage} ${styles.owlbackground}`}>

            <Segment placeholder>
                <Header icon>
                    Service Overview
                </Header>
                <Card.Group>
                    <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/") }}>
                        Go home
                    </Button>
                    <Button inverted fluid color='blue' onClick={(e) => { e.preventDefault(); router.push("/issues/add") }}>
                        Add a new issue
                    </Button>
                    <Button inverted fluid color='purple' onClick={(e) => { e.preventDefault(); router.push("/service/addlocation") }}>
                        Add a new location
                    </Button>
                </Card.Group>

            </Segment>

            <div className={styles.main}>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Card.Header>7-Eleven</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/7-Eleven", { scroll: false }) }}>
                                    Visit 7-Eleven Service
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>Community Choice Financial</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/CCFI", { scroll: false }) }}>
                                    Visit CCFI Service
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>Parkland USA</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/ParklandUSA", { scroll: false }) }}>
                                    Visit Parkland USA Service
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>Southpaw/ABTB</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/SouthpawABTB", { scroll: false }) }}>
                                    Visit Southpaw/ABTB Service
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>Other</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/Other", { scroll: false }) }}>
                                    Visit Other Service
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>All</Card.Header>
                            <Card.Description>
                                Some description here
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui'>
                                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service/allservice", { scroll: false }) }}>
                                    Visit All Service Overview
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        </main>
    )
}
