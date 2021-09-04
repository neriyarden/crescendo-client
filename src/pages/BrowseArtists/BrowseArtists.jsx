import React, { useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import ArtistSearchBar from './components/ArtistsSearchBar/ArtistsSearchBar'
import ArtistsPanel from './components/ArtistsPanel/ArtistsPanel'
import API from '../../DAL/api'
import msg from '../../constants/messages'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'

const searchDelay = 500

const BrowseArtists = () => {
    const [loading, setLoading] = useState(true)
    const [artistsData, setArtistsData] = useState([])
    const [resultsMsg, setResultsMsg] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const [searchFilters, setSearchFilters] = useState({
        startsWith: '',
        searchTerm: '',
        pageNum: 1,
        size: 7
    })

    const cleanUpResults = () => {
        setArtistsData([])
        setResultsMsg('')
        setPageNum(1)
    }

    const getArtists = async (searchFilters) => {
        const results = await API.getArtistsData(searchFilters)
        if (results.length === 0) setResultsMsg(msg.NO_RESULTS_MSG)
        setArtistsData(results)
    }

    const getMoreArtists = async (pageNum) => {
        const moreResults = await API.getArtistsData({ ...searchFilters, pageNum: pageNum })
        if (moreResults.length === 0) setResultsMsg(msg.END_OF_RESULTS_MSG)
        setArtistsData([...artistsData, ...moreResults])
        setLoading(false)
    }


    const loadMoreResults = () => {
        setLoading(true)
        setTimeout(() => {
        getMoreArtists(pageNum + 1)
        setPageNum((prev) => prev + 1)
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        const setTid = setTimeout(() => {
            cleanUpResults()
            getArtists(searchFilters)
        }, searchDelay)

        return () => clearTimeout(setTid)
    }, [searchFilters])

    return (
        <section className='section browse-artists'>
            <SectionHeading title='Artists' />
            <ArtistSearchBar
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />
            <ArtistsPanel
                artistsData={artistsData}
                setLoading={setLoading}
                loading={loading}
            />
            {resultsMsg && <p className='results-msg'>{resultsMsg}</p>}
            <div className='load-more-results'>
                {resultsMsg
                    ?
                    <TextBtn text='More Results' />
                    :
                    <TextBtn text='More Results' clickHandler={loadMoreResults} />
                }
            </div>
        </section>
    )
}

export default BrowseArtists
