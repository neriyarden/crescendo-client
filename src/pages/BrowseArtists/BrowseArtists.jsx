import React, { useEffect, useState } from "react";
import SectionHeading from "../../components/General/Headings/SectionHeading/SectionHeading";
import ArtistSearchBar from "./components/ArtistsSearchBar/ArtistsSearchBar";
import ArtistsPanel from "./components/ArtistsPanel/ArtistsPanel"
import API from "../../DAL/api"
import TextBtn from "../../components/General/Inputs/TextBtn/TextBtn"
import { useHttp } from '../../hooks/useHttp'
import Loader from "../../components/General/Loader"

const searchDelay = 500

const BrowseArtists = () => {
    const { isLoading, error, sendRequest, clearError } = useHttp()
    const [artistsData, setArtistsData] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [searchFilters, setSearchFilters] = useState({
        startsWith: "",
        searchTerm: "",
        pageNum: 1,
        size: 7,
    });

    const cleanUpResults = () => {
        setArtistsData([])
        clearError()
        setPageNum(1)
    };


    const loadMoreResults = async () => {
        const moreResults = await sendRequest(
            API.getArtistsData,
            { ...searchFilters, pageNum: pageNum + 1 }
        )
        if (moreResults.error) return
        setArtistsData([...artistsData, ...moreResults])
        setPageNum((prev) => prev + 1)
    };

    useEffect(() => {
        const getArtists = async () => {
            const results = await sendRequest(API.getArtistsData, searchFilters);
            if (results.error) return
            setArtistsData(results)
        };

        const setTid = setTimeout(() => {
            cleanUpResults()
            getArtists()
        }, searchDelay)

        return () => clearTimeout(setTid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFilters]);

    return (
        <section className="section browse-artists">
            <SectionHeading title="Artists" />
            <ArtistSearchBar
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />
            <ArtistsPanel artistsData={artistsData} />
            {
                isLoading ? <Loader /> : <></>
            }
            {
                error ? <p className="results-msg">{error}</p>
                    :
                    <div className="load-more-results">
                        <TextBtn
                            text="More Results"
                            clickHandler={loadMoreResults}
                        />
                    </div>
            }
        </section>
    )
}

export default BrowseArtists;
