import styles from '@/styles/Home.module.css'
import { Button, Card, Header, Icon, Segment, TextArea } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'



export default function EmailGenerator({ customer, data }) {
    const router = useRouter()

    function copyText() {
        var r = document.createRange();
        r.selectNode(document.getElementById("emailBody"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }

    function handleEmail() {
        copyText();
        switch (customer) {
            case "seveneleven":
                window.location.href = `mailto:jim.carlton@owlservices.com; Andrew.Morris@owlservices.com?cc=Jake.Cooley@owlservices.com&subject=7-Eleven Active Service Needs&body=`
                break;

            case "ccfi":
                window.location.href = `mailto:jp.bergman@owlservices.com?cc=Jake.Cooley@owlservices.com&subject=Community Choice Financial Active Service Needs&body=`
                break;

            case "parklandusa":
                window.location.href = `mailto:brandon.ring@owlservices.com; mesha.jackson@owlservices.com?cc=Jake.Cooley@owlservices.com&subject=Parkland USA Active Service Needs&body=`
                break;

            case "southpawabtb":
                window.location.href = `mailto:brandon.ring@owlservices.com; mesha.jackson@owlservices.com?cc=Jake.Cooley@owlservices.com&subject=Southpaw/ABTB Active Service Needs&body=`
                break;

            case "other":
                window.location.href = `mailto:Jake.Cooley@owlservices.com?subject=******* Active Service Needs&body=`
                break;

            default:
                break;

        }
    }


    return (
        <div className={`${styles.locationEditor} `} >
            <Segment placeholder >
                <Button color='blue' onClick={() => handleEmail()}>Open Email and copy text</Button>
                <div id='emailBody'>
                    {customer === "seveneleven" ?
                        <>
                            <div><p>Jim/Andrew,</p></div>
                            <br />
                            <div><p>Please Reach out to 7-Eleven to have service setup at the following locations:</p></div>
                            <br />
                            <br />
                        </> : <></>}
                    {customer === "ccfi" ?
                        <>
                            <div><p>JP,</p></div>
                            <br />
                            <div><p>Please Reach out to Community Choice Financial to have service setup at the following locations:</p></div>
                            <br />
                            <br />
                        </> : <></>}
                    {customer === "parklandusa" ?
                        <>
                            <div><p>Brandon/Mesha,</p></div>
                            <br />
                            <div><p>Please Reach out to Parkland USA to have service setup at the following locations:</p></div>
                            <br />
                            <br />
                        </> : <></>}
                    {customer === "southpawabtb" ?
                        <>
                            <div><p>Brandon/Mesha,</p></div>
                            <br />
                            <div><p>Please Reach out to Southpaw/ABTB to have service setup at the following locations:</p></div>
                            <br />
                            <br />
                        </> : <></>}
                    {customer === "other" ?
                        <>
                            <div><p>Jake,</p></div>
                            <br />
                            <div><p>We need to get service setup at the following locations:</p></div>
                            <br />
                            <br />
                        </> : <></>}

                    <div>

                        {data.length >= 1 ? data.map((e) => {
                            return (
                                <>
                                    <div key={e.ServiceID}>
                                        <div><strong>System #: {e.Account}</strong></div>
                                        <div><p>{e['Account Name']}</p></div>
                                        <div><p>Installed {e['Online Date']}</p></div>
                                        <div><a href={`http://maps.google.com/?q=${e.Address} ${e.Address2}, ${e.City}, ${e.State} ${e.ZipCode}`}>{e.Address} {e.Address2}, {e.City}, {e.State} {e.ZipCode}</a></div>
                                        <div><p>{e.value}</p></div>
                                    </div>
                                    <br />
                                </>
                            )
                        }) : <></>}
                    </div>
                </div>
            </Segment>
        </div>

    )
}
