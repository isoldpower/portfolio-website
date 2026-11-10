import { IntroScenePlaying, IntroSceneProvider } from "@features/site-artwork/intro-loader";

import { IntroLoaderScreen } from "./intro-loader-screen.tsx";


function IntroLoader() {
    return (
        <IntroSceneProvider>
            <IntroScenePlaying>
                <IntroLoaderScreen />
            </IntroScenePlaying>
        </IntroSceneProvider>
    );
}

export { IntroLoader };
