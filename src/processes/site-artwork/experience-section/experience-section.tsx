import { useTranslation } from "react-i18next";

import { ExperienceBody } from "@entities/site-artwork/experience-body";
import { ExperienceHistory } from "@widgets/site-artwork/experience-history";
import { ExperienceVideo } from "@widgets/site-artwork/experience-video";
import { SectionHeading } from "@widgets/site-artwork/section-heading";

import type { ExperienceSection as ExperienceSectionData } from "@entities/site-artwork/model";


interface ExperienceSectionProps {
    section: ExperienceSectionData;
}

function ExperienceSection({ section }: ExperienceSectionProps) {
    const { t } = useTranslation();

    return (
        <ExperienceBody id="experience" className="mt-20 md:mt-24">
            <ExperienceBody.Header>
                <SectionHeading text={t("experience.label")} />
            </ExperienceBody.Header>
            <ExperienceHistory entries={section.entries} />
            {section.videoUrl ? <ExperienceVideo src={section.videoUrl} /> : null}
        </ExperienceBody>
    );
}

export { ExperienceSection };
export type { ExperienceSectionProps };
