const technologyProjection = "{ _id, title, icon_url }";

const sourceRepoProjection = `{
    _id,
    url,
    title,
    display_version,
    "tech_stack": tech_stack[]->${technologyProjection}
}`;

const commonProjectFields = [
    "_id",
    "title",
    "slug { current }",
    "summary",
    "kind",
    `"extra_tech": extra_tech[]->${technologyProjection}`,
];

const kindSpecificFields = [
    `kind == "terminal" => {
        wasm_repo,
        wasm_tag,
        js_artifact,
        wasm_artifact
    }`,
    `kind == "web" => {
        deploy_url,
        "has_access_key": defined(access_key) && access_key != "",
        available_to,
        search_integration
    }`,
    `kind == "embedded" => {
        "video": video.asset->{ playbackId, data { aspect_ratio } },
        photos
    }`,
];

export { commonProjectFields, kindSpecificFields, sourceRepoProjection };
