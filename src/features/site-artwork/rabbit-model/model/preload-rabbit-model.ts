import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { MODEL_URL } from "../constants.ts";


const preloadRabbitModel = (): void => {
    if (typeof window === "undefined") {
        return;
    }

    useLoader.preload(GLTFLoader, MODEL_URL);
};

export { preloadRabbitModel };
