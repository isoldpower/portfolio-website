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
    about: {
        label: "[ 01_about_me ]",
        note_label: "// NOTE:",
    },
    experience: {
        label: "[ 02_experience_&_qualifications ]",
        commands: {
            work: "> ls experience/ --tree",
            education: "> ls education/ --tree",
        },
        present: "наст. время",
    },
    journey: {
        label: "[ 03_portfolio_&_technologies ]",
        region_label: "Портфолио-путешествие, управляемое прокруткой",
        player: "PLAYER: PORTFOLIO_VISITOR",
        score: "HI {{high}} · {{current}}",
        location: "LOCATION {{current}} / {{total}}",
        track_label: "Контрольные точки",
        progress_label: "Прогресс путешествия",
        checkpoint: "Перейти к точке {{name}}",
        checkpoint_reached: "Перейти к точке {{name}} (пройдена)",
        finish_marker: "Финиш",
        you_are_here: "Вы здесь",
        rabbit: "Пиксельный кролик-талисман",
        explore: "Открыть проект",
        no_preview: "превью пока нет",
        start: {
            title: "PRESS START",
            action: "Начать путешествие",
            note: "ВПЕРЕДИ ЛОКАЦИЙ: {{amount}} · ЛИСТАЙТЕ, ЧТОБЫ ИГРАТЬ",
        },
        finish: {
            title: "GAME OVER",
            action: "Другие проекты",
            note: "ИССЛЕДОВАНО ЛОКАЦИЙ: {{amount}}",
        },
        hint: "листайте, чтобы кролик бежал ↓",
        hint_done: "забег завершён",
        skip: "[[skip_to_projects]]",
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
