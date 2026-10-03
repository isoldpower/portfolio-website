const technologyProjection = "{ _id, title, \"iconUrl\": icon_url }";

const sourceRepoProjection = `{
    _id,
    url,
    title,
    "displayVersion": display_version,
    "techStack": coalesce(tech_stack[]->${technologyProjection}, [])
}`;

const commonProjectFields = [
    "_id",
    "title",
    "\"slug\": slug.current",
    "summary",
    "kind",
    `"extraTech": coalesce(extra_tech[]->${technologyProjection}, [])`,
];

const kindSpecificFields = [
    `kind == "terminal" => {
        "wasmRepo": wasm_repo,
        "wasmTag": wasm_tag,
        "jsArtifact": js_artifact,
        "wasmArtifact": wasm_artifact
    }`,
    `kind == "web" => {
        "deployUrl": deploy_url,
        "earlyAccess": defined(access_key) && access_key != "",
        "availableTo": coalesce(available_to, []),
        "searchIntegration": coalesce(search_integration, false)
    }`,
    `kind == "embedded" => {
        "video": video.asset->{ playbackId, "aspectRatio": data.aspect_ratio },
        "photos": coalesce(photos, [])
    }`,
];

export { commonProjectFields, kindSpecificFields, sourceRepoProjection };
