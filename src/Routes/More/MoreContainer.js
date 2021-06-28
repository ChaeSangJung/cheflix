import React, { useState, useEffect } from "react";
import MorePresenter from "./MorePresenter"
import { moviesApi } from "api";

const NowMoreContainer = ({location}) => {
    const {pathname} = location;
    console.log(pathname)
    const [isNow] = useState(pathname.includes("/now_more"));
    const [isUpcoming] = useState(pathname.includes("/upcoming_more"));
    const [isPopular] = useState(pathname.includes("/popular_more"));
    const [moreResult, setMore] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moreLoading, setMoreLoading] = useState(false);    
    const [page, setPage] = useState(1);
    
    const LoadData = async() => {
        try {
            setMoreLoading(true);
            if(isNow){
                const {
                    data: { results: newNow, total_pages },
                } = await moviesApi.nowPlayMore(page);
                if(page <= total_pages) {
                    const uniqueMovies = [...moreResult, ...newNow]
                    setMore(uniqueMovies);
                } else {
                    alert("last page");
                    return false;
                }
            }
        } catch {
            console.log("Can't find movie information.");
        } finally {
            setMoreLoading(false);
        }
    }

    const fetchInitial = async() => {
        try {
            const {data : {results}} = await moviesApi.nowPlayMore(1);
            setMore(results);
        } catch {
            console.log("Can't find movie information.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInitial();
    },[]);

    useEffect(() => {
        LoadData();
    },[page]);

    const onMorePage = () =>  {
        setPage((p) => p + 1);
    }
    return (
        <MorePresenter 
            loading={loading}
            moreResult={moreResult}            
            moreLoading={moreLoading}
            onMorePage={onMorePage}
            isNow={isNow}
            isUpcoming={isUpcoming}
            isPopular={isPopular}
        />
    )
}

export default NowMoreContainer;