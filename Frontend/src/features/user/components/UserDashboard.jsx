import { useContext } from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoIosGitCompare, IoIosHeartEmpty } from 'react-icons/io'
import { AppContext } from '../../../app/providers/AppProvider'

const UserDashboard = ({ compact = false }) => {
    const context = useContext(AppContext) || {}
    const { cartCount = 0, wishlistCount = 0 } = context

    const actions = [
        { label: 'Compare', icon: IoIosGitCompare, count: 2 },
        { label: 'Wishlist', icon: IoIosHeartEmpty, count: wishlistCount },
        { label: 'Cart', icon: MdOutlineShoppingCart, count: cartCount },
    ]
    return (
        <div className={`flex items-center rounded-full border border-emerald-100 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ${compact ? 'gap-1 p-1' : 'gap-2 p-1.5'}`}>
            {actions.map(({ label, icon: Icon, count }) => (
                <IconButton
                    key={label}
                    aria-label={label}
                    className={`group rounded-full! transition-all duration-200 hover:bg-emerald-50! ${compact ? 'p-2!' : 'p-2.5!'}`}
                >
                    <Badge badgeContent={count} max={99} color='primary'>
                        <Icon className={`${compact ? 'text-[1.45rem]' : 'text-[1.8rem]'} text-primary transition-transform duration-200 group-hover:scale-110`} />
                    </Badge>
                </IconButton>
            ))}
        </div>
    )
}

export default UserDashboard
