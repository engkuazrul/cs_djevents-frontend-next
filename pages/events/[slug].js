import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index";
import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {
  const { attributes } = evt;
  const {date, time, name, image, performers, description, venue, address} = attributes;

  const deleteEvent = (e) => {
    console.log(e);
  }
  
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>

        <h1>{name}</h1>
        {image && (
          <div className={styles.image}>
            <Image src={image ? image.data.attributes.formats.medium.url : '/images/event-default.png'} width={960} height={600} alt={`${name} event's image`} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href='/events'>
          <a className={styles.back}>
            {'<'} Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths(){
  const res = await fetch(`${API_URL}/api/events`);
  const json = await res.json();
  const { data } = json;

  const paths = data.map(evt => {
    const {attributes} = evt;

    return {
      params: {slug: attributes.slug}
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/api/events?slug=${slug}&populate=*`);
  const json = await res.json();
  const { data } = json;

  return {
    props: {
      evt: data[0]
    },
    revalidate: 1
  }
}

// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }
