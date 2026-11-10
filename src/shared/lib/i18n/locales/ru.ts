import type { Translation } from "../types.ts";


const ru: Translation = {
    meta: {
        title: "Портфолио",
    },
    home: {
        projects_list: "Список Проектов"
    },
    navigation: {
        about: "обо мне",
        experience: "опыт",
        portfolio: "портфолио",
        contacts: "контакты",
    },
    hero: {
        kicker: "[ whoami ]",
        first_name: "NIKITA",
        last_name: "LAPIN",
        roles: {
            backend: "Backend-разработчик",
            frontend: "Frontend-разработчик",
            fullstack: "Fullstack-разработчик",
        },
        view_projects: "[[view_projects]]",
        get_in_touch: "[[get_in_touch]]",
        note_label: "// NOTE:",
        note: "кролик нарисован символами + $ @",
    },
    intro: {
        gloss: "[фр. «кролик»]",
        stages: {
            fetching: "загрузка three.js",
            loading: "загрузка rabbit.glb",
            rasterizing: "растеризация + $ @",
            ready: "готово",
        },
    },
    locale: {
        en: "English",
        ru: "Русский",
    },
};

export { ru };
