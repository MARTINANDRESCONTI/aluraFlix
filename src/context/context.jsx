import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const VideoContext = React.createContext();

export const useVideoContext = () => {
	return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
	const [videos, setVideos] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState(null);

	useEffect(() => {
		fetchVideos();
	}, []);

	const fetchVideos = async () => {
		try {
			const response = await axios.get("https://alura-flix-api-mauve.vercel.app/videos");
			setVideos(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSaveVideo = async (editedVideo) => {
		try {
			const response = await axios.put(
				`https://alura-flix-api-mauve.vercel.app/videos/${editedVideo.id}`,
				editedVideo
			);
			setVideos((prevVideos) =>
				prevVideos.map((video) =>
					video.id === editedVideo.id ? editedVideo : video
				)
			);
			closeModal();
		} catch (error) {
				console.error(error);
		}
	};

	const handleAddVideo = async (newVideo) => {
			try {
					const response = await axios.post("https://alura-flix-api-mauve.vercel.app/videos", newVideo);
					setVideos((prevVideos) => [...prevVideos, response.data]);
			} catch (error) {
					console.error(error);
			}
	};

	const handleDeleteVideo = async (id) => {
		try {
			await axios.delete(`https://alura-flix-api-mauve.vercel.app/videos/${id}`);
			setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	const openModal = (video) => {
		setSelectedVideo(video);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedVideo(null);
		setIsModalOpen(false);
	};

	const videoContextValue = {
		videos,
		isModalOpen,
		selectedVideo,
		fetchVideos,
		handleSaveVideo,
		handleAddVideo,
		handleDeleteVideo,
		openModal,
		closeModal,
	};

	return (
		<VideoContext.Provider value={videoContextValue}>
				{children}
		</VideoContext.Provider>
	);
};
