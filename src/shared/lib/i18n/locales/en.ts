const en = {
    meta: {
        title: "Portfolio",
    },
    home: {
        projects_list: "Projects"
    },
    navigation: {
        about: "about",
        experience: "experience",
        portfolio: "portfolio",
        contacts: "contacts",
    },
    hero: {
        kicker: "[ whoami ]",
        first_name: "NIKITA",
        last_name: "LAPIN",
        roles: {
            backend: "Backend Developer",
            frontend: "Frontend Developer",
            fullstack: "Fullstack Developer",
        },
        view_projects: "[[view_projects]]",
        get_in_touch: "[[get_in_touch]]",
        note_label: "// NOTE:",
        note: "rabbit drawn in + $ @",
    },
    intro: {
        gloss: "[French: Rabbit]",
        stages: {
            fetching: "fetching three.js",
            loading: "loading rabbit.glb",
            rasterizing: "rasterizing + $ @",
            ready: "ready",
        },
    },
    locale: {
        en: "English",
        ru: "Русский",
    },
} as const;

export { en };
