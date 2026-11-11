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
        present: "present",
    },
    journey: {
        label: "[ 03_portfolio_&_technologies ]",
        region_label: "Scroll-driven portfolio journey",
        player: "PLAYER: PORTFOLIO_VISITOR",
        score: "HI {{high}} · {{current}}",
        location: "LOCATION {{current}} / {{total}}",
        track_label: "Journey checkpoints",
        progress_label: "Journey progress",
        checkpoint: "Go to checkpoint {{name}}",
        checkpoint_reached: "Go to checkpoint {{name}} (reached)",
        finish_marker: "Finish",
        you_are_here: "You are here",
        rabbit: "Pixel rabbit mascot",
        explore: "Explore project",
        no_preview: "no preview yet",
        start: {
            title: "PRESS START",
            action: "Start the journey",
            note: "{{amount}} LOCATIONS AHEAD · SCROLL TO PLAY",
        },
        finish: {
            title: "GAME OVER",
            action: "View other projects",
            note: "{{amount}} LOCATIONS EXPLORED",
        },
        hint: "scroll to move the rabbit ↓",
        hint_done: "run complete",
        skip: "[[skip_to_projects]]",
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
