import Header from '../Header';
import Footer from '../Footer'
import './index.css'
import Search from '../Search';
import Filters from '../Filters';
import Cards from '../Cards';
import ReactPaginate from 'react-paginate';
import { ThreeCircles } from  'react-loader-spinner'
import { useEffect, useState } from 'react';

function App () {
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('popular')
    const [photos, setPhotos] = useState({})
    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [wasError, setWasError] = useState(false)

    useEffect(() => {
        setWasError(false)
        setIsLoading(true)
        fetch(`https://pixabay.com/api/?key=32059253-966ef05bcacd8e8b4a60b7ffb&image_type=photo&orientation=vertical&safesearch=true&page=${currentPage+1}&per_page=20&order=${sortBy}&q=${query}&category=${category}`,
        { cache: 'reload'})
            .then(response => response.json())
            .then(result => {
                let pages = Math.ceil(result.totalHits/20)
                setTotalPage(pages)
                setPhotos(result) 
            })
            .catch(() => {
                setWasError(true)
            })
            .finally(() => setIsLoading(false))

    }, [query, category, sortBy, currentPage])

    const selectPage = (page) => {
        setCurrentPage(page.selected)
    }

    return (
        <div className="app">
            <Header/>
            <main>
                <Search setQuery={setQuery} setCurrentPage={setCurrentPage}/>
                <Filters category={category} setCategory={setCategory}
                sortBy={sortBy} setSortBy={setSortBy} setCurrentPage={setCurrentPage}/>
                {(isLoading)? 
                <ThreeCircles height="50" width="50"
                color="#000" wrapperStyle={{marginTop: '5vh'}}/> :
                (wasError)?
                <h1 className='app__message'>Failed to upload photo. Please try again later</h1> :
                <>
                    <Cards photos={photos.hits}/>
                    <ReactPaginate
                    breakLabel="..." nextLabel=">" previousLabel="<"
                    onPageChange={selectPage}
                    pageRangeDisplayed={2} marginPagesDisplayed={1}
                    pageCount={totalPage}
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    activeClassName="active"
                    disabledClassName = 'pagination__item_disabled'
                    forcePage={(totalPage !==0)? currentPage : -1}
                    />
                </>   
                }
            </main>
            
            <Footer/>
        </div>
    )
}

export default App;