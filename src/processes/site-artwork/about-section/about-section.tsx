import { useTranslation } from "react-i18next";

import { AboutBody } from "@entities/site-artwork/about-body";
import { AboutPanel } from "@widgets/site-artwork/about-panel";
import { AboutPortrait } from "@widgets/site-artwork/about-portrait";
import { SectionHeading } from "@widgets/site-artwork/section-heading";

import type { AboutProfile } from "@entities/site-artwork/model";


interface AboutSectionProps {
    profile: AboutProfile;
}

function AboutSection({ profile }: AboutSectionProps) {
    const { t } = useTranslation();

    return (
        <AboutBody id="about" className="relative z-10 mt-14 md:mt-18">
            <AboutBody.Header>
                <SectionHeading text={t("about.label")} />
            </AboutBody.Header>
            {profile.portrait && (
                <AboutPortrait portrait={profile.portrait} />
            )}
            <AboutPanel profile={profile} />
        </AboutBody>
    );
}

export { AboutSection };
export type { AboutSectionProps };
