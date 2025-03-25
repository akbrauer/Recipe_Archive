import useFetch from '../hooks/useFetch';

function Contact(){
    const data = useFetch('/api/contact');

    return (
        <>
            <h1>Contact</h1>
            <p>{ data.message }</p>
        </>
    )
}

export default Contact;