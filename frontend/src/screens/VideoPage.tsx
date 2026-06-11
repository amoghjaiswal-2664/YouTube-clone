import axios from "axios"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { VideoCard } from "../../components/VideoCard";




export function VideoPage(){
    const [searchParams, setSearchParams] = useSearchParams();// used to read querry perameters in react router
    const [videoDetails, setVideoDetails] = useState(true);//it is used to retrive main video data from backend
    const [isLoading, setIsLoading] = useState(true);//used to show loading untill the files gets loaded
    const [recommendedVideo, setRecommendedVideos] = useState([]);// for recomendations on the left side

    const id = searchParams.get("id")//since our required querry perameter name was id
    useEffect(() => {
        axios.get("http://localhost:3000/api/videos/" + id)
            .then(response => {
                setVideoDetails(response.data);
                setIsLoading(false)//works like a promise as soon as files load it makes isLoading false
            })
    }, [id])
    useEffect(() => {
        axios.get("http://localhost:3000/api/videos")
            .then(response => {
                const data = response.data;
                setRecommendedVideos(data);
            })
    }, [])
    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    return <div style={{display: "flex"}}>
            {isLoading &&"Loading..."}
            {!isLoading &&
        <div>
            <video src={videoDetails.videoUrl} />
            <br />
            <div>
                {videoDetails.title}
            </div>
            <div>
                {videoDetails.user.channelName}
            </div>
            <div>
                <img src={videoDetails.user.profilePicture} />
            </div>
        </div>}
        <div>
             {recommendedVideo.map(video => <VideoCard
            href={`/watch?id=${video.id}`}
            imageUrl={video.thumbnail}
            title={video.title}
            channelImage={video.user.profilePicture}
            channelName={video.user.channelName}
            />)}
        </div>
    </div>

}