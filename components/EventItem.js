import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/EventItem.module.css'

export default function EventItem({evt}) {
  const {image, date, time, name, slug} = evt;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={image ? image.data.attributes.formats.thumbnail.url : '/images/event-default.png'} alt={`${evt.name} event's image`} width={170} height={100}/>
      </div>

      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  )
}
