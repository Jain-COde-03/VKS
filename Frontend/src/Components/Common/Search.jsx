import { IoIosSearch } from 'react-icons/io'
import { IoMdMic } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'

const Search = ({ value, onChange, placeholder = 'Search for groceries, snacks, or drinks', width = 'w-auto' }) => {
    return (
        <div
<<<<<<< HEAD
            className={`group flex min-w-0 items-center gap-2 ${width} rounded-3xl border border-emerald-100 bg-white/95 px-2 py-1.5 shadow-[0_10px_30px_rgba(34,197,94,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(34,197,94,0.12)] focus-within:border-primary focus-within:ring-4 focus-within:ring-emerald-100`}
=======
            className={`group flex min-w-0 items-center gap-2 ${width} rounded-[24px] border border-emerald-100 bg-white/95 px-2 py-1.5 shadow-[0_10px_30px_rgba(34,197,94,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(34,197,94,0.12)] focus-within:border-primary focus-within:ring-4 focus-within:ring-emerald-100`}
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
        >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm sm:h-11 sm:w-11'>
                <IoIosSearch className='text-xl sm:text-2xl' />
            </div>

            <div className='flex min-w-0 flex-1 items-center'>
                <input
                    type='text'
                    placeholder={placeholder}
                    className='w-full min-w-0 bg-transparent pr-2 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none sm:pr-3 sm:text-sm md:text-[15px]'
                    value={value}
                    onChange={onChange ? (event) => onChange(event.target.value) : undefined}
                />
                <span className='hidden text-gray-200 sm:block'>|</span>
            </div>

            <IconButton
                aria-label='Voice search'
                size='small'
<<<<<<< HEAD
                className='hidden! h-9! w-9! bg-emerald-50! text-primary! transition-colors duration-200 hover:bg-emerald-100! min-[420px]:inline-flex! sm:h-10! sm:w-10!'
=======
                className='!hidden !h-9 !w-9 !bg-emerald-50 !text-primary transition-colors duration-200 hover:!bg-emerald-100 min-[420px]:!inline-flex sm:!h-10 sm:!w-10'
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
            >
                <IoMdMic className='text-lg sm:text-xl' />
            </IconButton>
        </div>
    )
}

export default Search
