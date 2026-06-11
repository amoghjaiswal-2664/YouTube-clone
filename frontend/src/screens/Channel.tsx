import { VideoCard } from "../../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface ChannelDetails{
    id:string,
    username:string,
    banner:string,
    profilePicture:string|null,
    subscriberCount:number,

}

export function Channel(){
    const {username} =  useParams();
    const [uploads, setUploads] = useState([]);
    const [ChannelDetails, setChannelDetails] = useState<null | ChannelDetails>(null);
    const [isLoading,setIsLoading]=useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("https://localhost:3000/channel/"+username)
        .then(response=>{
            setUploads(response.data.uploads)
            setChannelDetails(response.data.ChannelDetails)
            setIsLoading(false);
        })
    },[username])
    if (isLoading) {
        return "Loading...."
    }
    return <div>
        <img src={ChannelDetails!.banner ?? ""} alt="" />
        <div style={{display:"flex"}}>
        {uploads.map(video => <VideoCard
            href={`/watch?id=${video.id}`}
            imageUrl={video.thumbnail}
            title={video.title}
            channelImage={video.user.profilePicture}
            channelName={video.user.channelName}
            />)}
        </div>
        <button onClick={()=>{
            navigate("/channel/asd");
        }}>check out this other channel by asd</button>
    </div>
}