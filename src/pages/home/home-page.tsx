import { AboutSection } from "@processes/site-artwork/about-section";
import { HeroSection } from "@processes/site-artwork/hero-section";

import type { HomePageData } from "@pages/home/types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const HomePage: ClientLayoutPage<HomePageData> = ({
    about,
}) => {
    return (
        <>
            <HeroSection />
            {about && <AboutSection profile={about} />}
        </>
    );
}

export { HomePage };
