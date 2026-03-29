import { navIcons, navLinks, WINDOW_CONFIG } from '@constants'
import useWindowStore from '@store/window'
import dayjs from 'dayjs'

const Navbar = () => {
    const { openWindow } = useWindowStore();
  return (
    <nav>
        <div className="">
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Shadow's Portfolio</p>

        <ul>
            {navLinks.map(({ id, name, type }) => (
                <li key={id} onClick={() => openWindow(type as keyof typeof WINDOW_CONFIG)}>
                    <p>{name}</p>
                </li>
            ))}
        </ul>
        </div>

        <div>
            <ul>
                { navIcons.map(({ id, img }) => (
                    <li key={id}>
                        <img src={img} className='icon-hover' alt={`Icon-${id}`} />
                    </li>
                ))}
            </ul>
            <time>{ dayjs().format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
  )
}

export default Navbar