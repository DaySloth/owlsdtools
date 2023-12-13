import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { Button, Card, Image } from 'semantic-ui-react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>OWL Security Deployment Tools</title>
        <meta name="description" content="Created by Allister Rampenthal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className} ${styles.owlbackground}`}>
        <Card.Group>

          <Card>
            <Card.Content>
              <Card.Header>Service Analysis</Card.Header>
              <Card.Meta>Setup service emails</Card.Meta>
              <Card.Description>
                This will let you search accounts and mark them for service to be sent
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui'>
                <Button inverted fluid color='green' onClick={(e) => { e.preventDefault(); router.push("/service", { scroll: false }) }}>
                  Go to Service
                </Button>
              </div>
            </Card.Content>
          </Card>

        </Card.Group>
      </main>
    </>
  )
}
