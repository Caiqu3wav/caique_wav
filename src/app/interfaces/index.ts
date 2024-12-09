/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Album {
    id: string;
    img: string;
    name: string;
    beatsIds: string[];
   dataLnc: string;
   beats: Beat[];
  }
  

export interface Beat {
    id: string;
    name: string;
    album_img: string;
    audio: string;
    genres: string[];
    dataLnc: string;
  }

 export interface ModalProps  {
    closeModal: () => void;
    isOpen: boolean;
    audioRef: any
  }

  export interface ModalAlbumProps  {
    closeModal: () => void; 
    isOpen: boolean;
    album: Album;
    beats: Beat[];
    playAlbum: () => void;
  }

 export interface PlayerState {
    currentTrack: Beat | null; 
    isPlaying: boolean;
    isMuted: boolean;
    isRandom: boolean;
    volume: number;
    progress: number;
    duration: number;
    toggleMute: () => void;
    togglePlay: () => void;
    toggleRandom: () => void;
    playNextTrack: () => void;
    playPrevTrack: () => void;
    setVolume: (volume: number) => void;
    setProgress: (progress: number) => void;
    setDuration: (duration: number) => void;
}