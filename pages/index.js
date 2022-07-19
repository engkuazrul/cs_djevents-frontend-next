import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function Home({ events = [] }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => {
        const { id, attributes } = evt;
        return <EventItem key={id} evt={attributes} />;
      })}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const json = await res.json();
  const { data } = json;

  return {
    props: { events: data.slice(0, 2) },
    revalidate: 1,
  };
}
