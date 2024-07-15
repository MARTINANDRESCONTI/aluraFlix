import React from 'react';
import styles from "./VideoCard.module.css";
import iconoBorrar from "./icono-delete.png";
import iconoEditar from "./icono-editar.png";
import { useVideoContext } from "../../context/context";

const VideoCard = ({ video,  borderColor }) => {
	const { handleDeleteVideo, openModal } = useVideoContext();

	const handleDelete = async () => {
		try {
				await handleDeleteVideo(video.id);
		} catch (error) {
				console.error(error);
		}
	};

	const handleEdit = () => {
			openModal(video);
	};

	return (
		<div className={styles.videoCard} style={{ borderColor}}>
			<img src={video.imagen} alt={video.titulo} className={styles.imagen} />
			<div className={styles.textContainer}>
				<div className={styles.iconSection}>
						<img
								className={styles.iconoBorrar}
								src={iconoBorrar}
								alt="icono borrar"
								onClick={handleDelete}
						/>
						<span>Borrar</span>
				</div>
				<div className={styles.iconSection}>
						<img
								className={styles.iconoEditar}
								src={iconoEditar}
								alt="icono editar"
								onClick={handleEdit}
						/>
						<span>Editar</span>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
