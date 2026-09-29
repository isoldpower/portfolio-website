import { getCount } from "../api/count.ts";


async function homePageLoader() {
    return await getCount();
}

export { homePageLoader };
