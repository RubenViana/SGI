varying vec2 vUv;

uniform sampler2D uSampler1;

void main() {
    // Use vUv in the fragment shader
    vec4 color = texture2D(uSampler1, vUv);
    gl_FragColor = color;
}