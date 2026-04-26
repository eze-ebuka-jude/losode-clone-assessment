import Contact from "../../components/Contact/Contact"
import Hero from "../../components/Hero"

export const metadata = {
    title: "Contact us - Losode",
    description: "Get in touch with us at Losode",
};

const ContactPage = () => {
    return (
        <>
            <Hero />
            <Contact />
        </>
    )
}

export default ContactPage