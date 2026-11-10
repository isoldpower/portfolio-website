const METHOD_ATTRIBUTES = ["http.request.method", "http.method"];

const STATUS_CODE_ATTRIBUTES = ["http.response.status_code", "http.status_code"];

const ROUTE_ATTRIBUTE = "http.route";

const REQUEST_SPAN_KIND = "server";

const FAILED_STATUS_CODE_FLOOR = 400;

const UNLABELED_TRACE = "request";

export {
    FAILED_STATUS_CODE_FLOOR,
    METHOD_ATTRIBUTES,
    REQUEST_SPAN_KIND,
    ROUTE_ATTRIBUTE,
    STATUS_CODE_ATTRIBUTES,
    UNLABELED_TRACE,
};
