import Header from '../../features/navigation/components/Header'
import Navbar from '../../features/navigation/components/Navbar'

const PageShell = ({ children }) => (
    <div className='min-h-screen bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_42%)]'>
        <Header />
        <Navbar />
        {children}
    </div>
)

export default PageShell
