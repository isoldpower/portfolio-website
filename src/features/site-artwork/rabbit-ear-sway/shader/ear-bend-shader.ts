const EAR_BEND_VERTEX_SHADER = `
uniform vec2 earA;
uniform vec2 earB;
varying vec3 vPosition;

const vec2 SPLIT_NORMAL = vec2(-0.835, -0.55);
const vec2 SPLIT_CENTER = vec2(-0.285, -0.151);
const vec3 BASE_A = vec3(-0.39, 0.38, 0.29);
const vec3 BASE_B = vec3(-0.555, 0.38, 0.05);

mat2 rotation(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, s, -s, c);
}

vec3 bendAt(vec3 point, vec2 angle, vec3 base, float weight) {
    vec3 local = point - base;
    local.xy = rotation(angle.x * weight) * local.xy;
    local.yz = rotation(angle.y * weight) * local.yz;
    return local + base;
}

void main() {
    vec3 point = position;
    float weight = smoothstep(0.3, 0.78, point.y) * (1.0 - smoothstep(0.05, 0.32, point.x));
    float side = smoothstep(-0.06, 0.06, dot(point.xz - SPLIT_CENTER, SPLIT_NORMAL));
    point = mix(bendAt(point, earA, BASE_A, weight), bendAt(point, earB, BASE_B, weight), side);

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    vPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
}
`;

const EAR_BEND_FRAGMENT_SHADER = `
uniform vec3 lightDirection;
varying vec3 vPosition;

void main() {
    vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
    float light = clamp(dot(normal, lightDirection), 0.0, 1.0) * 0.8 + 0.2;
    gl_FragColor = vec4(light, light, light, 1.0);
}
`;

export { EAR_BEND_VERTEX_SHADER, EAR_BEND_FRAGMENT_SHADER };
