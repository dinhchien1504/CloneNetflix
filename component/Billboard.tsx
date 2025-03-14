import React, { useMemo } from 'react';
import PlayButton from './PlayButton';

const Billboard = () => {
    const data = {
        bigBuckBunny: {
            id: '1',
            title: "Big Buck Bunny",
            description: "Three rodents amuse themselves by harassing creatures of the forest. However, when they harass a big rabbit, he gets his sweet revenge.",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.--.Opening.Scene.jpg",
            genre: "Comedy",
            duration: "10 minutes"
        },
        sintel: {
            id: '2',
            title: "Sintel",
            description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. She embarks on a journey to find him when they are separated.",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            thumbnailUrl: "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
            genre: "Adventure",
            duration: "15 minutes"
        },
        tearsOfSteel: {
            id: '3',
            title: "Tears of Steel",
            description: "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to stage a final battle against robotic invaders.",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            thumbnailUrl: "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
            genre: "Action",
            duration: "12 minutes"
        }
    };

    // Lấy ngẫu nhiên một video
    const selectedVideo = useMemo(() => {
        const videos = Object.values(data);
        return videos[Math.floor(Math.random() * videos.length)];
    }, []);

    return (
        <div className=' relative h-[56.25vw]'>
            <video 
                src={selectedVideo.videoUrl} 
                poster={selectedVideo.thumbnailUrl}
                autoPlay 
                loop 
                muted
                className="brightness-[60%] w-full h-full object-cover"
            />
            <div className="top-[30%] absolute md:top-[40%] ml-4 md:ml-16">
                <p className='text-white text-1xl md:text-5xl h-full w-[70%] lg:text-6xl font-bold drop-shadow-2xl'>
                    {selectedVideo.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%} md:w-[80%] lg:w-[50%] drop-shadow-xl ">
                    {selectedVideo.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={selectedVideo.id}/>
                    <button
                    className=' text-white  bg-white/30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex flex-row hover:bg-white/20 transition'
                    >
                            More Infor
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Billboard;
